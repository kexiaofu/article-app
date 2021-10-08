import React from 'react';
import type {Node} from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ReserveRecords from '../ReserveRecords';
import PageRecords from '../PageRecords';
import Sundry from '../Sundry';

const Home: () => Node = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator>
        <Tab.Screen 
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="file-clock" color={color} size={size} />
            ),
            title: "预收藏",
          }} 
          name="ReserveRecords" 
          component={ReserveRecords} 
        />
        <Tab.Screen 
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="file-document" color={color} size={size} />
            ),
            title: '文章',
          }} 
          name="PageRecords" 
          component={PageRecords} 
        />
        <Tab.Screen 
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="atom" color={color} size={size} />
            ),
            title: '杂项',
          }} 
          name="Sundry" 
          component={Sundry} 
        />
      </Tab.Navigator>
  );
};

export default Home;
