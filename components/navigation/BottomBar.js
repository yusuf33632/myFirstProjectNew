import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Dimensions,
  Platform,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from '../../src/context/ThemeContext';
import { useUnread } from '../../src/context/UnreadContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');
const scale = width / 375;

export default function BottomBar({ onHeight }) {
  const navigation = useNavigation();
  const route = useRoute();
  const { theme } = useTheme();
  const { unreadCount } = useUnread();
  const insets = useSafeAreaInsets();

  const activeTab = route.name;

  const tabs = [
    { name: 'Home', icon: 'home-outline' },
    {
      name: 'ChatList',
      icon: 'chatbubble-outline',
      badge: unreadCount > 0 ? String(unreadCount) : null,
    },
    { name: 'Search', icon: 'search-outline' },
    { name: 'SubscriptionGift', icon: 'gift-outline' },
  ];

  // iOS: mevcut padding’ini koru
  // Android: mevcut padding + insets.bottom ekle (gesture/3‑tuş farklarını kapsar)
  const platformPaddingBottom =
    Platform.OS === 'ios' ? 30 : 14 + insets.bottom;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.bottomBarBackground,
          paddingBottom: platformPaddingBottom,
        },
      ]}
      onLayout={(e) => {
        // Bar’ın gerçek yüksekliğini parent’a ilet (Android çeşitliliğine uyum)
        onHeight?.(e.nativeEvent.layout.height);
      }}
    >
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.name}
          style={styles.iconWrapper}
          onPress={() => navigation.navigate(tab.name)}
        >
          <Ionicons
            name={tab.icon}
            size={24 * scale}
            color={activeTab === tab.name ? theme.bottomBarIconActive : theme.bottomBarIconInactive}
          />
          {tab.badge && (
            <View style={[styles.badge, { backgroundColor: theme.bottomBarBadgeBackground }]}>
              <Text style={[styles.badgeText, { color: theme.text }]}>{tab.badge}</Text>
            </View>
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10 * scale,
    borderTopLeftRadius: 16 * scale,
    borderTopRightRadius: 16 * scale,
    elevation: 10,
  },
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -4 * scale,
    right: -6 * scale,
    borderRadius: 10 * scale,
    paddingHorizontal: 2 * scale,
    paddingVertical: 1,
    minWidth: 18 * scale,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    fontSize: 10 * scale,
    fontWeight: 'bold',
  },
});
