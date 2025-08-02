import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../src/context/ThemeContext';

const { width } = Dimensions.get('window');
const scale = width / 375;

export default function InterestsScreen({ navigation }) {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [selected, setSelected] = useState([]);

  const interestsList = t('interests.options', { returnObjects: true });

  const toggleSelect = (interest) => {
    setSelected((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.containerBackground }]}>
      <Text style={[styles.title, { color: theme.text }]}>
        {t('interests.title')}
      </Text>
      <Text style={[styles.subtitle, { color: theme.interestSubtitleText }]}>
        {t('interests.subtitle')}
      </Text>

      <ScrollView contentContainerStyle={styles.grid}>
        {interestsList.map((interest, idx) => (
          <TouchableOpacity
            key={idx}
            style={[
              styles.chip,
              { backgroundColor: theme.surfacePrimary },
              selected.includes(interest) && {
                backgroundColor: theme.selectedChipBackground,
              },
            ]}
            onPress={() => toggleSelect(interest)}
          >
            <Text
              style={[
                styles.chipText,
                { color: theme.text },
                selected.includes(interest) && {
                  color: theme.selectedChipText,
                },
              ]}
            >
              {interest}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <TouchableOpacity
        style={[
          styles.createButton,
          { backgroundColor: theme.signInButtonBackground },
          selected.length < 3 && styles.disabledButton,
        ]}
        onPress={() => navigation.navigate('Home')}
        disabled={selected.length < 3}
      >
        <Text style={[styles.createText, { color: theme.text }]}>
          {t('interests.cta')}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20 * scale,
  },
  title: {
    fontSize: 20 * scale,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 30 * scale,
  },
  subtitle: {
    fontSize: 14 * scale,
    textAlign: 'center',
    marginVertical: 10 * scale,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingVertical: 10 * scale,
  },
  chip: {
    paddingVertical: 10 * scale,
    paddingHorizontal: 16 * scale,
    borderRadius: 20 * scale,
    margin: 6 * scale,
  },
  chipText: {
    fontWeight: '600',
  },
  createButton: {
    paddingVertical: 14 * scale,
    borderRadius: 15 * scale,
    marginTop: 20 * scale,
  },
  disabledButton: {
    opacity: 0.4,
  },
  createText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16 * scale,
  },
});
