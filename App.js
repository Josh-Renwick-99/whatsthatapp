
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-native-paper'
import { createStackNavigator } from '@react-navigation/stack'
import { theme } from './core/theme';
import WelcomeScreen from './screens/Welcome.js'
import RegisterScreen from './screens/Register.js'
import navigationMenu from './screens/navigationMenu.js'
import ContactScreen from './navigation/Contacts';
import { ToastProvider } from 'react-native-toast-notifications'


export default function App() {

  const Stack = createStackNavigator();
  return (
    <ToastProvider>
      <Provider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          name="Root"
          initialRouteName="Welcome"
          screenOptions={{
            headerShown: false,
          }}
        >
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="mainScreen" component={navigationMenu} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  </ToastProvider>
  );
}
