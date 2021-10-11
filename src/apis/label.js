import {fetchFn} from './fetch';

export const getLabelList = () => {
  return fetchFn({
    url: '/label/label-list',
  });
};

export const updateLabel = data => {
  return fetchFn({
    url: '/label/update-label',
    method: 'POST',
    data,
  });
};

export const addLabel = data => {
  return fetchFn({
    url: '/label/label',
    method: 'POST',
    data,
  });
};

export const delLabel = data => {
  return fetchFn({
    url: '/label/del-label',
    method: 'POST',
    data,
  });
};
