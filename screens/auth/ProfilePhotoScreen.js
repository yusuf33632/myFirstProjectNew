import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  Image,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import HeaderWithProgress from '../../components/headers/HeaderWithProgress';
import PageTitle from '../../components/ui/PageTitle';
import NextButton from '../../components/ui/NextButton';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../src/context/ThemeContext';

const { width } = Dimensions.get('window');
const scale = width / 375;
const IMAGE_SIZE = 180 * scale;

export default function ProfilePhotoScreen({ navigation }) {
  const route = useRoute();
  const { t } = useTranslation();
  const { theme } = useTheme();

  const {
    email,
    password,
    confirmPassword,
    name,
    birthDate,
    gender,
    languages,
    relationshipPreference,
    partnerAgeRange,
    characterTypes,
    personalityTraits,
    profilePhoto: routePhotoUri = null,
    ...restParams
  } = route.params;

  const [photoUri, setPhotoUri] = useState(routePhotoUri);

  const askForPermission = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(t('profilePhoto.permissionTitle'), t('profilePhoto.permissionMessage'));
      return false;
    }
    return true;
  };

  const handleSelectPhoto = async () => {
    Alert.alert(t('profilePhoto.selectTitle'), t('profilePhoto.selectMessage'), [
      {
        text: t('profilePhoto.camera'),
        onPress: async () => {
          const hasPermission = await askForPermission();
          if (!hasPermission) return;

          const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 0.7,
          });

          if (!result.canceled && result.assets?.length > 0) {
            setPhotoUri(result.assets[0].uri);
          }
        },
      },
      {
        text: t('profilePhoto.gallery'),
        onPress: async () => {
          const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 0.7,
          });

          if (!result.canceled && result.assets?.length > 0) {
            setPhotoUri(result.assets[0].uri);
          }
        },
      },
      { text: t('profilePhoto.cancel'), style: 'cancel' },
    ]);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.containerBackground }]}>
      <HeaderWithProgress navigation={navigation} currentStep={1} />
      <PageTitle>{t('profilePhoto.title')}</PageTitle>

      <TouchableOpacity style={styles.imageWrapper} onPress={handleSelectPhoto}>
        <Image
          source={
            photoUri
              ? { uri: photoUri }
              : require('../../assets/createProfile/person.png')
          }
          style={[styles.image, { borderColor: theme.avatarCircleBorderColor }]}
        />
      </TouchableOpacity>

      <NextButton
        label={t('profilePhoto.done')}
        onPress={() =>
          navigation.navigate('ProfileReady', {
            ...restParams,
            email,
            password,
            confirmPassword,
            name,
            birthDate,
            gender,
            languages,
            relationshipPreference,
            partnerAgeRange,
            characterTypes,
            personalityTraits,
            profilePhoto: photoUri,
          })
        }
        disabled={!photoUri}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10 * scale,
  },
  imageWrapper: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 1,
  },
  image: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: IMAGE_SIZE / 2,
    borderWidth: 2,
    resizeMode: 'cover',
  },
});
