import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AuthNavigator from './src/navigation/AuthNavigator';
import { RootSiblingParent } from 'react-native-root-siblings';
import { ThemeProvider, useTheme } from './src/context/ThemeContext';
import { UnreadProvider } from './src/context/UnreadContext';
import 'react-native-reanimated';

// 🌐 i18n çeviri sistemini başlat
import './src/i18n/i18n';
import { loadLanguage } from './src/i18n/i18n';

function AppContent() {
  const { theme } = useTheme();

  return (
    <>
      <StatusBar
        barStyle={['light', 'sunset', 'forest'].includes(theme.mode) ? 'dark-content' : 'light-content'}
        backgroundColor={theme.containerBackground}
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
            <AppContent />
          </UnreadProvider>
        </ThemeProvider>
      </RootSiblingParent>
    </GestureHandlerRootView>
  );
}