import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Switch,
  Dimensions,
  Platform,
  SafeAreaView,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../src/context/ThemeContext';

const { width } = Dimensions.get('window');
const scale = width / 375;

export default function SignUpScreen({ navigation }) {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isChecked, setChecked] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);

  useEffect(() => {
    setPasswordMatch(confirmPassword === '' || password === confirmPassword);
  }, [password, confirmPassword]);

  const isButtonActive = email.trim() !== '' && isChecked && passwordMatch;

  const renderInput = (placeholderKey, value, setValue, secure = false, show, setShow) => (
    <View style={[styles.inputWrapper, { backgroundColor: theme.inputWrapperBackground }]}>
      <Ionicons name="lock-closed-outline" size={18 * scale} color={theme.inputIcon} style={styles.icon} />
      <TextInput
        placeholder={t(`signUp.${placeholderKey}`)}
        placeholderTextColor={theme.inputPlaceholder}
        secureTextEntry={secure && !show}
        style={[styles.input, { color: theme.input }]}
        value={value}
        onChangeText={setValue}
        autoCapitalize="none"
        autoCorrect={false}
        autoComplete="off"
        importantForAutofill="no"
      />
      <TouchableOpacity onPress={() => setShow(!show)}>
        <Ionicons name={show ? 'eye' : 'eye-off'} size={18 * scale} color={theme.line} />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.containerBackground }]}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          {/* Email */}
          <View style={[styles.inputWrapper, { backgroundColor: theme.inputWrapperBackground }]}>
            <Ionicons name="mail-outline" size={18 * scale} color={theme.inputIcon} style={styles.icon} />
            <TextInput
              placeholder={t('signUp.email')}
              placeholderTextColor={theme.inputPlaceholder}
              style={[styles.input, { color: theme.input }]}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="off"
              importantForAutofill="no"
            />
          </View>

          {/* Password */}
          {renderInput('password', password, setPassword, true, showPassword, setShowPassword)}

          {/* Confirm Password */}
          {renderInput('confirmPassword', confirmPassword, setConfirmPassword, true, showConfirmPassword, setShowConfirmPassword)}

          {/* Warning */}
          {!passwordMatch && (
            <Text style={[styles.warningText, { color: theme.errorText }]}>{t('signUp.passwordMismatch')}</Text>
          )}

          {/* Age Confirmation */}
          <View style={styles.checkboxRow}>
            <Switch
              value={isChecked}
              onValueChange={setChecked}
              thumbColor={theme.inputIcon}
              trackColor={{ false: theme.line, true: theme.surfacePrimary }}
            />
            <View style={styles.checkboxTextContainer}>
              <Text style={[styles.checkboxText, { color: theme.text }]}>{t('signUp.ageConfirm')}</Text>
              <Text style={[styles.checkboxText, { fontWeight: 'bold', color: theme.text }]}>{t('signUp.ageWarning')}</Text>
            </View>
          </View>

          {/* Next Button */}
          <TouchableOpacity
            style={[styles.nextButton, { backgroundColor: theme.signInButtonBackground, opacity: isButtonActive ? 1 : 0.5 }]}
            onPress={() => navigation.navigate('NameInput', { email, password, confirmPassword })}
            disabled={!isButtonActive}
          >
            <Text style={[styles.nextText, { color: theme.inputIcon }]}>{t('signUp.next')}</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 40 * scale,
    paddingHorizontal: 20 * scale,
  },
  inputWrapper: {
    flexDirection: 'row',
    borderRadius: 15 * scale,
    paddingHorizontal: 15 * scale,
    alignItems: 'center',
    marginVertical: 10 * scale,
  },
  input: {
    flex: 1,
    paddingVertical: 12 * scale,
    fontSize: 15 * scale,
  },
  icon: {
    marginRight: 8 * scale,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 15 * scale,
  },
  checkboxTextContainer: {
    marginLeft: 10 * scale,
    flex: 1,
  },
  checkboxText: {
    fontSize: 12 * scale,
    lineHeight: 16 * scale,
  },
  nextButton: {
    borderRadius: 15 * scale,
    paddingVertical: 14 * scale,
    width: '100%',
    marginTop: 10 * scale,
  },
  nextText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16 * scale,
  },
  warningText: {
    fontSize: 12 * scale,
    marginLeft: 10 * scale,
    marginTop: -8 * scale,
  },
});