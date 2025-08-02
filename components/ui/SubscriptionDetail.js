import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../src/context/ThemeContext';
import {
  presentApplePay,
  presentGooglePay,
  useConfirmPayment,
} from '@stripe/stripe-react-native';

const { width } = Dimensions.get('window');
const scale = width / 375;

export default function SubscriptionDetail({ onCardPayPress }) {
  const [selectedDuration, setSelectedDuration] = useState(null);
  const { t } = useTranslation();
  const { theme } = useTheme();
  const { confirmPayment, loading } = useConfirmPayment();

  const durations = [
    { label: '12| Ay', price: '$4.90', note: t('subscription.per_month'), amount: 490 },
    { label: '3| Ay', price: '$4.90', note: t('subscription.per_month'), amount: 490 },
    { label: '1| Ay', price: '$4.90', note: t('subscription.per_month'), amount: 490 },
  ];

  const handleApplePay = async () => {
    if (selectedDuration === null) return;
    const item = durations[selectedDuration];

    const { error } = await presentApplePay({
      cartItems: [{ label: item.label, amount: item.price.replace('$', '') }],
      country: 'US',
      currency: 'USD',
    });
    if (error) console.warn('Apple Pay Error:', error);
  };

  const handleGooglePay = async () => {
    if (selectedDuration === null) return;
    const item = durations[selectedDuration];

    const { error } = await presentGooglePay({
      amount: item.amount,
      currencyCode: 'USD',
    });
    if (error) console.warn('Google Pay Error:', error);
  };

  const handlePayment = () => {
    if (Platform.OS === 'ios') {
      handleApplePay();
    } else {
      handleGooglePay();
    }
  };

  return (
    <View style={[styles.detailBox, { backgroundColor: theme.subscriptionDetailBoxBackground }]}>
      <View style={[styles.topLine, { backgroundColor: theme.subscriptionDetailDragBar }]} />

      {durations.map((opt, idx) => (
        <TouchableOpacity
          key={idx}
          style={[
            styles.optionBox,
            { backgroundColor: theme.subscriptionDetailOptionBox },
            selectedDuration === idx && {
              ...styles.optionBoxActive,
              borderColor: theme.subscriptionDetailOptionBoxActiveBorder,
            },
          ]}
          onPress={() => setSelectedDuration(idx)}
        >
          <Text style={[styles.labelText, { color: theme.subscriptionDetailLabelText }]}>
            {opt.label}
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={[styles.priceText, { color: theme.subscriptionDetailPriceText }]}>
              {opt.price}
            </Text>
            <Text
              style={[styles.noteText, { color: theme.subscriptionDetailNoteText, marginLeft: 4 * scale }]}
            >
              {'| ' + opt.note}
            </Text>
          </View>
        </TouchableOpacity>
      ))}

      {/* Google/Apple Pay */}
      <TouchableOpacity
        style={[styles.buyButtonApp, { backgroundColor: theme.subscriptionDetailBuyButtonBackground }]}
        onPress={handlePayment}
      >
        <Text style={[styles.buyButtonText, { color: theme.subscriptionDetailBuyButtonText }]}>
          {Platform.OS === 'ios'
            ? t('subscription.buy_with_apple')
            : t('subscription.buy_with_google')}
        </Text>
      </TouchableOpacity>

      {/* Kredi Kartı ile Öde başka component'e yönlendir */}
      <TouchableOpacity
        style={[styles.buyButton, { backgroundColor: theme.subscriptionDetailBuyButtonBackground }]}
        onPress={onCardPayPress}
      >
        <Text style={[styles.buyButtonText, { color: theme.subscriptionDetailBuyButtonText }]}>
          {t('subscription.buy_with_card')}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  detailBox: {
    borderTopLeftRadius: 24 * scale,
    borderTopRightRadius: 24 * scale,
    paddingTop: 20 * scale,
    paddingBottom: 20 * scale,
    paddingHorizontal: 24 * scale,
    alignItems: 'center',
  },
  topLine: {
    width: 40 * scale,
    height: 4 * scale,
    borderRadius: 2 * scale,
    marginBottom: 20 * scale,
  },
  optionBox: {
    borderRadius: 10 * scale,
    paddingVertical: 24 * scale,
    paddingHorizontal: 16 * scale,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12 * scale,
    width: '100%',
  },
  optionBoxActive: {
    borderWidth: 2 * scale,
  },
  labelText: {
    fontSize: 16 * scale,
    fontWeight: 'bold',
  },
  priceText: {
    fontSize: 20 * scale,
    fontWeight: 'bold',
  },
  noteText: {
    fontSize: 12 * scale,
    fontWeight: 'normal',
  },
  buyButtonApp: {
    paddingVertical: 12 * scale,
    borderRadius: 10 * scale,
    alignItems: 'center',
    width: '100%',
    marginTop: 20 * scale,
  },
  buyButton: {
    paddingVertical: 12 * scale,
    borderRadius: 10 * scale,
    alignItems: 'center',
    width: '100%',
    marginTop: 20 * scale,
    marginBottom: 20 * scale,
  },
  buyButtonText: {
    fontWeight: 'bold',
    fontSize: 14 * scale,
  },
});
