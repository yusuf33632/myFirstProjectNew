import React, { useEffect } from 'react';
import { StatusBar, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AuthNavigator from './src/navigation/AuthNavigator';
import { RootSiblingParent } from 'react-native-root-siblings';
import { ThemeProvider, useTheme } from './src/context/ThemeContext';
import { UnreadProvider } from './src/context/UnreadContext';
import 'react-native-reanimated';

// 🌐 i18n initialization
import './src/i18n/i18n';
import { loadLanguage } from './src/i18n/i18n';

// ✅ SafeAreaProvider eklendi
import { SafeAreaProvider } from 'react-native-safe-area-context';

function AppContent() {
  const { theme } = useTheme();

  return (
    <>
      <StatusBar
        translucent={Platform.OS === 'android'} // Android'de tam ekran görünüm için
        backgroundColor="transparent"           // Tema rengi ile SafeArea'da doldurulur
        barStyle={
          ['light', 'sunset', 'forest'].includes(theme.mode)
            ? 'dark-content'
            : 'light-content'
        }
      />

      <NavigationContainer>
        <AuthNavigator />
      </NavigationContainer>
    </>
  );
}

export default function App() {
  useEffect(() => {
    loadLanguage();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <RootSiblingParent>
        <ThemeProvider>
          <UnreadProvider>
            {/* ✅ SafeAreaProvider burada kök seviyede */}
            <SafeAreaProvider>
              <AppContent />
            </SafeAreaProvider>
          </UnreadProvider>
        </ThemeProvider>
      </RootSiblingParent>
    </GestureHandlerRootView>
  );
}
