import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../src/context/ThemeContext';

const { width } = Dimensions.get('window');
const scale = width / 375;

export default function ProfileReadyScreen({ navigation }) {
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
    personalityTraits,
    profilePhoto,
  } = route.params;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.containerBackground }]}>
      <View style={[styles.contentBox, { backgroundColor: theme.surfaceSecondary }]}>
        <Text style={[styles.title, { color: theme.text }]}>{t('profileReady.title')}</Text>
        <Text style={[styles.subtitle, { color: theme.text }]}>{t('profileReady.subtitle')}</Text>

        <TouchableOpacity
          style={[styles.primaryButton, { backgroundColor: theme.surfacePrimary }]}
          onPress={() =>
            navigation.reset({
              index: 0,
              routes: [{ name: 'Home' }],
            })
          }
        >
          <Text style={[styles.primaryButtonText, { color: theme.text }]}>
            {t('profileReady.start')}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate('NameInput', {
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
              personalityTraits,
              profilePhoto,
            })
          }
        >
          <Text style={[styles.secondaryButtonText, { color: theme.text }]}>
            {t('profileReady.review')}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20 * scale,
    paddingTop: 30 * scale,
  },
  contentBox: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 20 * scale,
    borderTopRightRadius: 20 * scale,
    paddingVertical: 150 * scale,
    paddingHorizontal: 24 * scale,
    alignItems: 'center',
  },
  title: {
    fontSize: 28 * scale,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 14 * scale,
  },
  subtitle: {
    fontSize: 14 * scale,
    textAlign: 'center',
    marginBottom: 30 * scale,
  },
  primaryButton: {
    borderRadius: 12 * scale,
    paddingVertical: 14 * scale,
    paddingHorizontal: 30 * scale,
    marginBottom: 12 * scale,
  },
  primaryButtonText: {
    fontWeight: 'bold',
    fontSize: 20 * scale,
  },
  secondaryButtonText: {
    fontSize: 13 * scale,
    textDecorationLine: 'underline',
  },
});
