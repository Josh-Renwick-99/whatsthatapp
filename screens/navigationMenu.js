import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Ionicons } from '@expo/vector-icons';
import ChatsScreen from '../navigation/Chats.js';
import ContactsScreen from '../navigation/Contacts.js';
import SettingsScreen from '../navigation/Settings.js';
import ProfileScreen from '../navigation/Profile.js';

const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
        <NavigationContainer independent={true}>
            <Tab.Navigator>
                <Tab.Screen name="Contacts" 
                            component={ContactsScreen}
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

export default TabNavigator;
