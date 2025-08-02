import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Dimensions,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import SettingsHeader from '../../components/headers/SettingsHeader';
import { useTheme } from '../../src/context/ThemeContext';

const { width } = Dimensions.get('window');
const scale = width / 375;

export default function LanguageSettingsScreen() {
  const navigation = useNavigation();
  const { t, i18n } = useTranslation();
  const [selected, setSelected] = useState(i18n.language);
  const { theme } = useTheme();

  const languages = [
    { code: 'ar', label: t('language.ar') },
    { code: 'de', label: t('language.de') },
    { code: 'el', label: t('language.el') },
    { code: 'en', label: t('language.en') },
    { code: 'es', label: t('language.es') },
    { code: 'fa', label: t('language.fa') },
    { code: 'fr', label: t('language.fr') },
    { code: 'hi', label: t('language.hi') },
    { code: 'id', label: t('language.id') },
    { code: 'it', label: t('language.it') },
    { code: 'ja', label: t('language.ja') },
    { code: 'ko', label: t('language.ko') },
    { code: 'ptBR', label: t('language.ptBR') },
    { code: 'pt', label: t('language.pt') },
    { code: 'ru', label: t('language.ru') },
    { code: 'tr', label: t('language.tr') },
    { code: 'uk', label: t('language.uk') },
    { code: 'ur', label: t('language.ur') },
    { code: 'zh', label: t('language.zh') },
  ];

  const changeLanguage = async (code) => {
    setSelected(code);
    await i18n.changeLanguage(code);
  };

  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        { backgroundColor: theme.containerBackground },
      ]}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <SettingsHeader title={t('settings.language_title')} />

        {languages.map((lang) => (
          <TouchableOpacity
            key={lang.code}
            style={[
              styles.option,
              { borderBottomColor: theme.surfacePrimary },
              selected === lang.code && {
                backgroundColor: theme.languageSelectedBackground,
                borderRadius: 12 * scale,
                paddingHorizontal: 12 * scale,
              },
            ]}
            onPress={() => changeLanguage(lang.code)}
          >
            <Text style={[styles.optionText, { color: theme.text }]}>
              {lang.label}
            </Text>
            {selected === lang.code && (
              <Icon
                name="check"
                size={14 * scale}
                color={theme.languageSelectedCheckColor}
              />
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    paddingHorizontal: 20 * scale,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 18 * scale,
    borderBottomWidth: 0.6,
  },
  optionText: {
    fontSize: 15 * scale,
  },
  scrollContent: {
    paddingHorizontal: 20 * scale,
    paddingBottom: 30 * scale,
  },
});
