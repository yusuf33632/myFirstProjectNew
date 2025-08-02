import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Swipeable } from 'react-native-gesture-handler';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../src/context/ThemeContext'; // Tema bağlamı

const { width } = Dimensions.get('window');
const scale = width / 375;

export default function NotificationScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const route = useRoute();
  const { theme } = useTheme();

  const [notifications, setNotifications] = useState([
    {
      id: '1',
      title: t('notifications.new_message_title'),
      message: t('notifications.new_message_body'),
      icon: 'chatbubble-ellipses-outline',
      time: t('notifications.time_2min'),
    },
    {
      id: '2',
      title: t('notifications.gift_received_title'),
      message: t('notifications.gift_received_body'),
      icon: 'gift-outline',
      time: t('notifications.time_10min'),
    },
    {
      id: '3',
      title: t('notifications.new_match_title'),
      message: t('notifications.new_match_body'),
      icon: 'heart-outline',
      time: t('notifications.time_1h'),
    },
  ]);

  useEffect(() => {
    global.unreadCount = notifications.length;
  }, [notifications]);

  const handleDelete = (id) => {
    const updated = notifications.filter((item) => item.id !== id);
    setNotifications(updated);
    global.unreadCount = updated.length;
  };

  const renderRightActions = (progress, dragX, id) => (
    <TouchableOpacity
      onPress={() => handleDelete(id)}
      style={[styles.deleteButton, { backgroundColor: theme.deleteButtonBackground }]}
    >
      <Icon name="trash-outline" size={24 * scale} color={theme.text} />
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => (
    <Swipeable renderRightActions={(progress, dragX) => renderRightActions(progress, dragX, item.id)}>
      <View style={[styles.notificationBox, { backgroundColor: theme.card }]}>
        <Icon name={item.icon} size={22 * scale} color={theme.notificationIconColor} style={styles.icon} />
        <View style={styles.textWrapper}>
          <Text style={[styles.notificationTitle, { color: theme.text }]}>{item.title}</Text>
          <Text style={[styles.notificationMessage, { color: theme.notificationSubtext }]}>{item.message}</Text>
          <Text style={[styles.notificationTime, { color: theme.timeText }]}>{item.time}</Text>
        </View>
      </View>
    </Swipeable>
  );

  const handleGoBack = () => {
    if (route.params?.onGoBack) {
      route.params.onGoBack(notifications.length);
    }
    navigation.goBack();
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.containerBackground }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backBtn}>
          <Icon name="arrow-back-outline" size={24 * scale} color={theme.text} />
        </TouchableOpacity>
        <View style={styles.titleWrapper}>
          <Text style={[styles.title, { color: theme.headerTextColor }]}>{t('notifications.title')}</Text>
        </View>
      </View>

      {/* List */}
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={renderItem}
      />

      {/* Empty */}
      {notifications.length === 0 && (
        <View style={styles.emptyBox}>
          <Icon name="notifications-off-outline" size={48 * scale} color={theme.emptyIconColor} />
          <Text style={[styles.emptyText, { color: theme.subtext }]}>{t('notifications.empty')}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60 * scale,
    paddingHorizontal: 16 * scale,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20 * scale,
  },
  backBtn: {
    marginRight: 12 * scale,
    padding: 4 * scale,
  },
  titleWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24 * scale,
    fontWeight: 'bold',
  },
  listContainer: {
    paddingBottom: 100 * scale,
  },
  notificationBox: {
    flexDirection: 'row',
    padding: 12 * scale,
    borderRadius: 10 * scale,
    marginBottom: 12 * scale,
    alignItems: 'flex-start',
  },
  icon: {
    marginRight: 10 * scale,
    marginTop: 4 * scale,
  },
  textWrapper: {
    flex: 1,
  },
  notificationTitle: {
    fontWeight: 'bold',
    fontSize: 14.5 * scale,
    marginBottom: 2 * scale,
  },
  notificationMessage: {
    fontSize: 13 * scale,
    marginBottom: 4 * scale,
  },
  notificationTime: {
    fontSize: 11.5 * scale,
    textAlign: 'right',
  },
  deleteButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 60 * scale,
    borderRadius: 10 * scale,
    marginBottom: 12 * scale,
    marginLeft: 8 * scale,
  },
  emptyBox: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    alignItems: 'center',
    transform: [{ translateY: -40 * scale }],
  },
  emptyText: {
    fontSize: 16 * scale,
    marginTop: 8 * scale,
    textAlign: 'center',
  },
});
