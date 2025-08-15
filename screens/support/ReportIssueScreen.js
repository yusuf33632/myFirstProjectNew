import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Platform,
  StatusBar,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import SettingsHeader from '../../components/headers/SettingsHeader';
import { useTheme } from '../../src/context/ThemeContext';

const { width } = Dimensions.get('window');
const scale = width / 375;

export default function ReportIssueScreen() {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    if (!message.trim()) {
      Alert.alert(t('report.warningTitle'), t('report.warningMessage'));
      return;
    }

    Alert.alert(t('report.successTitle'), t('report.successMessage'));
    setMessage('');
    navigation.goBack();
  };

  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        { backgroundColor: theme.reportScreenBackground, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
      ]}
    >
      <View style={styles.content}>
        <SettingsHeader title={t('report.header')} />

        <Text style={[styles.label, { color: theme.reportLabelText }]}>
          {t('report.label')}
        </Text>

        <TextInput
          style={[
            styles.textArea,
            {
              backgroundColor: theme.reportTextAreaBackground,
              color: theme.textPrimary,
            },
          ]}
          multiline
          placeholder={t('report.placeholder')}
          placeholderTextColor={theme.textPlaceholder}
          value={message}
          onChangeText={setMessage}
        />

        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.reportButtonBackground }]}
          onPress={handleSubmit}
        >
          <Text style={[styles.buttonText, { color: theme.textPrimary }]}>
            {t('report.button')}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20 * scale,
    marginTop: 5 * scale,
  },
  label: {
    fontSize: 14 * scale,
    marginTop: 20 * scale,
    marginBottom: 10 * scale,
  },
  textArea: {
    borderRadius: 10 * scale,
    height: 140 * scale,
    textAlignVertical: 'top',
    padding: 14 * scale,
    fontSize: 14 * scale,
  },
  button: {
    marginTop: 30 * scale,
    paddingVertical: 14 * scale,
    borderRadius: 12 * scale,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 15 * scale,
    fontWeight: 'bold',
  },
});
