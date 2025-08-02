import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Pressable,
  Animated,
  Platform,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../src/context/ThemeContext';

const { width, height } = Dimensions.get('window');
const scale = width / 375;

export default function GiftModal({ visible, onClose, gift, recipient, onConfirm }) {
  const [showToast, setShowToast] = useState(false);
  const toastOpacity = useState(new Animated.Value(0))[0];
  const { t } = useTranslation();
  const { theme } = useTheme();

  const userCoin = 500; // TODO: Dinamik bağlanacak

  if (!gift) return null;

  const handleSend = () => {
    setShowToast(true);
    Animated.sequence([
      Animated.timing(toastOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.delay(2000),
      Animated.timing(toastOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setShowToast(false);
    });

    onClose();
    if (onConfirm) onConfirm();
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <Pressable style={[styles.overlay, { backgroundColor: theme.giftModalOverlay }]} onPress={onClose}>
        <Pressable
          style={[styles.modalContainer, { backgroundColor: theme.giftModalBackground }]}
          onPress={(e) => e.stopPropagation()}
        >
          <View style={[styles.dragBar, { backgroundColor: theme.giftModalDragBar }]} />

          <View style={[styles.giftBox, { backgroundColor: theme.giftModalGiftBoxBackground }]}>
            <Image source={gift.icon} style={styles.giftImage} resizeMode="contain" />
          </View>

          <Text style={[styles.giftName, { color: theme.giftModalGiftName }]}>{t(gift.name)}</Text>
          <Text style={[styles.giftPrice, { color: theme.giftModalGiftPrice }]}>🪙 {gift.price}</Text>

          <Text style={[styles.confirmText, { color: theme.giftModalConfirmText }]}>
            {t('gift_modal.confirm', { name: recipient?.name || t('gift_modal.someone') })}
          </Text>

          {recipient?.image && (
            <View style={styles.coinRow}>
              <Image
                source={recipient.image}
                style={[styles.profileImage, { borderColor: theme.giftModalProfileBorder }]}
              />
              <View style={styles.coinInfo}>
                <Image
                  source={require('../../assets/gifts/crystal.png')}
                  style={styles.coinIcon}
                  resizeMode="contain"
                />
                <Text style={[styles.userCoinText, { color: theme.giftModalGiftPrice }]}>{userCoin}</Text>
              </View>
            </View>
          )}

          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={[styles.cancelButton, { backgroundColor: theme.giftModalCancelButtonBackground }]}
              onPress={onClose}
            >
              <Text style={[styles.buttonText, { color: theme.giftModalButtonText }]}>{t('gift_modal.cancel')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.payButton, { backgroundColor: theme.giftModalPayButtonBackground }]}
              onPress={handleSend}
            >
              <Text style={[styles.buttonText, { color: theme.giftModalButtonText }]}>{t('gift_modal.send')}</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Pressable>

      {showToast && (
        <Animated.View
          style={[
            styles.toast,
            {
              opacity: toastOpacity,
              backgroundColor: theme.giftModalToastBackground,
              borderColor: theme.giftModalToastBorder,
            },
          ]}
        >
          <Text style={[styles.toastText, { color: theme.giftModalToastText }]}>
            {t('gift_modal.toast')}
          </Text>
        </Animated.View>
      )}
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalContainer: {
    width: width,
    borderTopLeftRadius: 20 * scale,
    borderTopRightRadius: 20 * scale,
    padding: 20 * scale,
    alignItems: 'center',
    paddingBottom: 30 * scale,
  },
  dragBar: {
    width: 60 * scale,
    height: 4 * scale,
    borderRadius: 2 * scale,
    marginBottom: 10 * scale,
  },
  giftBox: {
    width: width * 0.9,
    height: width * 0.5,
    borderRadius: 16 * scale,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10 * scale,
  },
  giftImage: {
    width: 80 * scale,
    height: 80 * scale,
  },
  giftName: {
    fontSize: 18 * scale,
    fontWeight: 'bold',
    marginTop: 10 * scale,
  },
  giftPrice: {
    fontWeight: 'bold',
    fontSize: 16 * scale,
    marginBottom: 12 * scale,
  },
  confirmText: {
    fontSize: 13 * scale,
    textAlign: 'center',
    marginBottom: 12 * scale,
  },
  profileImage: {
    width: 42 * scale,
    height: 42 * scale,
    borderRadius: 21 * scale,
    borderWidth: 2 * scale,
  },
  coinRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20 * scale,
  },
  coinInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8 * scale,
  },
  coinIcon: {
    width: 18 * scale,
    height: 18 * scale,
    marginRight: 4 * scale,
  },
  userCoinText: {
    fontSize: 15 * scale,
    fontWeight: 'bold',
  },
  buttonsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 10 * scale,
    marginBottom: 25 * scale,
  },
  cancelButton: {
    paddingHorizontal: 32 * scale,
    paddingVertical: 10 * scale,
    borderRadius: 12 * scale,
  },
  payButton: {
    paddingHorizontal: 60 * scale,
    paddingVertical: 10 * scale,
    borderRadius: 12 * scale,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 15 * scale,
  },
  toast: {
    position: 'absolute',
    bottom: 80 * scale,
    left: 40 * scale,
    right: 40 * scale,
    padding: 14 * scale,
    borderRadius: 16 * scale,
    alignItems: 'center',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  toastText: {
    fontSize: 14 * scale,
    fontWeight: '600',
  },
});
