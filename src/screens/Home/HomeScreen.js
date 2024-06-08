import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useTheme } from '../../configs/ThemeContext';
import Setting from '../../asserts/svg/Setting';

const HomeScreen = ({ navigation }) => {
  const { getTheme } = useTheme();
  const theme = getTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <View style={styles.header}>
        <Image source={require('../../asserts/images/Facthub-Logo.png')} style={styles.logo} />
        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
          {/* <Setting name="settings-outline" size={30} color={theme.textColor} /> */}
          <Setting/>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.content}>
        <Text style={[styles.sectionTitle, { color: theme.textColor }]}>For You</Text>
        {/* Render articles here */}
        <Text style={[styles.sectionTitle, { color: theme.textColor }]}>Latest Update</Text>
        {/* Render latest updates here */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 50,
    resizeMode: 'contain',
  },
  content: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default HomeScreen;