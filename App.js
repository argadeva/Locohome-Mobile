import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

import RegLogin from './src/screens/RegLogin';
import Home from './src/screens/Home';
import History from './src/screens/History';
import Profile from './src/screens/Profile';
import Maps from './src/components/Maps';

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="History" component={History} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Maps" component={Maps} />
        <Stack.Screen name="RegLogin" component={RegLogin} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
