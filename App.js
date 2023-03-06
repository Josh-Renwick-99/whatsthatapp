
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-native-paper'
import { createStackNavigator } from '@react-navigation/stack'
import { theme } from './core/theme';
import WelcomeScreen from './screens/Welcome.js'
import RegisterScreen from './screens/Register.js'
import navigationMenu from './screens/navigationMenu.js'


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
      <Stack.Screen name="mainScreen" component={navigationMenu} independent={true}/>
      </Stack.Navigator>
    </NavigationContainer>
  </Provider>
  );
}
