import React from 'react';
import {WebView} from 'react-native-webview';
import {useRoute} from '@react-navigation/native'

function ArticleDerail() {
  const {params: {page_id, title}} = useRoute();
  console.log(page_id, title, `http://106.55.23.59:8091/${page_id}/index.html`);
  return (
    <WebView
      source={{uri: `http://106.55.23.59:8091/${page_id}/index.html`}}
    />
  )
}

export default ArticleDerail;
