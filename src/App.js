import React from 'react';
import type {Node} from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './pages/Home';
import ArticleDetail from './pages/ArticleDetail';
import Birthday from './pages/Sundry/Birthday';
import BirthdayInfo from './pages/Sundry/Birthday/BirthdayInfo';

const App: () => Node = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ArticleDetail"
          component={ArticleDetail}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Birthday"
          component={Birthday}
          options={{title: '生日管理'}}
        />
        <Stack.Screen
          name="BirthdayInfo"
          component={BirthdayInfo}
          options={{title: '生日管理'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
