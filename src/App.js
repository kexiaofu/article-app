import React, {useState, useEffect} from 'react';
import type {Node} from 'react';
import {AppState, ToastAndroid, Clipboard} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {getPage} from './apis/pages';

import Home from './pages/Home';
import ArticleDetail from './pages/ArticleDetail';
import Birthday from './pages/Birthday';
import BirthdayInfo from './pages/Birthday/BirthdayInfo';
import ArticleWithSameLabel from './pages/ArticleWithSameLabel';
import LabelList from './pages/LabelList';
import LabelForArticle from './pages/LabelList/LabelForArticle';

const getClipboardValue = async () => await Clipboard.getString();

const articleUrlReg =
  /^https:\/\/(mp.weixin.qq.com\/s|segmentfault.com\/a|zhuanlan.zhihu.com\/p).*/img;

const App: () => Node = () => {
  const Stack = createNativeStackNavigator();
  const [clipboardValue, setClipboardValue] = useState('');
  const [isActive, setIsActive] = useState(true);

  const isPageActive = nextState => {
    setIsActive(nextState === 'active');
  };

  useEffect(() => {
    AppState.addEventListener('change', isPageActive);
    return () => {
      AppState.removeEventListener('change', isPageActive);
    };
  }, []);

  useEffect(async () => {
    setClipboardValue(await getClipboardValue());
  }, [isActive]);

  useEffect(() => {
    if (articleUrlReg.test(clipboardValue)) {
      ToastAndroid.showWithGravity('请求接口中', 2, ToastAndroid.CENTER);
      getPage(clipboardValue).then((responseJson) => {
        ToastAndroid.showWithGravity(responseJson.msg, 2, ToastAndroid.CENTER);
        return responseJson;
      });
    }
  }, [clipboardValue]);

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
          options={{title: ''}}
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
        <Stack.Screen
          name="LabelList"
          component={LabelList}
          options={{title: '标签管理'}}
        />
        <Stack.Screen
          name="LabelForArticle"
          component={LabelForArticle}
          options={{title: '标签分配'}}
        />
        <Stack.Screen
          name="ArticleWithSameLabel"
          component={ArticleWithSameLabel}
          options={{title: ''}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
