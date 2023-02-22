
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider } from 'react-native-paper'
import { createStackNavigator } from '@react-navigation/stack'
import { theme } from './core/theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from './navigation/Home';
import ChatsScreen from './navigation/Chats';
import ContactsScreen from './navigation/Contacts';
import SettingsScreen from './navigation/Settings';
import ProfileScreen from './navigation/Profile';
import WelcomeScreen from './screens/Welcome.js'
import RegisterScreen from './screens/Register.js'


export default function App() {

  const Stack = createStackNavigator();
  return (
    <Provider theme={theme}>
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          headerShown: false,
        }}
      >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  </Provider>
  );
}



{/* <NavigationContainer>
<Tab.Navigator {...{ screenOptions, sceneContainerStyle }}>
  <Tab.Screen name="Contacts" 
              component={WelcomeScreen}
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
</NavigationContainer> */}