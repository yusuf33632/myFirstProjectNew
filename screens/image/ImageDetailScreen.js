import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Text,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import * as FileSystem from 'expo-file-system';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../src/context/ThemeContext';

const { width, height } = Dimensions.get('window');
const scale = width / 375;

const ImageDetailScreen = ({ route, navigation }) => {
  const { image, onDelete } = route.params;
  const { t } = useTranslation();
  const { theme } = useTheme();

  const handleDelete = async () => {
    try {
      if (image?.uri?.startsWith('file://')) {
        await FileSystem.deleteAsync(image.uri, { idempotent: true });
        console.log('Resim silindi:', image.uri);
      }
    } catch (err) {
      console.error('Silme hatası:', err);
      Alert.alert(t('imageDetail.errorTitle'), t('imageDetail.errorMessage'));
    }
    onDelete?.(image);
    navigation.goBack();
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.fullscreenImageBackground }]}>
      <ScrollView
        maximumZoomScale={3}
        minimumZoomScale={1}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        bouncesZoom
        style={styles.zoomContainer}
        contentContainerStyle={{ flex: 1 }}
      >
        <Image
          source={{ uri: image.uri }}
          style={styles.fullscreenImage}
          resizeMode="cover"
        />
      </ScrollView>

      <TouchableOpacity
        style={[styles.closeButton, { backgroundColor: theme.imageCloseButtonBackground }]}
        onPress={() => navigation.goBack()}
        accessibilityLabel={t('imageDetail.close')}
      >
        <MaterialIcons name="close" size={24 * scale} color={theme.imageCloseIconColor} />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.deleteButton, { backgroundColor: theme.badge }]}
        onPress={handleDelete}
        accessibilityLabel={t('imageDetail.delete')}
      >
        <Text style={[styles.deleteButtonText, { color: theme.text }]}>
          {t('imageDetail.delete')}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  zoomContainer: {
    flex: 1,
  },
  fullscreenImage: {
    width: width,
    height: height,
  },
  closeButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 30,
    left: 16,
    borderRadius: 16,
    padding: 8,
    zIndex: 10,
  },
  deleteButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 30,
    right: 16,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 100,
    zIndex: 10,
  },
  deleteButtonText: {
    fontWeight: 'bold',
    fontSize: 13 * scale,
  },
});

export default ImageDetailScreen;
