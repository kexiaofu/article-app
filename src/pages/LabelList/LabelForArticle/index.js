import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import { getArticles, addLabel } from '../../../apis/pages';
import { getLabelList } from '../../../apis/label';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CusFlatList from '../../../components/CusFlatList';

const LabelForArticle = () => {
  const {params: {name, label_id}} = useRoute();
  const navigation = useNavigation();
  const [pages, setPages] = useState([]);
  const [labels, setLabels] = useState({});
  const [labelFetching, setLabelFetching] = useState([]);
  useEffect(() => {
    navigation.setOptions({
      title: name,
    });
    getLabelList().then(res => {
      if (res && res.data) {
        const labelsValue = {};
        res.data.forEach(r => {
          labelsValue[r.label_id] = r.name;
        });
        setLabels(labelsValue);
      }
    });
    getArticles({current: 0, size: 999}).then(res => {
      if (res && res.data) {
        setPages(res.data);
      }
    });
  }, []);

  const changeStatus = (page_id, status) => {
    if (labelFetching.indexOf(page_id) > -1) {
      return;
    }
    let labels = '';
    const pagesClone = pages.map(page => {
      if (page.page_id === page_id) {
        labels = status === 1 ? `${label_id},${page.label_id || ''}` : (page.label_id || '').replace(`${label_id},`, '');
        return {...page, label_id: labels}
      }
      return page;
    });
    setLabelFetching(l => l.concat(page_id));
    addLabel({page_id, label_id: labels}).then(res => {
      if (res && res.code === 2000) {
        setPages(pagesClone);
      }
      setLabelFetching(labelFetching.filter(l => l !== page_id));
    });
  };

  const ViewItem = ({item, label_id}) => {
    const isChecked = (item.label_id || '').indexOf(label_id) > -1;
    return (
      <TouchableWithoutFeedback
        onPress={() => changeStatus(item.page_id, isChecked ? 0 : 1)}>
        <View style={styles.viewItem}>
          <View style={styles.viewItemContent}>
            {
              labelFetching.indexOf(item.page_id) > -1 ? <ActivityIndicator /> :
              isChecked ? 
                <MaterialCommunityIcons name="checkbox-marked" size={20} color="#0066ee" />
              :
                <MaterialCommunityIcons name="checkbox-blank-outline" size={20} color="#999999"/>
            }
            <Text>{item.title}</Text>
          </View>
          {
            item.label_id ? (
              <View style={styles.viewItemLabels}>
                <Text style={{color: '#333333',}}>
                  {
                    (item.label_id || '').split(',').reduce((acc, cur) => {
                      acc += cur ? (labels[cur] + '  ') : '' ;
                      return acc;
                    }, '')
                  }
                </Text>
              </View>
            ) : null
          }
        </View>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <View style={styles.viewItemContainer}>
      <CusFlatList
        data={pages}
        renderItem={({item}) => (
          <ViewItem key={item.page_id} item={item} label_id={label_id} />
        )}
        keyExtractor={item => item.page_id}
        isNoMorePage={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  viewItemContainer: {
    padding: 15,
    backgroundColor: '#FFFFFF',
  },
  viewItem: {
    marginVertical: 5,
  },
  viewItemContent: {
    flexDirection: 'row',
  },
  viewItemLabels: {
    paddingLeft: 24,
    color: '#999999',
  },
});

export default LabelForArticle;
