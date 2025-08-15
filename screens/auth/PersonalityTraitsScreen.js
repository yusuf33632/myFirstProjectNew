import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  ScrollView,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
  StatusBar,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import HeaderWithProgress from '../../components/headers/HeaderWithProgress';
import PageTitle from '../../components/ui/PageTitle';
import NextButton from '../../components/ui/NextButton';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../src/context/ThemeContext';

const { width } = Dimensions.get('window');
const scale = width / 375;

export default function PersonalityTraitsScreen({ navigation }) {
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
    partnerAgeRange,
    characterTypes,
    personalityTraits: routeSelected = [],
    ...restParams
  } = route.params;

  const [selectedOptions, setSelectedOptions] = useState(routeSelected);
  const personalityOptions = t('personalityTraits.options', { returnObjects: true });

  const toggleOption = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter(item => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={[styles.container, { backgroundColor: theme.containerBackground }]}>
        {/* Android’te status bar çakışmasını engelle */}
        <View style={Platform.OS === 'android' ? { marginTop: StatusBar.currentHeight || 0 } : null}>
          <HeaderWithProgress navigation={navigation} currentStep={2} />
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <PageTitle>{t('personalityTraits.title')}</PageTitle>

          <View style={styles.optionsWrapper}>
            {personalityOptions.map((trait, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.optionButton,
                  { backgroundColor: theme.surfaceSecondary },
                  selectedOptions.includes(trait) && { backgroundColor: theme.accent },
                ]}
                onPress={() => toggleOption(trait)}
              >
                <Text style={[styles.optionText, { color: theme.text }]}>{trait}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        <NextButton
          label={t('common.next')}
          onPress={() =>
            navigation.navigate('ProfilePhoto', {
              ...restParams,
              email,
              password,
              confirmPassword,
              name,
              birthDate,
              gender,
              languages,
              relationshipPreference,
              partnerAgeRange,
              characterTypes,
              personalityTraits: selectedOptions,
            })
          }
          disabled={selectedOptions.length === 0}
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
    paddingHorizontal: 10 * scale,
  },
  optionButton: {
    width: '100%',
    maxWidth: 400 * scale,
    borderRadius: 12 * scale,
    paddingVertical: 16 * scale,
    paddingHorizontal: 20 * scale,
    marginBottom: 20 * scale,
  },
  optionText: {
    fontWeight: 'bold',
    fontSize: 16 * scale,
    textAlign: 'center',
  },
});
