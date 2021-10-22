import React, {useEffect, useState} from 'react';
import {
  ToastAndroid,
  View,
  useWindowDimensions,
  StyleSheet,
  Clipboard,
} from 'react-native';
import {WebView} from 'react-native-webview';
import {useRoute, useNavigation} from '@react-navigation/native';
import {starArticle} from '../../apis/pages';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const BOX_HEIGHT = 100;

const copyLink = link => {
  Clipboard.setString(link);
  ToastAndroid.show('复制成功', ToastAndroid.SHORT);
};

function ArticleDetail() {
  const {
    params: {page_id, title, star, originUrl},
  } = useRoute();
  const navigation = useNavigation();
  const [isStar, setIsStar] = useState(star);
  const {width, height} = useWindowDimensions();
  useEffect(() => {
    navigation.setOptions({
      title,
    });
  }, []);

  const url = `http://106.55.23.59:8091/${page_id}/index.html`;
  return (
    <View style={{width, height}}>
      <WebView source={{uri: url}} />
      <View style={{...styles.additionBox, top: (height - BOX_HEIGHT) / 2,}}>
        <MaterialCommunityIcons
          name="heart"
          size={24}
          color={isStar ? '#ec3972' : '#dedede'}
          onPress={() => {
            starArticle({page_id});
            setIsStar(s => !s);
            ToastAndroid.show(`${isStar ? '取消收藏' : '收藏'}成功`, ToastAndroid.SHORT);
          }}
        />
        <MaterialCommunityIcons
          name="link"
          size={24}
          color="#0066ee"
          onPress={() => copyLink(url)}
        />
        <MaterialCommunityIcons
          name="file-link"
          size={24}
          color="#999999"
          onPress={() => copyLink(originUrl)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  additionBox: {
    width: 36,
    height: BOX_HEIGHT,
    position: 'absolute',
    right: 15,
    top: 0,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 0.1,
    borderRadius: 18,
  },
});

export default ArticleDetail;
