import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRoute } from '@react-navigation/native';
import HeaderWithProgress from '../../components/headers/HeaderWithProgress';
import PageTitle from '../../components/ui/PageTitle';
import NextButton from '../../components/ui/NextButton';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../src/context/ThemeContext';

const { width } = Dimensions.get('window');
const scale = width / 375;
const PADDING_HORIZONTAL = 20 * scale;
const HEADER_TOP_NUDGE = 8 * scale; // küçük aşağı kaydırma

const getDateFromString = (dateStr) => {
  const [day, month, year] = dateStr.split('/').map(Number);
  return new Date(year, month - 1, day);
};

export default function BirthdayScreen({ navigation }) {
  const route = useRoute();
  const { t } = useTranslation();
  const { theme } = useTheme();

  const {
    email,
    password,
    confirmPassword,
    name,
    birthDate: routeBirthDate,
    ...restParams
  } = route.params || {};

  const [birthDate, setBirthDate] = useState(
    routeBirthDate ? new Date(getDateFromString(routeBirthDate)) : new Date()
  );
  const [showPicker, setShowPicker] = useState(false);
  const [selectedDateText, setSelectedDateText] = useState(routeBirthDate || '');

  useEffect(() => {
    if (routeBirthDate) {
      setSelectedDateText(routeBirthDate);
    }
  }, [routeBirthDate]);

  const onChange = (event, selectedDate) => {
    if (event.type === 'set') {
      const currentDate = selectedDate || birthDate;

      const today = new Date();
      const age = today.getFullYear() - currentDate.getFullYear();
      const monthDiff = today.getMonth() - currentDate.getMonth();
      const dayDiff = today.getDate() - currentDate.getDate();
      const isUnder18 =
        age < 18 || (age === 18 && (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)));

      if (isUnder18) {
        Alert.alert(
          t('birthday.underage_title') || 'Yaş sınırı',
          t('birthday.underage_message') ||
          'Bu uygulamayı kullanmak için en az 18 yaşında olmalısınız.'
        );
        if (Platform.OS === 'android') setShowPicker(false);
        return;
      }

      setBirthDate(currentDate);

      const formattedDate = `${String(currentDate.getDate()).padStart(2, '0')}/${String(
        currentDate.getMonth() + 1
      ).padStart(2, '0')}/${currentDate.getFullYear()}`;
      setSelectedDateText(formattedDate);

      if (Platform.OS === 'android') {
        setShowPicker(false);
      }
    } else {
      setShowPicker(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => setShowPicker(false)} accessible={false}>
      <SafeAreaView style={[styles.container, { backgroundColor: theme.containerBackground }]}>
        {/* Header: yatay padding'i iptal + çok az aşağı kaydır */}
        <View
          style={[
            { marginHorizontal: -PADDING_HORIZONTAL },
            Platform.OS === 'android' ? { marginTop: HEADER_TOP_NUDGE } : null
          ]}
        >
          <HeaderWithProgress navigation={navigation} currentStep={8} />
        </View>
        <PageTitle>{t('birthday.title')}</PageTitle>

        <View style={styles.inputWrapper}>
          <TouchableOpacity
            style={[styles.input, { backgroundColor: theme.surfaceSecondary }]}
            onPress={() => setShowPicker(true)}
            activeOpacity={0.8}
          >
            <Text style={[styles.dateText, { color: theme.text }]}>
              {selectedDateText || t('birthday.placeholder')}
            </Text>
          </TouchableOpacity>

          {showPicker && (
            <DateTimePicker
              value={birthDate}
              mode="date"
              display="spinner"
              textColor={theme.text}
              onChange={onChange}
              maximumDate={new Date()}
            />
          )}
        </View>

        <NextButton
          label={t('common.next')}
          onPress={() =>
            navigation.navigate('GenderSelection', {
              ...restParams,
              email,
              password,
              confirmPassword,
              name,
              birthDate: selectedDateText,
            })
          }
          disabled={selectedDateText === ''}
        />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20 * scale,
    paddingTop: 30 * scale,
  },
  inputWrapper: {
    flex: 1,
    justifyContent: 'center',
    paddingBottom: 140 * scale,
    alignItems: 'center',
    paddingHorizontal: 10 * scale,
  },
  input: {
    width: '100%',
    maxWidth: 400 * scale,
    borderRadius: 12 * scale,
    paddingVertical: 20 * scale,
    paddingHorizontal: 16 * scale,
  },
  dateText: {
    fontSize: 16 * scale,
    fontWeight: 'bold',
  },
});
