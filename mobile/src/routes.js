import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Pages
import Chat from './pages/Chat';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';

const AppStack = createStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <AppStack.Navigator screenOptions={{ headerShown: false }}>
        <AppStack.Screen name="Login" component={Login} />
        <AppStack.Screen name="SignUp" component={SignUp} />
        <AppStack.Screen name="Profile" component={Profile} />
        <AppStack.Screen name="Chat" component={Chat} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
}
