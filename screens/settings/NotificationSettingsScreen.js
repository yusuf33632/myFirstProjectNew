import React, { useState } from 'react';
import {
  View,
  Text,
  Switch,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SettingsHeader from '../../components/headers/SettingsHeader';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../src/context/ThemeContext';

const { width } = Dimensions.get('window');
const scale = width / 375;

// 🔧 Sunucudaki API endpoint
const API_ENDPOINT = 'https://your-backend.com/api/notification-settings';

export default function NotificationSettingsScreen() {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { theme } = useTheme();

  const [message, setMessage] = useState(true);
  const [likes, setLikes] = useState(true);
  const [events, setEvents] = useState(false);
  const [nightSilent, setNightSilent] = useState(false);
  const [importantOnly, setImportantOnly] = useState(false);

  const updateSetting = async (key, value) => {
    try {
      await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ setting: key, value }),
      });
    } catch (error) {
      console.error(`Ayar güncellenemedi (${key}):`, error);
    }
  };

  const options = [
    { key: 'message', value: message, setter: setMessage, label: t('notificationSettings.message') },
    { key: 'likes', value: likes, setter: setLikes, label: t('notificationSettings.likes') },
    { key: 'events', value: events, setter: setEvents, label: t('notificationSettings.events') },
    { key: 'nightSilent', value: nightSilent, setter: setNightSilent, label: t('notificationSettings.nightSilent') },
    { key: 'importantOnly', value: importantOnly, setter: setImportantOnly, label: t('notificationSettings.importantOnly') },
  ];

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.containerBackground }]}>
      <View style={styles.content}>
        <SettingsHeader title={t('notificationSettings.title')} />

        {options.map((item, index) => (
          <View
            key={index}
            style={[
              styles.option,
              {
                backgroundColor: theme.notificationCardBackground,
                shadowColor: theme.shadowColorDefault,
              },
            ]}
          >
            <Text style={[styles.optionLabel, { color: theme.text }]}>{item.label}</Text>
            <Switch
              value={item.value}
              onValueChange={(val) => {
                item.setter(val);
                updateSetting(item.key, val);
              }}
              trackColor={{
                false: theme.switchTrackInactive,
                true: theme.switchTrackActive,
              }}
              thumbColor={item.value ? theme.switchThumbActive : theme.switchThumbInactive}
            />
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  content: {
    paddingHorizontal: 20 * scale,
    marginTop: 5 * scale,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16 * scale,
    paddingHorizontal: 16 * scale,
    borderRadius: 12 * scale,
    marginBottom: 14 * scale,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  optionLabel: {
    fontSize: 15 * scale,
    fontWeight: '500',
  },
});
