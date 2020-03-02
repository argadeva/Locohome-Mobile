import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {Provider} from 'react-redux';
import store from './src/redux/store';

const Stack = createStackNavigator();

import Login from './src/screens/Login';
import OTP from './src/screens/OTP';
import ForgetPassword from './src/screens/ForgetPassword';

import Home from './src/screens/Home';
import SearchRoom from './src/screens/SearchRoom';
import DetailRoom from './src/components/DetailRoom';
import History from './src/screens/History';
import DetailOrder from './src/components/DetailOrder';
import Profile from './src/screens/Profile';
import Maps from './src/components/Maps';

import About from './src/components/About';
import Help from './src/components/Help';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="OTP" component={OTP} />
          <Stack.Screen name="ForgetPassword" component={ForgetPassword} />

          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="SearchRoom" component={SearchRoom} />
          <Stack.Screen name="DetailRoom" component={DetailRoom} />
          <Stack.Screen name="History" component={History} />
          <Stack.Screen name="DetailOrder" component={DetailOrder} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Maps" component={Maps} />
          <Stack.Screen name="About" component={About} />
          <Stack.Screen name="Help" component={Help} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
