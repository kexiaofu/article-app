import React, {useState, useEffect} from 'react';
import {getLabelList, addLabel, delLabel} from '../../apis/label';
import CusFlatList from '../../components/CusFlatList';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import dayjs from 'dayjs';
import TextInputInARow from '../../components/TextInputInARow';

function LabelList() {
  const [name, setName] = useState('');
  const [labels, setLabels] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();
  const [delLabelList, setDelLabelList] = useState([]);
  const getLabelListFn = () => {
    getLabelList({isComplete: true}).then(res => {
      if (res && res.code === 2000 && res.data) {
        setLabels(res.data);
        setRefreshing(false);
      }
    });
  };

  const addLabelFn = () => {
    addLabel({name}).then((res) => {
      if (res && res.code === 2000) {
        ToastAndroid.show(res.msg, ToastAndroid.SHORT);
      }
      getLabelListFn();
      setName('');
    });
  };

  const delLabelFn = (label_id) => {
    setDelLabelList(l => l.concat(l));
    delLabel({label_id}).then((res) => {
      if (res && res.code === 2000) {
        getLabelListFn();
      }
      ToastAndroid.show(res.msg, ToastAndroid.SHORT);
      setDelLabelList(delLabelList.filter(l => l.label_id !== label_id));
    });
  };

// onChangeText={t => updateLabelFn(t, item.label_id)}
  const renderItem = ({item}) => {
    return (
      <TouchableWithoutFeedback
        onPress={() => navigation.navigate('LabelForArticle', {...item})}>
        <View style={styles.recordItem}>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate('UpdateLabel', {...item})}>
            <Text>{item.name}</Text>
          </TouchableWithoutFeedback>
          <Text>
            {dayjs(item.date).format('MM月DD日')}&nbsp;
            {delLabelList.indexOf(item.label_id) > -1 ? 
                <ActivityIndicator /> : 
                <MaterialCommunityIcons style={{padding: 5}} name="delete" size={18} color="#ec3972" onPress={() => delLabelFn(item.label_id)} />
            }
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // Screen was focused
      // Do something
      getLabelListFn();
    });

    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <TextInputInARow
        defaultValue={name}
        changeHandler={setName}
        buttonText="新增"
        okEvent={addLabelFn}
        placeholder="请输入新增标签"
      />
      <CusFlatList
        refreshing={refreshing}
        onRefresh={() => {
          setRefreshing(true);
          getLabelListFn();
        }}
        data={labels.sort((a, b) => new Date(a.date) - new Date(b.date))}
        renderItem={({item}) => renderItem({item, delLabelFn})}
        keyExtractor={item => item.id}
        isNoMorePage={true}
        isWithFooter={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  addItem: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 10,
  },
  container: {
    margin: 10,
    marginBottom: 75,
  },
  recordItem: {
    padding: 5,
    paddingHorizontal: 15,
    marginTop: 1,
    backgroundColor: '#ffffff',
    flex: 1,
    flexWrap: 'nowrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 48,
  },
  borderBox: {
    color: '#0066ee',
    fontSize: 12,
    marginHorizontal: 10,
  },
})

export default LabelList;
