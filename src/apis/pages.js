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

export const getArticles = ({current = 0, size = 10}) => {
  console.log(current, size);
  return fetchFn({
    url: `/pages/get-articles?current=${current}&size=${size}`
  });
};
