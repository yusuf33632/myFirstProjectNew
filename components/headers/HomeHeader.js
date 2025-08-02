import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';
import { useTheme } from '../../src/context/ThemeContext';

const { width } = Dimensions.get('window');
const scale = width / 375;

export default function HomeHeader({ onMenuPress, onAvatarPress }) {
  const { theme } = useTheme();

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onMenuPress}>
        <Text style={[styles.menu, { color: theme.text }/* veya theme.headerTextColor */]}>☰</Text>
      </TouchableOpacity>
      <View style={styles.coinContainer}>
        <Text style={[styles.coinText, { color: theme.text }]}>🪙 500</Text>
        <TouchableOpacity onPress={onAvatarPress}>
          <Image
            source={require('../../assets/users/user1.jpg')}
            style={[
              styles.avatar,
              { borderColor: theme.avatarCircleBorderColor }
            ]}
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
  },
  menu: {
    fontSize: 26 * scale,
  },
  coinContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10 * scale,
  },
  coinText: {
    fontWeight: 'bold',
    marginRight: 8 * scale,
  },
  avatar: {
    width: 36 * scale,
    height: 36 * scale,
    borderRadius: 18 * scale,
    borderWidth: 1.5 * scale,
  },
});
