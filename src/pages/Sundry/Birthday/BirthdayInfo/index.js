import React, {useState, useEffect, useMemo} from 'react';
import DatePicker from 'react-native-datepicker';
import { useRoute } from '@react-navigation/native';
import {
  View,
  Text,
  TextInput,
  Switch,
  StyleSheet,
  TouchableOpacity,
  Button,
  ToastAndroid,
} from 'react-native';
import {addDate, delDate, updateDate} from '../../../../apis/sundry';

const emptyArray = [null, undefined, ''];

const isObjectHadEmptyValue = (data, exception = []) => {
  const keys = Object.keys(data);
  return keys.some(key => exception.indexOf(key) === -1 && emptyArray.indexOf(data[key]) > -1);
}

const updateBirthday = (data, isUpdate) => {
  const fn = isUpdate ? updateDate : addDate;
  const action = isUpdate ? '更新' : '新增';
  console.log(data, !isObjectHadEmptyValue(data, ['remark', 'id']));
  if (!isObjectHadEmptyValue(data, ['remark', 'id'])) {
    fn(data).then(res => {
      console.log(res);
      if (res.code === 2000) {
        ToastAndroid.show(`${action}成功`, ToastAndroid.SHORT);
      } else {
        ToastAndroid.show(`${action}失败`, ToastAndroid.SHORT);
      }
    });
  }
};

const delBirthday = data => {
  if (!isObjectHadEmptyValue(data)) {
    delDate(data).then(res => {
      if (res.code === 2000) {
        ToastAndroid.show(`删除成功`, ToastAndroid.SHORT);
      } else {
        ToastAndroid.show(`删除失败`, ToastAndroid.SHORT);
      }
    });
  }
}

function BirthdayInfo() {
  const [name, setName] = useState('');
  const [remark, setRemark] = useState('');
  const [date, setDate] = useState('');
  const [isSolar, setIsSolar] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const {params} = useRoute();
  useEffect(() => {
    console.log(params);
    const { name, isSolar, remark, date, isUpdate } = params || {};
    if (name) {
      setName(name);
      setIsSolar(isSolar);
      setRemark(remark);
      setDate(date);
      setIsUpdate(true);
    }
  }, [params]);

  const action = useMemo(() => isUpdate ? '更新' : '新增', [isUpdate]);

  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <View>
          <Text style={styles.itemText}>姓名：</Text>
        </View>
        <View>
          <TextInput style={{paddingLeft: 10,}} value={name} onChangeText={setName} />
        </View>
      </View>
      <View style={styles.item}>
        <Text style={styles.itemText}>生日：</Text>
        <DatePicker
          style={{width: 100,}}
          date={date}
          mode="date"
          placeholder="请选择日期"
          format="YYYY-MM-DD"
          showIcon={false}
          TouchableComponent={TouchableOpacity}
          // minDate="2016-05-01"
          // maxDate="2016-06-01"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateInput: {
              borderWidth: 0,
              textAlign: 'right',
            }
          }}
          onDateChange={setDate}
        />
      </View>
      <View style={styles.item}>
        <Text style={styles.itemText}>新历生日：</Text>
        <Switch value={isSolar} onChange={() => setIsSolar(isSolar => !isSolar)} />
      </View>
      <View style={styles.item}>
        <View>
          <Text style={styles.itemText}>备注：</Text>
        </View>
        <View>
          <TextInput style={{paddingLeft: 10,}} value={remark} onChangeText={setRemark} />
        </View>
      </View>
      <View style={styles.button}>
        {
          isUpdate ? (
            <View style={styles.buttonItem}>
              <Button title="删除" color="#FF0000" onPress={() => delBirthday({id: params.id})} />
            </View>
          ) : null
        }
        <View style={{...styles.buttonItem, width: !isUpdate ? 300 : 150}}>
          <Button title={action} onPress={() => updateBirthday({id: (params || {}).id || null, date, name, isSolar, remark}, isUpdate)} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 36,
    margin: 15,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonItem: {
    width: 150,
    marginHorizontal: 15,
  },
  container: {
    padding: 10,
  },
  item: {
    borderBottomWidth: 1,
    borderBottomColor: '#DDDDDD',
    marginBottom: 10,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignContent: 'center',
    height: 40,
    justifyContent: 'space-between',
  },
  itemText: {
    height: 38,
    lineHeight: 38,
    marginRight: 5,
  }
})

export default BirthdayInfo;
