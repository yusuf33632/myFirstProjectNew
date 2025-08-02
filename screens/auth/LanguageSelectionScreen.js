import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import HeaderWithProgress from '../../components/headers/HeaderWithProgress';
import PageTitle from '../../components/ui/PageTitle';
import NextButton from '../../components/ui/NextButton';
import { useTheme } from '../../src/context/ThemeContext';

const { width } = Dimensions.get('window');
const scale = width / 375;

export default function LanguageSelectionScreen({ navigation }) {
  const { t } = useTranslation();
  const route = useRoute();
  const { theme } = useTheme();

  const {
    email,
    password,
    confirmPassword,
    name,
    birthDate,
    gender,
    languages: routeLanguages,
    ...restParams
  } = route.params || {};

  const [selectedLanguages, setSelectedLanguages] = useState(routeLanguages || []);
  const languageOptions = t('languages.options', { returnObjects: true });

  const toggleLanguage = (lang) => {
    if (selectedLanguages.includes(lang)) {
      setSelectedLanguages(selectedLanguages.filter((l) => l !== lang));
    } else {
      setSelectedLanguages([...selectedLanguages, lang]);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={[styles.container, { backgroundColor: theme.containerBackground }]}>
        <HeaderWithProgress navigation={navigation} currentStep={6} />

        <ScrollView contentContainerStyle={styles.scrollContent}>
          <PageTitle>{t('languages.title')}</PageTitle>

          <View style={styles.languageWrapper}>
            {languageOptions.map((lang, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.languageButton,
                  { backgroundColor: selectedLanguages.includes(lang) ? theme.accent : theme.surfaceSecondary },
                ]}
                onPress={() => toggleLanguage(lang)}
              >
                <Text style={[styles.languageText, { color: theme.text }]}>{lang}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        <NextButton
          label={t('common.next')}
          onPress={() =>
            navigation.navigate('RelationshipPreference', {
              ...restParams,
              email,
              password,
              confirmPassword,
              name,
              birthDate,
              gender,
              languages: selectedLanguages,
            })
          }
          disabled={selectedLanguages.length === 0}
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
  languageWrapper: {
    alignItems: 'center',
  },
  languageButton: {
    paddingVertical: 16 * scale,
    paddingHorizontal: 20 * scale,
    borderRadius: 12 * scale,
    width: '100%',
    maxWidth: 400 * scale,
    marginBottom: 20 * scale,
  },
  languageText: {
    fontWeight: 'bold',
    fontSize: 16 * scale,
    textAlign: 'center',
  },
});
