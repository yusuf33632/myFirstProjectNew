import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import HeaderWithProgress from '../../components/headers/HeaderWithProgress';
import PageTitle from '../../components/ui/PageTitle';
import NextButton from '../../components/ui/NextButton';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../src/context/ThemeContext';

const { width } = Dimensions.get('window');
const scale = width / 375;

export default function PartnerAgeRangeScreen({ navigation }) {
  const route = useRoute();
  const { t } = useTranslation();
  const { theme } = useTheme();

  const {
    email,
    password,
    confirmPassword,
    name,
    birthDate,
    gender,
    languages,
    relationshipPreference,
    partnerAgeRange: routeRange,
    ...restParams
  } = route.params || {};

  const [selectedRange, setSelectedRange] = useState(routeRange || null);
  const ageRanges = t('partnerAgeRange.options', { returnObjects: true });

  const handleSelect = (range) => {
    setSelectedRange(range === selectedRange ? null : range);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={[styles.container, { backgroundColor: theme.containerBackground }]}>
        <HeaderWithProgress navigation={navigation} currentStep={4} />

        <ScrollView contentContainerStyle={styles.scrollContent}>
          <PageTitle>{t('partnerAgeRange.title')}</PageTitle>

          <View style={styles.optionsWrapper}>
            {ageRanges.map((range, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.optionButton,
                  {
                    backgroundColor:
                      selectedRange === range ? theme.accent : theme.surfaceSecondary,
                  },
                ]}
                onPress={() => handleSelect(range)}
              >
                <Text style={[styles.optionText, { color: theme.text }]}>{range}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        <NextButton
          label={t('common.next')}
          onPress={() =>
            navigation.navigate('CharacterType', {
              ...restParams,
              email,
              password,
              confirmPassword,
              name,
              birthDate,
              gender,
              languages,
              relationshipPreference,
              partnerAgeRange: selectedRange,
            })
          }
          disabled={!selectedRange}
        />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10 * scale,
  },
  scrollContent: {
    paddingHorizontal: 20 * scale,
    paddingBottom: 140 * scale,
  },
  optionsWrapper: {
    alignItems: 'center',
  },
  optionButton: {
    paddingVertical: 16 * scale,
    paddingHorizontal: 20 * scale,
    borderRadius: 12 * scale,
    width: '100%',
    maxWidth: 400 * scale,
    marginBottom: 20 * scale,
  },
  optionText: {
    fontWeight: 'bold',
    fontSize: 16 * scale,
    textAlign: 'center',
  },
});
