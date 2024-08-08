import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '../../configs/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import HeaderComponent from '../../components/HeaderComponent';

const iconMappings = {
  light: {
    theme: require('../../asserts/images/light/theme-icon.png'),
    language: require('../../asserts/images/light/language-icon.png'),
    contact: require('../../asserts/images/light/contact-icon.png'),
    data: require('../../asserts/images/light/data-icon.png'),
  },
  dark: {
    theme: require('../../asserts/images/dark/theme-icon.png'),
    language: require('../../asserts/images/dark/language-icon.png'),
    contact: require('../../asserts/images/dark/contact-icon.png'),
    data: require('../../asserts/images/dark/data-icon.png'),
  },
  eyeProtection: {
    theme: require('../../asserts/images/eyeProtection/theme-icon.png'),
    language: require('../../asserts/images/eyeProtection/language-icon.png'),
    contact: require('../../asserts/images/eyeProtection/contact-icon.png'),
    data: require('../../asserts/images/eyeProtection/data-icon.png'),
  },
  auto: {
    theme: require('../../asserts/images/light/theme-icon.png'), 
    language: require('../../asserts/images/light/language-icon.png'),
    contact: require('../../asserts/images/light/contact-icon.png'),
    data: require('../../asserts/images/light/data-icon.png'),
  },
};

const SettingsScreen = () => {
  const { getTheme } = useTheme();
  const theme = getTheme();
  const navigation = useNavigation();

  // Determine the theme type (light, dark, etc.) based on the background color
  const themeType = Object.keys(iconMappings).find(key => iconMappings[key].theme === theme.backgroundColor);

  const icons = iconMappings[themeType] || iconMappings.auto; // Fallback to auto if themeType is undefined

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <HeaderComponent title="Settings" light={theme.backgroundColor === iconMappings.light.theme} />
      <TouchableOpacity style={styles.optionContainer} onPress={() => navigation.navigate('Theme')}>
        <View style={styles.option}>
          <Image source={icons.theme} style={styles.icon} />
          <Text style={[styles.optionTitle, { color: theme.textColor }]}>Theme</Text>
        </View>
      </TouchableOpacity>
      {/* <TouchableOpacity style={styles.optionContainer} onPress={() => navigation.navigate('Language')}>
        <View style={styles.option}>
          <Image source={icons.language} style={styles.icon} />
          <Text style={[styles.optionTitle, { color: theme.textColor }]}>Language</Text>
        </View>
      </TouchableOpacity> */}
      <TouchableOpacity style={styles.optionContainer} onPress={() => navigation.navigate('ContactUs')}>
        <View style={styles.option}>
          <Image source={icons.contact} style={styles.icon} />
          <Text style={[styles.optionTitle, { color: theme.textColor }]}>Contact Us</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.optionContainer} onPress={() => navigation.navigate('DataImportExport')}>
        <View style={styles.option}>
          <Image source={icons.data} style={styles.icon} />
          <Text style={[styles.optionTitle, { color: theme.textColor }]}>Data Import and Export</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  optionContainer: {
    marginBottom: 20,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  icon: {
    width: 24,
    height: 24,
  },
});

export default SettingsScreen;
