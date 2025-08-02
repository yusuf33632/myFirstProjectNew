import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Video } from 'expo-av';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../src/context/ThemeContext';

const { width } = Dimensions.get('window');
const scale = width / 375;

export default function CharacterDetail({ character, onClose, navigation }) {
  const { t } = useTranslation();
  const { theme } = useTheme();

  const goToProfile = () => {
    onClose();
    setTimeout(() => {
      navigation.navigate('ProfileAiDetail');
    }, 100);
  };

  const goToChat = () => {
    onClose();
    setTimeout(() => {
      navigation.navigate('ChatDetail');
    }, 100);
  };

  return (
    <View style={[styles.container]}>
      <View style={[styles.card, { backgroundColor: theme.characterCardBackground }]}>
        <Video
          source={character.video}
          style={styles.video}
          resizeMode="cover"
          shouldPlay
          isLooping
          isMuted
        />

        <View style={[styles.infoContainer, { backgroundColor: theme.characterOverlay }]}>
          <Text style={[styles.name, { color: theme.text }]}>
            {character.name}, 21
          </Text>

          <View style={styles.tagsWrapper}>
            <View style={[styles.tag, { backgroundColor: theme.tagBackground }]}>
              <Text style={[styles.tagText, { color: theme.tagText }]}>{t('character.capricorn')}</Text>
            </View>
            <View style={[styles.tag, { backgroundColor: theme.tagBackground }]}>
              <Text style={[styles.tagText, { color: theme.tagText }]}>{t('character.good_at_chat')}</Text>
            </View>
          </View>

          <View style={styles.tagsWrapper}>
            <View style={[styles.tag, { backgroundColor: theme.tagBackground }]}>
              <Text style={[styles.tagText, { color: theme.tagText }]}>{t('character.social')}</Text>
            </View>
            <View style={[styles.tag, { backgroundColor: theme.tagBackground }]}>
              <Text style={[styles.tagText, { color: theme.tagText }]}>{t('character.sport')}</Text>
            </View>
          </View>

          <Text style={[styles.description, { color: theme.text }]}>
            {t('character.description')}
          </Text>

          <View style={styles.buttonsRow}>
            <TouchableOpacity style={[styles.primaryButton, { backgroundColor: theme.primarySend }]} onPress={goToChat}>
              <Text style={[styles.primaryButtonText, { color: theme.text }]}>{t('character.send_message')}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.secondaryButton, { backgroundColor: theme.secondaryButtonBackground }]} onPress={goToProfile}>
              <Text style={[styles.secondaryButtonText, { color: theme.text }]}>{t('character.go_to_profile')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
  },
  card: {
    width: width * 0.85,
    height: width * 1.6,
    borderRadius: 20 * scale,
    overflow: 'hidden',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  infoContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingHorizontal: 16 * scale,
    paddingVertical: 16 * scale,
  },
  name: {
    fontSize: 22 * scale,
    fontWeight: 'bold',
    marginBottom: 10 * scale,
  },
  tagsWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8 * scale,
    marginBottom: 8 * scale,
  },
  tag: {
    borderRadius: 20 * scale,
    paddingHorizontal: 10 * scale,
    paddingVertical: 4 * scale,
  },
  tagText: {
    fontSize: 11 * scale,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 13 * scale,
    lineHeight: 18 * scale,
    textAlign: 'left',
    marginTop: 10 * scale,
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16 * scale,
  },
  primaryButton: {
    paddingVertical: 10 * scale,
    paddingHorizontal: 20 * scale,
    borderRadius: 20 * scale,
  },
  primaryButtonText: {
    fontWeight: 'bold',
    fontSize: 13 * scale,
  },
  secondaryButton: {
    paddingVertical: 10 * scale,
    paddingHorizontal: 20 * scale,
    borderRadius: 20 * scale,
  },
  secondaryButtonText: {
    fontWeight: 'bold',
    fontSize: 13 * scale,
  },
});
