import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import SplashScreen from '../screens/Authentication/SplashScreen';
import OnboardingScreen from '../screens/Authentication/OnboardingScreen';
import SettingsScreen from '../screens/Settings/SettingsScreen';
import ThemeScreen from '../screens/Settings/ThemeScreen';
import LanguageScreen from '../screens/Settings/LanguageScreen';
import ContactUsScreen from '../screens/Settings/ContactUsScreen';
import DataImportExportScreen from '../screens/Settings/DataImportExportScreen';
import TabNavigator from './TabNavigator';

const Stack = createStackNavigator();

const OnboardingStack = () => (
  <Stack.Navigator initialRouteName="Onboarding" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Onboarding" component={OnboardingScreen} />
  </Stack.Navigator>
);

const MainNavigator = () => {
  const [initialRoute, setInitialRoute] = useState('Splash');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      try {
        const status = await AsyncStorage.getItem('onboardingCompleted');
        console.log('Fetched onboarding status:', status); // Debug log
        if (status === 'true') {
          setInitialRoute('MainTabs');
        } else {
          setInitialRoute('OnboardingStack');
        }
      } catch (error) {
        console.error('Failed to fetch onboarding status:', error);
      } finally {
        setLoading(false);
      }
    };

    checkOnboardingStatus();
  }, []);

  useEffect(() => {
    console.log('Initial route set to:', initialRoute); // Debug log
  }, [initialRoute]);

  if (loading) {
    return null; // Render nothing or a loading spinner while checking the status
  }

  return (
    <NavigationContainer key={initialRoute}> 
      <Stack.Navigator initialRouteName={initialRoute} screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="OnboardingStack" component={OnboardingStack} />
        <Stack.Screen name="MainTabs" component={TabNavigator} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Theme" component={ThemeScreen} />
        <Stack.Screen name="Language" component={LanguageScreen} />
        <Stack.Screen name="ContactUs" component={ContactUsScreen} />
        <Stack.Screen name="DataImportExport" component={DataImportExportScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
