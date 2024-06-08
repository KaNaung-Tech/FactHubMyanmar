import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { useTheme } from '../configs/ThemeContext';

import SplashScreen from '../screens/Authentication/SplashScreen';
import OnboardingScreen from '../screens/Authentication/OnboardingScreen';
import HomeScreen from '../screens/Home/HomeScreen';
import SettingsScreen from '../screens/Settings/SettingsScreen';
import ExploreScreen from '../screens/Explore/ExploreScreen';
import BookmarkScreen from '../screens/Bookmark/BookmarkScreen';
import ReadingHistoryScreen from '../screens/History/ReadingHistoryScreen';
import AllCategoriesListScreen from '../screens/Categories/AllCategoriesListScreen';
import ArticlePageScreen from '../screens/Article/ArticlePageScreen';
import AuthorProfileScreen from '../screens/Profile/AuthorProfileScreen';
import SearchScreen from '../screens/Search/SearchScreen';
import FavoriteScreen from '../screens/Favorite/FavoriteScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const OnboardingStack = () => (
  <Stack.Navigator
    initialRouteName="Onboarding"
    screenOptions={{ headerShown: false }}
  >
    <Stack.Screen name="Onboarding" component={OnboardingScreen} />
  </Stack.Navigator>
);

const HomeStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="HomeStack" component={HomeScreen} />
    <Stack.Screen name="AllCategoriesList" component={AllCategoriesListScreen} />
    <Stack.Screen name="ArticlePage" component={ArticlePageScreen} />
    <Stack.Screen name="AuthorProfile" component={AuthorProfileScreen} />
    <Stack.Screen name="Settings" component={SettingsScreen} />
  </Stack.Navigator>
);

const TabNavigator = () => {
  const { getTheme } = useTheme();
  const theme = getTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: theme.backgroundColor,
        },
        tabBarActiveTintColor: theme.textColor,
        tabBarInactiveTintColor: '#888888',
        headerShown: false,
      }}
    >
      <Tab.Screen name="HomeTab" component={HomeStack} />
      <Tab.Screen name="Explore" component={ExploreScreen} />
      <Tab.Screen name="Bookmark" component={BookmarkScreen} />
      <Tab.Screen name="History" component={ReadingHistoryScreen} />
    </Tab.Navigator>
  );
};

const MainNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="OnboardingStack" component={OnboardingStack} />
      <Stack.Screen name="Home" component={TabNavigator} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default MainNavigator;
