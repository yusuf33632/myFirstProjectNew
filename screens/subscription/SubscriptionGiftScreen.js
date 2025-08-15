import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  SafeAreaView,
  Platform,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import BottomBar from '../../components/navigation/BottomBar';
import { useRoute, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import GiftModal from '../../components/modals/GiftModal';
import Toast from 'react-native-root-toast';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../src/context/ThemeContext';
import * as NavigationBar from 'expo-navigation-bar';

const { width } = Dimensions.get('window');
const CARD_SIZE = width / 3.5;
const scale = width / 375;

const gifts = [
  { id: '1', icon: require('../../assets/gifts/chocolate-bar.png'), price: 500, name: 'gift.chocolate' },
  { id: '2', icon: require('../../assets/gifts/crystal.png'),        price: 500, name: 'gift.crystal' },
  { id: '3', icon: require('../../assets/gifts/diamond.png'),        price: 500, name: 'gift.diamond' },
  { id: '4', icon: require('../../assets/gifts/dress.png'),          price: 500, name: 'gift.dress' },
  { id: '5', icon: require('../../assets/gifts/dress (1).png'),      price: 500, name: 'gift.redDress' },
  { id: '6', icon: require('../../assets/gifts/dress (2).png'),      price: 500, name: 'gift.blueDress' },
  { id: '7', icon: require('../../assets/gifts/dress (3).png'),      price: 500, name: 'gift.blackDress' },
  { id: '8', icon: require('../../assets/gifts/gem.png'),            price: 500, name: 'gift.jewel' },
  { id: '9', icon: require('../../assets/gifts/wedding-ring.png'),   price: 500, name: 'gift.ring' },
  { id: '10', icon: require('../../assets/gifts/women-cloth.png'),   price: 500, name: 'gift.womensClothing' },
];

export default function SubscriptionGiftScreen() {
  const { t } = useTranslation();
  const route = useRoute();
  const navigation = useNavigation();
  const { theme } = useTheme();

  const [selectedGift, setSelectedGift] = useState(null);
  const [selectedRecipient, setSelectedRecipient] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Android navbar → modal açıkken gizle, kapanınca geri getir
  const hideNav = () => Platform.OS === 'android' && NavigationBar.setVisibilityAsync('hidden').catch(() => {});
  const showNav = () => Platform.OS === 'android' && NavigationBar.setVisibilityAsync('visible').catch(() => {});

  const handleOpenModal = () => { setModalVisible(true); hideNav(); };
  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedGift(null);
    setSelectedRecipient(null);
    showNav();
  };

  useEffect(() => () => { showNav(); }, []);

  useEffect(() => {
    const { selectedGift, selectedRecipient, openGiftModal } = route.params || {};
    if (selectedRecipient) setSelectedRecipient(selectedRecipient);
    if (selectedGift) setSelectedGift(selectedGift);
    if (selectedGift && selectedRecipient && openGiftModal) handleOpenModal();
  }, [route.params]);

  const handleGiftPress = (gift) => {
    if (selectedRecipient) {
      setSelectedGift(gift);
      handleOpenModal();
    } else {
      navigation.navigate('SelectRecipient', { gift });
    }
  };

  const showToast = () => {
    Toast.show(t('gift.successMessage'), {
      duration: 2000,
      position: Toast.positions.CENTER - 100,
      backgroundColor: theme.subscriptionGiftToastBackground,
      textColor: theme.subscriptionGiftToastText,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
    });
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.subscriptionGiftBackground,
          paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        },
      ]}
    >
      <SafeAreaView style={styles.safeArea}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <Icon name="arrow-left" size={18 * scale} color={theme.subscriptionGiftTitleText} />
            </TouchableOpacity>
            <View style={{ flex: 1, alignItems: 'center' }}>
              <Text style={[styles.title, { color: theme.subscriptionGiftTitleText }]}>
                {t('gift.title')}
              </Text>
            </View>
          </View>

          <View style={styles.grid}>
            {gifts.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={[styles.giftCard, { backgroundColor: theme.subscriptionGiftCardBackground }]}
                onPress={() => handleGiftPress(item)}
              >
                <Image source={item.icon} style={styles.giftIcon} resizeMode="contain" />
                <Text style={[styles.priceText, { color: theme.subscriptionGiftTitleText }]}>🪙 {item.price}</Text>
                <Text style={[styles.nameText, { color: theme.subscriptionGiftNameText }]}>
                  {t(item.name)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>

      {/* Modal açıkken BottomBar'ı sakla ki altta boşluk yaratmasın */}
      {!modalVisible && <BottomBar activeTab={route.name} navigation={navigation} />}

      <GiftModal
        visible={modalVisible}
        onClose={handleCloseModal}
        gift={selectedGift}
        recipient={selectedRecipient}
        onConfirm={() => {
          showToast();
          handleCloseModal();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1 },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16 * scale,
    marginBottom: 15 * scale,
    marginTop: 12 * scale,
  },
  title: {
    fontSize: 20 * scale,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  backButton: { position: 'absolute', left: 16 * scale, padding: 13 * scale, zIndex: 1 },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20 * scale,
    paddingBottom: 120 * scale,
  },
  giftCard: {
    width: CARD_SIZE,
    height: CARD_SIZE + 20 * scale,
    borderRadius: 16 * scale,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10 * scale,
    marginBottom: 16 * scale,
  },
  giftIcon: { width: CARD_SIZE * 0.5, height: CARD_SIZE * 0.5, marginBottom: 8 * scale },
  priceText: { fontWeight: 'bold', fontSize: 14 * scale },
  nameText: { fontSize: 12 * scale, textAlign: 'center', marginTop: 4 * scale },
});
