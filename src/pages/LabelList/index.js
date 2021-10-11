import React, {useState, useEffect} from 'react';
import {getLabelList, addLabel, delLabel, updateLabel} from '../../apis/label';
import CusFlatList from '../../components/CusFlatList';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  TextInput,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import dayjs from 'dayjs';

function LabelList() {
  const [name, setName] = useState('');
  const [labels, setLabels] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();
  const [delLabelList, setDelLabelList] = useState([]);
  const getLabelListFn = () => {
    getLabelList().then(res => {
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

  const updateLabelFn = (text, label_id, isUpdateNow = false) => {
    const labelsClone = labels.map(l => {
      if (l.label_id === label_id) {
        return {...l, name: text};
      }
      return l;
    });
    setLabels(labelsClone);
    if (isUpdateNow) {
      updateLabel({name: text, label_id}).then(res => {
        if (res && res.code === 2000) {
          ToastAndroid.show(res.msg, ToastAndroid.SHORT);
        }
        getLabelListFn();
      });
    }
  };

  const renderItem = ({item}) => {
    return (
      <TouchableWithoutFeedback onPress={() => navigation.navigate('LabelForArticle', {...item})}>
        <View style={styles.recordItem}>
          <TextInput value={item.name} onBlur={() => updateLabelFn(item.name, item.label_id, true)} onChangeText={t => updateLabelFn(t, item.label_id)} />
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
    // navigation.setOptions({
    //   headerRight: () => (
    //     <MaterialCommunityIcons name="calendar-plus" size={24} onPress={() => navigation.navigate('LabelListInfo')} />
    //   ),
    // });
    const unsubscribe = navigation.addListener('focus', () => {
      // Screen was focused
      // Do something
      getLabelListFn();
    });

    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.addItem}>
        <TextInput value={name} onChangeText={setName} placeholder="请输入新增标签" style={{flex: 1, paddingHorizontal: 10,}} />
        <TouchableWithoutFeedback onPress={addLabelFn}>
          <Text style={{borderLeftWidth: .5, borderLeftColor: '#ddd', backgroundColor: '#fff', paddingHorizontal: 15, paddingVertical: 15}}>新增</Text>
        </TouchableWithoutFeedback>
      </View>
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
  },
  borderBox: {
    color: '#0066ee',
    fontSize: 12,
    marginHorizontal: 10,
  },
})

export default LabelList;
