import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  ScrollView,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import HeaderWithProgress from '../../components/headers/HeaderWithProgress';
import PageTitle from '../../components/ui/PageTitle';
import NextButton from '../../components/ui/NextButton';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../src/context/ThemeContext';

const { width, height } = Dimensions.get('window');
const scale = width / 375;
const ITEM_SIZE = (width - 60) / 2;

export default function CharacterTypeScreen({ navigation }) {
  const route = useRoute();
  const scrollRef = useRef();
  const { t } = useTranslation();
  const { theme } = useTheme();

  const {
    email,
    password,
    confirmPassword,
    name,
    birthDate,
    gender,
    languages,
    relationshipPreference,
    partnerAgeRange,
    characterTypes: routeSelected,
    ...restParams
  } = route.params;

  const [selected, setSelected] = useState(routeSelected || []);

  // Scroll efektini uygulamak için
  useEffect(() => {
    let count = 0;
    const interval = setInterval(() => {
      scrollRef.current?.scrollTo({ y: count % 2 === 0 ? height * 0.15 : 0, animated: true });
      count++;
      if (count >= 4) clearInterval(interval);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleSelection = (key) => {
    if (selected.includes(key)) {
      setSelected(selected.filter(item => item !== key));
    } else {
      setSelected([...selected, key]);
    }
  };

  const sections = [
    {
      title: t('character_type.sections.girls'), // tr.json: "girls": "Kız Karakterler"
      options: [
        { key: 'girl_next_door', image: require('../../assets/users/user1.jpg') },
        { key: 'beauty_queen', image: require('../../assets/users/user2.jpg') },
        { key: 'virgin', image: require('../../assets/users/user4.jpg') },
      ],
    },
    {
      title: t('character_type.sections.anime'),
      options: [
        { key: 'anime_girl', image: require('../../assets/users/user3.jpg') },
      ],
    },
    {
      title: t('character_type.sections.boys'),
      options: [
        { key: 'shy_girl', image: require('../../assets/users/user5.jpg') },
        { key: 'red_asian', image: require('../../assets/users/user4.jpg') },
      ],
    },
  ];

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={[styles.container, { backgroundColor: theme.containerBackground }]}>
        <HeaderWithProgress navigation={navigation} currentStep={3} />

        <ScrollView
          ref={scrollRef}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <PageTitle>{t('character_type.title')}</PageTitle>

          {sections.map((section, idx) => (
            <View key={idx} style={styles.sectionBlock}>
              <Text style={[styles.sectionTitle, { color: theme.text }]}>
                {section.title}
              </Text>

              <View style={styles.gridWrapper}>
                {section.options.map((item, index) => (
                  <TouchableOpacity
                    key={item.key}
                    style={[
                      styles.gridItem,
                      { backgroundColor: theme.surfacePrimary },
                      selected.includes(item.key) && {
                        borderWidth: 2,
                        borderColor: theme.badge,
                      },
                    ]}
                    onPress={() => toggleSelection(item.key)}
                  >
                    <Image source={item.image} style={styles.image} />
                    <View style={styles.labelOverlay}>
                      <Text style={[styles.label, { color: theme.text }]}>
                        {t(`character_type.options.${item.key}`)}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))}
        </ScrollView>

        <NextButton
          label={t('common.next')}
          onPress={() =>
            navigation.navigate('PersonalityTraits', {
              ...restParams,
              email,
              password,
              confirmPassword,
              name,
              birthDate,
              gender,
              languages,
              relationshipPreference,
              partnerAgeRange,
              characterTypes: selected,
            })
          }
          disabled={selected.length === 0}
        />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10 * scale,
  },
  scrollContent: {
    paddingHorizontal: 20 * scale,
    paddingBottom: 140 * scale,
  },
  sectionBlock: {
    marginBottom: 20 * scale,
  },
  sectionTitle: {
    fontSize: 18 * scale,
    fontWeight: '600',
    marginBottom: 12 * scale,
  },
  gridWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridItem: {
    borderRadius: 12 * scale,
    marginBottom: 20 * scale,
    width: ITEM_SIZE,
    overflow: 'hidden',
  },
  image: {
    width: ITEM_SIZE,
    height: ITEM_SIZE,
    resizeMode: 'cover',
  },
  labelOverlay: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    paddingVertical: 6 * scale,
    alignItems: 'center',
  },
  label: {
    fontWeight: 'bold',
    fontSize: 14 * scale,
    textAlign: 'center',
  },
});
