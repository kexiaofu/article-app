import React, {useEffect, useState} from 'react';
import CusFlatList from '../../components/CusFlatList';
import { useNavigation } from '@react-navigation/native';
import {starArticle} from '../../apis/pages';
import {ToastAndroid} from 'react-native';
import {getLabelList} from '../../apis/label';

function RecordList({renderItem, getRecordApi = null, apiParams = {}}) {
  const [pageList, setPageList] = useState([]);
  const [isNoMorePage, setIsNoMorePage] = useState(false);
  const [current, setCurrent] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [labels, setLabels] = useState({});
  const navigation = useNavigation();

  const getLabelListFn = () => {
    getLabelList().then(res => {
      if (res && res.data) {
        const labelsValue = {};
        res.data.forEach(r => {
          labelsValue[r.label_id] = r.name;
        });
        setLabels(labelsValue);
      }
    });
  };

  useEffect(() => {
    getLabelListFn();
  }, []);

  const getMorePage = () => {
    setCurrent(c => c + 1);
  };
  const starArticleFn = (page_id) => {
    starArticle({page_id}).then(res => {
      if (res && res.code === 2000) {
        ToastAndroid.show(res.msg, ToastAndroid.SHORT);
        const pageListClone = pageList.map(page => {
          if (page.page_id === page_id) {
            return {...page, star: page.star === 1 ? 0 : 1};
          }
          return page;
        });
        setPageList(pageListClone);
      }
    });
  };

  const getRecordListApi = params => {
    if (typeof getRecordApi === 'function') {
      // // console.log(apiParams, '---> apiParams')
      getRecordApi({...params, ...apiParams}).then(res => {
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
      });
      getLabelListFn();
    }
  };

  useEffect(() => {
    (!isNoMorePage || refreshing) && getRecordListApi({current});
  }, [current, isNoMorePage, refreshing]);

  return (
    <CusFlatList
      refreshing={refreshing}
      onRefresh={() => {
        setRefreshing(true);
        if (current === 0) {
          getRecordListApi({current: 0});
        }
        setPageList([]);
        setCurrent(0);
        setIsNoMorePage(false);
      }}
      data={pageList}
      renderItem={({item}) => renderItem({item, navigation, starArticleFn, labels})}
      keyExtractor={item => item.page_id}
      onEndReached={getMorePage}
      isNoMorePage={isNoMorePage}
    />
  );
}

export default RecordList;
