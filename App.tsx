/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppStack from './app/navigation/AppStack';

import 'react-native-gesture-handler';


function App(): React.JSX.Element {


  return (
    <NavigationContainer>
      <AppStack />
    </NavigationContainer>
  );
}



export default App;
