import request from '../util/request';

function stringify(obj = {}) {
    return Object.keys(obj)
      .filter(k => obj[k] || +obj[k] === 0)
      .map(k => {
        let value = obj[k];
        if (typeof value === 'object') {
          value = encodeURIComponent(JSON.stringify(value));
        } else {
          value = encodeURIComponent(value);
        }
        return encodeURIComponent(k) + '=' + value;
      })
      .join('&');
}

export function login(data){
    return request('/login',{
        headers:{
            'content-type':'application/x-www-form-urlencoded'
        },
        method:'POST',
        body:stringify(data)
    })
}