import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import RadioButton from '../../components/RadioButton';
import HeaderComponent from '../../components/HeaderComponent';
import { useTheme } from '../../configs/ThemeContext';

const LanguageScreen = () => {
  const { toggleTheme, getTheme } = useTheme();
  const theme = getTheme();
  const [selectedLanguage, setSelectedLanguage] = useState('english'); // Default to 'english'

  const handleSelectLanguage = (language) => {
    setSelectedLanguage(language);
    // Assuming toggleTheme can handle language change or adapt as needed
    toggleTheme(language); 
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <HeaderComponent title="Language" light={theme.backgroundColor} />
      <RadioButton
        label="Myanmar"
        value="myanmar"
        selected={selectedLanguage === 'myanmar'}
        onSelect={handleSelectLanguage}
        theme={theme}
      />
      <RadioButton
        label="English"
        value="english"
        selected={selectedLanguage === 'english'}
        onSelect={handleSelectLanguage}
        theme={theme}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

export default LanguageScreen;
