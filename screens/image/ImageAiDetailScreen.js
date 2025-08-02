import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../src/context/ThemeContext';

const { width, height } = Dimensions.get('window');
const scale = width / 375;

export default function ImageAiDetailScreen({ route, navigation }) {
  const { image } = route.params;
  const { t } = useTranslation();
  const { theme } = useTheme();

  return (
    <TouchableWithoutFeedback onPress={() => {}}>
      <View style={[styles.container, { backgroundColor: theme.characterCardBackground }]}>
        {/* Geri Butonu */}
        <TouchableOpacity
          style={[styles.closeButton, { backgroundColor: theme.overlay }]}
          onPress={() => navigation.goBack()}
          accessible={true}
          accessibilityLabel={t('imageDetail.close')}
        >
          <MaterialIcons name="close" size={24 * scale} color={theme.text} />
        </TouchableOpacity>

        {/* Tam ekran Görsel */}
        <Image source={image} style={styles.fullscreenImage} resizeMode="cover" />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  closeButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 30,
    left: 16 * scale,
    borderRadius: 16 * scale,
    padding: 8 * scale,
    zIndex: Math.round(10 * scale),
  },
  fullscreenImage: {
    width: width,
    height: height,
  },
});
