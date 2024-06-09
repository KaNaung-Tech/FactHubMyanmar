import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/Home/HomeScreen';
import ExploreScreen from '../screens/Explore/ExploreScreen';
import BookmarkScreen from '../screens/Bookmark/BookmarkScreen';
import ReadingHistoryScreen from '../screens/History/ReadingHistoryScreen';
import { useTheme } from '../configs/ThemeContext';
import HomeIcon from '../asserts/svg/Home';
import ExploreIcon from '../asserts/svg/ExploreIcon'; 
import BookmarkIcon from '../asserts/svg/BookmarkIcon';
import HistoryIcon from '../asserts/svg/HistoryIcon';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const { getTheme } = useTheme();
  const theme = getTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          let IconComponent;
          if (route.name === 'Home') {
            IconComponent = HomeIcon;
          } else if (route.name === 'Explore') {
            IconComponent = ExploreIcon;
          } else if (route.name === 'Bookmark') {
            IconComponent = BookmarkIcon;
          } else if (route.name === 'History') {
            IconComponent = HistoryIcon;
          }
          return <IconComponent color={color} />;
        },
        tabBarStyle: {
          backgroundColor: theme.backgroundColor,
        },
        tabBarActiveTintColor: theme.textColor,
        tabBarInactiveTintColor: '#888888',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Explore" component={ExploreScreen} />
      <Tab.Screen name="Bookmark" component={BookmarkScreen} />
      <Tab.Screen name="History" component={ReadingHistoryScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
