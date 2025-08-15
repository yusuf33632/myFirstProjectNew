import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

// ✅ use the safe-area-context version
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

const IncomingCallScreen = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();

  const [callStarted, setCallStarted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [duration, setDuration] = useState(0);
  const [isSpeakerOn, setIsSpeakerOn] = useState(false);

  useEffect(() => {
    const ringingTimeout = setTimeout(() => setCallStarted(true), 3000);
    return () => clearTimeout(ringingTimeout);
  }, []);

  useEffect(() => {
    let timer;
    if (callStarted && !callEnded) {
      timer = setInterval(() => setDuration((prev) => prev + 1), 1000);
    }
    return () => clearInterval(timer);
  }, [callStarted, callEnded]);

  useEffect(() => {
    if (callEnded) {
      const timeout = setTimeout(() => navigation.goBack(), 2000);
      return () => clearTimeout(timeout);
    }
  }, [callEnded, navigation]);

  const toggleSpeaker = () => setIsSpeakerOn((prev) => !prev);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  // Top spacing for labels (safe and consistent across iOS/Android)
  const SAFE_TOP = Platform.select({
    ios: insets.top + 12, // use dynamic notch inset
    android: (StatusBar.currentHeight || 0) + 12,
  });

  return (
    <View style={styles.root}>
      {/* Full-bleed background under safe areas */}
      <ImageBackground
        source={require('../../assets/users/user1.jpg')}
        style={StyleSheet.absoluteFillObject}
        resizeMode="cover"
      />

      {/* Foreground content stays within safe area */}
      <SafeAreaView style={styles.safeContent} edges={['top', 'bottom', 'left', 'right']}>
        <StatusBar translucent backgroundColor="transparent" barStyle="light-content" hidden />

        <View style={styles.content}>
          <Text style={[styles.durationText, { top: SAFE_TOP }]}>
            {callEnded
              ? t('incomingCall.ended')
              : callStarted
              ? formatTime(duration)
              : t('incomingCall.ringing')}
          </Text>

          {!callEnded && (
            <Text style={[styles.nameText, { top: SAFE_TOP + 25 }]}>
              Jessica
            </Text>
          )}

          {!callEnded && (
            <View style={[styles.buttonsContainer, { paddingBottom: Math.max(insets.bottom, 12) }]}>
              <TouchableOpacity style={styles.iconButton} onPress={toggleSpeaker}>
                <Icon name={isSpeakerOn ? 'volume-2' : 'volume'} size={24} color="#fff" />
              </TouchableOpacity>

              <TouchableOpacity style={styles.endCallButton} onPress={() => setCallEnded(true)}>
                <Icon name="phone" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#000', // behind the image
  },
  safeContent: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    // bottom padding handled per-device via insets in render
  },
  durationText: {
    position: 'absolute',
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    width,
  },
  nameText: {
    position: 'absolute',
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    width,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: width * 0.5,
    paddingBottom: height * 0.08, // keeps previous spacing feel; plus insets.bottom is added above
  },
  iconButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  endCallButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default IncomingCallScreen;
