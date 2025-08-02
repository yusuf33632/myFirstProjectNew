// src/styles/shared.js
import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const scale = width / 375;

export const sharedStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1c0f1d'
    },
    innerContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20 * scale,
    },
    avatarContainer: {
        marginBottom: 30 * scale,
        alignItems: 'center',
    },
    avatarCircle: {
        width: 90 * scale,
        height: 90 * scale,
        borderRadius: 45 * scale,
        borderWidth: 1,
        borderColor: '#fff',
    },
    inputWrapper: {
        flexDirection: 'row',
        backgroundColor: '#3a2a3c',
        borderRadius: 12 * scale,
        paddingHorizontal: 12 * scale,
        alignItems: 'center',
        marginBottom: 16 * scale,
        width: '95%',
    },
    inputIcon: {
        fontSize: 16 * scale,
        color: '#fff',
        marginRight: 8 * scale,
    },
    input: {
        flex: 1,
        color: '#fff',
        paddingVertical: 12 * scale,
        fontSize: 14 * scale,
    },
    signInButton: {
        backgroundColor: '#3a2a3c',
        borderRadius: 12 * scale,
        paddingVertical: 14 * scale,
        width: '95%',
        marginTop: 10 * scale,
    },
    signInText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16 * scale,
        textAlign: 'center',
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20 * scale,
        width: '100%',
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: '#888',
    },
    orText: {
        marginHorizontal: 10 * scale,
        color: '#aaa',
        fontSize: 12 * scale,
    },
    socialRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 25 * scale,
    },
    socialButton: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 15 * scale,
        paddingVertical: 10 * scale,
        paddingHorizontal: 20 * scale,
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 5 * scale,
    },
    socialText: {
        fontWeight: 'bold',
        fontSize: 14 * scale,
        color: '#1c0f1d',
    },
    footerText: {
        color: '#fff',
        fontSize: 12 * scale,
    },
    signupText: {
        color: '#1e90ff',
        fontWeight: 'bold',
    },
});
