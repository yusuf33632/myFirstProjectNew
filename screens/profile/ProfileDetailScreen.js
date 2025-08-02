import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Platform,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import BottomBar from '../../components/navigation/BottomBar';
import SideBar from '../../components/navigation/SideBar';
import { useRoute, useFocusEffect } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../src/context/ThemeContext';

const { width } = Dimensions.get('window');
const scale = width / 375;

export default function ProfileDetailScreen({ navigation }) {
  const route = useRoute();
  const { t } = useTranslation();
  const { theme } = useTheme();

  const [photos, setPhotos] = useState([
    require('../../assets/users/user1.jpg'),
    require('../../assets/users/user2.jpg'),
    require('../../assets/users/user4.jpg'),
    require('../../assets/users/user5.jpg'),
  ]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(global.unreadCount || 4);

  useFocusEffect(
    React.useCallback(() => {
      setUnreadCount(global.unreadCount || 0);
    }, [])
  );

  useEffect(() => {
    (async () => {
      const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
      const mediaStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (cameraStatus.status !== 'granted' || mediaStatus.status !== 'granted') {
        Alert.alert(t('profileDetail.permissionRequired'), t('profileDetail.permissionMessage'));
      }
    })();
  }, []);

  const handleAddPhoto = () => {
    Alert.alert(t('profileDetail.addPhoto'), t('profileDetail.selectOption'), [
      { text: t('profileDetail.chooseFromGallery'), onPress: pickImageFromLibrary },
      { text: t('profileDetail.takePhoto'), onPress: pickImageFromCamera },
      { text: t('profileDetail.cancel'), style: 'cancel' },
    ]);
  };

  const pickImageFromLibrary = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
    });
    if (!result.canceled && result.assets.length > 0) {
      setPhotos((prev) => [...prev, { uri: result.assets[0].uri }]);
    }
  };

  const pickImageFromCamera = async () => {
    const result = await ImagePicker.launchCameraAsync({ quality: 0.8 });
    if (!result.canceled && result.assets.length > 0) {
      setPhotos((prev) => [...prev, { uri: result.assets[0].uri }]);
    }
  };

  const handleDelete = (deletedImage) => {
    setPhotos((prevPhotos) =>
      prevPhotos.filter((photo) => {
        const photoUri = typeof photo === 'string' ? photo : photo.uri;
        const deletedUri = deletedImage?.uri || deletedImage;
        return photoUri !== deletedUri;
      })
    );
  };

  return (
    <View style={[styles.screen, { backgroundColor: theme.profileDetailScreenBackground }]}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setIsSidebarOpen(true)}>
            <Icon name="menu" size={24 * scale} color={theme.profileDetailTextPrimary} />
          </TouchableOpacity>
          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.iconBtn} onPress={handleAddPhoto}>
              <Icon name="add" size={24 * scale} color={theme.profileDetailTextPrimary} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconBtn}
              onPress={() =>
                navigation.navigate('Notification', {
                  onGoBack: (count) => {
                    setUnreadCount(count);
                    global.unreadCount = count;
                  },
                })
              }
            >
              <View style={styles.notificationWrapper}>
                <Icon name="notifications" size={20 * scale} color={theme.profileDetailTextPrimary} />
                {unreadCount > 0 && (
                  <View style={[styles.badge, { backgroundColor: theme.profileDetailNotificationBadgeBackground }]}>
                    <Text style={styles.badgeText}>{unreadCount}</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={[styles.profileSection, { backgroundColor: theme.profileDetailCardBackground }]}>
          <View style={styles.profileTopRow}>
            <View>
              <Image source={require('../../assets/users/user1.jpg')} style={styles.profileImage} />
              <View style={styles.coinRowBelow}>
                <Text style={[styles.coinText, { color: theme.profileDetailCoinTextColor }]}>🪙 500</Text>
              </View>
            </View>
            <View style={styles.profileInfo}>
              <Text style={[styles.nameRight, { color: theme.profileDetailTextPrimary }]}>Yusuf Doğan, 21</Text>
              <TouchableOpacity
                style={[styles.editButton, { backgroundColor: theme.profileDetailEditButtonBackground }]}
                onPress={() =>
                  navigation.navigate('ProfileEdit', {
                    name: 'Yusuf Doğan',
                    birthDate: '2003-01-01',
                    bio: t('profileDetail.defaultBio'),
                    profileImage: require('../../assets/users/user1.jpg'),
                  })
                }
              >
                <Text style={styles.editButtonText}>{t('profileDetail.editProfile')}</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Text style={[styles.bioText, { color: theme.profileDetailTextPrimary }]}>{t('profileDetail.defaultBio')}</Text>
        </View>

        <View style={styles.photoGrid}>
          {photos.map((photo, index) => (
            <TouchableOpacity
              key={index}
              onPress={() =>
                navigation.navigate('ImageDetail', {
                  image: photo,
                  onDelete: handleDelete,
                })
              }
            >
              <Image source={typeof photo === 'string' ? { uri: photo } : photo} style={styles.gridImage} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <BottomBar activeTab={route.name} navigation={navigation} />

      {isSidebarOpen && (
        <SideBar
          onClose={() => setIsSidebarOpen(false)}
          navigation={navigation}
          onAccountAdd={() => console.log('Yeni hesap ekle')}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    paddingTop: Platform.OS === 'ios' ? 60 * scale : 40 * scale,
    paddingHorizontal: 16 * scale,
    paddingBottom: 90 * scale,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16 * scale,
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 16 * scale,
  },
  iconBtn: {
    marginLeft: 8 * scale,
  },
  notificationWrapper: {
    position: 'relative',
    padding: 4 * scale,
  },
  badge: {
    position: 'absolute',
    top: -2 * scale,
    right: -2 * scale,
    borderRadius: 10 * scale,
    paddingHorizontal: 4 * scale,
    paddingVertical: 1,
    minWidth: 16 * scale,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  badgeText: {
    color: '#fff',
    fontSize: 10 * scale,
    fontWeight: 'bold',
  },
  profileSection: {
    borderRadius: 12 * scale,
    padding: 12 * scale,
    marginBottom: 24 * scale,
  },
  profileTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 56 * scale,
    height: 56 * scale,
    borderRadius: 28 * scale,
    marginRight: 12 * scale,
  },
  profileInfo: {
    flex: 1,
    alignItems: 'flex-end',
  },
  nameRight: {
    fontSize: 16 * scale,
    fontWeight: 'bold',
    marginBottom: 14 * scale,
    textAlign: 'right',
  },
  editButton: {
    paddingHorizontal: 12 * scale,
    paddingVertical: 4 * scale,
    borderRadius: 8 * scale,
    alignSelf: 'flex-end',
    marginBottom: 6 * scale,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 12 * scale,
    fontWeight: 'bold',
  },
  coinRowBelow: {
    marginTop: 6 * scale,
    alignItems: 'center',
  },
  coinText: {
    fontSize: 14 * scale,
    fontWeight: 'bold',
  },
  bioText: {
    fontSize: 14 * scale,
    textAlign: 'center',
    marginTop: 12 * scale,
    lineHeight: 18 * scale,
  },
  photoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10 * scale,
  },
  gridImage: {
    width: (width - 16 * scale * 2 - 10 * scale) / 2,
    height: 200 * scale,
    borderRadius: 12 * scale,
    marginBottom: 12 * scale,
  },
});
