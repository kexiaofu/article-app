import React, {useState, useEffect} from 'react';
import {getBirthdayList} from '../../apis/sundry';
import CusFlatList from '../../components/CusFlatList';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const renderItem = ({item, navigation}) => {
  return (
    <TouchableWithoutFeedback 
      key={item.id}
      onPress={() => navigation.navigate('Birthday')}>
      <View style={styles.recordItem}>
        <Text>
          {item.icon}
          &nbsp;
          {item.name}
        </Text>
        <MaterialCommunityIcons name="chevron-right" size={24} color="#333333" />
      </View>
    </TouchableWithoutFeedback>
  )
}

function Sundry() {
  const navigation = useNavigation();

  const data = [
    {
      name: '生日管理',
      path: '/Birthday',
      icon: <MaterialCommunityIcons name="cake-variant" size={18} color="#0066ee" /> ,
    }
  ];

  return (
    <CusFlatList
      data={data}
      renderItem={({item}) => renderItem({item, navigation})}
      keyExtractor={item => item.path}
      isNoMorePage={true}
    />
  )
}

const styles = StyleSheet.create({
  recordItem: {
    padding: 10,
    paddingHorizontal: 15,
    marginTop: 1,
    backgroundColor: '#ffffff',
    flex: 1,
    flexWrap: 'nowrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  borderBox: {
    color: '#0066ee',
    fontSize: 12,
    marginHorizontal: 10,
  },
})

export default Sundry;
