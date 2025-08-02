import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Platform,
  StatusBar,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../src/context/ThemeContext';
import SettingsHeader from '../../components/headers/SettingsHeader';

const { width } = Dimensions.get('window');
const scale = width / 375;

export default function AboutAppScreen() {
  const { t } = useTranslation();
  const { theme } = useTheme();

  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        { backgroundColor: theme.aboutScreenBackground },
      ]}
    >
      <View style={styles.content}>
        <SettingsHeader title={t('about.title')} />

        <Text style={[styles.appName, { color: theme.aboutAppNameText }]}>
          Curvia AI
        </Text>
        <Text style={[styles.version, { color: theme.aboutAppVersionText }]}>
          v1.0.0
        </Text>
        <Text style={[styles.description, { color: theme.aboutAppDescriptionText }]}>
          {t('about.description')}
        </Text>

        <Text style={[styles.infoLabel, { color: theme.aboutInfoLabelText }]}>
          {t('about.developer')}
        </Text>
        <Text style={[styles.infoText, { color: theme.aboutInfoValueText }]}>
          PalmTechSoft Ltd. Şti.
        </Text>

        <Text style={[styles.infoLabel, { color: theme.aboutInfoLabelText }]}>
          {t('about.contact')}
        </Text>
        <Text style={[styles.infoText, { color: theme.aboutInfoValueText }]}>
          PalmTechSoft@gmail.com
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    paddingHorizontal: 20 * scale,
  },
  content: {
    marginTop: 5 * scale,
    paddingHorizontal: 16 * scale,
  },
  appName: {
    fontSize: 24 * scale,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8 * scale,
  },
  version: {
    fontSize: 14 * scale,
    textAlign: 'center',
    marginBottom: 24 * scale,
  },
  description: {
    fontSize: 14 * scale,
    lineHeight: 22 * scale,
    textAlign: 'center',
    marginBottom: 30 * scale,
  },
  infoLabel: {
    fontSize: 13 * scale,
    marginTop: 10 * scale,
    marginBottom: 4 * scale,
  },
  infoText: {
    fontSize: 14 * scale,
    marginBottom: 12 * scale,
  },
});
