// SubscriptionScreen.js
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform,
  ScrollView,
  Modal,
  Pressable,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import SubscriptionDetail from '../../components/ui/SubscriptionDetail';
import { BlurView } from 'expo-blur';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../src/context/ThemeContext';
import Animated, {
  SlideInRight,
  SlideOutLeft,
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';

// 🔗 Web tarayıcı + deep link (Expo Go uyumlu)
import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';
// ⬇️ Android nav bar kontrolü (ChatDetailScreen’deki mantıkla aynı)
import * as NavigationBar from 'expo-navigation-bar';

// Stripe/Web checkout dönüşlerini düzgün kapatmak için
WebBrowser.maybeCompleteAuthSession();

// 👉 Kendi backend kökün (LAN IP'n):
const BACKEND_URL = 'http://192.168.1.108:5056/api/v1';

const { width, height } = Dimensions.get('window');
const scale = width / 375;

const plans = ['basic', 'standard', 'premium', 'premiumPlus'];

const planFeatures = {
  basic: ['feature.msg', 'feature.1photo', 'feature.1voice', 'feature.1call', 'feature.bonus'],
  standard: ['feature.50photo', 'feature.100voice', 'feature.1hourcall', 'feature.10video', 'feature.50coin'],
  premium: ['feature.150photo', 'feature.300voice', 'feature.3hourcall', 'feature.30video', 'feature.100coin'],
  premiumPlus: ['feature.500photo', 'feature.500voice', 'feature.10hourcall', 'feature.100video', 'feature.150coin'],
};

const planIcons = {
  basic: require('../../assets/subscription/hexagon (1).png'),
  standard: require('../../assets/subscription/hexagon (2).png'),
  premium: require('../../assets/subscription/hexagon.png'),
  premiumPlus: require('../../assets/subscription/amethyst.png'),
};

const planPricing = {
  basic: { label: '1| Ay', price: '$4.90', note: 'aylık' },
  standard: { label: '3| Ay', price: '$6.90', note: 'aylık' },
  premium: { label: '6| Ay', price: '$8.90', note: 'aylık' },
  premiumPlus: { label: '12| Ay', price: '$10.90', note: 'aylık' },
};

// 🔗 Başarılı/iptal redirection için deep link
const redirectUri = Linking.createURL('checkout-complete');

export default function SubscriptionScreen() {
  const [selectedPlan, setSelectedPlan] = useState('basic');
  const [isDetailVisible, setIsDetailVisible] = useState(false);
  const [serverPlans, setServerPlans] = useState([]); // Backend'den gelen plan listesi
  const { t } = useTranslation();
  const { theme } = useTheme();
  const navigation = useNavigation();

  // Dönen ikon (Android’te modal açıkken jank olmasın diye gizliyoruz)
  const rotation = useSharedValue(0);

  // Modal animasyonları (Android)
  const sheetY = useSharedValue(height);
  const overlayOpacity = useSharedValue(0);

  // Planları backend'den çek
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const resp = await fetch(`${BACKEND_URL}/subscriptions/plans`);
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
        const data = await resp.json();
        if (mounted && Array.isArray(data)) setServerPlans(data);
      } catch (e) {
        console.warn('Plans fetch error:', e?.message || e);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    rotation.value = withRepeat(withTiming(360, { duration: 8000 }), -1);
  }, [rotation]);

  const animatedRotationStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  useEffect(() => {
    if (isDetailVisible) {
      sheetY.value = withTiming(0, { duration: 260 });
      overlayOpacity.value = withTiming(1, { duration: 200 });
    } else {
      sheetY.value = withTiming(height, { duration: 220 });
      overlayOpacity.value = withTiming(0, { duration: 180 });
    }
  }, [isDetailVisible, sheetY, overlayOpacity]);

  const overlayStyle = useAnimatedStyle(() => ({
    opacity: overlayOpacity.value,
  }));

  const sheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: sheetY.value }],
  }));

  const planObj = useMemo(
    () => ({ type: selectedPlan, ...planPricing[selectedPlan] }),
    [selectedPlan]
  );

  // months (1/3/12) → backend planId eşlemesi (durationDays ≈ months*30)
  const getPlanIdForMonths = useCallback(
    (months) => {
      if (!serverPlans?.length || !months) return undefined;
      const expectedDays = Math.round(months * 30);
      let best = null;
      let bestDiff = Infinity;

      serverPlans.forEach((p) => {
        const d = Math.abs((p?.durationDays ?? 0) - expectedDays);
        if (d < bestDiff) {
          bestDiff = d;
          best = p;
        }
      });

      return best?.planId;
    },
    [serverPlans]
  );

  // Hosted checkout penceresi
  const openHostedCheckout = useCallback(async (checkoutUrl) => {
    try {
      if (checkoutUrl.startsWith('http')) {
        const result = await WebBrowser.openAuthSessionAsync(checkoutUrl, redirectUri);
        console.log('[Checkout] AuthSession result =', result);
      } else {
        await WebBrowser.openBrowserAsync(checkoutUrl);
      }
    } catch (e) {
      console.warn('WebBrowser error:', e?.message);
    }
  }, []);

  // 🚀 Expo Go uyumlu ödeme: Backend → /subscriptions/create-checkout
  const startHostedCheckout = useCallback(
    async (picked /* { label, price, note, months } */) => {
      try {
        console.log('[Checkout] redirectUri =', redirectUri);
        console.log('[Checkout] picked =', picked);

        const planId = getPlanIdForMonths(picked?.months);
        if (!planId) {
          Alert.alert('Hata', 'Uygun abonelik planı bulunamadı.');
          return;
        }

        const resp = await fetch(`${BACKEND_URL}/subscriptions/create-checkout`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ planId }), // Swagger: { planId: number }
        });

        if (!resp.ok) {
          const text = await resp.text().catch(() => '');
          throw new Error(`HTTP ${resp.status} – ${text || 'create-checkout failed'}`);
        }

        const data = await resp.json().catch(() => ({}));
        console.log('[Checkout] response =', data);

        const checkoutUrl =
          data?.url || data?.checkoutUrl || data?.paymentUrl || data?.redirectUrl;

        if (!checkoutUrl) {
          Alert.alert('Hata', 'Checkout URL alınamadı.');
          return;
        }

        await openHostedCheckout(checkoutUrl);
      } catch (e) {
        console.warn('Checkout error:', e);
        Alert.alert('Hata', e?.message || 'Bilinmeyen hata');
      }
    },
    [getPlanIdForMonths, openHostedCheckout]
  );

  // SubscriptionDetail'den gelen paket objesiyle ödeme başlat
  const handleProceedToPayment = useCallback(
    async (planFromDetail /* { label, price, note, months } */) => {
      handleCloseDetailModal(); // önce modalı kapat ve nav bar'ı görünür yap
      await startHostedCheckout(planFromDetail);
    },
    [startHostedCheckout]
  );

  // ⬇️ ChatDetailScreen’deki gibi: modal aç/kapa fonksiyonları içinde nav bar’ı kontrol et
  const handleOpenDetailModal = () => {
    setIsDetailVisible(true);
    if (Platform.OS === 'android') {
      NavigationBar.setVisibilityAsync('hidden').catch(() => {});
    }
  };

  const handleCloseDetailModal = () => {
    setIsDetailVisible(false);
    if (Platform.OS === 'android') {
      NavigationBar.setVisibilityAsync('visible').catch(() => {});
    }
  };

  // Emniyet: ekran unmount olursa nav bar'ı geri getir
  useEffect(() => {
    return () => {
      if (Platform.OS === 'android') {
        NavigationBar.setVisibilityAsync('visible').catch(() => {});
      }
    };
  }, []);

  return (
    <View style={[styles.screenContainer, { backgroundColor: theme.subscriptionScreenBackground }]}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Icon name="arrow-back-outline" size={18 * scale} color={theme.subscriptionBackIcon} />
          </TouchableOpacity>
          <Text style={[styles.title, { color: theme.subscriptionHeaderText }]}>{t('subscription.title')}</Text>
        </View>

        <View style={styles.tabContainer}>
          {plans.map((plan) => {
            const isActive = selectedPlan === plan;
            return (
              <TouchableOpacity
                key={plan}
                style={[
                  styles.tab,
                  {
                    backgroundColor: isActive
                      ? theme.subscriptionTabActiveBackground
                      : theme.subscriptionTabBackground,
                  },
                ]}
                onPress={() => setSelectedPlan(plan)}
              >
                <Text
                  style={[
                    styles.tabText,
                    { color: isActive ? theme.subscriptionTabActiveText : theme.subscriptionTabText },
                  ]}
                >
                  {t(`subscription.plan.${plan}`)}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {plans.map((plan) =>
          selectedPlan === plan ? (
            <Animated.View
              key={plan}
              entering={SlideInRight.springify().damping(16).mass(0.6)}
              exiting={SlideOutLeft.springify().damping(16).mass(0.6)}
            >
              <View
                style={[
                  styles.planBox,
                  { backgroundColor: theme.subscriptionPlanBoxBackground, shadowColor: theme.planBoxShadow },
                ]}
              >
                <View style={styles.planHeader}>
                  <View style={[styles.planIconWrapper, { shadowColor: theme.planIconShadow }]}>
                    {/* Android’te modal açıkken dönen ikon render edilmesin → jank azalır */}
                    {!(Platform.OS === 'android' && isDetailVisible) && (
                      <Animated.Image source={planIcons[plan]} style={[styles.planIcon, animatedRotationStyle]} />
                    )}
                  </View>
                  <Text style={[styles.planTitle, { color: theme.text }]}>{t(`subscription.plan.${plan}`)}</Text>
                </View>

                <View style={styles.featureList}>
                  {planFeatures[plan].map((key, idx) => (
                    <View key={idx} style={styles.featureItem}>
                      <Icon
                        name="checkmark-circle"
                        size={18 * scale}
                        color={theme.checkIconColor}
                        style={styles.featureIcon}
                      />
                      <Text style={[styles.featureText, { color: theme.subscriptionPlanText }]}>{t(key)}</Text>
                    </View>
                  ))}
                </View>

                <TouchableOpacity
                  style={[styles.button, { backgroundColor: theme.subscriptionDetailButtonBackground }]}
                  onPress={handleOpenDetailModal}
                >
                  <Text style={[styles.buttonText, { color: theme.subscriptionDetailButtonText }]}>
                    {t('subscription.details')}
                  </Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          ) : null
        )}
      </ScrollView>

      <Modal
        visible={isDetailVisible}
        transparent
        animationType={Platform.OS === 'ios' ? 'fade' : 'none'}
        statusBarTranslucent
        hardwareAccelerated
        presentationStyle={Platform.OS === 'android' ? 'overFullScreen' : undefined}
        onRequestClose={handleCloseDetailModal}
      >
        {/* Dışa tıkla → kapat */}
        <Pressable style={[styles.overlay, overlayStyle]} onPress={handleCloseDetailModal}>
          {/* Blur dokunuşları üstteki Pressable’a bıraksın */}
          <BlurView intensity={30} tint="dark" style={styles.blurBackground} pointerEvents="box-none">
            {/* Kart: sadece kendi iç dokunuşlarını alsın */}
            <Animated.View
              style={[styles.card, sheetStyle, { backgroundColor: theme.subscriptionModalBackground }]}
              pointerEvents="auto"
            >
              {/* İçte tıklayınca modal kapanmasın */}
              <Pressable onStartShouldSetResponder={() => true}>
                {/* SubscriptionDetail → months içeren obje döndürmeli */}
                <SubscriptionDetail onPay={(pickedPlan) => handleProceedToPayment(pickedPlan)} />
              </Pressable>
            </Animated.View>
          </BlurView>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: { flex: 1 },
  container: {
    paddingTop: Platform.OS === 'ios' ? 60 * scale : 40 * scale,
    paddingHorizontal: 16 * scale,
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    position: 'relative',
    marginBottom: 24 * scale,
  },
  title: {
    fontSize: 18 * scale,
    fontWeight: 'bold',
    textAlign: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
  },
  backButton: {
    padding: 6 * scale,
    marginRight: 8 * scale,
    zIndex: 2,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30 * scale,
    gap: 8 * scale,
    flexWrap: 'wrap',
  },
  tab: {
    paddingVertical: 6 * scale,
    paddingHorizontal: 12 * scale,
    borderRadius: 14 * scale,
  },
  tabText: {
    fontWeight: 'bold',
    fontSize: 13 * scale,
  },
  planBox: {
    borderRadius: 14 * scale,
    paddingVertical: 24 * scale,
    paddingHorizontal: 20 * scale,
    marginBottom: 20 * scale,
    width: width * 0.85,
    minHeight: height * 0.7,
    alignSelf: 'center',
    justifyContent: 'space-between',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 18 * scale,
    elevation: 14,
  },
  planHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24 * scale,
  },
  planIconWrapper: {
    width: 90 * scale,
    height: 90 * scale,
    borderRadius: 45 * scale,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
    marginRight: 16 * scale,
  },
  planIcon: {
    width: 85 * scale,
    height: 85 * scale,
    resizeMode: 'contain',
  },
  planTitle: {
    fontSize: 35 * scale,
    fontWeight: 'bold',
  },
  featureList: {
    marginBottom: 24 * scale,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12 * scale,
  },
  featureIcon: {
    marginRight: 10 * scale,
  },
  featureText: {
    fontSize: 18 * scale,
  },
  button: {
    alignItems: 'center',
    paddingVertical: 10 * scale,
    borderRadius: 12 * scale,
    alignSelf: 'center',
    paddingHorizontal: 30 * scale,
    marginTop: 20 * scale,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 14 * scale,
  },
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  blurBackground: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  card: {
    width: width,
    borderTopLeftRadius: 24 * scale,
    borderTopRightRadius: 24 * scale,
  },
});
