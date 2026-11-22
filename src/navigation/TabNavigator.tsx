import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';

import HomeScreen from '../screens/HomeScreen';
import ExploreScreen from '../screens/ExploreScreen';
import CartScreen from '../screens/CartScreen';
import FavouriteScreen from '../screens/FavouriteScreen';
import AccountScreen from '../screens/AccountScreen';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#53B175',
        tabBarInactiveTintColor: '#181725',
        tabBarStyle: {
          height: 68,
          paddingBottom: 10,
          paddingTop: 8,
          borderTopLeftRadius: 18,
          borderTopRightRadius: 18,
          backgroundColor: '#FFF',
        },
        tabBarIcon: ({ color }) => {
          let icon = '🏠';
          if (route.name === 'Shop') icon = '🏪';
          else if (route.name === 'Explore') icon = '🔍';
          else if (route.name === 'Cart') icon = '🛒';
          else if (route.name === 'Favourite') icon = '💚';
          else if (route.name === 'Account') icon = '👤';

          return <Text style={{ fontSize: 20, color }}>{icon}</Text>;
        },
      })}
    >
      <Tab.Screen name="Shop" component={HomeScreen} />
      <Tab.Screen name="Explore" component={ExploreScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Favourite" component={FavouriteScreen} />
      <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  );
}