import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../src/context/ThemeContext';

const { width } = Dimensions.get('window');
const scale = width / 375;

export default function SubscriptionDetail({ onPay }) {
  const [selectedDuration, setSelectedDuration] = useState(null); // 0 | 1 | 2 | null
  const { t } = useTranslation();
  const { theme } = useTheme();

  // months alanı eklendi: 12, 3, 1
  const durations = [
    {
      label: '12| Ay',
      months: 12,
      price: '$4.90',
      note: t('subscription.per_month'),
      code: 'annual',
    },
    {
      label: '3| Ay',
      months: 3,
      price: '$6.90',
      note: t('subscription.per_month'),
      code: 'quarterly',
    },
    {
      label: '1| Ay',
      months: 1,
      price: '$8.90',
      note: t('subscription.per_month'),
      code: 'monthly',
    },
  ];

  const isDisabled = selectedDuration === null;

  const handleProceedToPayment = () => {
    if (isDisabled) return;
    const selectedPlan = durations[selectedDuration];
    if (typeof onPay === 'function') {
      // Checkout için months vb. tüm alanlar gönderiliyor
      onPay(selectedPlan);
    }
  };

  return (
    <View style={[styles.detailBox, { backgroundColor: theme.subscriptionDetailBoxBackground }]}>
      <View style={[styles.topLine, { backgroundColor: theme.subscriptionDetailDragBar }]} />

      {durations.map((opt, idx) => {
        const active = selectedDuration === idx;
        return (
          <TouchableOpacity
            key={idx}
            style={[
              styles.optionBox,
              { backgroundColor: theme.subscriptionDetailOptionBox },
              active && {
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
                style={[
                  styles.noteText,
                  { color: theme.subscriptionDetailNoteText, marginLeft: 4 * scale },
                ]}
              >
                {'| ' + opt.note}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}

      <TouchableOpacity
        disabled={isDisabled}
        onPress={handleProceedToPayment}
        style={[
          styles.buyButton,
          {
            backgroundColor: theme.subscriptionDetailBuyButtonBackground,
            opacity: isDisabled ? 0.6 : 1,
          },
        ]}
      >
        <Text style={[styles.buyButtonText, { color: theme.subscriptionDetailBuyButtonText }]}>
          {t('subscription.pay')}
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
