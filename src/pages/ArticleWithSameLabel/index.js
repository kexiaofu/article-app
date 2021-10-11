import React from 'react';
import {getArticles} from '../../apis/pages';
import RecordList from '../../components/RecordList';
import ArticleItem from '../../components/ArticleItem';
import {useNavigation} from '@react-navigation/native'

function ArticleWithSameLabel(props) {
  const {route} = props;
  const navigation = useNavigation();
  console.log(route.params);
  const {__title__} = route.params;
  navigation.setOptions({
    title: __title__ || (route ? Object.values(route.params).join('') : '无'),
  });
  console.log(route, '---> route')
  return <RecordList getRecordApi={getArticles} renderItem={ArticleItem} apiParams={route ? route.params : null} />;
}

export default ArticleWithSameLabel;
