import React from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../src/context/ThemeContext';

export default function AccountModal({ visible, onClose, onLogin, onSignup }) {
  const { t } = useTranslation();
  const { theme } = useTheme();

  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <Pressable
        style={[styles.overlay, { backgroundColor: theme.accountModalOverlay }]}
        onPress={onClose}
      >
        <Pressable
          style={[styles.modalContainer, { backgroundColor: theme.accountModalBackground }]}
          onPress={() => {}}
        >
          <Text style={[styles.title, { color: theme.accountModalTitle }]}>
            {t('account_modal.title')}
          </Text>

          <TouchableOpacity
            style={[styles.loginButton, { backgroundColor: theme.accountModalLoginButton }]}
            onPress={onLogin}
          >
            <Text style={[styles.loginText, { color: theme.accountModalLoginText }]}>
              {t('account_modal.login')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.signupButton, { backgroundColor: theme.accountModalSignupButton }]}
            onPress={onSignup}
          >
            <Text style={[styles.signupText, { color: theme.accountModalSignupText }]}>
              {t('account_modal.signup')}
            </Text>
          </TouchableOpacity>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContainer: {
    padding: 24,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  loginButton: {
    paddingVertical: 14,
    borderRadius: 12,
    marginBottom: 14,
  },
  loginText: {
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 15,
  },
  signupButton: {
    paddingVertical: 14,
    borderRadius: 12,
  },
  signupText: {
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 15,
  },
});
