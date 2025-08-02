import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Linking,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import SettingsHeader from '../../components/headers/SettingsHeader';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../src/context/ThemeContext';

const { width } = Dimensions.get('window');
const scale = width / 375;

export default function SupportScreen() {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { theme } = useTheme();

  const handleEmail = () => {
    Linking.openURL('mailto:palmtechsoft@gmail.com');
  };

  const handleFAQ = () => {
    Linking.openURL('https://palmtechsoft.com/tr');
  };

  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        { backgroundColor: theme.supportScreenBackground },
      ]}
    >
      <View style={styles.content}>
        <SettingsHeader title={t('support.title')} />

        <TouchableOpacity
          style={[styles.option, { borderBottomColor: theme.supportOptionDividerColor }]}
          onPress={handleEmail}
        >
          <View style={styles.left}>
            <Icon
              name="envelope"
              size={16 * scale}
              color={theme.supportOptionIconColor}
            />
            <Text style={[styles.label, { color: theme.supportOptionTextColor }]}>
              {t('support.email')}
            </Text>
          </View>
          <Icon
            name="chevron-right"
            size={14 * scale}
            color={theme.supportChevronIconColor}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.option, { borderBottomColor: theme.supportOptionDividerColor }]}
          onPress={handleFAQ}
        >
          <View style={styles.left}>
            <Icon
              name="question-circle"
              size={16 * scale}
              color={theme.supportOptionIconColor}
            />
            <Text style={[styles.label, { color: theme.supportOptionTextColor }]}>
              {t('support.faq')}
            </Text>
          </View>
          <Icon
            name="chevron-right"
            size={14 * scale}
            color={theme.supportChevronIconColor}
          />
        </TouchableOpacity>

        <View
          style={[styles.infoBox, { backgroundColor: theme.supportInfoBoxBackground }]}
        >
          <Text style={[styles.infoText, { color: theme.supportInfoTextColor }]}>
            {t('support.responseInfo')}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    paddingHorizontal: 20 * scale,
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
    borderBottomWidth: 0.5,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12 * scale,
  },
  label: {
    fontSize: 15 * scale,
  },
  infoBox: {
    marginTop: 40 * scale,
    padding: 16 * scale,
    borderRadius: 12 * scale,
  },
  infoText: {
    fontSize: 13 * scale,
    textAlign: 'center',
  },
});
