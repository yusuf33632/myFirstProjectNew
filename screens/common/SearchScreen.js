import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../src/context/ThemeContext';

const { width } = Dimensions.get('window');
const scale = width / 375;

const allCharacters = [
  { id: '1', name: 'Elara', image: require('../../assets/users/user1.jpg') },
  { id: '2', name: 'Luna', image: require('../../assets/users/user2.jpg') },
  { id: '3', name: 'Mira', image: require('../../assets/users/user3.jpg') },
  { id: '4', name: 'Nora', image: require('../../assets/users/user4.jpg') },
  { id: '5', name: 'Aria', image: require('../../assets/users/user5.jpg') },
];

export default function SearchScreen() {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [query, setQuery] = useState('');

  const filtered = allCharacters.filter((char) =>
    char.name.toLowerCase().includes(query.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: theme.card }]}
      onPress={() => navigation.navigate('CharacterDetail', { character: item })}
    >
      <Image source={item.image} style={styles.avatar} />
      <Text style={[styles.name, { color: theme.text }]}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.containerBackground }]}>
      {/* Header with Back Button */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.side}>
          <Icon name="arrow-back-outline" size={24 * scale} color={theme.text} />
        </TouchableOpacity>

        <View style={styles.center}>
          <Text style={[styles.header, { color: theme.headerTextColor }]}>
            {t('search.header')}
          </Text>
        </View>

        <View style={styles.side} />
      </View>

      {/* Search Input */}
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: theme.searchBarBackground,
            color: theme.input,
          },
        ]}
        placeholder={t('search.placeholder')}
        placeholderTextColor={theme.inputPlaceholder}
        value={query}
        onChangeText={setQuery}
      />

      {/* Results */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        keyboardShouldPersistTaps="handled"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 60 : 30,
    paddingHorizontal: 16 * scale,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16 * scale,
  },
  side: {
    width: 40 * scale,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  center: {
    flex: 1,
    alignItems: 'center',
  },
  header: {
    fontSize: 24 * scale,
    fontWeight: 'bold',
  },
  input: {
    borderRadius: 10 * scale,
    paddingHorizontal: 12 * scale,
    paddingVertical: 10 * scale,
    fontSize: 16 * scale,
    marginBottom: 20 * scale,
  },
  list: {
    gap: 12 * scale,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10 * scale,
    padding: 10 * scale,
  },
  avatar: {
    width: 50 * scale,
    height: 50 * scale,
    borderRadius: 25 * scale,
    marginRight: 12 * scale,
  },
  name: {
    fontSize: 16 * scale,
    fontWeight: 'bold',
  },
});
