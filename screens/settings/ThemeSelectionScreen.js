import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Platform,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../src/context/ThemeContext';
import SettingsHeader from '../../components/headers/SettingsHeader';
import { useTranslation } from 'react-i18next';

const { width } = Dimensions.get('window');
const scale = width / 375;

export default function ThemeSelectionScreen() {
  const navigation = useNavigation();
  const { setTheme, themeId } = useTheme();
  const { t } = useTranslation();

  const [selectedId, setSelectedId] = useState(themeId);
  const [shouldNavigateBack, setShouldNavigateBack] = useState(false);

  const themeMap = {
    dark: {
      background: '#1c0f1d',
      card: '#3a2a3c',
      text: '#ffffff',
    },
    light: {
      background: '#f4f4f4',
      card: '#ffffff',
      text: '#111111',
    },
    sunset: {
      background: '#FFF0F6',
      card: '#ba6b6c',
      text: '#fff8f0',
    },
    forest: {
      background: '#E6F7FF',
      card: '#2e5339',
      text: '#d8f3dc',
    },
  };

  const themeOptions = [
    { id: 'dark', name: t('theme.dark') },
    { id: 'light', name: t('theme.light') },
    { id: 'sunset', name: t('theme.sunset') },
    { id: 'forest', name: t('theme.forest') },
  ];

  const handleSelect = async (id) => {
    setSelectedId(id);
    setShouldNavigateBack(true);
    await setTheme(id);
  };

  // Tema değiştiğinde geri dön
  useEffect(() => {
    if (shouldNavigateBack && themeId === selectedId) {
      navigation.goBack();
    }
  }, [themeId, selectedId, shouldNavigateBack]);

  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        { backgroundColor: themeMap[selectedId]?.background },
      ]}
    >
      <View style={styles.themeList}>
        <SettingsHeader title={t('theme.title')} />
        {themeOptions.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.card,
              { backgroundColor: themeMap[item.id].card },
            ]}
            onPress={() => handleSelect(item.id)}
          >
            <Text
              style={[
                styles.cardText,
                { color: themeMap[item.id].text },
              ]}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
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
  themeList: {
    paddingHorizontal: 20 * scale,
    marginTop: 5 * scale,
  },
  card: {
    paddingVertical: 18 * scale,
    paddingHorizontal: 24 * scale,
    borderRadius: 14 * scale,
    marginBottom: 16 * scale,
  },
  cardText: {
    fontSize: 16 * scale,
    fontWeight: 'bold',
  },
});
