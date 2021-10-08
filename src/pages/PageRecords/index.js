import React, {useEffect, useState} from 'react';
import CusFlatList from '../../components/CusFlatList';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import {getArticles} from '../../apis/pages';
import dayjs from 'dayjs';
import { useNavigation } from '@react-navigation/native';

const renderItem = ({item, navigation}) => {
  console.log(item, navigation)
  if (item) {
    return (
      <TouchableWithoutFeedback 
        key={item.page_id} 
        onPress={() => navigation.navigate('ArticleDetail',{page_id: item.page_id, title: item.title})}>
        <View
          style={styles.recordItem}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={styles.title}
            selectable={true}>
            {item.title}
          </Text>
          <Text style={{color: '#666666', paddingBottom: 10}} numberOfLines={3}>
            {item.description}
          </Text>
          <Text style={{textAlign: 'right'}}>
            <Text>
              {item.author}&nbsp;|
            </Text>
            <Text>
              &nbsp;{dayjs(item.date).format('YYYY-MM-DD')}
            </Text>
          </Text>
        </View>
      </TouchableWithoutFeedback>
    )
  }
  return null;
};

function PageRecords() {
  const [pageList, setPageList] = useState([]);
  const [isNoMorePage, setIsNoMorePage] = useState(false);
  const [current, setCurrent] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();
  const getMorePage = () => {
    setCurrent(c => c + 1);
  };

  const getArticleRecords = params =>{
    getArticles(params).then(res => {
      setRefreshing(false);
      if (res && res.code === 2000) {
        if (res.data && res.data.length > 0) {
          if (current !== 0) {
            setPageList([...pageList, ...res.data]);
          } else {
            setPageList(res.data);
          }
        } else {
          setIsNoMorePage(true);
        }
      }
    })
  }

  useEffect(() => {
    (!isNoMorePage || refreshing) && getArticleRecords({current});
  }, [current, isNoMorePage, refreshing]);

  return (
    <CusFlatList
      refreshing={refreshing}
      onRefresh={() => {
        setRefreshing(true);
        if (current === 0) {
          getArticleRecords({current: 0});
        }
        setCurrent(0);
        setIsNoMorePage(false);
      }}
      data={pageList}
      renderItem={({item}) => renderItem({item, navigation})}
      keyExtractor={item => item.page_id}
      onEndReached={getMorePage}
      isNoMorePage={isNoMorePage}
    />
  )
}

const styles = StyleSheet.create({
  title: {
    fontWeight: "600",
    fontSize: 16,
    paddingVertical: 10,
  },
  recordItem: {
    padding: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    marginVertical: 10,
    backgroundColor: '#ffffff',
  },
});

export default PageRecords;
