import axios from 'axios'
import url from './config'
// url是我的serverless地址，这里不提供

export const getAllIcon = () => {
  return axios.get(url, {
    params: {
      method: 'getAllIcon'
    }
  })
  .then(function (res) {
    console.log(res);
  })
  .catch(function (error) {
    console.log(error);
  });
}

