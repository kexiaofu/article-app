import React from 'react';
import {getArticles} from '../../apis/pages';
import RecordList from '../../components/RecordList';
import ArticleItem from '../../components/ArticleItem';

function PageRecords() {
  return <RecordList getRecordApi={getArticles} renderItem={ArticleItem} />;
}

export default PageRecords;
