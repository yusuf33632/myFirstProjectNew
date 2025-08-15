import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../src/context/ThemeContext';
import SettingsHeader from '../../components/headers/SettingsHeader';

const { width } = Dimensions.get('window');
const scale = width / 375;

export default function SettingsScreen() {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { theme } = useTheme();

  const Section = ({ title, items }) => (
    <View style={[styles.section, { backgroundColor: theme.settingsSectionBackground }]}>
      <Text style={[styles.sectionTitle, { color: theme.settingsItemText }]}>{title}</Text>
      {items.map((item) => (
        <TouchableOpacity
          key={item.label}
          style={[styles.item, { backgroundColor: theme.surfacePrimary }]}
          onPress={() => navigation.navigate(item.screen)}
        >
          <View style={styles.itemLeft}>
            <Icon
              name={item.icon}
              size={16 * scale}
              color={theme.settingsItemIcon}
              style={{ width: 20 * scale }}
            />
            <Text style={[styles.itemLabel, { color: theme.settingsItemText }]}>{item.label}</Text>
          </View>
          <Icon name="chevron-forward-outline" size={14 * scale} color={theme.settingsChevronIcon} />
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.containerBackground }]}>
      <View style={styles.container}>
        <SettingsHeader title={t('settings.title')} />

        <Section
          title={t('settings.accountSettings')}
          items={[
            {
              label: t('settings.dataPrivacy'),
              icon: 'shield-checkmark-outline',
              screen: 'PrivacyPolicy',
            },
          ]}
        />

        <Section
          title={t('settings.appSettings')}
          items={[
            
            {
              label: t('settings.appearance'),
              icon: 'color-palette-outline',
              screen: 'ThemeSelection',
            },
            {
              label: t('settings.language'),
              icon: 'globe-outline',
              screen: 'LanguageSettings',
            },
          ]}
        />

        <Section
          title={t('settings.support')}
          items={[
            {
              label: t('settings.supportItem'),
              icon: 'help-circle-outline',
              screen: 'Support',
            },
            {
              label: t('settings.reportIssue'),
              icon: 'bug-outline',
              screen: 'ReportIssue',
            },
            {
              label: t('settings.aboutApp'),
              icon: 'information-circle-outline',
              screen: 'AboutApp',
            },
          ]}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 60 * scale : 40 * scale,
  },
  container: {
    flex: 1,
    padding: 16 * scale,
  },
  section: {
    borderRadius: 8 * scale,
    paddingVertical: 12 * scale,
    marginBottom: 24 * scale,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 14 * scale,
    paddingHorizontal: 16 * scale,
    marginBottom: 10 * scale,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10 * scale,
    paddingHorizontal: 16 * scale,
    marginHorizontal: 12 * scale,
    borderRadius: 12 * scale,
    marginBottom: 10 * scale,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12 * scale,
  },
  itemLabel: {
    fontSize: 15 * scale,
    fontWeight: '500',
  },
});
