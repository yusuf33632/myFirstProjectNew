import React, { useState, useEffect } from 'react';
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
  Image,
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

export default function SubscriptionScreen({ navigation }) {
  const [selectedPlan, setSelectedPlan] = useState('basic');
  const [isDetailVisible, setIsDetailVisible] = useState(false);
  const { t } = useTranslation();
  const { theme } = useTheme();

  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, { duration: 8000 }),
      -1
    );
  }, []);

  const animatedRotationStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  return (
    <View style={[styles.screenContainer, { backgroundColor: theme.subscriptionScreenBackground }]}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Icon name="arrow-back-outline" size={18 * scale} color={theme.subscriptionBackIcon} />
          </TouchableOpacity>
          <Text style={[styles.title, { color: theme.subscriptionHeaderText }]}> 
            {t('subscription.title')}
          </Text>
        </View>

        <View style={styles.tabContainer}>
          {plans.map((plan) => {
            const isActive = selectedPlan === plan;
            return (
              <TouchableOpacity
                key={plan}
                style={[styles.tab, {
                  backgroundColor: isActive
                    ? theme.subscriptionTabActiveBackground
                    : theme.subscriptionTabBackground,
                }]}
                onPress={() => setSelectedPlan(plan)}>
                <Text style={[styles.tabText, {
                  color: isActive ? theme.subscriptionTabActiveText : theme.subscriptionTabText,
                }]}> 
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
              exiting={SlideOutLeft.springify().damping(16).mass(0.6)}>
              <View style={[styles.planBox, { backgroundColor: theme.subscriptionPlanBoxBackground, shadowColor: theme.planBoxShadow }]}>
                <View style={styles.planHeader}>
                  <View style={[styles.planIconWrapper, { shadowColor: theme.planIconShadow }]}>
                    <Animated.Image
                      source={planIcons[plan]}
                      style={[styles.planIcon, animatedRotationStyle]}
                    />
                  </View>
                  <Text style={[styles.planTitle, { color: theme.text }]}>
                    {t(`subscription.plan.${plan}`)}
                  </Text>
                </View>

                <View style={styles.featureList}>
                  {planFeatures[plan].map((key, idx) => (
                    <View key={idx} style={styles.featureItem}>
                      <Icon name="checkmark-circle" size={18 * scale} color={theme.checkIconColor} style={styles.featureIcon} />
                      <Text style={[styles.featureText, { color: theme.subscriptionPlanText }]}> {t(key)} </Text>
                    </View>
                  ))}
                </View>

                <TouchableOpacity
                  style={[styles.button, { backgroundColor: theme.subscriptionDetailButtonBackground }]}
                  onPress={() => setIsDetailVisible(true)}>
                  <Text style={[styles.buttonText, { color: theme.subscriptionDetailButtonText }]}> 
                    {t('subscription.details')} 
                  </Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          ) : null
        )}
      </ScrollView>

      <Modal visible={isDetailVisible} transparent animationType="fade">
        <Pressable style={styles.overlay} onPress={() => setIsDetailVisible(false)}>
          <BlurView intensity={60} tint="dark" style={styles.blurBackground}>
            <Pressable style={[styles.card, { backgroundColor: theme.subscriptionModalBackground }]}>
              <SubscriptionDetail />
            </Pressable>
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
    flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', position: 'relative', marginBottom: 24 * scale,
  },
  title: {
    fontSize: 18 * scale, fontWeight: 'bold', textAlign: 'center', position: 'absolute', left: 0, right: 0,
  },
  backButton: {
    padding: 6 * scale, marginRight: 8 * scale, zIndex: 2,
  },
  tabContainer: {
    flexDirection: 'row', justifyContent: 'center', marginBottom: 30 * scale, gap: 8 * scale, flexWrap: 'wrap',
  },
  tab: {
    paddingVertical: 6 * scale, paddingHorizontal: 12 * scale, borderRadius: 14 * scale,
  },
  tabText: {
    fontWeight: 'bold', fontSize: 13 * scale,
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
    flexDirection: 'row', alignItems: 'center', marginBottom: 24 * scale,
  },
  planIconWrapper: {
    width: 90 * scale, height: 90 * scale, borderRadius: 45 * scale, justifyContent: 'center', alignItems: 'center', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.4, shadowRadius: 12, elevation: 8, marginRight: 16 * scale,
  },
  planIcon: {
    width: 85 * scale, height: 85 * scale, resizeMode: 'contain',
  },
  planTitle: {
    fontSize: 35 * scale, fontWeight: 'bold',
  },
  featureList: {
    marginBottom: 24 * scale,
  },
  featureItem: {
    flexDirection: 'row', alignItems: 'center', marginBottom: 12 * scale,
  },
  featureIcon: {
    marginRight: 10 * scale,
  },
  featureText: {
    fontSize: 18 * scale,
  },
  button: {
    alignItems: 'center', paddingVertical: 10 * scale, borderRadius: 12 * scale, alignSelf: 'center', paddingHorizontal: 30 * scale, marginTop: 20 * scale,
  },
  buttonText: {
    fontWeight: 'bold', fontSize: 14 * scale,
  },
  overlay: {
    flex: 1, justifyContent: 'flex-end', alignItems: 'center',
  },
  blurBackground: {
    flex: 1, width: '100%', justifyContent: 'flex-end', alignItems: 'center',
  },
  card: {
    width: width, borderTopLeftRadius: 24 * scale, borderTopRightRadius: 24 * scale,
  },
});
