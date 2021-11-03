import React, {useState} from 'react';
import {
  View,
  ToastAndroid,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {updateLabel} from '../../apis/label';
import TextInputInARow from '../../components/TextInputInARow';


const UpdateLabel = () => {
  const {params, params: {name, label_id}} = useRoute();
  // console.log(params);
  const [value, setValue] = useState(name);
  const navigate = useNavigation();
  const updateLabelFn = () => {
    updateLabel({name: value, label_id}).then(res => {
      if (res && res.code === 2000) {
        ToastAndroid.show(res.msg, ToastAndroid.SHORT);
        setTimeout(() => {
          navigate.goBack();
        }, 300);
      }
    });
  };
  return (
    <View style={{margin: 10,}}>
      <TextInputInARow
        defaultValue={value}
        changeHandler={setValue}
        buttonText="保存"
        okEvent={updateLabelFn}
        placeholder="请输入标签名称"
      />
    </View>
  );
};

export default UpdateLabel;
