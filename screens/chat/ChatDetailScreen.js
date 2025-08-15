// ChatDetailScreen.js
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  Modal,
  Keyboard,
  StyleSheet as RNStyleSheet,
  Pressable,
} from 'react-native';

import { Video } from 'expo-av';
import { BlurView } from 'expo-blur';
import LockedContentModal from '../../components/modals/LockedContentModal';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../src/context/ThemeContext';
import * as NavigationBar from 'expo-navigation-bar';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

// Reanimated for sheet/overlay animation (SubscriptionScreen ile aynı mantık)
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');
const scale = width / 375;
const userImage = require('../../assets/users/user1.jpg');

// Extra lift for Android input bar when keyboard is CLOSED
const ANDROID_INPUT_LIFT = 12 * scale;

export default function ChatDetailScreen({ navigation }) {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  const [messages, setMessages] = useState([
    { id: 1, text: 'Merhaba!', sender: 'other', type: 'text' },
    { id: 2, text: 'Nasılsın?', sender: 'me', type: 'text' },
    {
      id: 3,
      sender: 'other',
      type: 'image',
      mediaUri: Image.resolveAssetSource(require('../../assets/users/user1.jpg')).uri,
    },
    {
      id: 4,
      sender: 'other',
      type: 'video',
      mediaUri: 'https://www.w3schools.com/html/mov_bbb.mp4',
    },
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showLockedModal, setShowLockedModal] = useState(false);
  const [typing, setTyping] = useState(false);

  // Keyboard state (Android)
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const scrollViewRef = useRef();
  const isSubscribed = false;

  // Track keyboard height/open state for Android precise positioning
  useEffect(() => {
    const onShow = (e) => {
      setKeyboardOpen(true);
      setKeyboardHeight(e?.endCoordinates?.height ?? 0);
      requestAnimationFrame(() => scrollViewRef.current?.scrollToEnd({ animated: true }));
    };
    const onHide = () => {
      setKeyboardOpen(false);
      setKeyboardHeight(0);
    };

    const showSub = Keyboard.addListener('keyboardDidShow', onShow);
    const hideSub = Keyboard.addListener('keyboardDidHide', onHide);
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  // Modal open/close helpers
  const handleShowInfoModal = () => {
    setShowInfoModal(true);
    if (Platform.OS === 'android') {
      NavigationBar.setVisibilityAsync('hidden').catch(() => {});
    }
  };

  const handleCloseInfoModal = () => {
    setShowInfoModal(false);
    if (Platform.OS === 'android') {
      NavigationBar.setVisibilityAsync('visible').catch(() => {});
    }
  };

  const handleShowLockedModal = () => {
    setShowLockedModal(true);
    if (Platform.OS === 'android') {
      NavigationBar.setVisibilityAsync('hidden').catch(() => {});
    }
  };

  const handleCloseLockedModal = () => {
    setShowLockedModal(false);
    if (Platform.OS === 'android') {
      NavigationBar.setVisibilityAsync('visible').catch(() => {});
    }
  };

  const sendMessage = () => {
    if (newMessage.trim() === '') return;
    const newMsg = {
      id: messages.length + 1,
      text: newMessage,
      sender: 'me',
      type: 'text',
    };
    setMessages((prev) => [...prev, newMsg]);
    setNewMessage('');
    setTimeout(() => scrollViewRef.current?.scrollToEnd({ animated: true }), 100);
  };

  useEffect(() => {
    const last = messages[messages.length - 1];
    if (last?.sender === 'other') {
      setTyping(true);
      const timeout = setTimeout(() => setTyping(false), 1500);
      return () => clearTimeout(timeout);
    }
  }, [messages]);

  const renderMessageContent = (msg) => {
    if (msg.type === 'text') {
      return (
        <Text style={[styles.messageText, { backgroundColor: theme.surfacePrimary, color: theme.text }]}>
          {msg.text}
        </Text>
      );
    } else if (msg.type === 'image' || msg.type === 'video') {
      const onPressHandler = () => {
        if (isSubscribed) {
          handleShowInfoModal();
        } else {
          handleShowLockedModal();
        }
      };

      return (
        <TouchableOpacity onPress={onPressHandler}>
          {msg.type === 'image' ? (
            <Image source={{ uri: msg.mediaUri }} style={styles.messageImage} />
          ) : (
            <View style={styles.videoWrapper}>
              <Video
                source={{ uri: msg.mediaUri }}
                style={StyleSheet.absoluteFill}
                resizeMode="cover"
                isMuted
                shouldPlay={false}
                useNativeControls={false}
                isLooping={false}
              />
            </View>
          )}
        </TouchableOpacity>
      );
    }
    return null;
  };

  const recipient = { id: '1', name: 'Jessica', image: userImage };

  // Android input offset
  const androidBottomOffset = keyboardOpen
    ? Math.max(keyboardHeight, 0) + 50
    : Math.max(insets.bottom, 10) + ANDROID_INPUT_LIFT;

  // ===== Bottom-sheet animasyon (SubscriptionScreen ile aynı) =====
  const isDetailVisible = showInfoModal || showLockedModal; // tek bayrak
  const sheetY = useSharedValue(height);      // başta ekranın altında
  const overlayOpacity = useSharedValue(0);   // karartma görünmez

  useEffect(() => {
    if (isDetailVisible) {
      sheetY.value = withTiming(0, { duration: 260 });         // aşağıdan yukarı
      overlayOpacity.value = withTiming(1, { duration: 200 }); // kararma görünür
    } else {
      sheetY.value = withTiming(height, { duration: 220 });     // geri aşağı
      overlayOpacity.value = withTiming(0, { duration: 180 });  // kararma kaybolur
    }
  }, [isDetailVisible, sheetY, overlayOpacity]);

  const overlayStyle = useAnimatedStyle(() => ({ opacity: overlayOpacity.value }));
  const sheetStyle = useAnimatedStyle(() => ({ transform: [{ translateY: sheetY.value }] }));

  // Safety: restore nav bar on unmount
  useEffect(() => {
    return () => {
      if (Platform.OS === 'android') {
        NavigationBar.setVisibilityAsync('visible').catch(() => {});
      }
    };
  }, []);

  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={[styles.safeArea, { backgroundColor: theme.containerBackground }]}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? -insets.bottom + Math.round(4 * scale) : 0}
      >
        <View style={[styles.container, { backgroundColor: theme.containerBackground }]}>
          {/* Header */}
          <View
            style={[
              styles.header,
              { paddingTop: Platform.OS === 'ios' ? 10 * scale : 8 * scale },
            ]}
          >
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <Icon name="arrow-back-outline" size={18 * scale} color={theme.text} />
            </TouchableOpacity>
            <Image source={userImage} style={styles.avatar} />
            <Text style={[styles.username, { color: theme.text }]}>Jessika</Text>
            <TouchableOpacity onPress={() => navigation.navigate('IncomingCall')}>
              <Icon name="call-outline" size={18 * scale} color={theme.text} style={styles.callIcon} />
            </TouchableOpacity>
          </View>

          {/* Messages */}
          <ScrollView
            ref={scrollViewRef}
            style={styles.messagesContainer}
            contentContainerStyle={{ paddingBottom: 12 * scale }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            onContentSizeChange={() => {
              scrollViewRef.current?.scrollToEnd({ animated: false });
            }}
          >
            {messages.map((msg) => (
              <View key={msg.id} style={msg.sender === 'me' ? styles.messageRight : styles.messageLeft}>
                {renderMessageContent(msg)}
              </View>
            ))}
            {typing && (
              <View style={styles.typingIndicator}>
                <View style={[styles.dot, { backgroundColor: theme.subtext }]} />
                <View style={[styles.dot, { backgroundColor: theme.subtext }]} />
                <View style={[styles.dot, { backgroundColor: theme.subtext }]} />
              </View>
            )}
          </ScrollView>

          {/* Bottom input bar */}
          <SafeAreaView edges={Platform.OS === 'ios' ? ['bottom'] : []} style={{ backgroundColor: 'transparent' }}>
            <View
              style={[
                styles.messageInputContainer,
                {
                  backgroundColor: theme.surfacePrimary,
                  marginBottom: Platform.OS === 'android' ? androidBottomOffset : 0,
                },
              ]}
            >
              <TextInput
                style={[styles.input, { color: theme.input }]}
                placeholder={t('chat.input_placeholder')}
                placeholderTextColor={theme.inputPlaceholder}
                value={newMessage}
                onChangeText={setNewMessage}
                multiline
              />
              <View style={styles.buttonsContainer}>
                <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
                  <Icon name="send" size={18 * scale} color={theme.text} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.giftButton}
                  onPress={() => navigation.navigate('SubscriptionGift', { selectedRecipient: recipient })}
                >
                  <Icon name="gift" size={18 * scale} color={theme.text} />
                </TouchableOpacity>
              </View>
            </View>
          </SafeAreaView>

          {/* Info Modal → bottom-sheet (Subscription ile aynı yerleşim) */}
          <Modal
            visible={showInfoModal}
            transparent
            animationType={Platform.OS === 'ios' ? 'fade' : 'none'}
            statusBarTranslucent
            onRequestClose={handleCloseInfoModal}
          >
            {/* Dışa bas → kapat */}
            <Pressable style={[styles.overlay, overlayStyle]} onPress={handleCloseInfoModal}>
              {/* Blur dokunuşları üstteki Pressable’a bıraksın */}
              <BlurView intensity={60} tint="dark" style={styles.blurBackground} pointerEvents="box-none">
                {/* Kart: sadece kendi iç dokunuşlarını alsın */}
                <Animated.View
                  style={[styles.card, sheetStyle, { backgroundColor: theme.infoCardBackground }]}
                  pointerEvents="auto"
                >
                  {/* İçte tıklayınca modal kapanmasın */}
                  <Pressable onStartShouldSetResponder={() => true}>
                    <View style={styles.sheetInner}>
                      <Text style={[styles.infoTitle, { color: theme.text }]}>{t('chat.subscription_title')}</Text>
                      <Text style={[styles.infoText, { color: theme.subtext }]}>{t('chat.subscription_description')}</Text>
                      <TouchableOpacity
                        style={[styles.okButton, { backgroundColor: theme.primarySend }]}
                        onPress={handleCloseInfoModal}
                      >
                        <Text style={[styles.okButtonText, { color: theme.text }]}>{t('chat.ok')}</Text>
                      </TouchableOpacity>
                    </View>
                  </Pressable>
                </Animated.View>
              </BlurView>
            </Pressable>
          </Modal>

          {/* Locked Modal (değişmedi) */}
          <LockedContentModal
            visible={showLockedModal}
            onClose={handleCloseLockedModal}
            onBuy={() => {
              handleCloseLockedModal();
              navigation.navigate('CoinPurchase');
            }}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  keyboardView: { flex: 1 },
  container: { flex: 1 },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12 * scale,
    marginBottom: 10 * scale,
  },
  backButton: { padding: 6 * scale, marginRight: 6 * scale },
  avatar: {
    width: 34 * scale,
    height: 34 * scale,
    borderRadius: 17 * scale,
    marginHorizontal: 8 * scale,
  },
  username: { fontWeight: 'bold', fontSize: 16 * scale, flex: 1 },
  callIcon: { marginLeft: 8 * scale },

  messagesContainer: { paddingHorizontal: 14 * scale, flex: 1 },
  messageLeft: {
    alignSelf: 'flex-start',
    marginTop: 10 * scale,
    maxWidth: width * 0.75,
  },
  messageRight: {
    alignSelf: 'flex-end',
    marginTop: 10 * scale,
    maxWidth: width * 0.75,
  },
  messageText: {
    fontSize: 13 * scale,
    borderRadius: 10 * scale,
    padding: 8 * scale,
  },
  messageImage: {
    width: width * 0.55,
    height: width * 0.4,
    borderRadius: 10 * scale,
  },
  videoWrapper: {
    width: width * 0.55,
    height: width * 0.4,
    borderRadius: 10 * scale,
    overflow: 'hidden',
  },

  messageInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 25 * scale,
    marginHorizontal: 10 * scale,
    marginTop: 6 * scale,
    paddingHorizontal: 12 * scale,
    paddingVertical: 8 * scale,
  },
  input: {
    flex: 1,
    fontSize: 14 * scale,
    paddingVertical: 8 * scale,
    maxHeight: 100 * scale,
  },
  sendButton: { paddingHorizontal: 8 * scale },
  giftButton: { paddingHorizontal: 5 * scale, marginLeft: 8 * scale },
  buttonsContainer: { flexDirection: 'row', alignItems: 'center', marginLeft: 6 * scale },

  typingIndicator: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    marginTop: 10 * scale,
    marginLeft: 5 * scale,
    height: 20 * scale,
    alignItems: 'center',
  },
  dot: {
    width: 6 * scale,
    height: 6 * scale,
    borderRadius: 3 * scale,
    marginHorizontal: 2 * scale,
  },

  // (Önceden var olan merkez modal stilleri dokunulmadı)
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoCard: {
    padding: 24 * scale,
    borderRadius: 20 * scale,
    width: width * 0.85,
    alignItems: 'center',
  },
  infoTitle: {
    fontSize: 18 * scale,
    fontWeight: 'bold',
    marginBottom: 8 * scale,
    textAlign: 'center',
  },
  infoText: {
    fontSize: 14 * scale,
    textAlign: 'center',
    lineHeight: 20 * scale,
    marginBottom: 18 * scale,
  },
  okButton: {
    paddingHorizontal: 24 * scale,
    paddingVertical: 10 * scale,
    borderRadius: 12 * scale,
  },
  okButtonText: {
    fontWeight: 'bold',
    fontSize: 14 * scale,
  },

  // Bottom-sheet overlay + blur + card (SubscriptionScreen ile aynı)
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
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0, // alt kenara sabitle
    width: width,
    borderTopLeftRadius: 24 * scale,
    borderTopRightRadius: 24 * scale,
    paddingHorizontal: 20 * scale,
    paddingTop: 18 * scale,
    paddingBottom: 20 * scale,
  },
  sheetInner: {
    width: '100%',
    alignItems: 'center',
  },
});
