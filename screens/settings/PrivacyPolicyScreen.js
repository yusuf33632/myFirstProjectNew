import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Platform,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SettingsHeader from '../../components/headers/SettingsHeader';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../src/context/ThemeContext';

const { width } = Dimensions.get('window');
const scale = width / 375;

export default function PrivacyPolicyScreen() {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { theme } = useTheme();

  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        { backgroundColor: theme.privacyBackground, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
      ]}
    >
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <SettingsHeader title={t('privacy.title')} />

        <Text style={[styles.text, { color: theme.privacyBodyText }]}>
          {t('privacy.intro')}
        </Text>

        <Text style={[styles.subtitle, { color: theme.privacySubtitleText }]}>
          {t('privacy.collectedTitle')}
        </Text>
        <Text style={[styles.text, { color: theme.privacyBodyText }]}>
          {t('privacy.collected')}
        </Text>

        <Text style={[styles.subtitle, { color: theme.privacySubtitleText }]}>
          {t('privacy.usageTitle')}
        </Text>
        <Text style={[styles.text, { color: theme.privacyBodyText }]}>
          {t('privacy.usage')}
        </Text>

        <Text style={[styles.subtitle, { color: theme.privacySubtitleText }]}>
          {t('privacy.sharingTitle')}
        </Text>
        <Text style={[styles.text, { color: theme.privacyBodyText }]}>
          {t('privacy.sharing')}
        </Text>

        <Text style={[styles.subtitle, { color: theme.privacySubtitleText }]}>
          {t('privacy.rightsTitle')}
        </Text>
        <Text style={[styles.text, { color: theme.privacyBodyText }]}>
          {t('privacy.rights')}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 20 * scale,
    paddingBottom: 40 * scale,
    paddingTop: 5 * scale,
  },
  subtitle: {
    fontSize: 16 * scale,
    fontWeight: 'bold',
    marginTop: 24 * scale,
    marginBottom: 8 * scale,
  },
  text: {
    fontSize: 14 * scale,
    lineHeight: 20 * scale,
    marginBottom: 4 * scale,
  },
});
