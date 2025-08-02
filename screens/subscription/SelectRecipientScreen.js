import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Platform,
  StatusBar,
  TextInput,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../src/context/ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');
const AVATAR_SIZE = 48;
const scale = width / 375;

const mockRecipients = [
  { id: '1', name: 'Jessica', image: require('../../assets/users/user1.jpg') },
  { id: '2', name: 'Elena', image: require('../../assets/users/user2.jpg') },
  { id: '3', name: 'Sophia', image: require('../../assets/users/user3.jpg') },
];

export default function SelectRecipientScreen({ route, navigation }) {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const { gift } = route.params;

  const [searchText, setSearchText] = useState('');
  const [filteredRecipients, setFilteredRecipients] = useState(mockRecipients);

  const handleSearch = (text) => {
    setSearchText(text);
    const filtered = mockRecipients.filter((item) =>
      item.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredRecipients(filtered);
  };

  const handleSelect = (recipient) => {
    navigation.navigate('SubscriptionGift', {
      selectedGift: gift,
      selectedRecipient: recipient,
      openGiftModal: true,
    });
  };

  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        {
          backgroundColor: theme.recipientScreenBackground,
          paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        },
      ]}
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back-outline" size={18 * scale} color={theme.recipientScreenTitleText} />
          </TouchableOpacity>
          <Text style={[styles.title, { color: theme.recipientScreenTitleText }]}>
            {t('selectRecipient.title')}
          </Text>
        </View>

        {/* Search Bar */}
        <View style={[styles.searchBar, { backgroundColor: theme.searchBarBackground }]}>
          <TextInput
            style={[styles.searchInput, { color: theme.input }]}
            placeholder={t('chatlist.search_placeholder')}
            placeholderTextColor={theme.inputPlaceholder}
            value={searchText}
            onChangeText={handleSearch}
          />
          <Icon name="search" size={16} color={theme.searchIcon} style={styles.searchIcon} />
        </View>

        {/* List */}
        <FlatList
          data={filteredRecipients}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.card, { backgroundColor: theme.recipientScreenCardBackground }]}
              onPress={() => handleSelect(item)}
            >
              <Image source={item.image} style={styles.avatar} />
              <Text style={[styles.name, { color: theme.recipientScreenNameText }]}>
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20 * scale,
    paddingTop: 10 * scale,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20 * scale,
    gap: 12 * scale,
  },
  title: {
    fontSize: 20 * scale,
    fontWeight: 'bold',
  },
  searchBar: {
    borderRadius: 12 * scale,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12 * scale,
    height: 38 * scale,
    marginBottom: 20 * scale,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    fontSize: 14 * scale,
  },
  searchIcon: {
    marginLeft: 10 * scale,
  },
  listContent: {
    paddingBottom: 40 * scale,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12 * scale,
    paddingHorizontal: 16 * scale,
    borderRadius: 12 * scale,
    marginBottom: 12 * scale,
  },
  avatar: {
    width: AVATAR_SIZE * scale,
    height: AVATAR_SIZE * scale,
    borderRadius: (AVATAR_SIZE * scale) / 2,
    marginRight: 12 * scale,
  },
  name: {
    fontSize: 16 * scale,
  },
});
