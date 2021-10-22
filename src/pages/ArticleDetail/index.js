import React, {useEffect, useState} from 'react';
import {TouchableWithoutFeedback, ToastAndroid} from 'react-native';
import {WebView} from 'react-native-webview';
import {useRoute, useNavigation} from '@react-navigation/native';
import {starArticle} from '../../apis/pages';

function ArticleDerail() {
  const {
    params: {page_id, title},
  } = useRoute();
  const navigation = useNavigation();
  const [prevClickStamp, setPrevClickStamp] = useState(0);
  useEffect(() => {
    console.log(page_id, title, `http://106.55.23.59:8091/${page_id}/index.html`);
    navigation.setOptions({
      title,
    });
  }, []);

  const clickEvent = () => {
    const now = +new Date();
    if (now - prevClickStamp < 200) {
      doubleClick();
    }
    setPrevClickStamp(now);
  };

  const doubleClick = () => {
    console.log('hit~');
    starArticle({page_id}).then(res => {
      if (res && res.code === 2000) {
        ToastAndroid.show(res.msg, ToastAndroid.SHORT);
      }
    });
  };

  return (
    <TouchableWithoutFeedback onPress={clickEvent}>
      <WebView
        source={{uri: `http://106.55.23.59:8091/${page_id}/index.html`}}
      />
    </TouchableWithoutFeedback>
  );
}

export default ArticleDerail;
