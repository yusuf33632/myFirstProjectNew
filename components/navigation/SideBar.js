import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../src/context/ThemeContext';

const { width } = Dimensions.get('window');
const scale = width / 375;

export default function SideBar({ onClose, navigation, onAccountAdd }) {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const currentRoute = navigation.getState().routes[navigation.getState().index].name;

  const goTo = (target) => {
    if (currentRoute !== target) {
      navigation.navigate(target);
    }
    onClose();
  };

  return (
    <View style={styles.sidebarContainer}>
      <SafeAreaView style={[styles.sidebar, { backgroundColor: theme.containerBackground }]}>
        <TouchableOpacity style={styles.sidebarHeader} onPress={() => goTo('ProfileDetail')}>
          <View style={[styles.avatar, { backgroundColor: theme.sidebarAvatarBackground }]} />
          <Text style={[styles.username, { color: theme.text }]}>Yusuf</Text>
        </TouchableOpacity>

        <View style={[styles.line, { backgroundColor: theme.surfacePrimary }]} />

        <TouchableOpacity style={styles.menuItem} onPress={() => goTo('ProfileDetail')}>
          <Icon name="user" size={22 * scale} color={theme.text} />
          <Text style={[styles.menuText, { color: theme.text }]}>{t('sidebar.profile')}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => goTo('Subscription')}>
          <Icon name="diamond" size={22 * scale} color={theme.text} />
          <Text style={[styles.menuText, { color: theme.text }]}>{t('sidebar.premium')}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => goTo('Settings')}>
          <Icon name="cog" size={22 * scale} color={theme.text} />
          <Text style={[styles.menuText, { color: theme.text }]}>{t('sidebar.settings')}</Text>
        </TouchableOpacity>

        <View style={[styles.line, { backgroundColor: theme.surfacePrimary }]} />

        <View style={styles.sidebarFooter}>
          <TouchableOpacity>
            <Text style={[styles.footerText, { color: theme.logoutTextColor }]}>
              {t('sidebar.logout')}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <TouchableOpacity
        style={[styles.overlayCloseArea, { backgroundColor: theme.overlay }]}
        activeOpacity={1}
        onPress={onClose}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  sidebarContainer: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    flexDirection: 'row',
    zIndex: 100,
  },
  sidebar: {
    width: 270 * scale,
    paddingTop: Platform.OS === 'ios' ? 50 * scale : 40 * scale,
    paddingHorizontal: 18 * scale,
    paddingBottom: 20 * scale,
    justifyContent: 'flex-start',
  },
  sidebarHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10 * scale,
    marginLeft: 10 * scale,
  },
  avatar: {
    width: 40 * scale,
    height: 40 * scale,
    borderRadius: 20 * scale,
    marginRight: 12 * scale,
  },
  username: {
    fontWeight: 'bold',
    fontSize: 17 * scale,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 26 * scale,
    gap: 12 * scale,
    marginLeft: 10 * scale,
  },
  menuText: {
    fontSize: 16 * scale,
    fontWeight: '600',
  },
  sidebarFooter: {
    marginTop: 'auto',
    marginBottom: 10 * scale,
  },
  footerText: {
    fontSize: 15 * scale,
    fontWeight: 'bold',
    marginBottom: 10 * scale,
    marginLeft: 10 * scale,
  },
  overlayCloseArea: {
    flex: 1,
  },
  line: {
    height: 1,
    width: '100%',
    marginVertical: 15 * scale,
  },
});
