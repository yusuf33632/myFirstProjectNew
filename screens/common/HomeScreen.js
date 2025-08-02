import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Image,
  Platform,
  FlatList,
  BackHandler,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../src/context/ThemeContext';

import BottomBar from '../../components/navigation/BottomBar';
import SideBar from '../../components/navigation/SideBar';
import HomeHeader from '../../components/headers/HomeHeader';
import Modal from 'react-native-modal';
import CharacterDetail from '../../components/character/CharacterDetail';
import { BlurView } from 'expo-blur';

const { width } = Dimensions.get('window');
const scale = width / 375;

export default function HomeScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { theme } = useTheme();

  const [selectedCategory, setSelectedCategory] = useState('girls');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  const categories = [
    { key: 'girls', label: t('home.categories.girls') },
    { key: 'anime', label: t('home.categories.anime') },
    { key: 'boys', label: t('home.categories.boys') },
  ];

  const featured = [
    { id: '1', name: 'Elara', image: require('../../assets/users/user1.jpg'), video: require('../../assets/video/charecter1.mp4') },
    { id: '2', name: 'Luna', image: require('../../assets/users/user2.jpg'), video: require('../../assets/video/charecter1.mp4') },
    { id: '3', name: 'Mira', image: require('../../assets/users/user3.jpg'), video: require('../../assets/video/charecter1.mp4') },
    { id: '4', name: 'Nora', image: require('../../assets/users/user4.jpg'), video: require('../../assets/video/charecter1.mp4') },
    { id: '5', name: 'Aria', image: require('../../assets/users/user5.jpg'), video: require('../../assets/video/charecter1.mp4') },
  ];

  useEffect(() => {
    const backAction = () => {
      if (selectedCharacter) {
        setSelectedCharacter(null);
        return true;
      }
      return false;
    };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, [selectedCharacter]);

  const renderCard = (item, widthFactor = 0.4, heightValue = 200) => (
    <TouchableOpacity
      key={`${item.id}-${widthFactor}`}
      style={{ width: width * widthFactor, position: 'relative' }}
      onPress={() => setSelectedCharacter(item)}
    >
      <Image source={item.image} style={[styles.cardImageFull, { height: heightValue * scale, borderRadius: theme.cardImageBorderRadius }]} />
      <View style={[styles.chatBadge, { backgroundColor: theme.chatBadge }]}>
        <Text style={[styles.chatBadgeText, { color: theme.text }]}>💬 1.9k</Text>
      </View>
      <Text
        style={[
          styles.cardNameOverlay,
          {
            backgroundColor: theme.cardNameOverlayBackground,
            color: theme.cardNameOverlayText,
          },
        ]}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.containerBackground }]}>
      <HomeHeader
        onMenuPress={() => setIsSidebarOpen(true)}
        onAvatarPress={() => navigation.navigate('ProfileDetail')}
      />

      <View style={styles.categoryContainer}>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat.key}
            style={[
              styles.categoryBtn,
              { backgroundColor: selectedCategory === cat.key ? theme.selectedCategoryBackground : theme.surfacePrimary },
            ]}
            onPress={() => setSelectedCategory(cat.key)}
          >
            <Text
              style={[
                styles.categoryText,
                { color: selectedCategory === cat.key ? theme.selectedCategoryText : theme.text },
              ]}
            >
              {cat.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={[styles.section, { color: theme.text }]}>{t('home.sections.featured')}</Text>
        <FlatList
          horizontal
          data={featured}
          keyExtractor={(item) => item.id + '_featured'}
          renderItem={({ item }) => renderCard(item, 0.4, 180)}
          contentContainerStyle={{ paddingHorizontal: 12 * scale }}
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{ width: 12 * scale }} />}
        />

        <Text style={[styles.section, { color: theme.text }]}>{t('home.sections.forYou')}</Text>
        <FlatList
          horizontal
          data={featured}
          keyExtractor={(item) => item.id + '_foryou'}
          renderItem={({ item }) => renderCard(item, 0.44, 220)}
          contentContainerStyle={{ paddingHorizontal: 12 * scale }}
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{ width: 12 * scale }} />}
        />

        <Text style={[styles.section, { color: theme.text }]}>{t('home.sections.popular')}</Text>
        <View style={styles.popularWrapper}>
          {featured.map((item) => (
            <TouchableOpacity
              key={`${item.id}_popular`}
              style={{ width: (width - 36 * scale) / 2, position: 'relative' }}
              onPress={() => setSelectedCharacter(item)}
            >
              <Image source={item.image} style={[styles.cardImageFull, { height: 200 * scale, borderRadius: theme.cardImageBorderRadius }]} />
              <View style={[styles.chatBadge, { backgroundColor: theme.chatBadge }]}>
                <Text style={[styles.chatBadgeText, { color: theme.text }]}>💬 1.9k</Text>
              </View>
              <Text
                style={[
                  styles.cardNameOverlay,
                  {
                    backgroundColor: theme.cardNameOverlayBackground,
                    color: theme.cardNameOverlayText,
                  },
                ]}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <BottomBar activeTab={route.name} navigation={navigation} />

      {isSidebarOpen && (
        <SideBar
          onClose={() => setIsSidebarOpen(false)}
          navigation={navigation}
        />
      )}

      <Modal
        isVisible={!!selectedCharacter}
        onBackdropPress={() => setSelectedCharacter(null)}
        animationIn="fadeIn"
        animationOut="fadeOut"
        style={{ margin: 0 }}
        backdropOpacity={1}
        backdropColor="transparent"
        useNativeDriver={false}
        customBackdrop={
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => setSelectedCharacter(null)}
            style={StyleSheet.absoluteFill}
          >
            <BlurView tint="dark" intensity={70} style={StyleSheet.absoluteFill} />
          </TouchableOpacity>
        }
      >
        {selectedCharacter && (
          <CharacterDetail
            character={selectedCharacter}
            onClose={() => setSelectedCharacter(null)}
            navigation={navigation}
          />
        )}
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12 * scale,
    marginVertical: 14 * scale,
  },
  categoryBtn: {
    paddingHorizontal: 16 * scale,
    paddingVertical: 6 * scale,
    borderRadius: 20 * scale,
  },
  categoryText: {
    fontWeight: 'bold',
  },
  section: {
    fontSize: 16 * scale,
    fontWeight: 'bold',
    marginLeft: 16 * scale,
    marginVertical: 10 * scale,
  },
  cardImageFull: {
    width: '100%',
    marginBottom: 10 * scale,
  },
  chatBadge: {
    position: 'absolute',
    top: 6 * scale,
    right: 6 * scale,
    borderRadius: 12 * scale,
    paddingHorizontal: 6 * scale,
    paddingVertical: 2 * scale,
  },
  chatBadgeText: {
    fontSize: 12 * scale,
  },
  cardNameOverlay: {
    position: 'absolute',
    bottom: 20 * scale,
    left: 8 * scale,
    fontWeight: 'bold',
    fontSize: 14 * scale,
    paddingHorizontal: 6 * scale,
    borderRadius: 4 * scale,
  },
  popularWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 12 * scale,
    rowGap: 12 * scale,
  },
});
