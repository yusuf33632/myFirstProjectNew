// ThemeContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import * as NavigationBar from 'expo-navigation-bar';


const themes = {
  dark: {
    mode: 'dark',
    androidNavBarColor: 'rgba(0,0,0,0.5)',
    // GENEL ARKA PLANLAR
    containerBackground: '#1c0f1d',
    card: '#2b172e',
    overlay: 'rgba(0,0,0,0.4)',
    surfacePrimary: '#3a2a3c',
    surfaceSecondary: '#4b3944',

    // YAZI & İKON RENKLERİ
    text: '#ffffff',
    subtext: '#aaaaaa',
    input: '#fff',
    inputPlaceholder: '#ccc',
    inputIcon: '#fff',
    badge: '#e11d48',
    chatBadge: 'rgba(0,0,0,0.5)',

    // SEÇİM VE KATEGORİLER
    selectedCategoryBackground: '#ffffff',
    selectedCategoryText: '#1c0f1d',

    // GİRİŞ / KAYIT EKRANI
    inputWrapperBackground: '#3a2a3c',
    signInButtonBackground: '#3a2a3c',
    line: '#888',
    orText: '#aaa',
    footerText: '#fff',
    signupText: '#1e90ff',

    // SOSYAL BUTONLAR
    socialGoogleBackground: '#e0e0e0',
    googleName: '#000',
    socialFacebookBackround: '#3b5998',
    facebookName: '#fff',
    socialText: '#1c0f1d',

    // UYARILAR & HATALAR
    errorText: '#ff6666',
    warningText: '#ff6666',

    // TEMATİK RENKLER
    primary: '#8a4ca4',
    accent: '#6a5461',
    primarySend: '#d97396',

    // SINIRLAR & BORDERLAR
    avatarCircleBorderColor: '#fff',
    borderColor: '#666',

    // HEADER & KARTLAR
    headerTextColor: '#ffffff',
    cardNameOverlayBackground: 'rgba(0,0,0,0.4)',
    cardNameOverlayText: '#fff',
    cardImageBorderRadius: 10,

    // BOTTOM BAR
    bottomBarBackground: '#2c1a2e',
    bottomBarIconActive: '#ffffff',
    bottomBarIconInactive: '#aaaaaa',
    bottomBarBadgeBackground: '#e11d48',

    // SIDEBAR
    sidebarAvatarBackground: '#c6e1fa',
    logoutTextColor: 'tomato',

    // CHARACTER SCREEN
    characterCardBackground: '#000000',
    characterOverlay: 'rgba(0, 0, 0, 0.4)',
    tagBackground: '#ffffff',
    tagText: '#2e1b2a',
    secondaryButtonBackground: 'rgba(255,255,255,0.1)',

    // INFO & LOCKED
    infoCardBackground: '#2a1a2f',
    lockedModalCoinColor: '#ffc300',

    // COIN PURCHASE SCREEN
    coinPackageBoxBackground: '#402d44',
    coinPopularBoxBackground: '#5a2a5f',
    popularBadgeBackground: '#ffd700',
    popularBadgeText: '#1c0f1d',

    // CHAT LIST SCREEN
    chatName: '#ffffff',
    chatTime: '#aaaaaa',
    chatLastMessage: '#cccccc',
    unreadBadgeBackground: '#28c840',
    unreadText: '#ffffff',
    searchBarBackground: '#442e3c',
    searchIcon: '#ccc',

    // ✅ NOTIFICATION SCREEN
    notificationIconColor: '#f5c542',
    notificationSubtext: '#ddd',
    timeText: '#888',
    emptyIconColor: '#555',
    deleteButtonBackground: '#b00020',

    // ✅ SEARCH SCREEN – EKLENENLER
    searchInputBackground: '#2c1a2e',
    searchInputText: '#ffffff',
    searchInputPlaceholder: '#aaa',
    searchCardBackground: '#2e1c33',
    searchCardText: '#ffffff',
    searchBackIcon: '#ffffff',

    // ✅ ImageDetailScreen – EKLENENLER
    fullscreenImageBackground: '#000000',                         // Arka plan
    imageCloseButtonBackground: 'rgba(0,0,0,0.4)',                // Kapat buton zemin
    imageCloseIconColor: '#ffffff',                              // Kapat ikon
    imageDeleteButtonBackground: '#e11d48',                      // Silme butonu zemin
    imageDeleteButtonText: '#ffffff',                            // Silme butonu yazı

    languageSelectedBackground: '#2a1b2e',           // Seçili dil satırı arka plan
    languageSelectedCheckColor: '#28c840',

    // ✅ INTERESTS SCREEN
    interestSubtitleText: '#ccc',
    interestButtonBackground: '#3a2a3c',

    // ✅ PROFILE EDIT SCREEN
    profileEditHeaderBorder: '#3c2b33',
    profileEditPlaceholderBg: '#444444',
    profileEditLabelText: '#ffffff',
    profileEditSaveButtonBackground: '#5c3a5c',

    notificationCardBackground: '#2d1d2f',        // Switch kutusu arka planı
    shadowColorDefault: '#000000',               // Gölge için kullanılan siyah
    switchTrackActive: '#6ee7b7',                 // Switch track (aktif)
    switchTrackInactive: '#555555',               // Switch track (pasif)
    switchThumbActive: '#34d399',                 // Switch thumb (aktif)
    switchThumbInactive: '#cccccc',               // Switch thumb (pasif)

    // ✅ PRIVACY POLICY SCREEN – EKLENENLER
    privacyBackground: '#1c0f1d',
    privacySubtitleText: '#ffffff',
    privacyBodyText: '#cccccc',

    settingsSectionBackground: '#2d1d2f',    // Ayar kartları zemini (notificationCard ile aynı yapı)
    settingsItemText: '#ffffff',             // Ayar metinleri (text ile aynı)
    settingsItemIcon: '#aaaaaa',             // Ayar ikonları (subtext ile aynı)
    settingsChevronIcon: '#cccccc',          // Sağ yön ikonu (chatLastMessage ile aynı)


    recipientScreenBackground: '#1c0f1d',
    recipientScreenTitleText: '#ffffff',
    recipientScreenNameText: '#ffffff',
    recipientScreenCardBackground: '#2a162a',

    // SUBSCRIPTION GIFT SCREEN
    subscriptionGiftBackground: '#1c0f1d',
    subscriptionGiftTitleText: '#ffffff',
    subscriptionGiftCardBackground: '#3a2a3c',
    subscriptionGiftNameText: '#dddddd',
    subscriptionGiftToastBackground: 'rgba(255,255,255,0.85)',
    subscriptionGiftToastText: '#000000',

    // ✅ SUBSCRIPTION SCREEN – EKLENENLER
    subscriptionScreenBackground: '#1c0f1d',           // Ekran arka planı (screenContainer)
    subscriptionHeaderText: '#ffffff',                // Başlık metni rengi
    subscriptionBackIcon: '#ffffff',                  // Geri buton ikon rengi
    subscriptionTabBackground: '#3a2a3c',             // Sekme arka planı
    subscriptionTabText: '#ffffff',                   // Sekme metin rengi
    subscriptionTabActiveBackground: '#ffffff',       // Aktif sekme arka planı
    subscriptionTabActiveText: '#1c0f1d',             // Aktif sekme metin rengi
    subscriptionPlanBoxBackground: '#3b2d3e',          // Plan kutusu zemini
    subscriptionPlanText: '#ffffff',                  // Özellik listesi yazı rengi
    subscriptionDetailButtonBackground: '#a89ca8',     // Detay butonu zemin rengi
    subscriptionDetailButtonText: '#ffffff',           // Detay butonu yazı rengi
    subscriptionModalBackground: '#2a1a2f',            // Subscription detail modal iç kart zemin
    checkIconColor: '#6FE37B',
    planBoxShadow: '#fff',
    planIconShadow: '#fff',



    aboutScreenBackground: '#1c0f1d',         // Ekran arka planı
    aboutAppNameText: '#ffffff',             // Uygulama adı metni
    aboutAppVersionText: '#aaa',             // Versiyon bilgisi metni
    aboutAppDescriptionText: '#ccc',         // Açıklama paragraf metni
    aboutInfoLabelText: '#999',              // Etiket (Geliştirici, İletişim) yazıları
    aboutInfoValueText: '#fff',              // Etiket karşılığı değer yazıları


    // ✅ REPORT ISSUE SCREEN
    reportScreenBackground: '#1c0f1d',           // Genel arka plan
    reportLabelText: '#ccc',                    // Açıklayıcı metin (label)
    reportTextAreaBackground: '#2d1d2f',        // Giriş kutusu arka planı
    textPrimary: '#ffffff',                     // Giriş metni ve buton metni (globalde varsa)
    textPlaceholder: '#999999',                 // Placeholder metni (globalde varsa)
    reportButtonBackground: '#e11d48',          // Gönder butonu zemini

    // ✅ SUPPORT SCREEN – SAYFAYA ÖZGÜ RENK TANIMLARI

    supportScreenBackground: '#1c0f1d',                 // SafeAreaView zemini
    supportOptionDividerColor: '#3a2a3c',               // Her seçeneğin altındaki çizgi
    supportOptionIconColor: '#ffffff',                 // Zarf ve soru işareti ikonları
    supportOptionTextColor: '#ffffff',                 // "support.email" ve "support.faq" metinleri
    supportChevronIconColor: '#ffffff',                // Sağ yön ikonu rengi
    supportInfoBoxBackground: '#2a1b2e',                // Bilgi kutusunun arka planı
    supportInfoTextColor: '#aaaaaa',                    // Bilgi kutusu metni rengi

    // ✅ PROFILE AI DETAIL SCREEN – RENKLER
    profileAiDetailBackground: '#1c0f1d',                      // Genel ekran arka planı
    profileAiDetailOverlayBackground: 'rgba(0,0,0,0.3)',       // Video üstü karartma
    profileAiDetailBorderColor: '#ffffff',                    // Avatar kenarlığı
    profileAiDetailTextPrimary: '#ffffff',                    // Ad, açıklama, buton yazıları
    profileAiDetailButtonBackground: 'rgba(255, 255, 255, 0.2)', // Üçlü butonların zemini
    profileAiToggleBackground: '#5b385e',                     // Toggle varsayılan zemin
    profileAiToggleSelectedBackground: '#815a87',             // Toggle seçili zemin

    profileDetailScreenBackground: '#1c0f1d',                  // Ekran arka planı
    profileDetailCardBackground: '#2b172e',                    // Profil kutusu arka planı
    profileDetailEditButtonBackground: '#493345',              // "Edit Profile" butonu zemin
    profileDetailTextPrimary: '#ffffff',                       // Genel metinler
    profileDetailNotificationBadgeBackground: '#e11d48',       // Bildirim rozeti arka planı
    profileDetailCoinTextColor: '#f5c542',                     // Coin metni rengi

    // ACCOUNT MODAL RENKLERİ
    accountModalOverlay: 'rgba(0, 0, 0, 0.6)',         // Modal dışında kalan karartılmış arka plan
    accountModalBackground: '#1c0f1d',                 // Modal iç arka plan rengi
    accountModalTitle: '#ffffff',                      // Modal başlık metin rengi
    accountModalLoginButton: '#6d28d9',                // Giriş butonu arka plan rengi
    accountModalLoginText: '#ffffff',                  // Giriş butonu yazı rengi
    accountModalSignupButton: '#3a2a3c',               // Kayıt ol butonu arka plan rengi
    accountModalSignupText: '#ffffff',                 // Kayıt ol butonu yazı rengi

    // 🎁 GIFT MODAL RENKLERİ
    giftModalOverlay: 'rgba(0,0,0,0.75)',            // Arka plan (modal dışı)
    giftModalBackground: '#2a162a',                  // Modal iç arka plan
    giftModalDragBar: '#ccc',                        // Modal üst bar
    giftModalGiftBoxBackground: '#4b334a',           // Hediye kutusu arka planı
    giftModalGiftName: '#ffffff',                    // Hediye adı metni
    giftModalGiftPrice: '#f0c420',                   // Hediye fiyatı metni
    giftModalConfirmText: '#ffffff',                 // Onay metni
    giftModalProfileBorder: '#ffffff',               // Profil resmi kenarlığı (opsiyonel)
    giftModalCancelButtonBackground: '#4a334c',      // İptal butonu arka planı
    giftModalPayButtonBackground: '#8a4ca4',         // Gönder butonu arka planı
    giftModalButtonText: '#ffffff',                  // Buton metinleri
    giftModalToastBackground: '#302030',             // Toast arka plan
    giftModalToastBorder: '#8a4ca4',                 // Toast kenarlık
    giftModalToastText: '#ffffff',                   // Toast metin


    // ✅ SUBSCRIPTION DETAIL SCREEN – RENK DEĞİŞKENLERİ
    subscriptionDetailBoxBackground: '#1c0f1d',         // Alt modal zemin (detailBox)
    subscriptionDetailDragBar: '#999999',               // Üst çizgi (topLine)
    subscriptionDetailOptionBox: '#3b2d3e',             // Paket kutuları (optionBox)
    subscriptionDetailOptionBoxActiveBorder: '#ffffff', // Seçili paketin kenarlığı
    subscriptionDetailLabelText: '#ffffff',             // Paket adları (labelText)
    subscriptionDetailPriceText: '#ffffff',             // Fiyat (priceText)
    subscriptionDetailNoteText: '#ffffff',              // Aylık / açıklama yazısı (noteText)
    subscriptionDetailBuyButtonBackground: '#b9aeb2',   // Satın al butonu zemin
    subscriptionDetailBuyButtonText: '#ffffff',         // Satın al butonu yazı rengi


    cardPaymentBackground: '#1c0f1d', // containerBackground
    cardPaymentModalBoxBackground: '#2a1a2f', // subscriptionModalBackground
    cardPaymentTextPrimary: '#ffffff', // text
    cardPaymentTextSecondary: '#aaaaaa', // subtext
    cardPaymentBorderDefault: '#666666', // borderColor
    cardPaymentBorderSelected: '#ffc300', // lockedModalCoinColor (altın vurgusu)
    cardPaymentRadioSelected: '#ffc300', // lockedModalCoinColor
    cardPaymentRadioBorder: '#cccccc', // chatLastMessage / switchThumbInactive
    cardPaymentDeleteIcon: '#e11d48', // badge / giftModalDelete
    cardPaymentAddCardText: '#8a4ca4', // primary (vurgulu mor)
    cardPaymentAddCardBorder: '#8a4ca4', // primary
    cardPaymentPrimaryButton: '#b9aeb2', // subscriptionDetailBuyButtonBackground
    cardPaymentModalOverlay: 'rgba(0,0,0,0.6)', // accountModalOverlay

    addNewCardBackground: '#1c0f1d',                         // cardPaymentBackground
    addNewCardTitleText: '#ffffff',                         // text
    addNewCardFrontFace: '#0A1833',                         // (belirgin özel stil, aynı kalabilir)
    addNewCardBackFace: '#2a1a2f',                          // cardPaymentModalBoxBackground
    addNewCardInfoLabel: '#cccccc',                         // switchThumbInactive veya chatLastMessage
    addNewCardInputBackground: '#3a2a3c',                   // inputWrapperBackground
    addNewCardInputBorder: '#666666',                       // borderColor
    addNewCardInputText: '#ffffff',                         // text
    addNewCardLabelText: '#aaaaaa',                         // subtext
    addNewCardErrorText: '#ff6666',                         // errorText
    addNewCardErrorBorder: '#ff6666',                       // errorText
    addNewCardMagneticStripe: '#000000',                    // shadowColorDefault
    addNewCardCheckboxActive: '#6d28d9',                    // accountModalLoginButton
    addNewCardButtonBackground: '#6d28d9',                  // accountModalLoginButton
    addNewCardButtonText: '#ffffff',                        // accountModalLoginText
    addNewCardCvcBackground: '#3a2a3c',                     // inputWrapperBackground



    // DARK TEMA İÇİN addNewCard TANIMLARI – GÜNCELLENMİŞ

    addNewCardBackground: '#1c0f1d',                         // ekran arka planı
    addNewCardFrontBackground: '#334155',                    // kart ön yüzeyi (daha açık ve modern)
    addNewCardBackBackground: '#475569',                     // kart arka yüzeyi (daha yumuşak koyuluk)
    addNewCardMagneticStripe: '#1e293b',                     // manyetik şerit (koyu mavi-gri)
    addNewCardTextPrimary: '#ffffff',                        // kart üzeri ana metinler
    addNewCardTextSecondary: '#cccccc',                      // kart üzeri label (etiket) yazıları
    addNewCardInputBackground: '#3a2a3c',                    // input kutusu zemini
    addNewCardInputText: '#ffffff',                          // input içeriği
    addNewCardInputLabel: '#aaaaaa',                         // input başlık yazısı
    addNewCardInputBorderDefault: '#666666',                 // input çerçevesi (normal)
    addNewCardInputBorderError: '#ff6666',                   // input çerçevesi (hatalı)
    addNewCardCheckboxSelected: '#b9aeb2',                   // checkbox seçili rengi
    addNewCardCheckboxUnselected: undefined,                 // opsiyonel
    addNewCardCheckboxLabel: '#ffffff',                      // checkbox metni
    addNewCardErrorText: '#ff6666',                          // hata yazıları
    addNewCardTitleText: '#ffffff',                          // başlık metni
    addNewCardEnrollButtonBackground: '#b9aeb2',             // kayıt butonu zemini
    addNewCardEnrollButtonText: '#ffffff',                   // kayıt butonu metni
    addNewCardCvcBoxBackground: '#cbd5e1',                   // kart arka yüz CVC kutusu zemini (açık mavi-gri)
    addNewCardCvcLabelText: '#1e293b',                       // CVC yazısı (kontrastlı koyu renk)
    addNewCardCardIconColor: '#ffffff',                      // kart iconları (beyaz)



  },





  light: {
    mode: 'light',
    androidNavBarColor: 'rgba(0,0,0,0.5)',
    // GENEL ARKA PLANLAR
    containerBackground: '#ffffff',
    card: '#f7f7f7',
    overlay: 'rgba(0,0,0,0.05)',
    surfacePrimary: '#f0f0f0',
    surfaceSecondary: '#e0e0e0',

    // YAZI & İKON RENKLERİ
    text: '#0d0d0d',
    subtext: '#666666',
    input: '#0d0d0d',
    inputPlaceholder: '#999999',
    inputIcon: '#0d0d0d',
    badge: '#ff69b4',
    chatBadge: 'rgba(0,0,0,0.08)',

    // SEÇİMLER & KATEGORİ
    selectedCategoryBackground: '#1c0f1d',
    selectedCategoryText: '#ffffff',

    // GİRİŞ / KAYIT EKRANI
    inputWrapperBackground: '#f5f5f5',
    signInButtonBackground: '#cccccc',
    line: '#d9d9d9',
    orText: '#737373',
    footerText: '#0d0d0d',
    signupText: '#1e90ff',

    // SOSYAL BUTONLAR
    socialGoogleBackground: '#e0e0e0',
    googleName: '#0d0d0d',
    socialFacebookBackround: '#3b5998',
    facebookName: '#ffffff',
    socialText: '#0d0d0d',

    // UYARI & HATA
    errorText: '#ff4d4f',
    warningText: '#ff9900',

    // TEMATİK RENKLER
    primary: '#8a4ca4',
    accent: '#bca8d0',
    primarySend: '#d97396',

    // SINIRLAR & ÇERÇEVELER
    avatarCircleBorderColor: '#cccccc',
    borderColor: '#dcdcdc',

    // HEADER & KART
    headerTextColor: '#0d0d0d',
    cardNameOverlayBackground: 'rgba(0,0,0,0.05)',
    cardNameOverlayText: '#0d0d0d',
    cardImageBorderRadius: 10,

    // BOTTOM BAR
    bottomBarBackground: '#f7f7f7',
    bottomBarIconActive: '#0d0d0d',
    bottomBarIconInactive: '#aaaaaa',
    bottomBarBadgeBackground: '#ff69b4',

    // SIDEBAR
    sidebarAvatarBackground: '#eeeeee',
    logoutTextColor: '#cc0000',

    // KARAKTER KARTI
    characterCardBackground: '#ffffff',
    characterOverlay: 'rgba(255,255,255,0.8)',
    tagBackground: '#f0f0f0',
    tagText: '#1c0f1d',
    secondaryButtonBackground: 'rgba(0,0,0,0.05)',

    // INFO & KİLİTLİ MODAL
    infoCardBackground: '#e9e9e9',
    lockedModalCoinColor: '#ffc107',

    // CHAT LIST
    chatName: '#0d0d0d',
    chatTime: '#888888',
    chatLastMessage: '#4d4d4d',
    unreadBadgeBackground: '#28c840',
    unreadText: '#ffffff',
    searchBarBackground: '#f0f0f0',
    searchIcon: '#999999',

    // COIN PURCHASE SCREEN
    coinPackageBoxBackground: '#f7f7f7',
    coinPopularBoxBackground: '#e3d1f0',
    popularBadgeBackground: '#ffd700',
    popularBadgeText: '#1c0f1d',

    // NOTIFICATION SCREEN
    notificationIconColor: '#f5c542',
    notificationSubtext: '#888888',
    timeText: '#999999',
    emptyIconColor: '#bbbbbb',
    deleteButtonBackground: '#d32f2f',

    // IMAGE DETAIL SCREEN
    fullscreenImageBackground: '#ffffff',
    imageCloseButtonBackground: 'rgba(0,0,0,0.05)',
    imageCloseIconColor: '#0d0d0d',
    imageDeleteButtonBackground: '#d32f2f',
    imageDeleteButtonText: '#ffffff',

    // LANGUAGE SETTINGS SCREEN
    languageSelectedBackground: '#e6e6f7',
    languageSelectedCheckColor: '#28c840',

    // INTERESTS SCREEN
    interestSubtitleText: '#cccccc',
    selectedChipBackground: '#0d0d0d',
    selectedChipText: '#ffffff',

    // PROFILE EDIT SCREEN
    profileEditHeaderBorder: '#e0e0e0',
    profileEditPlaceholderBg: '#f2f2f2',
    profileEditLabelText: '#0d0d0d',
    profileEditSaveButtonBackground: '#bca8d0',

    // ✅ NOTIFICATION SETTINGS SCREEN – YENİ EKLENENLER
    notificationCardBackground: '#f0f0f0',         // Switch kart arka planı
    shadowColorDefault: '#999999',                 // Gölge rengi
    switchTrackActive: '#6ee7b7',                  // Switch track (aktif)
    switchTrackInactive: '#cccccc',                // Switch track (pasif)
    switchThumbActive: '#34d399',                  // Switch thumb (aktif)
    switchThumbInactive: '#f5f5f5',                // Switch thumb (pasif)

    // ✅ PRIVACY POLICY SCREEN – YENİ EKLENENLER
    privacyBackground: '#ffffff',           // SafeAreaView arka planı
    privacySubtitleText: '#0d0d0d',         // Alt başlıklar (subtitle)
    privacyBodyText: '#666666',             // Açıklama paragrafları (text)

    settingsSectionBackground: '#d8d8d8',     // Ayar bloklarının arka planı
    settingsItemText: '#0d0d0d',              // Ayar satırı metin rengi
    settingsItemIcon: '#0d0d0d',              // Ayar satırı ikon rengi
    settingsChevronIcon: '#666666',

    recipientScreenBackground: '#ffffff',
    recipientScreenTitleText: '#0d0d0d',
    recipientScreenNameText: '#0d0d0d',
    recipientScreenCardBackground: '#f0f0f0',

    // SUBSCRIPTION GIFT SCREEN
    subscriptionGiftBackground: '#ffffff',                            // Sayfa arka planı
    subscriptionGiftTitleText: '#0d0d0d',                             // Başlık ve ikon rengi
    subscriptionGiftCardBackground: '#f0f0f0',                        // Hediye kart zemin rengi
    subscriptionGiftNameText: '#666666',                              // Hediye adı (subtext uyumu)
    subscriptionGiftToastBackground: 'rgba(255,255,255,0.85)',        // Toast arka planı
    subscriptionGiftToastText: '#000000',                             // Toast metin rengi

    // ✅ SUBSCRIPTION SCREEN – EKLENENLER
    subscriptionScreenBackground: '#ffffff',              // Ekran arka planı (screenContainer)
    subscriptionHeaderText: '#0d0d0d',                    // Başlık metni rengi
    subscriptionBackIcon: '#0d0d0d',                      // Geri buton ikon rengi
    subscriptionTabBackground: '#f0f0f0',                 // Sekme arka planı
    subscriptionTabText: '#0d0d0d',                       // Sekme metin rengi
    subscriptionTabActiveBackground: '#0d0d0d',           // Aktif sekme arka planı
    subscriptionTabActiveText: '#ffffff',                 // Aktif sekme metin rengi
    subscriptionPlanBoxBackground: '#e9e9e9',             // Plan kutusu zemini
    subscriptionPlanText: '#0d0d0d',                      // Özellik listesi yazı rengi
    subscriptionDetailButtonBackground: '#a89ca8',        // Detay butonu zemin rengi
    subscriptionDetailButtonText: '#ffffff',              // Detay butonu yazı rengi
    subscriptionModalBackground: '#f5f5f5',               // Subscription detail modal iç kart zemin
    checkIconColor: '#6FE37B',
    planBoxShadow: '#1A1A1A',
    planIconShadow: '#1A1A1A',


    aboutScreenBackground: '#ffffff',        // Ekran arka planı
    aboutAppNameText: '#0d0d0d',             // Uygulama adı metni
    aboutAppVersionText: '#999999',          // Versiyon bilgisi metni
    aboutAppDescriptionText: '#666666',      // Açıklama paragraf metni
    aboutInfoLabelText: '#888888',           // Etiket (Geliştirici, İletişim) yazıları
    aboutInfoValueText: '#0d0d0d',           // Etiket karşılığı değer yazıları

    // ✅ REPORT ISSUE SCREEN
    reportScreenBackground: '#ffffff',           // Sayfa arka planı (containerBackground ile aynı)
    reportLabelText: '#666666',                 // Açıklayıcı metin (subtext uyumu)
    reportTextAreaBackground: '#f0f0f0',        // Giriş kutusu arka planı (surfacePrimary uyumu)
    textPrimary: '#0d0d0d',                     // Giriş ve buton metni (global text rengi)
    textPlaceholder: '#999999',                 // Placeholder (zaten tanımlı: inputPlaceholder)
    reportButtonBackground: '#8a4ca4',          // Gönder butonu zemini (primary tematik rengi)

    // ✅ SUPPORT SCREEN – SAYFAYA ÖZGÜ RENK TANIMLARI (LIGHT)

    supportScreenBackground: '#ffffff',                 // SafeAreaView zemini (containerBackground uyumlu)
    supportOptionDividerColor: '#e0e0e0',               // Seçenek altı çizgi (border uyumu)
    supportOptionIconColor: '#0d0d0d',                  // Zarf ve soru işareti ikonları (text uyumu)
    supportOptionTextColor: '#0d0d0d',                  // "support.email" ve "support.faq" metinleri (text uyumu)
    supportChevronIconColor: '#0d0d0d',                 // Sağ yön ikonu (text uyumu)
    supportInfoBoxBackground: '#f0f0f0',                // Bilgi kutusu zemin (surfacePrimary uyumu)
    supportInfoTextColor: '#666666',                    // Bilgi metni (subtext uyumu)


    // ✅ PROFILE AI DETAIL SCREEN – RENKLER
    profileAiDetailBackground: '#ffffff',                        // Genel ekran arka planı (containerBackground ile uyumlu)
    profileAiDetailOverlayBackground: 'rgba(0,0,0,0.05)',        // Video üstü karartma (overlay ile uyumlu)
    profileAiDetailBorderColor: '#cccccc',                      // Avatar kenarlığı (avatarCircleBorderColor ile uyumlu)
    profileAiDetailTextPrimary: '#0d0d0d',                      // Ad, açıklama, buton yazıları (text ile uyumlu)
    profileAiDetailButtonBackground: 'rgba(0, 0, 0, 0.05)',      // Üçlü butonların zemini (secondaryButtonBackground ile uyumlu)
    profileAiToggleBackground: '#d9d9d9',                       // Toggle varsayılan zemin (uyumlu açık gri)
    profileAiToggleSelectedBackground: '#bca8d0',               // Toggle seçili zemin (accent ile uyumlu)

    // ✅ PROFILE DETAIL SCREEN – LIGHT

    profileDetailScreenBackground: '#ffffff',                 // Ekran arka planı
    profileDetailCardBackground: '#f0f0f0',                   // Profil kutusu arka planı
    profileDetailEditButtonBackground: '#e0e0e0',             // "Edit Profile" butonu zemin
    profileDetailTextPrimary: '#0d0d0d',                      // Genel metinler
    profileDetailNotificationBadgeBackground: '#e11d48',      // Bildirim rozeti arka planı
    profileDetailCoinTextColor: '#f5c542',                    // Coin metni rengi


    // ✅ ACCOUNT MODAL – LIGHT
    accountModalOverlay: 'rgba(0, 0, 0, 0.05)',           // Modal dışında kalan açık karartma
    accountModalBackground: '#ffffff',                   // Modal iç zemin (containerBackground uyumlu)
    accountModalTitle: '#0d0d0d',                        // Başlık metni (text uyumu)
    accountModalLoginButton: '#cccccc',                 // Giriş butonu zemin (signInButtonBackground uyumu)
    accountModalLoginText: '#0d0d0d',                   // Giriş butonu metni (text uyumu)
    accountModalSignupButton: '#f0f0f0',                // Kayıt ol butonu zemin (surfacePrimary uyumu)
    accountModalSignupText: '#0d0d0d',                  // Kayıt ol butonu metni (text uyumu)


    // 🎁 GIFT MODAL RENKLERİ – LIGHT
    giftModalOverlay: 'rgba(0, 0, 0, 0.05)',               // Modal dışı karartma
    giftModalBackground: '#ffffff',                        // Modal iç arka plan (containerBackground)
    giftModalDragBar: '#cccccc',                           // Modal üstteki sürükleme çubuğu

    giftModalGiftBoxBackground: '#f0f0f0',                 // Hediye kutusu zemin (surfacePrimary)
    giftModalGiftName: '#0d0d0d',                          // Hediye adı yazı rengi (text)
    giftModalGiftPrice: '#f5c542',                         // Hediye fiyatı rengi (notificationIconColor)

    giftModalConfirmText: '#666666',                       // Alıcı onay metni (subtext)
    giftModalProfileBorder: '#cccccc',                    // Profil kenarlığı (avatarCircleBorderColor)

    giftModalCancelButtonBackground: '#c0c0c0',            // İptal butonu arka planı (surfaceSecondary)
    giftModalPayButtonBackground: '#1c0f1d',               // Gönder butonu zemin (primary)
    giftModalButtonText: '#ffffff',                        // Buton metin rengi (white sabit)

    giftModalToastBackground: 'rgba(255,255,255,0.85)',    // Toast arka planı (subscriptionGiftToastBackground ile uyumlu)
    giftModalToastBorder: '#bca8d0',                       // Toast kenarlığı (accent)
    giftModalToastText: '#0d0d0d',                         // Toast metni (text)

    // ✅ SUBSCRIPTION DETAIL  – LIGHT
    subscriptionDetailBoxBackground: '#f7f7f7',         // Alt modal zemin (detailBox) → card ile uyumlu
    subscriptionDetailDragBar: '#cccccc',               // Üst çizgi (topLine) → avatarCircleBorderColor uyumlu
    subscriptionDetailOptionBox: '#e0e0e0',             // Paket kutuları (optionBox) → surfaceSecondary
    subscriptionDetailOptionBoxActiveBorder: '#0d0d0d', // Seçili paketin kenarlığı → text
    subscriptionDetailLabelText: '#0d0d0d',             // Paket adları (labelText) → text
    subscriptionDetailPriceText: '#0d0d0d',             // Fiyat (priceText) → text
    subscriptionDetailNoteText: '#666666',              // Aylık / açıklama yazısı (noteText) → subtext
    subscriptionDetailBuyButtonBackground: '#a89ca8',   // Satın al butonu zemin → surfaceSecondary
    subscriptionDetailBuyButtonText: '#0d0d0d',         // Satın al butonu yazı rengi → text

    cardPaymentBackground: '#ffffff',                     // containerBackground
    cardPaymentModalBoxBackground: '#f5f5f5',              // subscriptionModalBackground
    cardPaymentTextPrimary: '#0d0d0d',                     // text
    cardPaymentTextSecondary: '#666666',                   // subtext
    cardPaymentBorderDefault: '#dcdcdc',                   // borderColor
    cardPaymentBorderSelected: '#ffc107',                  // lockedModalCoinColor (light karşılığı)
    cardPaymentRadioSelected: '#ffc107',                   // lockedModalCoinColor
    cardPaymentRadioBorder: '#cccccc',                     // avatarCircleBorderColor
    cardPaymentDeleteIcon: '#ff4d4f',                      // errorText
    cardPaymentAddCardText: '#8a4ca4',                     // primary
    cardPaymentAddCardBorder: '#8a4ca4',                   // primary
    cardPaymentPrimaryButton: '#a89ca8',                   // subscriptionDetailButtonBackground (açık ton mor/gri)
    cardPaymentModalOverlay: 'rgba(0, 0, 0, 0.05)',        // accountModalOverlay


    // LIGHT TEMA İÇİN addNewCard TANIMLARI – GÜNCELLENMİŞ

    addNewCardBackground: '#ffffff',                         // ekran arka planı
    addNewCardFrontBackground: '#e4e4e7',                    // kart ön yüzeyi (açık gri ton)
    addNewCardBackBackground: '#d4d4d8',                     // kart arka yüzeyi (bir tık koyu gri)
    addNewCardMagneticStripe: '#999999',                     // manyetik şerit (gri)
    addNewCardTextPrimary: '#0d0d0d',                        // kart üzeri ana metinler (text)
    addNewCardTextSecondary: '#666666',                      // kart üzeri label (subtext)
    addNewCardInputBackground: '#f0f0f0',                    // input kutusu zemini
    addNewCardInputText: '#0d0d0d',                          // input içeriği
    addNewCardInputLabel: '#888888',                         // input başlık yazısı
    addNewCardInputBorderDefault: '#cccccc',                 // input çerçevesi (normal)
    addNewCardInputBorderError: '#ff4d4f',                   // input çerçevesi (hatalı)
    addNewCardCheckboxSelected: '#a89ca8',                   // checkbox seçili rengi (primary).
    addNewCardCheckboxUnselected: '#e0e0e0',                 // checkbox arka planı (surfaceSecondary)
    addNewCardCheckboxLabel: '#0d0d0d',                      // checkbox metni
    addNewCardErrorText: '#ff4d4f',                          // hata yazıları
    addNewCardTitleText: '#0d0d0d',                          // başlık metni
    addNewCardEnrollButtonBackground: '#a89ca8',             // kayıt butonu zemini (primary).
    addNewCardEnrollButtonText: '#ffffff',                   // kayıt butonu metni
    addNewCardCvcBoxBackground: '#f5f5f5',                   // kart arka yüz CVC kutusu zemini (uyumlu gri)
    addNewCardCvcLabelText: '#0d0d0d',                       // CVC yazısı
    addNewCardCardIconColor: '#0d0d0d',                      // kart ikonları (siyah)

  }
  ,





  sunset: {
    mode: 'sunset',
    androidNavBarColor: 'rgba(0,0,0,0.5)',
    // GENEL ARKA PLANLAR
    containerBackground: '#FFF0F6',                 // Genel sayfa arka planı
    card: '#FFE4EC',                                // Kart ve modal zemin
    overlay: 'rgba(255,105,180,0.08)',              // Saydam örtü
    surfacePrimary: '#FFE4EC',                      // Birincil yüzey
    surfaceSecondary: '#FFD6E8',                    // İkincil yüzey (progress, input)

    // YAZI & İKON RENKLERİ
    text: '#4B004B',                                 // Ana yazılar
    subtext: '#884466',                              // Açıklama yazıları
    input: '#4B004B',
    inputPlaceholder: '#A0527B',
    inputIcon: '#4B004B',
    badge: '#FF69B4',
    chatBadge: 'rgba(255,0,100,0.15)',

    // SEÇİM & KATEGORİ
    selectedCategoryBackground: '#4B004B',
    selectedCategoryText: '#ffffff',

    // GİRİŞ / KAYIT EKRANI
    inputWrapperBackground: '#FFE4EC',
    signInButtonBackground: '#FFA0D3',
    line: '#FF99CC',
    orText: '#AA6A90',
    footerText: '#4B004B',
    signupText: '#D65DB1',

    // SOSYAL BUTONLAR
    socialGoogleBackground: '#FFD6E8',
    googleName: '#4B004B',
    socialFacebookBackround: '#3b5998',
    facebookName: '#ffffff',
    socialText: '#4B004B',

    // UYARI & HATA
    errorText: '#CC3366',
    warningText: '#FF6699',

    // TEMATİK RENKLER
    primary: '#D65DB1',
    accent: '#FFB3DA',
    primarySend: '#D65DB1',

    // SINIRLAR & BORDERLAR
    avatarCircleBorderColor: '#4B004B',
    borderColor: '#F4CDE4',

    // HEADER & KARTLAR
    headerTextColor: '#4B004B',
    cardNameOverlayBackground: 'rgba(255,0,100,0.08)',
    cardNameOverlayText: '#4B004B',
    cardImageBorderRadius: 10,

    // BOTTOM BAR
    bottomBarBackground: '#FFE4EC',
    bottomBarIconActive: '#4B004B',
    bottomBarIconInactive: '#AA6A90',
    bottomBarBadgeBackground: '#FF69B4',

    // SIDEBAR
    sidebarAvatarBackground: '#FFD6E8',
    logoutTextColor: '#CC3366',

    // KARAKTER KARTI
    characterCardBackground: '#FFE4EC',
    characterOverlay: 'rgba(255,192,203,0.3)',
    tagBackground: '#ffffff',
    tagText: '#4B004B',
    secondaryButtonBackground: 'rgba(255,255,255,0.3)',

    // INFO & LOCKED
    infoCardBackground: '#FFE4EC',
    lockedModalCoinColor: '#D65DB1',

    // CHAT LIST
    chatName: '#4B004B',
    chatTime: '#884466',
    chatLastMessage: '#AA6A90',
    unreadBadgeBackground: '#28c840',
    unreadText: '#ffffff',
    searchBarBackground: '#FFD6E8',
    searchIcon: '#AA6A90',

    // COIN PURCHASE SCREEN
    coinPackageBoxBackground: '#FFE4EC',
    coinPopularBoxBackground: '#F8C3DF',
    popularBadgeBackground: '#FFD700',
    popularBadgeText: '#4B004B',

    // NOTIFICATION SCREEN
    notificationIconColor: '#FF9EC7',
    notificationSubtext: '#A75286',
    timeText: '#AA6A90',
    emptyIconColor: '#AA6A90',
    deleteButtonBackground: '#CC3366',

    // ✅ IMAGE DETAIL SCREEN
    fullscreenImageBackground: '#FFF0F6',
    imageCloseButtonBackground: 'rgba(255,105,180,0.08)',
    imageCloseIconColor: '#4B004B',

    imageDeleteButtonBackground: '#CC3366',
    imageDeleteButtonText: '#ffffff',

    // LANGUAGE SETTINGS SCREEN
    languageSelectedBackground: '#FAD1E4',        // Seçili dil satırı arka plan (pembe-gül tonu)
    languageSelectedCheckColor: '#28c840',        // Onay ikonu rengi (mevcut unreadBadgeBackground ile uyumlu)

    // ✅ INTERESTS SCREEN
    interestSubtitleText: '#cccccc',
    selectedChipBackground: '#4B004B',
    selectedChipText: '#ffffff',

    // ✅ PROFILE EDIT SCREEN
    profileEditHeaderBorder: '#FFD6E8',
    profileEditPlaceholderBg: '#FAD1E4',
    profileEditLabelText: '#4B004B',
    profileEditSaveButtonBackground: '#D65DB1',

    // ✅ NOTIFICATION SETTINGS SCREEN – YENİ EKLENENLER
    notificationCardBackground: '#FFD6E8',         // Switch kart arka planı (pembe tonlu uyumlu zemin)
    shadowColorDefault: '#D48BA5',                 // Gölge efekti için pastel pembe-gri karışımı
    switchTrackActive: '#FFB6C1',                  // Aktif track (açık pembe)
    switchTrackInactive: '#E0B0C7',                // Pasif track (pudra mor)
    switchThumbActive: '#FF69B4',                  // Thumb aktif (şeker pembe)
    switchThumbInactive: '#ffffff',                // Thumb pasif (beyaz)

    // ✅ PRIVACY POLICY SCREEN – YENİ EKLENENLER
    privacyBackground: '#FFF0F6',            // SafeAreaView zemin rengi (genel pastel pembe)
    privacySubtitleText: '#4B004B',          // Başlıklar (örneğin: Kullanım Amaçları)
    privacyBodyText: '#884466',              // Paragraf metinleri

    // ✅ SETTINGS SCREEN – EKLENENLER
    settingsSectionBackground: '#FFD6E8',     // Ayar blokları arka planı (uyumlu pastel pembe)
    settingsItemText: '#4B004B',              // Ayar başlığı yazı rengi
    settingsItemIcon: '#A0527B',              // Ayar satırı ikon rengi (placeholder ile uyumlu ton)
    settingsChevronIcon: '#884466',           // Chevron (>) ikon rengi (subtext rengiyle uyumlu)

    recipientScreenBackground: '#FFF0F6',
    recipientScreenTitleText: '#4B004B',
    recipientScreenNameText: '#4B004B',
    recipientScreenCardBackground: '#FFE4EC',

    // SUBSCRIPTION GIFT SCREEN
    subscriptionGiftBackground: '#FFF0F6',                            // Sayfa arka planı (containerBackground ile aynı)
    subscriptionGiftTitleText: '#4B004B',                             // Başlık ve geri ikon rengi (text ile aynı)
    subscriptionGiftCardBackground: '#FFE4EC',                        // Hediye kart arka planı (surfacePrimary ile aynı)
    subscriptionGiftNameText: '#884466',                              // Hediye adı (subtext ile aynı)
    subscriptionGiftToastBackground: 'rgba(255,255,255,0.85)',        // Toast arka planı (pembe üstü beyaz)
    subscriptionGiftToastText: '#4B004B',                             // Toast metin rengi (tema text rengiyle uyumlu)


    // ✅ SUBSCRIPTION SCREEN – EKLENENLER
    subscriptionScreenBackground: '#FFF0F6',              // Ekran arka planı (screenContainer)
    subscriptionHeaderText: '#4B004B',                    // Başlık metni rengi
    subscriptionBackIcon: '#4B004B',                      // Geri buton ikon rengi
    subscriptionTabBackground: '#FFD6E8',                 // Sekme arka planı
    subscriptionTabText: '#4B004B',                       // Sekme metin rengi
    subscriptionTabActiveBackground: '#4B004B',           // Aktif sekme arka planı
    subscriptionTabActiveText: '#ffffff',                 // Aktif sekme metin rengi
    subscriptionPlanBoxBackground: '#FFE4EC',             // Plan kutusu zemini
    subscriptionPlanText: '#4B004B',                      // Özellik listesi yazı rengi
    subscriptionDetailButtonBackground: '#D65DB1',        // Detay butonu zemin rengi
    subscriptionDetailButtonText: '#ffffff',              // Detay butonu yazı rengi
    subscriptionModalBackground: '#FFD6E8',               // Subscription detail modal iç kart zemin
    checkIconColor: '#6FE37B',
    planBoxShadow: '#1A1A1A',
    planIconShadow: '#1A1A1A',


    aboutScreenBackground: '#FFF0F6',         // Ekran arka planı (genel zemin tonu)
    aboutAppNameText: '#4B004B',              // Uygulama adı metni (ana yazı rengi)
    aboutAppVersionText: '#AA6A90',           // Versiyon bilgisi metni (açıklama tonu)
    aboutAppDescriptionText: '#884466',       // Açıklama paragraf metni (subtext uyumlu)
    aboutInfoLabelText: '#A0527B',            // Etiket (Geliştirici, İletişim) yazıları (placeholder tonu)
    aboutInfoValueText: '#4B004B',            // Etiket karşılığı değer yazıları (ana yazı rengi)

    // ✅ REPORT ISSUE SCREEN
    reportScreenBackground: '#FFF0F6',           // SafeAreaView arka planı (sunset.containerBackground ile aynı)
    reportLabelText: '#884466',                  // Label metni (sunset.subtext ile aynı)
    reportTextAreaBackground: '#FFE4EC',         // TextInput arka planı (sunset.surfacePrimary ile aynı)
    textPrimary: '#4B004B',                      // TextInput yazı rengi ve buton metni (sunset.text)
    textPlaceholder: '#A0527B',                  // Placeholder metni (sunset.inputPlaceholder)
    reportButtonBackground: '#D65DB1',           // Gönder butonu zemin (sunset.primary)


    // ✅ SUPPORT SCREEN – SAYFAYA ÖZGÜ RENK TANIMLARI

    supportScreenBackground: '#FFF0F6',                 // SafeAreaView zemini (sunset.containerBackground)
    supportOptionDividerColor: '#FFD6E8',               // Seçenek altı çizgi (sunset.borderColor)
    supportOptionIconColor: '#4B004B',                  // Zarf ve soru işareti ikonları (sunset.text)
    supportOptionTextColor: '#4B004B',                  // "support.email" ve "support.faq" metinleri (sunset.text)
    supportChevronIconColor: '#4B004B',                 // Sağ yön ikonu (sunset.text)
    supportInfoBoxBackground: '#FFE4EC',                // Bilgi kutusu zemin (sunset.surfacePrimary)
    supportInfoTextColor: '#884466',                    // Bilgi kutusu metni (sunset.subtext)


    // ✅ PROFILE AI DETAIL SCREEN – RENKLER
    profileAiDetailBackground: '#FFF0F6',                        // Genel ekran arka planı (sunset.containerBackground)
    profileAiDetailOverlayBackground: 'rgba(255,105,180,0.08)',  // Video üstü karartma (sunset.overlay'e paralel)
    profileAiDetailBorderColor: '#4B004B',                      // Avatar kenarlığı (sunset.avatarCircleBorderColor)
    profileAiDetailTextPrimary: '#4B004B',                      // Ad, açıklama, buton yazıları (sunset.text)
    profileAiDetailButtonBackground: 'rgba(255,255,255,0.3)',    // Üçlü butonların zemini (sunset.secondaryButtonBackground)
    profileAiToggleBackground: '#FFD6E8',                       // Toggle varsayılan zemin (sunset.surfaceSecondary)
    profileAiToggleSelectedBackground: '#D65DB1',               // Toggle seçili zemin (sunset.primary)

    profileDetailScreenBackground: '#FFF0F6',                  // Ekran arka planı (sunset.containerBackground)
    profileDetailCardBackground: '#FFE4EC',                    // Profil kutusu arka planı (sunset.surfacePrimary)
    profileDetailEditButtonBackground: '#FFD6E8',              // "Edit Profile" butonu zemin (sunset.surfaceSecondary)
    profileDetailTextPrimary: '#4B004B',                       // Genel metinler (sunset.text)
    profileDetailNotificationBadgeBackground: '#FF69B4',       // Bildirim rozeti arka planı (sunset.badge)
    profileDetailCoinTextColor: '#f5c542',                     // Coin metni rengi (sabit kalır, tematik vurgudur)

    // ✅ ACCOUNT MODAL – SUNSET TEMA UYUMLU
    accountModalOverlay: 'rgba(255,105,180,0.08)',         // Sunset teması overlay (sunset.overlay)
    accountModalBackground: '#FFE4EC',                     // Modal iç arka plan (sunset.card)
    accountModalTitle: '#4B004B',                          // Başlık yazısı (sunset.text)
    accountModalLoginButton: '#FFA0D3',                    // Giriş butonu zemin (sunset.signInButtonBackground)
    accountModalLoginText: '#4B004B',                      // Giriş butonu yazı (sunset.text)
    accountModalSignupButton: '#FFD6E8',                   // Kayıt ol butonu zemin (sunset.surfaceSecondary)
    accountModalSignupText: '#4B004B',                     // Kayıt ol butonu yazı (sunset.text)

    // 🎁 GIFT MODAL RENKLERİ – SUNSET TEMA
    giftModalOverlay: 'rgba(255,105,180,0.08)',            // sunset.overlay
    giftModalBackground: '#FFE4EC',                        // sunset.card
    giftModalDragBar: '#FFD6E8',                           // sunset.borderColor (ya da surfaceSecondary)

    giftModalGiftBoxBackground: '#FFD6E8',                 // sunset.surfaceSecondary
    giftModalGiftName: '#4B004B',                          // sunset.text
    giftModalGiftPrice: '#f5c542',                         // sabit vurgu rengi (coin metni için)

    giftModalConfirmText: '#884466',                       // sunset.subtext
    giftModalProfileBorder: '#4B004B',                     // sunset.avatarCircleBorderColor

    giftModalCancelButtonBackground: '#FFD6E8',            // sunset.surfaceSecondary
    giftModalPayButtonBackground: '#D65DB1',               // sunset.primary
    giftModalButtonText: '#ffffff',                        // sabit beyaz (tema uyumlu)

    giftModalToastBackground: 'rgba(255,255,255,0.85)',    // sunset.subscriptionGiftToastBackground
    giftModalToastBorder: '#FFB3DA',                       // sunset.accent
    giftModalToastText: '#4B004B',                         // sunset.text

    // ✅ SUBSCRIPTION DETAIL SCREEN – SUNSET THEME
    subscriptionDetailBoxBackground: '#FFE4EC',             // Alt modal zemin (sunset.card ile aynı)
    subscriptionDetailDragBar: '#FFD6E8',                   // Üst çizgi (sunset.surfaceSecondary)
    subscriptionDetailOptionBox: '#FFD6E8',                 // Paket kutuları (sunset.surfaceSecondary)
    subscriptionDetailOptionBoxActiveBorder: '#4B004B',     // Seçili paketin kenarlığı (sunset.text)
    subscriptionDetailLabelText: '#4B004B',                 // Paket adları (sunset.text)
    subscriptionDetailPriceText: '#4B004B',                 // Fiyat (sunset.text)
    subscriptionDetailNoteText: '#884466',                  // Aylık / açıklama yazısı (sunset.subtext)
    subscriptionDetailBuyButtonBackground: '#FFD6E8',       // Satın al butonu zemin (sunset.surfaceSecondary)
    subscriptionDetailBuyButtonText: '#4B004B',             // Satın al butonu yazı rengi (sunset.text)

    cardPaymentBackground: '#FFF0F6',                    // sunset.containerBackground
    cardPaymentModalBoxBackground: '#FFE4EC',            // sunset.card
    cardPaymentTextPrimary: '#4B004B',                   // sunset.text
    cardPaymentTextSecondary: '#884466',                 // sunset.subtext
    cardPaymentBorderDefault: '#F4CDE4',                 // sunset.borderColor
    cardPaymentBorderSelected: '#D65DB1',                // sunset.primary (mor-pembe vurgulu seçim)
    cardPaymentRadioSelected: '#D65DB1',                 // sunset.primary
    cardPaymentRadioBorder: '#AA6A90',                   // sunset.chatLastMessage
    cardPaymentDeleteIcon: '#CC3366',                    // sunset.errorText
    cardPaymentAddCardText: '#D65DB1',                   // sunset.primary
    cardPaymentAddCardBorder: '#D65DB1',                 // sunset.primary
    cardPaymentPrimaryButton: '#FFD6E8',                 // sunset.subscriptionDetailBuyButtonBackground
    cardPaymentModalOverlay: 'rgba(255,105,180,0.08)',   // sunset.overlay

    addNewCardBackground: '#FFF0F6',                         // ekran arka planı (sunset.containerBackground)
    addNewCardFrontBackground: '#FFE4EC',                    // kart ön yüzeyi (sunset.surfacePrimary)
    addNewCardBackBackground: '#FFD6E8',                     // kart arka yüzeyi (sunset.surfaceSecondary)
    addNewCardMagneticStripe: '#4B004B',                     // manyetik şerit (sunset.text - koyu mor tonu)
    addNewCardTextPrimary: '#4B004B',                        // kart üzeri ana metinler (sunset.text)
    addNewCardTextSecondary: '#884466',                      // kart üzeri label (etiket) yazıları (sunset.subtext)
    addNewCardInputBackground: '#FFE4EC',                    // input kutusu zemini (sunset.inputWrapperBackground)
    addNewCardInputText: '#4B004B',                          // input içeriği (sunset.input)
    addNewCardInputLabel: '#A0527B',                         // input başlık yazısı (sunset.inputPlaceholder)
    addNewCardInputBorderDefault: '#F4CDE4',                 // input çerçevesi (normal) (sunset.borderColor)
    addNewCardInputBorderError: '#CC3366',                   // input çerçevesi (hatalı) (sunset.errorText)
    addNewCardCheckboxSelected: '#FFA0D3',                   // checkbox seçili rengi (sunset.signInButtonBackground)
    addNewCardCheckboxUnselected: '#AA6A90',                 // checkbox pasif (sunset.chatLastMessage)
    addNewCardCheckboxLabel: '#4B004B',                      // checkbox metni (sunset.text)
    addNewCardErrorText: '#CC3366',                          // hata yazıları (sunset.errorText)
    addNewCardTitleText: '#4B004B',                          // başlık metni (sunset.text)
    addNewCardEnrollButtonBackground: '#FFA0D3',             // kayıt butonu zemini (sunset.signInButtonBackground)
    addNewCardEnrollButtonText: '#4B004B',                   // kayıt butonu metni (sunset.text)
    addNewCardCvcBoxBackground: '#FFD6E8',                   // kart arka yüz CVC kutusu zemini (sunset.surfaceSecondary)
    addNewCardCvcLabelText: '#4B004B',                       // CVC yazısı (sunset.text)
    addNewCardCardIconColor: '#4B004B',                      // kart ikon rengi (sunset.text)


  },






  forest: {
    mode: 'forest',
    androidNavBarColor: 'rgba(0,0,0,0.5)',
    // GENEL ARKA PLANLAR
    containerBackground: '#E6F7FF',                  // Sayfa zemini
    card: '#D0F0F8',                                 // Kartlar
    overlay: 'rgba(0,102,102,0.08)',                 // Yarı saydam katman
    surfacePrimary: '#D0F0F8',                       // Birincil yüzey
    surfaceSecondary: '#B3E5F5',                     // İkincil yüzey (input, bar)

    // YAZI & İKON RENKLERİ
    text: '#003344',                                 // Ana metin
    subtext: '#336677',                              // Açıklama
    input: '#003344',
    inputPlaceholder: '#446677',
    inputIcon: '#003344',
    badge: '#FF69B4',
    chatBadge: 'rgba(0,80,80,0.15)',

    // SEÇİM & KATEGORİ
    selectedCategoryBackground: '#003344',
    selectedCategoryText: '#ffffff',

    // GİRİŞ / KAYIT EKRANI
    inputWrapperBackground: '#CCF2FF',
    signInButtonBackground: '#66D9FF',
    line: '#3399AA',
    orText: '#336677',
    footerText: '#003344',
    signupText: '#00A3A3',

    // SOSYAL BUTONLAR
    socialGoogleBackground: '#B3ECFF',
    googleName: '#003344',
    socialFacebookBackround: '#3b5998',
    facebookName: '#ffffff',
    socialText: '#003344',

    // UYARI & HATA
    errorText: '#CC3366',
    warningText: '#FF6666',

    // TEMATİK RENKLER
    primary: '#00A3A3',
    accent: '#66D9FF',
    primarySend: '#00A3A3',

    // SINIRLAR & ÇERÇEVELER
    avatarCircleBorderColor: '#003344',
    borderColor: '#00A3A3',

    // HEADER & KARTLAR
    headerTextColor: '#003344',
    cardNameOverlayBackground: 'rgba(0,80,80,0.08)',
    cardNameOverlayText: '#003344',
    cardImageBorderRadius: 10,

    // BOTTOM BAR
    bottomBarBackground: '#CCF2FF',
    bottomBarIconActive: '#003344',
    bottomBarIconInactive: '#669999',
    bottomBarBadgeBackground: '#FF69B4',

    // SIDEBAR
    sidebarAvatarBackground: '#B3ECFF',
    logoutTextColor: '#CC3366',

    // CHARACTER SCREEN
    characterCardBackground: '#CCF2FF',
    characterOverlay: 'rgba(0,102,102,0.08)',
    tagBackground: '#ffffff',
    tagText: '#003344',
    secondaryButtonBackground: 'rgba(255,255,255,0.3)',

    // INFO & LOCKED
    infoCardBackground: '#B3ECFF',
    lockedModalCoinColor: '#00A3A3',

    // CHAT LIST SCREEN
    chatName: '#003344',
    chatTime: '#336677',
    chatLastMessage: '#558899',
    unreadBadgeBackground: '#28c840',
    unreadText: '#ffffff',
    searchBarBackground: '#B3ECFF',
    searchIcon: '#669999',

    // COIN PURCHASE SCREEN
    coinPackageBoxBackground: '#CCF2FF',
    coinPopularBoxBackground: '#A0E8FF',
    popularBadgeBackground: '#FFD700',
    popularBadgeText: '#003344',

    // NOTIFICATION SCREEN
    notificationIconColor: '#00A3A3',
    notificationSubtext: '#336677',
    timeText: '#669999',
    emptyIconColor: '#669999',
    deleteButtonBackground: '#CC3366',

    // ✅ IMAGE DETAIL SCREEN
    fullscreenImageBackground: '#E6F7FF',
    imageCloseButtonBackground: 'rgba(0,102,102,0.08)',
    imageCloseIconColor: '#003344',

    imageDeleteButtonBackground: '#CC3366',
    imageDeleteButtonText: '#ffffff',

    // LANGUAGE SETTINGS SCREEN
    languageSelectedBackground: '#A0E8FF',        // Seçili dilin arka planı (uyumlu açık mavi tonu)
    languageSelectedCheckColor: '#28c840',        // Onay ikonu rengi (standardize yeşil)

    // ✅ INTERESTS SCREEN
    interestSubtitleText: '#cccccc',
    selectedChipBackground: '#003344',
    selectedChipText: '#ffffff',

    // ✅ PROFILE EDIT SCREEN
    profileEditHeaderBorder: '#B3E5F5',
    profileEditPlaceholderBg: '#A0E8FF',
    profileEditLabelText: '#003344',
    profileEditSaveButtonBackground: '#00A3A3',

    // ✅ NOTIFICATION SETTINGS SCREEN – YENİ EKLENENLER
    notificationCardBackground: '#CCF2FF',         // Bildirim kart zemini (uyumlu açık mavi)
    shadowColorDefault: '#99CCDD',                 // Gölge efekti için yumuşak mavi ton
    switchTrackActive: '#66D9FF',                  // Aktif track (ana accent)
    switchTrackInactive: '#A0D0DD',                // Pasif track (soluk mavi-gri)
    switchThumbActive: '#00A3A3',                  // Thumb aktif (primary)
    switchThumbInactive: '#ffffff',                // Thumb pasif (beyaz)

    // ✅ PRIVACY POLICY SCREEN – YENİ EKLENENLER
    privacyBackground: '#E6F7FF',             // SafeAreaView zemin rengi (tema containerBackground ile aynı)
    privacySubtitleText: '#003344',           // Başlıklar (örneğin: Bilgi Paylaşımı)
    privacyBodyText: '#336677',               // Paragraf içerikleri (alt açıklamalar)


    // ✅ SETTINGS SCREEN – EKLENENLER
    settingsSectionBackground: '#B3E5F5',     // Ayar kart zemini (inputlarla uyumlu açık mavi)
    settingsItemText: '#003344',              // Ayar metinleri (ana yazı rengiyle aynı)
    settingsItemIcon: '#446677',              // Ayar ikonları (placeholder ile uyumlu)
    settingsChevronIcon: '#558899',           // Sağ yön ikonu (chatLastMessage ile aynı)

    recipientScreenBackground: '#E6F7FF',
    recipientScreenTitleText: '#003344',
    recipientScreenNameText: '#003344',
    recipientScreenCardBackground: '#D0F0F8',


    // SUBSCRIPTION GIFT SCREEN
    subscriptionGiftBackground: '#E6F7FF',                            // Sayfa arka planı (containerBackground ile aynı)
    subscriptionGiftTitleText: '#003344',                             // Başlık ve geri ikon rengi (text ile aynı)
    subscriptionGiftCardBackground: '#D0F0F8',                        // Hediye kart arka planı (surfacePrimary ile aynı)
    subscriptionGiftNameText: '#336677',                              // Hediye adı rengi (subtext ile aynı)
    subscriptionGiftToastBackground: 'rgba(255,255,255,0.85)',        // Toast zemin (açık saydam beyaz)
    subscriptionGiftToastText: '#003344',                             // Toast metin rengi (tema text rengiyle uyumlu)


    // ✅ SUBSCRIPTION SCREEN – EKLENENLER
    subscriptionScreenBackground: '#E6F7FF',              // Ekran arka planı (screenContainer)
    subscriptionHeaderText: '#003344',                    // Başlık metni rengi
    subscriptionBackIcon: '#003344',                      // Geri buton ikon rengi
    subscriptionTabBackground: '#B3E5F5',                 // Sekme arka planı
    subscriptionTabText: '#003344',                       // Sekme metin rengi
    subscriptionTabActiveBackground: '#003344',           // Aktif sekme arka planı
    subscriptionTabActiveText: '#ffffff',                 // Aktif sekme metin rengi
    subscriptionPlanBoxBackground: '#D0F0F8',             // Plan kutusu zemini
    subscriptionPlanText: '#003344',                      // Özellik listesi yazı rengi
    subscriptionDetailButtonBackground: '#00A3A3',        // Detay butonu zemin rengi
    subscriptionDetailButtonText: '#ffffff',              // Detay butonu yazı rengi
    subscriptionModalBackground: '#B3E5F5',               // Subscription detail modal iç kart zemin
    checkIconColor: '#6FE37B',
    planBoxShadow: '#1A1A1A',
    planIconShadow: '#1A1A1A',



    aboutScreenBackground: '#E6F7FF',         // Ekran arka planı (containerBackground ile aynı)
    aboutAppNameText: '#003344',              // Uygulama adı metni (ana yazı rengi)
    aboutAppVersionText: '#669999',           // Versiyon bilgisi metni (soluk açıklama tonu)
    aboutAppDescriptionText: '#336677',       // Açıklama paragraf metni (subtext rengi ile uyumlu)
    aboutInfoLabelText: '#446677',            // Etiket (Geliştirici, İletişim) yazıları (placeholder ile uyumlu)
    aboutInfoValueText: '#003344',            // Etiket karşılığı değer yazıları (ana text ile aynı)

    // ✅ REPORT ISSUE SCREEN
    reportScreenBackground: '#E6F7FF',             // Genel arka plan (containerBackground ile aynı)
    reportLabelText: '#336677',                    // Açıklayıcı metin (subtext ile aynı)
    reportTextAreaBackground: '#B3E5F5',           // Giriş kutusu arka planı (surfaceSecondary ile aynı)
    textPrimary: '#003344',                        // Giriş metni ve buton metni (text ile aynı)
    textPlaceholder: '#446677',                    // Placeholder metni (inputPlaceholder ile aynı)
    reportButtonBackground: '#00A3A3',             // Gönder butonu zemini (primary ile aynı)


    supportScreenBackground: '#E6F7FF',                 // SafeAreaView zemini (containerBackground)
    supportOptionDividerColor: '#B3E5F5',               // Her seçeneğin altındaki çizgi (surfaceSecondary)
    supportOptionIconColor: '#003344',                 // Zarf ve soru işareti ikonları (text)
    supportOptionTextColor: '#003344',                 // "support.email" ve "support.faq" metinleri (text)
    supportChevronIconColor: '#003344',                // Sağ yön ikonu rengi (text)
    supportInfoBoxBackground: '#D0F0F8',               // Bilgi kutusunun arka planı (surfacePrimary)
    supportInfoTextColor: '#336677',                   // Bilgi kutusu metni rengi (subtext)


    // ✅ PROFILE AI DETAIL SCREEN – FOREST TEMASI
    profileAiDetailBackground: '#E6F7FF',                         // Genel ekran arka planı (containerBackground)
    profileAiDetailOverlayBackground: 'rgba(0,102,102,0.08)',     // Video üstü karartma (overlay)
    profileAiDetailBorderColor: '#003344',                        // Avatar kenarlığı (avatarCircleBorderColor)
    profileAiDetailTextPrimary: '#003344',                        // Ad, açıklama, buton yazıları (text)
    profileAiDetailButtonBackground: 'rgba(255,255,255,0.3)',     // Üçlü butonların zemini (secondaryButtonBackground)
    profileAiToggleBackground: '#B3E5F5',                         // Toggle varsayılan zemin (surfaceSecondary)
    profileAiToggleSelectedBackground: '#00A3A3',                 // Toggle seçili zemin (primary)


    profileDetailScreenBackground: '#E6F7FF',                  // Ekran arka planı (containerBackground)
    profileDetailCardBackground: '#D0F0F8',                    // Profil kutusu arka planı (surfacePrimary)
    profileDetailEditButtonBackground: '#B3E5F5',              // "Edit Profile" butonu zemin (surfaceSecondary)
    profileDetailTextPrimary: '#003344',                       // Genel metinler (text)
    profileDetailNotificationBadgeBackground: '#FF69B4',       // Bildirim rozeti arka planı (badge)
    profileDetailCoinTextColor: '#f5c542',                     // Coin metni rengi (temalar arası sabit vurgu)

    // ✅ ACCOUNT MODAL RENKLERİ – FOREST TEMASI
    accountModalOverlay: 'rgba(0,102,102,0.08)',         // Modal dışında kalan karartılmış arka plan (forest.overlay)
    accountModalBackground: '#D0F0F8',                   // Modal iç arka plan rengi (forest.surfacePrimary)
    accountModalTitle: '#003344',                        // Modal başlık metin rengi (forest.text)
    accountModalLoginButton: '#00A3A3',                  // Giriş butonu arka plan rengi (forest.primary)
    accountModalLoginText: '#ffffff',                    // Giriş butonu yazı rengi (sabit beyaz)
    accountModalSignupButton: '#B3E5F5',                 // Kayıt ol butonu arka plan rengi (forest.surfaceSecondary)
    accountModalSignupText: '#003344',                   // Kayıt ol butonu yazı rengi (forest.text)


    // 🎁 GIFT MODAL RENKLERİ – FOREST TEMA
    giftModalOverlay: 'rgba(0,102,102,0.08)',         // Modal dışında kalan arka plan (forest.overlay)
    giftModalBackground: '#D0F0F8',                   // Modal iç arka plan (forest.surfacePrimary)
    giftModalDragBar: '#B3E5F5',                      // Modal üst sürükleme barı (forest.surfaceSecondary)

    giftModalGiftBoxBackground: '#B3E5F5',            // Hediye kutusu arka planı (forest.surfaceSecondary)
    giftModalGiftName: '#003344',                     // Hediye adı metni (forest.text)
    giftModalGiftPrice: '#f5c542',                    // Hediye fiyatı (sabit coin rengi)

    giftModalConfirmText: '#336677',                  // Onay metni (forest.subtext)
    giftModalProfileBorder: '#003344',                // Profil kenarlığı (forest.avatarCircleBorderColor)

    giftModalCancelButtonBackground: '#B3E5F5',       // İptal butonu arka planı (forest.surfaceSecondary)
    giftModalPayButtonBackground: '#00A3A3',          // Gönder butonu arka planı (forest.primary)
    giftModalButtonText: '#ffffff',                   // Tüm buton yazıları (sabit beyaz)

    giftModalToastBackground: 'rgba(255,255,255,0.85)', // Toast zemin (forest.subscriptionGiftToastBackground)
    giftModalToastBorder: '#00A3A3',                  // Toast kenarlık (forest.primary)
    giftModalToastText: '#003344',                    // Toast metin (forest.text)


    subscriptionDetailBoxBackground: '#D0F0F8',             // Alt modal zemin (forest.surfacePrimary)
    subscriptionDetailDragBar: '#B3E5F5',                   // Üst çizgi (forest.surfaceSecondary)
    subscriptionDetailOptionBox: '#B3E5F5',                 // Paket kutuları (forest.surfaceSecondary)
    subscriptionDetailOptionBoxActiveBorder: '#003344',     // Seçili paketin kenarlığı (forest.text)
    subscriptionDetailLabelText: '#003344',                 // Paket adları (forest.text)
    subscriptionDetailPriceText: '#003344',                 // Fiyat (forest.text)
    subscriptionDetailNoteText: '#336677',                  // Aylık / açıklama yazısı (forest.subtext)
    subscriptionDetailBuyButtonBackground: '#B3E5F5',       // Satın al butonu zemin (forest.surfaceSecondary)
    subscriptionDetailBuyButtonText: '#003344',             // Satın al butonu yazı rengi (forest.text)

    cardPaymentBackground: '#E6F7FF',                     // containerBackground
    cardPaymentModalBoxBackground: '#D0F0F8',             // subscriptionModalBackground → surfacePrimary
    cardPaymentTextPrimary: '#003344',                   // text
    cardPaymentTextSecondary: '#336677',                 // subtext
    cardPaymentBorderDefault: '#00A3A3',                 // borderColor
    cardPaymentBorderSelected: '#f5c542',                // lockedModalCoinColor (altın sarısı sabit)
    cardPaymentRadioSelected: '#f5c542',                 // lockedModalCoinColor
    cardPaymentRadioBorder: '#558899',                   // chatLastMessage (soft mavi-gri)
    cardPaymentDeleteIcon: '#CC3366',                    // badge / giftModalDelete (errorText)
    cardPaymentAddCardText: '#00A3A3',                   // primary (vurgulu cam göbeği)
    cardPaymentAddCardBorder: '#00A3A3',                 // primary
    cardPaymentPrimaryButton: '#B3E5F5',                 // subscriptionDetailBuyButtonBackground (surfaceSecondary)
    cardPaymentModalOverlay: 'rgba(0,102,102,0.08)',     // accountModalOverlay → forest.overlay


    addNewCardBackground: '#E6F7FF',                         // ekran arka planı (containerBackground)
    addNewCardFrontBackground: '#D0F0F8',                    // kart ön yüzeyi (surfacePrimary)
    addNewCardBackBackground: '#B3E5F5',                     // kart arka yüzeyi (surfaceSecondary)
    addNewCardMagneticStripe: '#003344',                    // manyetik şerit (dark cam göbeği, kontrastlı)
    addNewCardTextPrimary: '#003344',                       // kart üzeri ana metinler (text)
    addNewCardTextSecondary: '#336677',                     // kart üzeri label yazıları (subtext)
    addNewCardInputBackground: '#CCF2FF',                   // input kutusu zemini (inputWrapperBackground)
    addNewCardInputText: '#003344',                         // input içeriği (text)
    addNewCardInputLabel: '#336677',                        // input başlık yazısı (subtext)
    addNewCardInputBorderDefault: '#00A3A3',                // input çerçevesi (primary)
    addNewCardInputBorderError: '#CC3366',                  // input çerçevesi (hatalı)
    addNewCardCheckboxSelected: '#00A3A3',                  // checkbox seçili (primary)
    addNewCardCheckboxUnselected: '#669999',                // checkbox pasif (inaktif bar rengi gibi)
    addNewCardCheckboxLabel: '#003344',                     // checkbox metni (text)
    addNewCardErrorText: '#CC3366',                         // hata yazıları (errorText)
    addNewCardTitleText: '#003344',                         // başlık metni (text)
    addNewCardEnrollButtonBackground: '#00A3A3',            // kayıt butonu zemini (primary)
    addNewCardEnrollButtonText: '#ffffff',                  // kayıt butonu metni (sabit beyaz)
    addNewCardCvcBoxBackground: '#B3E5F5',                  // kart arkası CVC kutusu (surfaceSecondary)
    addNewCardCvcLabelText: '#003344',                      // CVC yazısı (text)
    addNewCardCardIconColor: '#003344',                     // ikonlar koyu mavi-yeşil (text)


  }





};

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setThemeState] = useState(themes.dark);

  useEffect(() => {
    const loadStoredTheme = async () => {
      const storedThemeId = await AsyncStorage.getItem('theme');
      if (storedThemeId && themes[storedThemeId]) {
        setThemeState(themes[storedThemeId]);
      }
    };
    loadStoredTheme();
  }, []);

  const setTheme = async (themeId) => {
    if (themes[themeId]) {
      await AsyncStorage.setItem('theme', themeId);
      setThemeState(themes[themeId]);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);