import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import HeaderWithProgress from '../../components/headers/HeaderWithProgress';
import PageTitle from '../../components/ui/PageTitle';
import NextButton from '../../components/ui/NextButton';
import { useTheme } from '../../src/context/ThemeContext';

const { width } = Dimensions.get('window');
const scale = width / 375;

export default function GenderSelectionScreen({ navigation }) {
  const route = useRoute();
  const { t } = useTranslation();
  const { theme } = useTheme();

  const {
    email,
    password,
    confirmPassword,
    name,
    birthDate,
    gender: routeGender,
    ...restParams
  } = route.params || {};

  const [selectedGender, setSelectedGender] = useState(routeGender || null);

  const genders = [
    t('gender.male'),
    t('gender.female'),
    t('gender.no_answer')
  ];

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={[styles.container, { backgroundColor: theme.containerBackground }]}>
        <HeaderWithProgress navigation={navigation} currentStep={7} />
        <PageTitle>{t('gender.title')}</PageTitle>

        <View style={styles.buttonGroup}>
          {genders.map((gender, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.genderButton,
                { backgroundColor: selectedGender === gender ? theme.accent : theme.surfaceSecondary },
              ]}
              onPress={() => setSelectedGender(gender)}
            >
              <Text style={[styles.genderText, { color: theme.text }]}>{gender}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <NextButton
          label={t('common.next')}
          onPress={() =>
            navigation.navigate('LanguageSelection', {
              ...restParams,
              email,
              password,
              confirmPassword,
              name,
              birthDate,
              gender: selectedGender,
            })
          }
          disabled={!selectedGender}
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
  buttonGroup: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 140 * scale,
  },
  genderButton: {
    paddingVertical: 16 * scale,
    paddingHorizontal: 20 * scale,
    borderRadius: 12 * scale,
    width: '95%',
    maxWidth: 400 * scale,
    marginBottom: 20 * scale,
  },
  genderText: {
    fontWeight: 'bold',
    fontSize: 16 * scale,
    textAlign: 'center',
  },
});
