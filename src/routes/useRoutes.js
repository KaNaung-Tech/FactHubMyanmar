import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import SplashScreen from '../screens/Authentication/SplashScreen';
import OnboardingScreen from '../screens/Authentication/OnboardingScreen';
import SettingsScreen from '../screens/Settings/SettingsScreen';
import TabNavigator from './TabNavigator';

const Stack = createStackNavigator();

const OnboardingStack = () => (
  <Stack.Navigator initialRouteName="Onboarding" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Onboarding" component={OnboardingScreen} />
  </Stack.Navigator>
);

const MainNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="OnboardingStack" component={OnboardingStack} />
      <Stack.Screen name="MainTabs" component={TabNavigator} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default MainNavigator;
