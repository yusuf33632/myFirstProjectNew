import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useTheme } from '../../src/context/ThemeContext';

const { width } = Dimensions.get('window');
const scale = width / 375;

const NextButton = ({ label, onPress, disabled = false }) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.containerBackground }]}> 
      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.signInButtonBackground }, disabled && styles.buttonDisabled]}
        onPress={onPress}
        disabled={disabled}
      >
        <Text style={[styles.buttonText, { color: theme.text }]}>{label}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 60 * scale,
    left: 20 * scale,
    right: 20 * scale,
    borderRadius: 12 * scale,
  },
  button: {
    borderRadius: 12 * scale,
    paddingVertical: 14 * scale,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16 * scale,
  },
});

export default NextButton;
