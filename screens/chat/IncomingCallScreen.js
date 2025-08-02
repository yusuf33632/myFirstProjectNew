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
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

const { width, height } = Dimensions.get('window');

const IncomingCallScreen = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();

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
  }, [callEnded]);

  const toggleSpeaker = () => {
    setIsSpeakerOn((prev) => !prev);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar hidden />
      <ImageBackground
        source={require('../../assets/users/user1.jpg')}
        style={styles.background}
        resizeMode="cover"
      >
        <Text style={styles.durationText}>
          {callEnded
            ? t('incomingCall.ended')
            : callStarted
            ? formatTime(duration)
            : t('incomingCall.ringing')}
        </Text>

        {!callEnded && <Text style={styles.nameText}>Jessica</Text>}

        {!callEnded && (
          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.iconButton} onPress={toggleSpeaker}>
              <Icon name={isSpeakerOn ? 'volume-2' : 'volume'} size={24} color="#fff" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.endCallButton} onPress={() => setCallEnded(true)}>
              <Icon name="phone" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        )}
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000',
  },
  background: {
    flex: 1,
    width,
    height,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: height * 0.08,
  },
  durationText: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 60 : 40,
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    width,
  },
  nameText: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 85 : 65,
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
