/* eslint-disable prettier/prettier */

import * as React from 'react';
import { View, Text, LogBox} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import Schedule from './screens/Schedule';



const Stack = createNativeStackNavigator();

function App() {
  LogBox.ignoreAllLogs();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="My Interview" component={HomeScreen} />
        <Stack.Screen name="Schedule Interview" component={Schedule} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;