import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import BottomBar from '../../components/navigation/BottomBar';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../src/context/ThemeContext'; // Tema sistemi

const { width } = Dimensions.get('window');
const scale = width / 375;

const coinPackages = [
  50, 100, 150, 200, 250, 300,
  350, 400, 500, 550, 600, 650,
];

const popularPackages = [200, 500, 650];

export default function CoinPurchaseScreen({ navigation }) {
  const { t } = useTranslation();
  const { theme } = useTheme();

  const renderItem = ({ item }) => {
    const isPopular = popularPackages.includes(item);

    const handlePurchase = () => {
      Alert.alert(
        t('coin_purchase.alert_title', { amount: item }),
        t('coin_purchase.alert_description'),
        [
          { text: t('common.cancel'), style: 'cancel' },
          {
            text: t('coin_purchase.confirm_button'),
            onPress: () => {
              Alert.alert(
                t('coin_purchase.success_title'),
                t('coin_purchase.success_message', { amount: item })
              );
              // Satın alma işlemi burada entegre edilebilir
            },
          },
        ],
        { cancelable: true }
      );
    };

    return (
      <TouchableOpacity
        style={[
          styles.packageBox,
          { backgroundColor: theme.coinPackageBoxBackground },
          isPopular && {
            backgroundColor: theme.coinPopularBoxBackground,
            borderWidth: 1,
            borderColor: theme.popularBadgeBackground,
          },
        ]}
        onPress={handlePurchase}
      >
        {isPopular && (
          <View style={[styles.popularBadge, { backgroundColor: theme.popularBadgeBackground }]}>
            <Text style={[styles.popularText, { color: theme.popularBadgeText }]}>
              ⭐ {t('coin_purchase.popular')}
            </Text>
          </View>
        )}
        <Image
          source={require('../../assets/gifts/crystal.png')}
          style={styles.coinIcon}
          resizeMode="contain"
        />
        <Text style={[styles.coinText, { color: theme.text }]}>{item}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.containerBackground }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="chevron-back" size={24 * scale} color={theme.text} />
          </TouchableOpacity>
          <Text style={[styles.headerText, { color: theme.headerTextColor }]}>
            {t('coin_purchase.title')}
          </Text>
          <View style={{ width: 24 * scale }} />
        </View>

        <FlatList
          data={coinPackages}
          renderItem={renderItem}
          keyExtractor={(item) => item.toString()}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.listContent}
          scrollEnabled={false}
        />
      </ScrollView>

      <BottomBar activeTab="Subscription" navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16 * scale,
    paddingBottom: 24 * scale,
    paddingTop: 12 * scale,
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: 18 * scale,
    fontWeight: 'bold',
  },
  listContent: {
    paddingHorizontal: 16 * scale,
    paddingBottom: 20 * scale,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 16 * scale,
  },
  packageBox: {
    borderRadius: 16 * scale,
    width: (width - 48 * scale) / 2,
    alignItems: 'center',
    paddingVertical: 16 * scale,
    marginBottom: 8 * scale,
    position: 'relative',
  },
  popularBadge: {
    position: 'absolute',
    top: 8 * scale,
    right: 8 * scale,
    paddingHorizontal: 6 * scale,
    paddingVertical: 2 * scale,
    borderRadius: 8 * scale,
  },
  popularText: {
    fontSize: 10 * scale,
    fontWeight: 'bold',
  },
  coinIcon: {
    width: 32 * scale,
    height: 32 * scale,
    marginBottom: 8 * scale,
  },
  coinText: {
    fontSize: 14 * scale,
    fontWeight: 'bold',
  },
});
