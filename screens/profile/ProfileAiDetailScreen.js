import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Dimensions,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { Video } from 'expo-av';
import BottomBar from '../../components/navigation/BottomBar';
import SideBar from '../../components/navigation/SideBar';
import AccountModal from '../../components/modals/AccountModal';
import HomeHeader from '../../components/headers/HomeHeader';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../../src/context/ThemeContext';

import user1 from '../../assets/users/user1.jpg';
import user2 from '../../assets/users/user2.jpg';
import user3 from '../../assets/users/user3.jpg';
import user4 from '../../assets/users/user4.jpg';
import user5 from '../../assets/users/user5.jpg';
import user6 from '../../assets/users/user6.jpg';
import characterVideo from '../../assets/video/charecter1.mp4';

const { width } = Dimensions.get('window');
const scale = width / 375;

const dummyPosts = [
  { id: '1', name: 'Elara', image: user1 },
  { id: '2', name: 'Luna', image: user2 },
  { id: '3', name: 'Aria', image: user3 },
  { id: '4', name: 'Selin', image: user4 },
  { id: '5', name: 'Mira', image: user5 },
  { id: '6', name: 'Nora', image: user6 },
];

const renderUserCard = (navigation, theme) => ({ item }) => (
  <TouchableOpacity
    style={styles(theme).card}
    onPress={() => navigation.navigate('ImageAiDetail', { image: item.image })}
  >
    <Image source={item.image} style={styles(theme).image} />
  </TouchableOpacity>
);

export default function ProfileAiDetailScreen({ navigation }) {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedToggle, setSelectedToggle] = useState('open');

  const recipient = {
    id: '1',
    name: 'Jessica',
    image: user1,
  };

  return (
    <View style={styles(theme).container}>
      {menuOpen && (
        <SideBar
          onClose={() => setMenuOpen(false)}
          navigation={navigation}
          onAccountAdd={() => setModalVisible(true)}
        />
      )}

      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        <AccountModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onLogin={() => {
            setModalVisible(false);
            navigation.navigate('SignIn');
          }}
          onSignup={() => {
            setModalVisible(false);
            navigation.navigate('SignUp');
          }}
        />

        <View style={styles(theme).headerSection}>
          <View style={styles(theme).videoWrapper}>
            <Video
              source={characterVideo}
              resizeMode="cover"
              shouldPlay
              isLooping
              isMuted={false}
              style={StyleSheet.absoluteFill}
            />
            <View style={styles(theme).headerTop}>
              <HomeHeader
                onMenuPress={() => setMenuOpen(true)}
                onAvatarPress={() => navigation.navigate('ProfileDetail')}
              />
            </View>
            <View style={styles(theme).headerOverlay}>
              <View style={styles(theme).overlay}>
                <Image source={user1} style={styles(theme).avatar} />
                <View style={{ flex: 1 }}>
                  <Text style={styles(theme).name}>Jessica, 23</Text>
                  <View style={styles(theme).buttonRow}>
                    <TouchableOpacity
                      style={styles(theme).sendButton}
                      onPress={() =>
                        navigation.navigate('SubscriptionGift', {
                          selectedRecipient: recipient,
                        })
                      }
                    >
                      <Text style={styles(theme).buttonText}>
                        {t('profileAiDetail.sendGift')}
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles(theme).messageButton}
                      onPress={() => navigation.navigate('ChatDetail')}
                    >
                      <Text style={styles(theme).buttonText}>
                        {t('profileAiDetail.message')}
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles(theme).callButton}
                      onPress={() => navigation.navigate('IncomingCall')}
                    >
                      <Ionicons name="call" size={18 * scale} color={theme.profileAiDetailTextPrimary} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              <View style={styles(theme).descriptionBox}>
                <Text style={styles(theme).description}>
                  {t('profileAiDetail.description')}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles(theme).toggleContainer}>
          <TouchableOpacity
            style={[
              styles(theme).toggleButton,
              selectedToggle === 'open' && styles(theme).toggleSelected,
            ]}
            onPress={() => setSelectedToggle('open')}
          >
            <Text style={styles(theme).toggleText}>{t('profileAiDetail.public')}</Text>
          </TouchableOpacity>

          <View style={{ width: 12 * scale }} />

          <TouchableOpacity
            style={[
              styles(theme).toggleButton,
              selectedToggle === 'private' && styles(theme).toggleSelected,
            ]}
            onPress={() => setSelectedToggle('private')}
          >
            <Text style={styles(theme).toggleText}>{t('profileAiDetail.subscriberOnly')}</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={dummyPosts}
          renderItem={renderUserCard(navigation, theme)}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles(theme).grid}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          scrollEnabled={false}
        />
      </ScrollView>

      <BottomBar navigation={navigation} />
    </View>
  );
}

