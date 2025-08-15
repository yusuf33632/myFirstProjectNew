import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions, Platform } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../../src/context/ThemeContext';

const { width } = Dimensions.get('window');
const scale = width / 375;

export default function HomeHeader({ onMenuPress, onAvatarPress }) {
  const { theme } = useTheme();

  return (
    <View style={styles.header}>
      {/* Menü Butonu */}
      <TouchableOpacity onPress={onMenuPress}>
      <Ionicons name="menu" size={24 * scale} color={theme.text} />
      </TouchableOpacity>

      {/* Sağ taraf: Coin + Avatar */}
      <View style={styles.rightSide}>
        {/* Coin grubu */}
        <View style={styles.coinGroup}>
          <Ionicons
            name="wallet"                // stabil ikon
            size={16 * scale}
            color="#F4C430"                    // altın sarısı
            style={{ marginRight: 6 * scale }}
          />
          <Text style={[styles.coinText, { color: theme.text }]}>500</Text>
        </View>

        <TouchableOpacity onPress={onAvatarPress}>
          <Image
            source={require('../../assets/users/user1.jpg')}
            style={[styles.avatar, { borderColor: theme.avatarCircleBorderColor }]}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16 * scale,
    paddingTop: Platform.OS === 'android' ? 10 * scale : 0, // sadece Android’de biraz aşağı
  },
  menu: {
    fontSize: 26 * scale,
  },

  rightSide: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  coinGroup: {
    flexDirection: 'row',
    alignItems: 'center',     // ikon + metin hizası sabit
    marginRight: 12 * scale,  // avatarla güvenli mesafe
  },
  coinText: {
    fontSize: 16 * scale,
    fontWeight: Platform.OS === 'android' ? '600' : 'bold',
    includeFontPadding: false,
  },

  avatar: {
    width: 36 * scale,
    height: 36 * scale,
    borderRadius: 18 * scale,
    borderWidth: 1.5 * scale,
  },
});
