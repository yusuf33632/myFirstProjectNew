import React from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../../src/context/ThemeContext';

const { width } = Dimensions.get('window');
const scale = width / 375;

const HeaderWithProgress = ({ navigation, currentStep, totalSteps = 9 }) => {
  const { theme } = useTheme();
  const progressPercent = ((totalSteps - currentStep + 1) / totalSteps) * 100;

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons
          name="arrow-back"
          size={24 * scale}
          color={theme.text} // renk tema'dan alındı
          style={{ marginLeft: 16 * scale }}
        />
      </TouchableOpacity>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={[styles.progressBackground, { backgroundColor: theme.surfaceSecondary }]}>
          <View style={[styles.progressFill, { width: `${progressPercent}%`, backgroundColor: theme.accent }]} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40 * scale,
  },
  progressContainer: {
    alignItems: 'center',
    flex: 1,
  },
  progressBackground: {
    height: 8 * scale,
    borderRadius: 4 * scale,
    width: '60%',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4 * scale,
  },
});

export default HeaderWithProgress;