const styles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.profileAiDetailBackground,
    },
    headerSection: {
      width: '100%',
      aspectRatio: 1.5,
    },
    videoWrapper: {
      flex: 1,
      justifyContent: 'flex-end',
      overflow: 'hidden',
    },
    headerTop: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      paddingTop: 45 * scale,
      paddingHorizontal: 6 * scale,
      zIndex: 10,
    },
    headerOverlay: {
      flex: 1,
      backgroundColor: theme.profileAiDetailOverlayBackground,
      justifyContent: 'flex-end',
    },
    overlay: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 10 * scale,
    },
    avatar: {
      width: 64 * scale,
      height: 64 * scale,
      borderRadius: 32 * scale,
      borderWidth: 2 * scale,
      borderColor: theme.profileAiDetailBorderColor,
      marginRight: 14 * scale,
    },
    name: {
      fontSize: 20 * scale,
      color: theme.profileAiDetailTextPrimary,
      fontWeight: 'bold',
      marginStart: 160 * scale,
    },
    buttonRow: {
      flexDirection: 'row',
      marginVertical: 10 * scale,
      marginStart: 40 * scale,
    },
    sendButton: {
      backgroundColor: theme.profileAiDetailButtonBackground,
      borderRadius: 8 * scale,
      paddingVertical: 6 * scale,
      paddingHorizontal: 12 * scale,
      marginRight: 10 * scale,
    },
    messageButton: {
      backgroundColor: theme.profileAiDetailButtonBackground,
      borderRadius: 8 * scale,
      paddingVertical: 6 * scale,
      paddingHorizontal: 12 * scale,
    },
    callButton: {
      backgroundColor: theme.profileAiDetailButtonBackground,
      borderRadius: 8 * scale,
      padding: 8 * scale,
      justifyContent: 'center',
      alignItems: 'center',
      marginStart: 10 * scale,
    },
    buttonText: {
      color: theme.profileAiDetailTextPrimary,
      fontWeight: 'bold',
      fontSize: 13 * scale,
    },
    descriptionBox: {
      paddingHorizontal: 20 * scale,
      paddingBottom: 18 * scale,
    },
    description: {
      color: theme.profileAiDetailTextPrimary,
      fontSize: 13 * scale,
      lineHeight: 18 * scale,
      textAlign: 'left',
    },
    toggleContainer: {
      flexDirection: 'row',
      marginHorizontal: 20 * scale,
      marginTop: 14 * scale,
      marginBottom: 14 * scale,
      borderRadius: 10 * scale,
    },
    toggleButton: {
      flex: 1,
      backgroundColor: theme.profileAiToggleBackground,
      paddingVertical: 10 * scale,
      borderRadius: 10 * scale,
      alignItems: 'center',
    },
    toggleSelected: {
      backgroundColor: theme.profileAiToggleSelectedBackground,
    },
    toggleText: {
      color: theme.profileAiDetailTextPrimary,
      fontWeight: 'bold',
      fontSize: 14 * scale,
    },
    grid: {
      paddingHorizontal: 16 * scale,
      paddingBottom: 90 * scale,
    },
    card: {
      flex: 1,
      margin: 5 * scale,
      borderRadius: 10 * scale,
      overflow: 'hidden',
      minWidth: '45%',
      aspectRatio: 0.75,
    },
    image: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
    },
  });
