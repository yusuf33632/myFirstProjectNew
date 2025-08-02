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
  SafeAreaView,
  Modal,
} from 'react-native';

import { Video } from 'expo-av';
import { BlurView } from 'expo-blur';
import LockedContentModal from '../../components/modals/LockedContentModal';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../src/context/ThemeContext';

const { width } = Dimensions.get('window');
const scale = width / 375;
const userImage = require('../../assets/users/user1.jpg');

export default function ChatDetailScreen({ navigation }) {
  const { t } = useTranslation();
  const { theme } = useTheme();

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
  const scrollViewRef = useRef();
  const isSubscribed = false;

  const sendMessage = () => {
    if (newMessage.trim() === '') return;
    const newMsg = {
      id: messages.length + 1,
      text: newMessage,
      sender: 'me',
      type: 'text',
    };
    setMessages([...messages, newMsg]);
    setNewMessage('');
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
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
      return <Text style={[styles.messageText, { backgroundColor: theme.surfacePrimary, color: theme.text }]}>{msg.text}</Text>;
    } else if (msg.type === 'image' || msg.type === 'video') {
      return (
        <TouchableOpacity onPress={() => isSubscribed ? setShowInfoModal(true) : setShowLockedModal(true)}>
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

  const recipient = {
    id: '1',
    name: 'Jessica',
    image: userImage,
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.containerBackground }]}>
      <KeyboardAvoidingView style={styles.keyboardView} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={[styles.container, { backgroundColor: theme.containerBackground }]}>
          {/* Header */}
          <View style={styles.header}>
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
            contentContainerStyle={{ paddingBottom: 20 * scale }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
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

          {/* Input */}
          <View style={[styles.messageInputContainer, { backgroundColor: theme.surfacePrimary }]}>
            <TextInput
              style={[styles.input, { color: theme.input, placeholderTextColor: theme.inputPlaceholder }]}
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
                onPress={() =>
                  navigation.navigate('SubscriptionGift', { selectedRecipient: recipient })
                }
              >
                <Icon name="gift" size={18 * scale} color={theme.text} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Info Modal */}
          <Modal visible={showInfoModal} transparent animationType="fade">
            <BlurView intensity={60} tint="dark" style={styles.modalBackground}>
              <View style={[styles.infoCard, { backgroundColor: theme.infoCardBackground }]}>
                <Text style={[styles.infoTitle, { color: theme.text }]}>{t('chat.subscription_title')}</Text>
                <Text style={[styles.infoText, { color: theme.subtext }]}>{t('chat.subscription_description')}</Text>
                <TouchableOpacity style={[styles.okButton, { backgroundColor: theme.primarySend }]} onPress={() => setShowInfoModal(false)}>
                  <Text style={[styles.okButtonText, { color: theme.text }]}>{t('chat.ok')}</Text>
                </TouchableOpacity>
              </View>
            </BlurView>
          </Modal>

          {/* Locked Modal */}
          <LockedContentModal
            visible={showLockedModal}
            onClose={() => setShowLockedModal(false)}
            onBuy={() => {
              setShowLockedModal(false);
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
    paddingTop: Platform.OS === 'ios' ? 10 * scale : 8 * scale,
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
    margin: 10 * scale,
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
});
