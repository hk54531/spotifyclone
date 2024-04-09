import * as React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {
  BottomTabBar,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from './src/HomeScreen';
import FavouriteScreen from './src/FavouriteScreen';
import SearchScreen from './src/SearchScreen';
import Player from './src/Player';
import PlayerProvider from './src/Providers/PlayerProviderTrack';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MusicPlayerScreen from './src/MusicPlayerScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TabNavigationHome() {
  return (
    <Tab.Navigator
      tabBar={props => (
        <View>
          <Player {...props} />
          <BottomTabBar {...props} />
        </View>
      )}
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Search') {
            iconName = focused ? 'search' : 'search-outline';
          } else if (route.name === 'Favorites') {
            iconName = focused ? 'heart' : 'heart-outline';
          }

          return (
            <>
              <Ionicons name={iconName} size={size} color={color} />
            </>
          );
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        // options={{headerShown: false}}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Favorites"
        component={FavouriteScreen}
        // options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <PlayerProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="TabNavigationHome"
          screenOptions={{headerShown: false}}>
          <Stack.Screen
            name="TabNavigationHome"
            component={TabNavigationHome}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="MusicPlayerScreen"
            component={MusicPlayerScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PlayerProvider>
  );
}
