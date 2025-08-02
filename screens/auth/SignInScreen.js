import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../src/context/ThemeContext';

const { width } = Dimensions.get('window');
const scale = width / 375;

export default function SignInScreen({ navigation }) {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const styles = getStyles(theme);

  const handleSignIn = () => {
    // Dummy login kontrolü — gerçekte backend istekleri yapılmalıdır
    if (email !== 'test@example.com' || password !== '123456') {
      Alert.alert(
        t('signIn.invalidTitle') || 'Giriş Başarısız',
        t('signIn.invalidMessage') || 'E-posta veya şifre hatalı.'
      );
      return;
    }
    navigation.reset({
      index: 0,
      routes: [{ name: 'Home' }],
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={styles.innerContainer}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <View style={styles.avatarContainer}>
            <View style={styles.avatarCircle} />
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.inputIcon}>✉️</Text>
            <TextInput
              style={styles.input}
              placeholder={t('signIn.email')}
              placeholderTextColor={theme.inputWrapperPlaceholder}
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.inputIcon}>🔒</Text>
            <TextInput
              style={styles.input}
              placeholder={t('signIn.password')}
              placeholderTextColor={theme.inputWrapperPlaceholder}
              secureTextEntry={!passwordVisible}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
              <Ionicons
                name={passwordVisible ? 'eye' : 'eye-off'}
                size={18 * scale}
                color={theme.line}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[
              styles.signInButton,
              (email === '' || password === '') && { backgroundColor: theme.disabledButton },
            ]}
            onPress={handleSignIn}
            disabled={email === '' || password === ''}
          >
            <Text style={styles.signInText}>{t('signIn.signInButton')}</Text>
          </TouchableOpacity>

          <View style={styles.dividerContainer}>
            <View style={styles.line} />
            <Text style={styles.orText}>{t('signIn.or')}</Text>
            <View style={styles.line} />
          </View>

          <View style={styles.socialRow}>
            <TouchableOpacity style={[styles.socialButton, { backgroundColor: theme.socialGoogleBackground }]}>
              <FontAwesome name="google" size={16 * scale} color={theme.googleName} />
              <Text style={[styles.socialText, { marginLeft: 6 }]}>GOOGLE</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.socialButton, { backgroundColor: theme.socialFacebookBackround }]}>
              <FontAwesome name="facebook" size={16 * scale} color={theme.facebookName} />
              <Text style={[styles.socialText, { color: theme.facebookName, marginLeft: 6 }]}>Facebook</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.footerText}>
            {t('signIn.noAccount')}{' '}
            <Text style={styles.signupText} onPress={() => navigation.navigate('SignUp')}>
              {t('signIn.signUp')}
            </Text>
          </Text>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.containerBackground },
    innerContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 20 * scale,
    },
    avatarContainer: {
      marginBottom: 30 * scale,
      alignItems: 'center',
    },
    avatarCircle: {
      width: 90 * scale,
      height: 90 * scale,
      borderRadius: 45 * scale,
      borderWidth: 1,
      borderColor: theme.avatarCircleBorderColor,
    },
    inputWrapper: {
      flexDirection: 'row',
      backgroundColor: theme.inputWrapperBackground,
      borderRadius: 12 * scale,
      paddingHorizontal: 12 * scale,
      alignItems: 'center',
      marginBottom: 16 * scale,
      width: '95%',
    },
    inputIcon: {
      fontSize: 16 * scale,
      color: theme.inputIcon,
      marginRight: 8 * scale,
    },
    input: {
      flex: 1,
      color: theme.input,
      paddingVertical: 12 * scale,
      fontSize: 14 * scale,
    },
    signInButton: {
      backgroundColor: theme.signInButtonBackground,
      borderRadius: 12 * scale,
      paddingVertical: 14 * scale,
      width: '95%',
      marginTop: 10 * scale,
    },
    signInText: {
      color: theme.input,
      fontWeight: 'bold',
      fontSize: 16 * scale,
      textAlign: 'center',
    },
    dividerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 20 * scale,
      width: '100%',
    },
    line: {
      flex: 1,
      height: 1,
      backgroundColor: theme.line,
    },
    orText: {
      marginHorizontal: 10 * scale,
      color: theme.orText,
      fontSize: 12 * scale,
    },
    socialRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      marginBottom: 25 * scale,
    },
    socialButton: {
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 15 * scale,
      paddingVertical: 10 * scale,
      paddingHorizontal: 20 * scale,
      flex: 1,
      justifyContent: 'center',
      marginHorizontal: 5 * scale,
    },
    socialText: {
      fontWeight: 'bold',
      fontSize: 14 * scale,
      color: theme.socialText,
    },
    footerText: {
      color: theme.footerText,
      fontSize: 12 * scale,
    },
    signupText: {
      color: theme.signupText,
      fontWeight: 'bold',
    },
  });
