import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ForYouScreen from '../screens/Home/ForYouScreen'; 
import LatestUpdateScreen from '../screens/Home/LatestUpdateScreen'; 
import { useTheme } from '../configs/ThemeContext';

const TopTab = createMaterialTopTabNavigator();

const HomeTopTabNavigator = () => {
  const { getTheme } = useTheme();
  const theme = getTheme();

  return (
    <TopTab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: theme.backgroundColor, height:44 },
        tabBarActiveTintColor: theme.textColor,
        tabBarInactiveTintColor: '#888888',
        tabBarIndicatorStyle: { backgroundColor: '#F56200' }, 
      }}
    >
      <TopTab.Screen name="ForYou" component={ForYouScreen} options={{ title: 'For You' }} />
      <TopTab.Screen name="LatestUpdate" component={LatestUpdateScreen} options={{ title: 'Latest Update' }} />
    </TopTab.Navigator>
  );
};

export default HomeTopTabNavigator;
