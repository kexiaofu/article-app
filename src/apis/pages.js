import {fetchFn} from './fetch';
export const getPage = url => {
  return fetchFn({
    url: '/pages/add-reserve-record',
    data: {url},
    method: 'POST',
  });
};

export const reserveRecords = ({current = 0, size = 10}) => {
  console.log(current, size);
  return fetchFn({
    url: `/pages/reserve-records?current=${current}&size=${size}`
  });
};

export const getArticles = ({current = 0, size = 10, ...params}) => {
  let str = '';
  if (params) {
    str = Object.keys(params).map(k => `&${k}=${params[k]}`).join('');
  }
  return fetchFn({
    url: `/pages/get-articles?current=${current}&size=${size}${str}`,
  });
};

export const starArticle = ({page_id}) => {
  return fetchFn({
    url: '/pages/star',
    method: 'POST',
    data: {page_id},
  });
};

export const addLabel = ({page_id, label_id}) => {
  return fetchFn({
    url: '/pages/add-label',
    method: 'POST',
    data: {page_id, label_id},
  });
};
