import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../../configs/ThemeContext';
import Setting from '../../asserts/svg/Setting';
import HomeTopTabNavigator from '../../routes/HomeTopTabNavigator';

const HomeScreen = ({ navigation }) => {
  const { getTheme } = useTheme();
  const theme = getTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <View style={styles.header}>
        <Image source={require('../../asserts/images/Facthub-Logo.png')} style={styles.logo} />
        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
          <Setting color={theme.textColor} />
        </TouchableOpacity>
      </View>
      <HomeTopTabNavigator />
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
});

export default HomeScreen;
