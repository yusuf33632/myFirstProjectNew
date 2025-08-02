import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../src/context/ThemeContext';

const { width } = Dimensions.get('window');
const scale = width / 375;

export default function SettingsHeader({ title, fontSize = 20 * scale }) {
  const navigation = useNavigation();
  const { theme } = useTheme();

  return (
    <View style={styles.header}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Icon name="arrow-back-outline" size={20 * scale} color={theme.headerTextColor} />
      </TouchableOpacity>
      <Text style={[styles.title, { fontSize, color: theme.headerTextColor }]}>
        {title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 40 * scale,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginBottom: 24 * scale,
    paddingHorizontal: 16 * scale,
  },
  backButton: {
    position: 'absolute',
    left: 0,
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
