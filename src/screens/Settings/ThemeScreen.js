import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../../configs/ThemeContext';
import HeaderComponent from '../../components/HeaderComponent';
import RadioButton from '../../components/RadioButton';

const ThemeScreen = () => {
  const { toggleTheme, getTheme } = useTheme();
  const theme = getTheme();
  const [selectedTheme, setSelectedTheme] = useState(theme.name);

  const handleSelectTheme = (themeName) => {
    setSelectedTheme(themeName);
    toggleTheme(themeName);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <HeaderComponent title="Select Theme" light={theme.backgroundColor} />
      <RadioButton
        label="Auto"
        value="auto"
        selected={selectedTheme === 'auto'}
        onSelect={handleSelectTheme}
        theme={theme}
      />
      <RadioButton
        label="Light Theme"
        value="light"
        selected={selectedTheme === 'light'}
        onSelect={handleSelectTheme}
        theme={theme}
      />
      <RadioButton
        label="Dark Theme"
        value="dark"
        selected={selectedTheme === 'dark'}
        onSelect={handleSelectTheme}
        theme={theme}
      />
      <RadioButton
        label="Eye Protection Theme"
        value="eyeProtection"
        selected={selectedTheme === 'eyeProtection'}
        onSelect={handleSelectTheme}
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

export default ThemeScreen;
