import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// AUTH
import SignInScreen from '../../screens/auth/SignInScreen';
import SignUpScreen from '../../screens/auth/SignUpScreen';
import NameInputScreen from '../../screens/auth/NameInputScreen';
import BirthdayScreen from '../../screens/auth/BirthdayScreen';
import GenderSelectionScreen from '../../screens/auth/GenderSelectionScreen';
import LanguageSelectionScreen from '../../screens/auth/LanguageSelectionScreen';
import RelationshipPreferenceScreen from '../../screens/auth/RelationshipPreferenceScreen';
import PartnerAgeRangeScreen from '../../screens/auth/PartnerAgeRangeScreen';
import CharacterTypeScreen from '../../screens/auth/CharacterTypeScreen';
import PersonalityTraitsScreen from '../../screens/auth/PersonalityTraitsScreen';
import ProfilePhotoScreen from '../../screens/auth/ProfilePhotoScreen';
import ProfileReadyScreen from '../../screens/auth/ProfileReadyScreen';

// PROFILE
import ProfileDetailScreen from '../../screens/profile/ProfileDetailScreen';
import ProfileEditScreen from '../../screens/preferences/ProfileEditScreen';
import ProfileAiDetailScreen from '../../screens/profile/ProfileAiDetailScreen';

// PREFERENCES
import InterestsScreen from '../../screens/preferences/InterestsScreen';

// CHAT
import ChatListScreen from '../../screens/chat/ChatListScreen';
import ChatDetailScreen from '../../screens/chat/ChatDetailScreen';
import IncomingCallScreen from '../../screens/chat/IncomingCallScreen';

// IMAGE
import ImageDetailScreen from '../../screens/image/ImageDetailScreen';
import ImageAiDetailScreen from '../../screens/image/ImageAiDetailScreen';

// LANGUAGE
import LanguageSettingsScreen from '../../screens/language/LanguageSettingsScreen';

// SUBSCRIPTION
import SubscriptionScreen from '../../screens/subscription/SubscriptionScreen';
import SubscriptionGiftScreen from '../../screens/subscription/SubscriptionGiftScreen';
import SelectRecipientScreen from '../../screens/subscription/SelectRecipientScreen';

// SETTINGS
import SettingsScreen from '../../screens/settings/SettingsScreen';
import ThemeSelectionScreen from '../../screens/settings/ThemeSelectionScreen';
import NotificationSettingsScreen from '../../screens/settings/NotificationSettingsScreen';

// SUPPORT
import SupportScreen from '../../screens/support/SupportScreen';
import ReportIssueScreen from '../../screens/support/ReportIssueScreen';
import AboutAppScreen from '../../screens/support/AboutAppScreen';
import PrivacyPolicyScreen from '../../screens/settings/PrivacyPolicyScreen';

// COIN
import CoinPurchaseScreen from '../../screens/coin/CoinPurchaseScreen';

// COMMON
import HomeScreen from '../../screens/common/HomeScreen';
import SearchScreen from '../../screens/common/SearchScreen';
import NotificationScreen from '../../screens/common/NotificationScreen';

import CharacterDetail from '../../components/character/CharacterDetail';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="NameInput" component={NameInputScreen} />
      <Stack.Screen name="Interests" component={InterestsScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="ChatList" component={ChatListScreen} />
      <Stack.Screen name="Subscription" component={SubscriptionScreen} />
      <Stack.Screen name="ProfileDetail" component={ProfileDetailScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="ImageDetail" component={ImageDetailScreen} />
      <Stack.Screen name="ProfileEdit" component={ProfileEditScreen} />
      <Stack.Screen name="ProfileAiDetail" component={ProfileAiDetailScreen} />
      <Stack.Screen name="ImageAiDetail" component={ImageAiDetailScreen} />
      <Stack.Screen name="Birthday" component={BirthdayScreen} />
      <Stack.Screen name="GenderSelection" component={GenderSelectionScreen} />
      <Stack.Screen name="LanguageSelection" component={LanguageSelectionScreen} />
      <Stack.Screen name="RelationshipPreference" component={RelationshipPreferenceScreen} />
      <Stack.Screen name="PartnerAgeRange" component={PartnerAgeRangeScreen} />
      <Stack.Screen name="CharacterType" component={CharacterTypeScreen} />
      <Stack.Screen name="PersonalityTraits" component={PersonalityTraitsScreen} />
      <Stack.Screen name="ProfilePhoto" component={ProfilePhotoScreen} />
      <Stack.Screen name="ProfileReady" component={ProfileReadyScreen} />
      <Stack.Screen name="CharacterDetail" component={CharacterDetail} />
      <Stack.Screen name="ChatDetail" component={ChatDetailScreen} />
      <Stack.Screen name="SubscriptionGift" component={SubscriptionGiftScreen} />
      <Stack.Screen name="IncomingCall" component={IncomingCallScreen} />
      <Stack.Screen name="SelectRecipient" component={SelectRecipientScreen} />
      <Stack.Screen name="ThemeSelection" component={ThemeSelectionScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="CoinPurchase" component={CoinPurchaseScreen} />
      <Stack.Screen name="Notification" component={NotificationScreen} />
      <Stack.Screen name="NotificationSettings" component={NotificationSettingsScreen} />
      <Stack.Screen name="LanguageSettings" component={LanguageSettingsScreen} />
      <Stack.Screen name="Support" component={SupportScreen} />
      <Stack.Screen name="ReportIssue" component={ReportIssueScreen} />
      <Stack.Screen name="AboutApp" component={AboutAppScreen} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
    </Stack.Navigator>
  );
}
