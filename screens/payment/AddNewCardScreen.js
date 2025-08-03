import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
  SafeAreaView,
} from 'react-native';
import { BlurView } from 'expo-blur';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  FadeInUp,
} from 'react-native-reanimated';
import Checkbox from 'expo-checkbox';
import valid from 'card-validator';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from '../../src/context/ThemeContext';
import SettingsHeader from '../../components/headers/SettingsHeader'; // yolunu senin yapına göre düzenle


const { width } = Dimensions.get('window');
const scale = width / 375;

export default function AddNewCardScreen() {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const { plan } = route.params || {};

  const [cardHolder, setCardHolder] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvc, setCvc] = useState('');
  const [saveCard, setSaveCard] = useState(true);
  const [cardType, setCardType] = useState(null);

  const [cardHolderError, setCardHolderError] = useState('');
  const [cardNumberError, setCardNumberError] = useState('');
  const [expiryDateError, setExpiryDateError] = useState('');
  const [cvcError, setCvcError] = useState('');

  const isFormValid =
    cardHolder.trim().length > 0 &&
    cardNumber.trim().length > 0 &&
    expiryDate.trim().length > 0 &&
    cvc.trim().length > 0 &&
    !cardHolderError &&
    !cardNumberError &&
    !expiryDateError &&
    !cvcError;

  const rotateY = useSharedValue(0);

  const animatedFrontStyle = useAnimatedStyle(() => ({
    transform: [{ perspective: 1000 }, { rotateY: `${rotateY.value}deg` }],
    backfaceVisibility: 'hidden',
  }));

  const animatedBackStyle = useAnimatedStyle(() => ({
    transform: [{ perspective: 1000 }, { rotateY: `${rotateY.value + 180}deg` }],
    backfaceVisibility: 'hidden',
    position: 'absolute',
    top: 0,
  }));

  useEffect(() => {
    const result = valid.number(cardNumber);
    setCardType(result.card ? result.card.type : null);
    setCardNumberError(!result.isPotentiallyValid || !result.isValid ? 'Invalid card number' : '');
  }, [cardNumber]);

  useEffect(() => {
    const result = valid.expirationDate(expiryDate);
    setExpiryDateError(!result.isPotentiallyValid || !result.isValid ? 'Invalid expiry date' : '');
  }, [expiryDate]);

  useEffect(() => {
    const result = valid.cvv(cvc);
    setCvcError(!result.isPotentiallyValid || !result.isValid ? 'Invalid CVC' : '');
  }, [cvc]);

  useEffect(() => {
    const isValid = /^[A-Za-zÇĞİÖŞÜçğıöşü]+(?: [A-Za-zÇĞİÖŞÜçğıöşü]+)+$/.test(cardHolder.trim());
    setCardHolderError(cardHolder && !isValid ? 'Enter full name (first and last)' : '');
  }, [cardHolder]);

  const handleCVCFocus = () => rotateY.value = withTiming(180, { duration: 800 });
  const handleCVCBlur = () => rotateY.value = withTiming(0, { duration: 800 });

  const formatCardNumber = value =>
    value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim();

  const handleCardNumberChange = value =>
    setCardNumber(formatCardNumber(value));

  const handleExpiryChange = text => {
    const cleaned = text.replace(/\D/g, '');
    const formatted = cleaned.length > 2
      ? `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`
      : cleaned;
    setExpiryDate(formatted);
  };

  const getCardIcon = (type) => {
    switch (type) {
      case 'visa':
        return require('../../assets/paymentIcons/visa.png');
      case 'mastercard':
        return require('../../assets/paymentIcons/mastercard.png');
      case 'american-express':
        return require('../../assets/paymentIcons/amex.png');
      case 'discover':
        return require('../../assets/paymentIcons/visa.png');
      default:
        return require('../../assets/paymentIcons/default.png');
    }
  };

  const handleSubmit = () => {
    const newCard = {
      id: `card-${Date.now()}`,
      name: `**** **** **** ${cardNumber.replace(/\s/g, '').slice(-4)}`,
      icon: getCardIcon(cardType),
    };
    navigation.navigate('CardPayment', { plan, newCard });
  };

  const dynamicStyles = {
    safe: { backgroundColor: theme.addNewCardBackground },
    cardFace: { backgroundColor: theme.addNewCardFrontBackground },
    cardBack: { backgroundColor: theme.addNewCardBackBackground },
    cardNumber: { color: theme.addNewCardTextPrimary },
    cardInfoLabel: { color: theme.addNewCardTextSecondary },
    cardInfoText: { color: theme.addNewCardTextPrimary },
    input: {
      backgroundColor: theme.addNewCardInputBackground,
      color: theme.addNewCardInputText,
      borderColor: theme.addNewCardInputBorderDefault,
    },
    inputError: {
      borderColor: theme.addNewCardInputBorderError,
    },
    error: { color: theme.addNewCardErrorText },
    label: { color: theme.addNewCardInputLabel },
    checkboxLabel: { color: theme.addNewCardCheckboxLabel },
    enrollButton: { backgroundColor: theme.addNewCardEnrollButtonBackground },
    enrollButtonText: { color: theme.addNewCardEnrollButtonText },
  };

  return (
    <SafeAreaView style={[styles.safe, dynamicStyles.safe]}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.wrapper}>
        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <SettingsHeader title="Add Payment Method" />


          <View style={styles.cardContainer}>
            <Animated.View style={[styles.cardFace, animatedFrontStyle, dynamicStyles.cardFace]}>
              <BlurView intensity={60} tint="dark" style={StyleSheet.absoluteFill} />
              <View style={styles.cardRow}>
                <Text style={[styles.cardNumber, dynamicStyles.cardNumber]}>{cardNumber || 'XXXX XXXX XXXX 5222'}</Text>
                <Image source={getCardIcon(cardType)} style={styles.cardIcon} resizeMode="contain" />
              </View>
              <View style={styles.cardInfoRow}>
                <View>
                  <Text style={[styles.cardInfoLabel, dynamicStyles.cardInfoLabel]}>Cardholder</Text>
                  <Text style={[styles.cardInfoText, dynamicStyles.cardInfoText]}>{cardHolder || 'John Doe'}</Text>
                </View>
                <View>
                  <Text style={[styles.cardInfoLabel, dynamicStyles.cardInfoLabel]}>Valid thru</Text>
                  <Text style={[styles.cardInfoText, dynamicStyles.cardInfoText]}>{expiryDate || '12/2025'}</Text>
                </View>
              </View>
            </Animated.View>

            <Animated.View style={[styles.cardFace, styles.cardBack, animatedBackStyle, dynamicStyles.cardBack]}>
              <View style={{ height: 40 * scale, backgroundColor: theme.addNewCardMagneticStripe, marginBottom: 20 * scale }} />
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={{ color: theme.addNewCardCvcLabelText, fontSize: 12 * scale }}>CVC</Text>
                <View style={{
                  backgroundColor: theme.addNewCardCvcBoxBackground,
                  padding: 6 * scale,
                  borderRadius: 6 * scale,
                  marginTop: 4 * scale,
                  width: 60 * scale,
                  alignItems: 'center',
                }}>
                  <Text style={{ fontSize: 14 * scale, fontWeight: 'bold' }}>{cvc || '•••'}</Text>
                </View>
              </View>
            </Animated.View>
          </View>

          {/* Inputs ve Form */}
          <Text style={[styles.label, dynamicStyles.label]}>Card Holder</Text>
          <TextInput
            style={[styles.input, dynamicStyles.input, !!cardHolderError && dynamicStyles.inputError]}
            value={cardHolder}
            onChangeText={setCardHolder}
            placeholder="John Doe"
          />
          {!!cardHolderError && <Text style={[styles.error, dynamicStyles.error]}>{cardHolderError}</Text>}

          <Text style={[styles.label, dynamicStyles.label]}>Card Number</Text>
          <TextInput
            style={[styles.input, dynamicStyles.input, !!cardNumberError && dynamicStyles.inputError]}
            value={cardNumber}
            onChangeText={handleCardNumberChange}
            placeholder="4125 2253 5156 5222"
            keyboardType="numeric"
          />
          {!!cardNumberError && <Text style={[styles.error, dynamicStyles.error]}>{cardNumberError}</Text>}

          <View style={styles.row}>
            <View style={{ flex: 1, marginRight: 10 * scale }}>
              <Text style={[styles.label, dynamicStyles.label]}>MM / YY</Text>
              <TextInput
                style={[styles.input, dynamicStyles.input, !!expiryDateError && dynamicStyles.inputError]}
                value={expiryDate}
                onChangeText={handleExpiryChange}
                placeholder="12/25"
                keyboardType="numeric"
              />
              {!!expiryDateError && <Text style={[styles.error, dynamicStyles.error]}>{expiryDateError}</Text>}
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.label, dynamicStyles.label]}>CVC</Text>
              <TextInput
                style={[styles.input, dynamicStyles.input, !!cvcError && dynamicStyles.inputError]}
                value={cvc}
                onChangeText={setCvc}
                placeholder="123"
                keyboardType="numeric"
                onFocus={handleCVCFocus}
                onBlur={handleCVCBlur}
              />
              {!!cvcError && <Text style={[styles.error, dynamicStyles.error]}>{cvcError}</Text>}
            </View>
          </View>

          {/* Checkbox + Buton */}
          <View style={styles.checkboxRow}>
            <Checkbox
              value={saveCard}
              onValueChange={setSaveCard}
              color={saveCard ? theme.addNewCardCheckboxSelected : theme.addNewCardCheckboxUnselected}
              style={styles.checkbox}
            />
            <Text style={[styles.checkboxLabel, dynamicStyles.checkboxLabel]}>Save Card</Text>
          </View>

          <TouchableOpacity
            style={[styles.enrollButton, dynamicStyles.enrollButton, !isFormValid && { opacity: 0.5 }]}
            onPress={handleSubmit}
            disabled={!isFormValid}
          >
            <Text style={[styles.enrollButtonText, dynamicStyles.enrollButtonText]}>Enroll Now</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  wrapper: { flex: 1 },
  container: { padding: 20 * scale, flexGrow: 1 },
  cardContainer: {
    width: width - 40 * scale,
    aspectRatio: 1.586,
    borderRadius: 16 * scale,
    position: 'relative',
    marginBottom: 30 * scale,
  },
  cardFace: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 16 * scale,
    padding: 20 * scale,
    overflow: 'hidden',
    justifyContent: 'space-between',
  },
  cardBack: {},
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardNumber: { fontSize: 16 * scale, letterSpacing: 1.4 },
  cardIcon: { width: 50 * scale, height: 40 * scale },
  cardInfoRow: { flexDirection: 'row', justifyContent: 'space-between' },
  cardInfoLabel: { fontSize: 12 * scale },
  cardInfoText: { fontSize: 13 * scale, fontWeight: '600', marginTop: 2 * scale },
  label: { fontSize: 13 * scale, marginBottom: 6 * scale },
  input: {
    paddingVertical: 12 * scale,
    paddingHorizontal: 14 * scale,
    borderRadius: 12 * scale,
    fontSize: 15 * scale,
    marginBottom: 8 * scale,
    borderWidth: 1,
  },
  inputError: {},
  error: { fontSize: 12 * scale, marginBottom: 10 * scale },
  row: { flexDirection: 'row' },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30 * scale,
    marginTop: 8 * scale,
  },
  checkbox: {
    width: 20 * scale,
    height: 20 * scale,
    marginRight: 10 * scale,
  },
  checkboxLabel: { fontSize: 14 * scale },
  enrollButton: {
    borderRadius: 30 * scale,
    paddingVertical: 14 * scale,
    alignItems: 'center',
  },
  enrollButtonText: {
    fontSize: 16 * scale,
    fontWeight: '600',
  },
});
