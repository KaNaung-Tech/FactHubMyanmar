import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import SplashScreen from '../screens/Authentication/SplashScreen';
import OnboardingScreen from '../screens/Authentication/OnboardingScreen';
import SettingsScreen from '../screens/Settings/SettingsScreen';
import ThemeScreen from '../screens/Settings/ThemeScreen';
import LanguageScreen from '../screens/Settings/LanguageScreen';
import ContactUsScreen from '../screens/Settings/ContactUsScreen';
import DataImportExportScreen from '../screens/Settings/DataImportExportScreen';
import TabNavigator from './TabNavigator';
import CategoryDetailScreen from '../screens/Home/CategoryDetailScreen';

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
      <Stack.Screen name="Theme" component={ThemeScreen} />
      <Stack.Screen name="Language" component={LanguageScreen} />
      <Stack.Screen name="ContactUs" component={ContactUsScreen} />
      <Stack.Screen name="DataImportExport" component={DataImportExportScreen} />
      {/* <Stack.Screen name="CategoryDetail" component={CategoryDetailScreen} options={{ title: 'Category Detail' }} /> */}
    </Stack.Navigator>
  </NavigationContainer>
);

export default MainNavigator;
