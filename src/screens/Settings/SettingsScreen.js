import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../../configs/ThemeContext';

const SettingsScreen = () => {
  const { toggleTheme, getTheme } = useTheme();
  const theme = getTheme();

  console.log("toggleTheme:", toggleTheme); // Debugging log

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <Text style={[styles.title, { color: theme.textColor }]}>Settings</Text>
      <View style={styles.optionContainer}>
        <Text style={[styles.optionTitle, { color: theme.textColor }]}>Theme</Text>
        <TouchableOpacity onPress={() => toggleTheme('auto')}>
          <Text style={[styles.option, { color: theme.textColor }]}>Auto</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toggleTheme('light')}>
          <Text style={[styles.option, { color: theme.textColor }]}>Light Theme</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toggleTheme('dark')}>
          <Text style={[styles.option, { color: theme.textColor }]}>Dark Theme</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toggleTheme('eyeProtection')}>
          <Text style={[styles.option, { color: theme.textColor }]}>Eye Protection Theme</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.optionContainer}>
        <Text style={[styles.optionTitle, { color: theme.textColor }]}>Language</Text>
        {/* Add language selection options here */}
      </View>
      <View style={styles.optionContainer}>
        <Text style={[styles.optionTitle, { color: theme.textColor }]}>Contact</Text>
        {/* Add contact options here */}
      </View>
      <View style={styles.optionContainer}>
        <Text style={[styles.optionTitle, { color: theme.textColor }]}>Data Import/Export</Text>
        {/* Add data import/export options here */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  optionContainer: {
    marginBottom: 20,
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  option: {
    fontSize: 16,
    paddingVertical: 10,
  },
});

export default SettingsScreen;
