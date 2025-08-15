import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  StatusBar,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import HeaderWithProgress from '../../components/headers/HeaderWithProgress';
import PageTitle from '../../components/ui/PageTitle';
import NextButton from '../../components/ui/NextButton';
import { useTheme } from '../../src/context/ThemeContext';

const { width } = Dimensions.get('window');
const scale = width / 375;

export default function RelationshipPreferenceScreen({ navigation }) {
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
    relationshipPreference: routePreference,
    ...restParams
  } = route.params || {};

  const [selected, setSelected] = useState(routePreference || null);

  const preferences = [
    { icon: '😌', key: 'situational' },
    { icon: '🍷', key: 'casual' },
    { icon: '🔥', key: 'dominant' },
    { icon: '🎭', key: 'roleplay' },
    { icon: '😈', key: 'flirt' },
  ];

  const handleSelect = (key) => {
    setSelected(key === selected ? null : key);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={[styles.container, { backgroundColor: theme.containerBackground }]}>

        {/* Android'de status bar kadar üst boşluk */}
        <View style={Platform.OS === 'android' ? { marginTop: StatusBar.currentHeight || 0 } : null}>
          <HeaderWithProgress navigation={navigation} currentStep={5} />
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          <PageTitle>{t('relationshipPreference.title')}</PageTitle>

          <View style={styles.optionWrapper}>
            {preferences.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.optionButton,
                  {
                    backgroundColor:
                      selected === item.key ? theme.accent : theme.surfaceSecondary,
                  },
                ]}
                onPress={() => handleSelect(item.key)}
              >
                <Text style={[styles.optionText, { color: theme.text }]}>
                  {item.icon} {t(`relationshipPreference.options.${item.key}`)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        <NextButton
          label={t('common.next')}
          onPress={() =>
            navigation.navigate('PartnerAgeRange', {
              ...restParams,
              email,
              password,
              confirmPassword,
              name,
              birthDate,
              gender,
              languages,
              relationshipPreference: selected,
            })
          }
          disabled={!selected}
        />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10 * scale, // yatay padding yok; header yatayda zaten doğru hizada
  },
  scrollContent: {
    paddingHorizontal: 20 * scale,
    paddingBottom: 140 * scale,
  },
  optionWrapper: {
    alignItems: 'center',
  },
  optionButton: {
    paddingVertical: 16 * scale,
    paddingHorizontal: 20 * scale,
    borderRadius: 12 * scale,
    width: '100%',
    maxWidth: 400 * scale,
    marginBottom: 20 * scale,
  },
  optionText: {
    fontWeight: 'bold',
    fontSize: 16 * scale,
    textAlign: 'center',
  },
});
