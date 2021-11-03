// 收藏文章 URL
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Clipboard,
  AppState,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';

import {getPage, reserveRecords} from '../../apis/pages';
import dayjs from 'dayjs';
import CusFlatList from '../../components/CusFlatList';

const getClipboardValue = async () => await Clipboard.getString();

const wechatArticleUrlReg = /^https:\/\/mp.weixin.qq.com\/s/;

const ReserveRecords = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [clipboardValue, setClipboardValue] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [records, setRecords] = useState([]);
  const [isNoMorePage, setIsNoMorePage] = useState(false);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const isPageActive = nextState => {
    setIsActive(nextState === 'active');
  };

  const getReserveRecords = params => {
    reserveRecords(params).then(res => {
      setLoading(false);
      if (res.code === 2000) {
        // console.log(res.data);
        if (res.data.length > 0) {
          const {current} = params;
          if (current !== 0) {
            setRecords([...records, ...res.data]);
          } else {
            setRefreshing(false);
            setRecords(res.data);
          }
        } else {
          setIsNoMorePage(true);
        }
      }
    });
  };

  const statusEnum = ['待收录', '已收录', '收录失败']
  const renderItem = ({item}) => {
    if (item) {
      return (
        <View key={item.page_id} style={styles.recordItem}>
          <Text selectable={true} onPress={() => copyThisLink(item.url)}>链接ID：{item.page_id}</Text>
          <Text>
            时间：{dayjs(item.date).format('YYYY-MM-DD HH:mm')}
          </Text>
          <Text>
            状态：{statusEnum[item.status] || '未知'}
          </Text>
        </View>
      )
    }
    return null;
  }

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
    if (
        wechatArticleUrlReg.test(clipboardValue)
        && records.filter(r => r.url === clipboardValue).length === 0
      ) {
      ToastAndroid.showWithGravity('请求接口中', 2, ToastAndroid.CENTER);
      setLoading(true);
      getPage(clipboardValue).then((responseJson) => {
        if (responseJson.code === 2000) {
          setRecords([]);
          setTimeout(() => {
            if (current === 0) {
              setLoading(true);
              getReserveRecords({current: 0});
            } else {
              setCurrent(0);
            }
          }, 100);
        }
        ToastAndroid.showWithGravity(responseJson.msg, 2, ToastAndroid.CENTER);
        return responseJson;
      });
    }
  }, [clipboardValue]);

  useEffect(() => {
    (!isNoMorePage || refreshing) && getReserveRecords({current});
  }, [current, isNoMorePage, refreshing]);

  const copyThisLink = (value) => {
    Clipboard.setString(value);
    ToastAndroid.showWithGravity('复制成功', 2, ToastAndroid.CENTER);
  }

  const getMorePage = () => {
    if (!isNoMorePage) {
      setCurrent(c => c + 1);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      {
        loading ? 
          (
            <ActivityIndicator />
          ) 
        : 
          (
            <CusFlatList
              refreshing={refreshing}
              onRefresh={() => {
                setRefreshing(true);
                if (current === 0) {
                  getReserveRecords({current: 0});
                }
                setCurrent(0);
                setIsNoMorePage(false);
              }}
              data={records}
              renderItem={renderItem}
              keyExtractor={item => item.page_id}
              onEndReached={getMorePage}
              isNoMorePage={isNoMorePage}
            />
          )
      }
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  recordItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    marginHorizontal: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  title: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#0066ee',
  },
});

export default ReserveRecords;
