import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import HeaderWithProgress from '../../components/headers/HeaderWithProgress';
import PageTitle from '../../components/ui/PageTitle';
import NextButton from '../../components/ui/NextButton';
import { useTheme } from '../../src/context/ThemeContext';

const { width } = Dimensions.get('window');
const scale = width / 375;

export default function NameInputScreen({ navigation }) {
  const { t } = useTranslation();
  const route = useRoute();
  const { theme } = useTheme();
  const {
    email,
    password,
    confirmPassword,
    name: routeName,
    ...restParams
  } = route.params || {};

  const [name, setName] = useState(routeName || '');
  const styles = getStyles(theme);
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={styles.container}>
        <HeaderWithProgress navigation={navigation} currentStep={9} />
        <PageTitle>{t('register.name_title')}</PageTitle>

        <View style={styles.inputWrapper}>
          <TextInput
            placeholder={t('register.name_placeholder')}
            placeholderTextColor={theme.inputPlaceholder}
            value={name}
            onChangeText={setName}
            style={styles.input}
          />
        </View>

        <NextButton
          label={t('common.next')}
          onPress={() =>
            navigation.navigate('Birthday', {
              ...restParams,
              email,
              password,
              confirmPassword,
              name,
            })
          }
          disabled={name.trim() === ''}
        />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const getStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.containerBackground,
    paddingHorizontal: 20 * scale,
    paddingTop: 30 * scale,
  },
  inputWrapper: {
    flex: 1,
    justifyContent: 'center',
    paddingBottom: 140 * scale,
    alignItems: 'center',
    paddingHorizontal: 10 * scale,
  },
  input: {
    width: '100%',
    maxWidth: 400 * scale,
    backgroundColor: theme.surfaceSecondary,
    borderRadius: 12 * scale,
    paddingVertical: 20 * scale,
    paddingHorizontal: 16 * scale,
    color: theme.input,
    fontSize: 16 * scale,
  },
});
