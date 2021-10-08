// export const BASE_URL = 'http://106.55.23.59:8091/api';
export const BASE_URL = 'http://192.168.14.131:8091/api';
// export const BASE_URL = 'http://192.168.0.101:8091/api';

export const fetchFn = ({url, method = 'GET', headers, data}) => {
  console.log(url, method, data);
  return new Promise((resolve, reject) => {
    fetch(`${BASE_URL}${url}`, {
        method,
        headers: headers || (method === 'POST' && {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }) || undefined,
        body: (data && JSON.stringify(data)) || undefined,
      }
    )
        .then(response => response.json())
        .then(responseJson => {
          console.log(responseJson);
          resolve(responseJson);
          return responseJson;
        })
        .catch(error => {
          reject(error);
          console.error(error);
        });
    })
};