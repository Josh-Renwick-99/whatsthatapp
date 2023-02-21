
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from './navigation/Home';
import ChatsScreen from './navigation/Chats';
import ContactsScreen from './navigation/Contacts';
import SettingsScreen from './navigation/Settings';
import ProfileScreen from './navigation/Profile';
import LoginScreen from './screens/Login.js'

export default function App() {

  const screenOptions = {
    tabBarStyle:{
      backgroundColor:'white',
      height:50,
    },
    tabBarItemStyle:{
      backgroundColor:'white',
      margin:5,
      borderRadius:30,
    }
  };
  
  const sceneContainerStyle = {
    backgroundColor: 'white',
  };

  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer>
      <Tab.Navigator {...{ screenOptions, sceneContainerStyle }}>
        <Tab.Screen name="Contacts" 
                    component={LoginScreen}
                    options={{
                      tabBarLabel: 'Contacts',
                      headerShown: false,
                      tabBarIcon: ({color, size}) => (
                        <MaterialCommunityIcons name = "contacts" color={color} size = {size} />
                      )
                    }} />
        <Tab.Screen name="Settings" 
                    component={SettingsScreen}
                    options={{
                      tabBarLabel: 'Settings',
                      headerShown: false,
                      tabBarIcon: ({color, size}) => (
                        <Ionicons name = "ios-settings-outline" color={color} size = {size} />
                      )
                    }} />
        <Tab.Screen name="Home" 
                    component={HomeScreen} 
                    options={{
                      tabBarLabel: 'Home',
                      headerShown: false,
                      tabBarIcon: ({color, size}) => (
                        <Ionicons name = "home" color={color} size = {size} />
                      )
                    }}/>
        <Tab.Screen name="Chats" 
                    component={ChatsScreen}
                    options={{
                      tabBarLabel: 'Chats',
                      headerShown: false,
                      tabBarIcon: ({color, size}) => (
                        <Ionicons name = "ios-chatbubble-ellipses-outline" color={color} size = {size} />
                      )
                    }} />
        <Tab.Screen name="Profile" 
                    component={ProfileScreen} 
                    options={{
                      tabBarLabel: 'Profile',
                      headerShown: false,
                      tabBarIcon: ({color, size}) => (
                        <Ionicons name = "md-person-circle-outline" color={color} size = {size} />
                      )
                    }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

