import {fetchFn} from './fetch';

export const getBirthdayList = () => {
  return fetchFn({
    url: '/sundry/dates',
  });
};

export const updateDate = data => {
  return fetchFn({
    url: '/sundry/update-date',
    method: 'POST',
    data,
  });
};

export const addDate = data => {
  return fetchFn({
    url: '/sundry/dates',
    method: 'POST',
    data,
  });
};

export const delDate = data => {
  return fetchFn({
    url: '/sundry/del-date',
    method: 'POST',
    data,
  });
};
