import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
  Platform,
  TextInput,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as ImagePicker from 'expo-image-picker';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../src/context/ThemeContext';

const { width } = Dimensions.get('window');
const scale = width / 375;

const ProfileEditScreen = ({ navigation, route }) => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  const { name, birthDate, bio, profileImage } = route.params || {};

  const [userName, setUserName] = useState(name || '');
  const [userBirthDate, setUserBirthDate] = useState(birthDate || '');
  const [userBio, setUserBio] = useState(bio || '');
  const [userImage, setUserImage] = useState(profileImage || null);

  const handleImagePick = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert(t('profileEdit.permissionAlert'));
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
      allowsEditing: true,
      aspect: [1, 1],
    });

    if (!result.canceled && result.assets?.length > 0) {
      setUserImage({ uri: result.assets[0].uri });
    }
  };

  const handleSave = () => {
    console.log('Saved:', {
      name: userName,
      birthDate: userBirthDate,
      bio: userBio,
      profileImage: userImage,
    });
    navigation.goBack();
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.containerBackground }]}>
      {/* Header */}
      <View
        style={[
          styles.header,
          {
            borderBottomColor: theme.profileEditHeaderBorder,
          },
        ]}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back-ios" size={22 * scale} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>
          {t('profileEdit.title')}
        </Text>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Profile Image */}
          <TouchableOpacity onPress={handleImagePick}>
            {userImage ? (
              <Image source={userImage} style={styles.profileImage} />
            ) : (
              <View
                style={[
                  styles.profileImage,
                  styles.placeholderImage,
                  { backgroundColor: theme.profileEditPlaceholderBg },
                ]}
              >
                <Text style={{ color: theme.subtext, fontSize: 12 * scale }}>
                  {t('profileEdit.photo')}
                </Text>
              </View>
            )}
          </TouchableOpacity>

          {/* Name */}
          <View style={[styles.infoRow, { backgroundColor: theme.surfacePrimary }]}>
            <Text style={[styles.label, { color: theme.profileEditLabelText }]}>
              {t('profileEdit.name')}
            </Text>
            <TextInput
              style={[styles.input, { color: theme.input }]}
              placeholder={t('profileEdit.name')}
              value={userName}
              onChangeText={setUserName}
              placeholderTextColor={theme.inputPlaceholder}
            />
          </View>

          {/* Birth Date */}
          <View style={[styles.infoRow, { backgroundColor: theme.surfacePrimary }]}>
            <Text style={[styles.label, { color: theme.profileEditLabelText }]}>
              {t('profileEdit.birthDate')}
            </Text>
            <TextInput
              style={[styles.input, { color: theme.input }]}
              placeholder="GG.AA.YYYY"
              value={userBirthDate}
              onChangeText={setUserBirthDate}
              placeholderTextColor={theme.inputPlaceholder}
            />
          </View>

          {/* Bio */}
          <View style={[styles.infoRow, { backgroundColor: theme.surfacePrimary }]}>
            <Text style={[styles.label, { color: theme.profileEditLabelText }]}>
              {t('profileEdit.bio')}
            </Text>
            <TextInput
              style={[
                styles.input,
                {
                  height: 80 * scale,
                  textAlignVertical: 'top',
                  color: theme.input,
                },
              ]}
              placeholder={t('profileEdit.bioPlaceholder')}
              value={userBio}
              onChangeText={setUserBio}
              multiline
              placeholderTextColor={theme.inputPlaceholder}
            />
          </View>

          {/* Change Preference */}
          <TouchableOpacity
            style={[styles.preferenceButton, { backgroundColor: theme.surfaceSecondary }]}
          >
            <Text style={[styles.preferenceText, { color: theme.text }]}>
              {t('profileEdit.changePreference')}
            </Text>
            <MaterialIcons name="chevron-right" size={22 * scale} color={theme.text} />
          </TouchableOpacity>

          {/* Save Button */}
          <TouchableOpacity
            style={[styles.saveButton, { backgroundColor: theme.profileEditSaveButtonBackground }]}
            onPress={handleSave}
          >
            <Text style={[styles.saveButtonText, { color: theme.selectedCategoryText }]}>
              {t('profileEdit.save')}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16 * scale,
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
    paddingBottom: 16 * scale,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 18 * scale,
    fontWeight: 'bold',
    marginLeft: 12 * scale,
  },
  scrollContent: {
    padding: 20 * scale,
  },
  profileImage: {
    width: 100 * scale,
    height: 100 * scale,
    borderRadius: 50 * scale,
    alignSelf: 'center',
    marginBottom: 24 * scale,
  },
  placeholderImage: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoRow: {
    paddingVertical: 12 * scale,
    paddingHorizontal: 16 * scale,
    borderRadius: 8 * scale,
    marginBottom: 14 * scale,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 6 * scale,
  },
  input: {
    fontSize: 14 * scale,
    paddingVertical: 6 * scale,
  },
  preferenceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14 * scale,
    paddingHorizontal: 16 * scale,
    borderRadius: 10 * scale,
    marginTop: 20 * scale,
  },
  preferenceText: {
    fontWeight: 'bold',
    fontSize: 14 * scale,
  },
  saveButton: {
    paddingVertical: 12 * scale,
    borderRadius: 10 * scale,
    marginTop: 20 * scale,
    alignItems: 'center',
  },
  saveButtonText: {
    fontWeight: 'bold',
    fontSize: 14 * scale,
  },
});

export default ProfileEditScreen;
