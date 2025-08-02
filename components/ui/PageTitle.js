// components/PageTitle.js

import React from 'react';
import { Text, StyleSheet, Dimensions } from 'react-native';
import { useTheme } from '../../src/context/ThemeContext';

const { width } = Dimensions.get('window');
const scale = width / 375;

const PageTitle = ({ children }) => {
  const { theme } = useTheme();

  return <Text style={[styles.title, { color: theme.text }]}>{children}</Text>;
};

const styles = StyleSheet.create({
  title: {
    fontSize: 35 * scale,
    fontWeight: 'bold',
    marginBottom: 50 * scale,
    textAlign: 'center',
  },
});

export default PageTitle;
