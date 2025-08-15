import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  Modal,
  Pressable,
  Platform,
  StyleSheet as RNStyleSheet,
  Animated,
  ToastAndroid, // ← Android toast
  Alert,        // ← iOS için bırakıyoruz
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BlurView } from 'expo-blur';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../src/context/ThemeContext';
import * as NavigationBar from 'expo-navigation-bar';

const { width } = Dimensions.get('window');
const SCREEN_HEIGHT = Dimensions.get('screen').height; // kaydırma mesafesi
const scale = width / 375;

export default function LockedContentModal({
  visible,
  onClose,
  onBuy,
  userCoinBalance = 0,
  requiredCoin = 50,
}) {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { theme } = useTheme();

  // ↓ Aşağıdan kaydırma animasyonu (tasarım aynen)
  const sheetY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(sheetY, {
        toValue: 0,
        duration: 260,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(sheetY, {
        toValue: SCREEN_HEIGHT,
        duration: 220,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, sheetY]);

  // Android nav bar: modal açıkken gizle, kapanınca geri getir
  useEffect(() => {
    if (Platform.OS !== 'android') return;

    const hideNav = async () => {
      try {
        await NavigationBar.setBehaviorAsync('overlay-swipe');
        await NavigationBar.setBackgroundColorAsync('#000000'); // siyah
        await NavigationBar.setButtonStyleAsync('light');
        await NavigationBar.setVisibilityAsync('hidden');
      } catch {}
    };
    const showNav = async () => {
      try {
        await NavigationBar.setVisibilityAsync('visible');
      } catch {}
    };

    if (visible) hideNav();
    else showNav();

    return () => showNav();
  }, [visible]);

  const toast = (msg) => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(msg, ToastAndroid.SHORT);
    } else {
      Alert.alert('', msg);
    }
  };

  const handleBuy = () => {
    if (userCoinBalance >= requiredCoin) {
      // Başarılı senaryo: Android'de toast, iOS'ta alert (nav bar bozulmaz)
      toast(t('locked.successMessage'));
      onBuy && onBuy();
    } else {
      // Yetersiz bakiye: Android'de toast + yönlendir; iOS'ta alert
      if (Platform.OS === 'android') {
        toast(t('locked.insufficientMessage'));
        onClose && onClose();
        navigation.navigate('CoinPurchase');
      } else {
        Alert.alert(
          t('locked.insufficientTitle'),
          t('locked.insufficientMessage'),
          [
            {
              text: t('locked.buyCoins'),
              onPress: () => {
                onClose && onClose();
                navigation.navigate('CoinPurchase');
              },
            },
            { text: t('locked.cancel'), style: 'cancel' },
          ]
        );
      }
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType={Platform.OS === 'ios' ? 'fade' : 'none'} // kayma animasyonu bizde
      statusBarTranslucent
      hardwareAccelerated
      presentationStyle={Platform.OS === 'android' ? 'overFullScreen' : undefined}
      onRequestClose={onClose}
    >
      {/* Dışa basınca kapansın */}
      <Pressable style={styles.overlay} onPress={onClose}>
        <BlurView intensity={60} tint="dark" style={styles.blurBackground}>
          {/* Kart: iç tıklama dışa yayılmasın + aşağıdan kaydır */}
          <Animated.View
            style={[
              styles.card,
              {
                backgroundColor: theme.infoCardBackground,
                transform: [{ translateY: sheetY }],
              },
            ]}
          >
            <Pressable onPress={() => {}}>
              <Image
                source={require('../../assets/gifts/crystal.png')}
                style={styles.coinImage}
                resizeMode="contain"
              />

              <Text style={[styles.coinTitle, { color: theme.text }]}>
                {t('locked.coinTitle')}
              </Text>

              <View style={styles.coinRow}>
                <Image
                  source={require('../../assets/gifts/diamond.png')}
                  style={styles.coinIcon}
                  resizeMode="contain"
                />
                <Text style={[styles.coinAmount, { color: theme.lockedModalCoinColor }]}>
                  {requiredCoin}
                </Text>
              </View>

              <Text style={[styles.description, { color: theme.text }]}>
                {t('locked.description')}
              </Text>

              <Image
                source={require('../../assets/users/user1.jpg')}
                style={styles.avatar}
              />

              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={[styles.cancelBtn, { backgroundColor: theme.borderColor }]}
                  onPress={onClose}
                >
                  <Text style={[styles.btnText, { color: theme.text }]}>
                    {t('locked.cancel')}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.confirmBtn, { backgroundColor: theme.primarySend }]}
                  onPress={handleBuy}
                >
                  <Text style={[styles.btnText, { color: theme.text }]}>
                    {t('locked.pay')}
                  </Text>
                </TouchableOpacity>
              </View>
            </Pressable>
          </Animated.View>
        </BlurView>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...RNStyleSheet.absoluteFillObject,   // tam ekran kaplasın (tasarım değişmeden)
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  blurBackground: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  card: {
    width: width,
    borderTopLeftRadius: 24 * scale,
    borderTopRightRadius: 24 * scale,
    alignItems: 'center',
    paddingVertical: 24 * scale,
    paddingHorizontal: 20 * scale,
  },
  coinImage: {
    width: 100 * scale,
    height: 80 * scale,
    marginBottom: 12 * scale,
    alignSelf: 'center',
  },
  coinTitle: {
    fontSize: 16 * scale,
    fontWeight: 'bold',
    marginBottom: 6 * scale,
    textAlign: 'center',
  },
  coinRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12 * scale,
    alignSelf: 'center',
  },
  coinIcon: {
    width: 20 * scale,
    height: 20 * scale,
    marginRight: 6 * scale,
  },
  coinAmount: {
    fontSize: 16 * scale,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 12 * scale,
    textAlign: 'center',
    marginBottom: 12 * scale,
  },
  avatar: {
    width: 36 * scale,
    height: 36 * scale,
    borderRadius: 18 * scale,
    marginBottom: 60 * scale,
    alignSelf: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20 * scale,
    marginBottom: 30 * scale,
    width: '100%',
  },
  cancelBtn: {
    flex: 1,
    paddingVertical: 10 * scale,
    borderRadius: 10 * scale,
    marginRight: 50 * scale,
    alignItems: 'center',
  },
  confirmBtn: {
    flex: 1.4,
    paddingVertical: 10 * scale,
    borderRadius: 10 * scale,
    alignItems: 'center',
  },
  btnText: {
    fontWeight: 'bold',
    fontSize: 14 * scale,
  },
});
