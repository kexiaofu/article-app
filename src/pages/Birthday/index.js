import React, {useState, useEffect} from 'react';
import {getBirthdayList} from '../../apis/sundry';
import CusFlatList from '../../components/CusFlatList';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import dayjs from 'dayjs';

const renderItem = ({item, navigation}) => {
  return (
    <TouchableWithoutFeedback
      key={item.id}
      onPress={() => navigation.navigate('BirthdayInfo', {...item})}>
      <View style={styles.recordItem}>
        <Text>
          {item.name}
          {item.isSolar ? <Text style={styles.borderBox}>(新历)</Text> : null}
        </Text>
        <Text>
          {dayjs(item.date).format('MM月DD日')}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  )
}

function Birthday() {
  const [dates, setDates] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();
  const getBirthdayListFn = () => {
    getBirthdayList().then(res => {
      if (res && res.code === 2000 && res.data) {
        setDates(res.data);
        setRefreshing(false);
      }
    });
  }
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <MaterialCommunityIcons
          name="calendar-plus"
          size={24}
          onPress={() => navigation.navigate('BirthdayInfo')}
        />
      ),
    });
    const unsubscribe = navigation.addListener('focus', () => {
      // Screen was focused
      // Do something
      getBirthdayListFn();
    });

    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <CusFlatList
        refreshing={refreshing}
        onRefresh={() => {
          setRefreshing(true);
          getBirthdayListFn();
        }}
        data={dates.sort((a, b) => new Date(a.date) - new Date(b.date))}
        renderItem={({item}) => renderItem({item, navigation})}
        keyExtractor={item => item.id}
        isNoMorePage={true}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
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

export default Birthday;
