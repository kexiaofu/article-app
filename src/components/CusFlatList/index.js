import React from 'react';
import {
  FlatList,
  View,
  Text,
} from 'react-native';

function CusFlatList({
  data,
  renderItem,
  keyExtractor,
  ListFooterComponent,
  onEndReached,
  isNoMorePage,
  noMorePageTips,
  onRefresh,
  refreshing,
  style,
}) {
  return (
    <FlatList
      style={style}
      refreshing={refreshing}
      onRefresh={onRefresh}
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      onEndReached={onEndReached}
      ListFooterComponent={ListFooterComponent || (() => isNoMorePage ? (
        <View style={{paddingVertical: 10,}}>
          <Text style={{textAlign: 'center', color: '#999999'}}>{noMorePageTips || '没有更多数据了...'}</Text>
        </View> 
      ) : null)}
    />
  )
}

export default CusFlatList;
