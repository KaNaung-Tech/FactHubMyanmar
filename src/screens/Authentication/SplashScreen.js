import React, { useEffect, useState } from 'react';
import { Image, StatusBar, StyleSheet, View } from 'react-native';
import { useTheme } from '../../configs/ThemeContext';
import { useNavigation } from '@react-navigation/native';

const FactHubLogo = require('../../asserts/images/Facthub-Logo.png'); 

const SplashScreen = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const [backgroundColor, setBackgroundColor] = useState(theme.backgroundColor || '#FFFFFF'); // Default color added

  useEffect(() => {
    StatusBar.setBarStyle(theme.statusBarStyle);
    StatusBar.setBackgroundColor(backgroundColor);

    const timeout = setTimeout(() => {
      navigation.replace('OnboardingStack');
    }, 2000);

    return () => clearTimeout(timeout);
  }, [navigation, theme, backgroundColor]);

  useEffect(() => {
    setBackgroundColor(theme.backgroundColor || '#FFFFFF'); // Default color added
  }, [theme]);

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Image
        source={FactHubLogo}
        resizeMode="contain"
        style={styles.logo}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  logo: {
    width: 222,
    height: 64,
  },
});
