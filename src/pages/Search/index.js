import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {searchPage} from '../../apis/pages';
import ArticleItem from '../../components/ArticleItem';
import CusFlatList from '../../components/CusFlatList';
import { useNavigation } from '@react-navigation/native';
import {starArticle} from '../../apis/pages';
import {getLabelList} from '../../apis/label';
import TextInputInARow from '../../components/TextInputInARow';

function Search() {
  const [query, setQuery] = useState('');
  const [pages, setPages] = useState([]);
  const [labels, setLabels] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    getLabelList().then(res => setLabels(res));
  }, []);

  const search = () => {
    if (query) {
      searchPage({query}).then(res => setPages(res.data));
    }
  };

  return (
    <View style={styles.searchContainer}>
      <TextInputInARow
        wrapperStyle={{marginHorizontal: 10, marginTop: 10,}}
        changeHandler={setQuery}
        buttonText="搜索"
        okEvent={search}
        placeholder="请输入搜索条件"
      />
      <CusFlatList
        data={pages}
        renderItem={({item}) => (
          <ArticleItem
            key={item.page_id}
            item={item}
            starArticleFn={starArticle}
            labels={labels}
            navigation={navigation}
          />
        )}
        keyExtractor={item => item.page_id}
        isNoMorePage={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    marginBottom: 80,
  },
});

export default Search;
