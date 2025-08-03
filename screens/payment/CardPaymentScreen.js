import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Modal,
} from 'react-native';
import { useRoute, useNavigation, useFocusEffect } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useTheme } from '../../src/context/ThemeContext';
import { BlurView } from 'expo-blur';
import SettingsHeader from '../../components/headers/SettingsHeader';

const { width } = Dimensions.get('window');
const scale = width / 375;

const initialMethods = [
  { id: 'google', name: 'Google Pay', icon: require('../../assets/paymentIcons/google.png') },
  { id: 'apple', name: 'Apple Pay', icon: require('../../assets/paymentIcons/apple.png') },
];

export default function CardPaymentScreen() {
  const [selected, setSelected] = useState('mastercard');
  const [paymentMethodsState, setPaymentMethodsState] = useState(initialMethods);
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const { theme } = useTheme();
  const route = useRoute();
  const navigation = useNavigation();
  const { plan } = route.params || {};
  const displayPrice = plan?.price || '$49';
  const displayLabel = plan?.label || '';

  useFocusEffect(
    useCallback(() => {
      if (route.params?.newCard) {
        setPaymentMethodsState((prev) => {
          const exists = prev.some((card) => card.name === route.params.newCard.name);
          if (!exists) {
            return [...prev, route.params.newCard];
          }
          return prev;
        });
      }
    }, [route.params?.newCard])
  );

  const handleEnroll = async () => {
    try {
      setIsLoading(true);
      await new Promise((res) => setTimeout(res, 2000));
      setIsSuccess(true);
      setModalMessage('Payment Successful!');
    } catch (error) {
      setIsSuccess(false);
      setModalMessage('Payment failed. Please try again.');
    } finally {
      setIsLoading(false);
      setModalVisible(true);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
      <View style={[styles.container, { backgroundColor: theme.cardPaymentBackground }]}>
        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          <View style={{ marginTop: 30 * scale }}>
            <SettingsHeader title="Digital Payment" />


            <Text style={[styles.subtitle, { color: theme.cardPaymentTextSecondary }]}>Select the payment method you want to use</Text>

            {paymentMethodsState.map((method) => (
              <TouchableOpacity
                key={method.id}
                style={[
                  styles.paymentItem,
                  {
                    borderColor: theme.cardPaymentBorderDefault,
                    backgroundColor: theme.cardPaymentBackground,
                  },
                  selected === method.id && {
                    borderColor: theme.cardPaymentBorderSelected,
                    shadowColor: theme.cardPaymentBorderSelected,
                    backgroundColor: theme.cardPaymentModalBoxBackground,
                    borderWidth: 2,
                    shadowOpacity: 0.2,
                    shadowRadius: 10 * scale,
                    shadowOffset: { width: 0, height: 2 },
                    elevation: 5,
                  },
                ]}
                onPress={() => setSelected(method.id)}
                activeOpacity={0.8}
              >
                <View style={styles.leftSection}>
                  <Image source={method.icon} style={styles.icon} resizeMode="contain" />
                  <Text style={[styles.paymentText, { color: theme.cardPaymentTextPrimary }]}>{method.name}</Text>
                </View>

                <View style={styles.rightSection}>
                  <View
                    style={[
                      styles.radioOuter,
                      { borderColor: theme.cardPaymentRadioBorder },
                      selected === method.id && { borderColor: theme.cardPaymentRadioSelected },
                    ]}
                  >
                    {selected === method.id && (
                      <View style={[styles.radioInner, { backgroundColor: theme.cardPaymentRadioSelected }]} />
                    )}
                  </View>

                  {method.id.startsWith('card-') && (
                    <TouchableOpacity
                      onPress={() =>
                        setPaymentMethodsState((prev) => prev.filter((card) => card.id !== method.id))
                      }
                      style={{ marginLeft: 16 * scale }}
                      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                      <Icon name="trash-2" size={20 * scale} color={theme.cardPaymentDeleteIcon} />
                    </TouchableOpacity>
                  )}
                </View>
              </TouchableOpacity>
            ))}

            <TouchableOpacity style={styles.addCardButton} onPress={() => navigation.navigate('AddNewCard', { plan })}>
              <Text
                style={[
                  styles.addCardText,
                  {
                    color: theme.cardPaymentAddCardText,
                    borderColor: theme.cardPaymentAddCardBorder,
                  },
                ]}
              >
                + Add a new card
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[styles.enrollButton, { backgroundColor: theme.cardPaymentPrimaryButton }, isLoading && { opacity: 0.6 }]}
            onPress={handleEnroll}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color={theme.cardPaymentTextPrimary} size="small" />
            ) : (
              <Text style={[styles.enrollButtonText, { color: theme.cardPaymentTextPrimary }]}>Enroll Now – {displayPrice}</Text>
            )}
          </TouchableOpacity>
        </ScrollView>

        <Modal animationType="fade" transparent visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
          <BlurView intensity={50} tint="dark" style={StyleSheet.absoluteFill}>
            <View style={[styles.modalBackground]}>
              <View style={[styles.modalBox, { backgroundColor: theme.cardPaymentModalBoxBackground }]}>
                <LottieView
                  source={
                    isSuccess
                      ? require('../../assets/animations/success.json')
                      : require('../../assets/animations/error.json')
                  }
                  autoPlay
                  loop={false}
                  style={styles.modalLottie}
                />
                <Text style={[styles.modalText, { color: theme.cardPaymentTextPrimary }]}>{modalMessage}</Text>
                <TouchableOpacity
                  style={[styles.modalButton, { backgroundColor: theme.cardPaymentPrimaryButton }]}
                  onPress={() => {
                    setModalVisible(false);
                    if (isSuccess) navigation.navigate('Home');
                  }}
                >
                  <Text style={[styles.modalButtonText, { color: theme.cardPaymentTextPrimary }]}>OK</Text>
                </TouchableOpacity>
              </View>
            </View>
          </BlurView>
        </Modal>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
    padding: 20 * scale,
  },

  subtitle: {
    fontSize: 13 * scale,
    marginBottom: 26 * scale,
    textAlign: 'center',
  },
  paymentItem: {
    borderRadius: 14 * scale,
    borderWidth: 1,
    padding: 16 * scale,
    marginBottom: 14 * scale,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 28 * scale,
    height: 28 * scale,
    marginRight: 14 * scale,
  },
  paymentText: {
    fontSize: 16 * scale,
    fontWeight: '500',
  },
  radioOuter: {
    width: 22 * scale,
    height: 22 * scale,
    borderRadius: 11 * scale,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioInner: {
    width: 12 * scale,
    height: 12 * scale,
    borderRadius: 6 * scale,
  },
  addCardButton: {
    alignSelf: 'center',
    marginTop: 6 * scale,
    marginBottom: 30 * scale,
  },
  addCardText: {
    fontSize: 14 * scale,
    borderWidth: 1,
    borderRadius: 8 * scale,
    paddingVertical: 8 * scale,
    paddingHorizontal: 18 * scale,
  },
  enrollButton: {
    marginTop: 'auto',
    marginBottom: 20 * scale,
    paddingVertical: 16 * scale,
    borderRadius: 100 * scale,
    alignItems: 'center',
  },
  enrollButtonText: {
    fontSize: 16 * scale,
    fontWeight: '600',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    width: 280 * scale,
    borderRadius: 20 * scale,
    padding: 24 * scale,
    alignItems: 'center',
  },
  modalLottie: {
    width: 100 * scale,
    height: 100 * scale,
    marginBottom: 20 * scale,
  },
  modalText: {
    fontSize: 16 * scale,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20 * scale,
  },
  modalButton: {
    paddingVertical: 12 * scale,
    paddingHorizontal: 30 * scale,
    borderRadius: 30 * scale,
  },
  modalButtonText: {
    fontSize: 14 * scale,
    fontWeight: '600',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
