import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import dayjs from 'dayjs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const labelView = (page_id, label_id, labels, navigation) => {
  if (label_id) {
    const labelItemArray = label_id.split(',').filter(Boolean);
    const len = labelItemArray.length - 1;
    return (
      <View style={styles.labels}>
        {
          labelItemArray.map((label, index) => (
            <TouchableWithoutFeedback key={`${page_id}-${label}`} onPress={() => navigation.navigate('ArticleWithSameLabel', {label_id: label, __title__: labels[label]})}>
              <Text>{labels[label] || ''}{index < len ? ' · ' : ''}</Text>
            </TouchableWithoutFeedback>
          ))
        }
      </View>
    )
  }
  return null;
};

const sourceTarget = {
  wechat: '微信',
  zhihu: '知乎',
  segmentfault: '思否',
};

const ArticleItem = ({item, navigation, starArticleFn, labels = {}}) => {
  if (item) {
    const dateStr = dayjs(item.date).format('YYYY-MM-DD');
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.author}>
            <MaterialCommunityIcons
              name="account-circle"
              size={24}
              color="#dedede"
            />
            <TouchableWithoutFeedback onPress={() => navigation.navigate('ArticleWithSameLabel', {author: item.author})}>
              <Text style={{fontSize: 14, paddingHorizontal: 5}}>{item.author}</Text>
            </TouchableWithoutFeedback>
          </View>
          {labelView(item.page_id, item.label_id, labels, navigation)}
        </View>
        <TouchableWithoutFeedback
          key={item.page_id}
          onPress={() => navigation.navigate('ArticleDetail',{page_id: item.page_id, title: item.title, star: item.star})}>
          <View style={styles.recordItem}>
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
          </View>
        </TouchableWithoutFeedback>
        <View style={styles.footer}>
          <MaterialCommunityIcons name="heart" size={20} color={item.star ? '#ec3972' : '#dedede'} onPress={() => starArticleFn(item.page_id)} />
          <Text>
            <TouchableWithoutFeedback
              onPress={() =>
                navigation.navigate('ArticleWithSameLabel', {
                  source: item.source,
                  __title__: sourceTarget[item.source] || item.source,
                })
              }>
              <Text>{sourceTarget[item.source] || item.source}&nbsp;·&nbsp;</Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => navigation.navigate('ArticleWithSameLabel', {date: dateStr})}>
              <Text>{dateStr}</Text>
            </TouchableWithoutFeedback>
          </Text>
        </View>
      </View>
    );
  }
  return null;
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    marginTop: 10,
    backgroundColor: '#ffffff',
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  author: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontWeight: '600',
    fontSize: 16,
    paddingVertical: 10,
  },
  footer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  labels: {
    flexDirection: 'row',
  },
});

export default ArticleItem;
