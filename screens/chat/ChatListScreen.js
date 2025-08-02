import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import BottomBar from '../../components/navigation/BottomBar';
import { useUnread } from '../../src/context/UnreadContext';
import SettingsHeader from '../../components/headers/SettingsHeader';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../src/context/ThemeContext';

const { width } = Dimensions.get('window');
const scale = width / 375;

const initialUsers = [
  {
    id: '1',
    name: 'Jessika',
    image: require('../../assets/users/user1.jpg'),
    lastMessage: 'Bu boş busun?',
    time: '11:46',
    unread: 1,
  },
  {
    id: '2',
    name: 'Luna',
    image: require('../../assets/users/user2.jpg'),
    lastMessage: 'Hadi bize gidelim.',
    time: '00:31',
    unread: null,
  },
  {
    id: '3',
    name: 'Elara',
    image: require('../../assets/users/user3.jpg'),
    lastMessage: 'Bu gün nasılsın?',
    time: 'Pazartesi',
    unread: 59,
  },
  {
    id: '4',
    name: 'Mira',
    image: require('../../assets/users/user1.jpg'),
    lastMessage: 'Fotoğraf',
    time: 'Dün',
    unread: null,
  },
  {
    id: '5',
    name: 'Nova',
    image: require('../../assets/users/user2.jpg'),
    lastMessage: 'Yarın görüşürüz.',
    time: '13:15',
    unread: 2,
  },
];

export default function ChatListScreen({ navigation }) {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [searchText, setSearchText] = useState('');
  const [users, setUsers] = useState(initialUsers);
  const [filteredUsers, setFilteredUsers] = useState(initialUsers);
  const { setUnreadCount } = useUnread();

  useEffect(() => {
    updateUnreadCount(initialUsers);
  }, []);

  const updateUnreadCount = (list) => {
    const total = list.reduce((sum, user) => sum + (user.unread || 0), 0);
    setUnreadCount(total);
  };

  const handleSearch = (text) => {
    setSearchText(text);
    const filtered = users.filter((user) =>
      user.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  const handleChatPress = (id) => {
    const updated = users.map((user) =>
      user.id === id ? { ...user, unread: null } : user
    );
    setUsers(updated);
    setFilteredUsers(
      updated.filter((user) =>
        user.name.toLowerCase().includes(searchText.toLowerCase())
      )
    );
    updateUnreadCount(updated);
    navigation.navigate('ChatDetail');
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.containerBackground }]}> 
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <SettingsHeader title={t('chatlist.title')} />

        <View style={[styles.searchBar, { backgroundColor: theme.searchBarBackground }]}> 
          <TextInput
            style={[styles.searchInput, { color: theme.input }]}
            placeholder={t('chatlist.search_placeholder')}
            placeholderTextColor={theme.inputPlaceholder}
            value={searchText}
            onChangeText={handleSearch}
          />
          <Icon name="search" size={16 * scale} color={theme.searchIcon} style={styles.searchIcon} />
        </View>

        {filteredUsers.map((item) => (
          <TouchableOpacity
            key={`${item.id}-${item.name}`}
            style={[styles.chatItem, { borderBottomColor: theme.surfacePrimary }]}
            onPress={() => handleChatPress(item.id)}
          >
            <Image source={item.image} style={styles.avatar} />
            <View style={styles.chatInfo}>
              <View style={styles.chatTopRow}>
                <Text style={[styles.chatName, { color: theme.chatName }]}>{item.name}</Text>
                <Text style={[styles.chatTime, { color: theme.chatTime }]}>{item.time}</Text>
              </View>

              <View style={styles.chatBottomRow}>
                <Text
                  style={[styles.chatLastMessage, { color: theme.chatLastMessage }]}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {item.lastMessage}
                </Text>
                {item.unread && (
                  <View style={[styles.unreadBadge, { backgroundColor: theme.unreadBadgeBackground }]}> 
                    <Text style={[styles.unreadText, { color: theme.unreadText }]}>{item.unread}</Text>
                  </View>
                )}
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <BottomBar navigation={navigation} activeTab="ChatList" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 90 * scale,
    paddingHorizontal: 20 * scale,
    paddingTop: 40 * scale,
  },
  searchBar: {
    borderRadius: 12 * scale,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12 * scale,
    height: 38 * scale,
    marginBottom: 25 * scale,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    fontSize: 14 * scale,
  },
  searchIcon: {
    marginLeft: 10 * scale,
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10 * scale,
    borderBottomWidth: 0.6,
  },
  avatar: {
    width: 50 * scale,
    height: 50 * scale,
    borderRadius: 25 * scale,
    marginRight: 12 * scale,
  },
  chatInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  chatTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4 * scale,
  },
  chatName: {
    fontSize: 15 * scale,
    fontWeight: 'bold',
  },
  chatTime: {
    fontSize: 12 * scale,
  },
  chatBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chatLastMessage: {
    fontSize: 13 * scale,
    flex: 1,
  },
  unreadBadge: {
    borderRadius: 10 * scale,
    paddingHorizontal: 6 * scale,
    paddingVertical: 2 * scale,
    marginLeft: 8 * scale,
    minWidth: 20 * scale,
    alignItems: 'center',
  },
  unreadText: {
    fontSize: 12 * scale,
    fontWeight: 'bold',
  },
});
  