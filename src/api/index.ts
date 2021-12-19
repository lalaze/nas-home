import axios from 'axios'
import url from './config'
// url是我的serverless地址，这里不提供

type iconType = {
  id?: string
  url: string
  name: string
  icon: string
}

export const getAllIcon = () => {
  return axios.post(url, {
    method: 'getAllIcon'
  })
  .then(function (res: any) {
    if (res.status === 200) {
      return res.data.result
    }
  })
  .catch(function (error: any) {
    console.log(error);
  });
}

// get传不了base64的icon数据
export const setIcon = (data: iconType) => {
  return axios.post(url, {
    method: 'setIcon',
    data
  })
  .then(function (res: any) {
    if (res.status === 200) {
      return res.data
    }
  })
  .catch(function (error: any) {
    console.log(error);
  });
}

// get传不了base64的icon数据
export const deleteIcon = (data: any) => {
  return axios.post(url, {
    method: 'deleteIcon',
    data
  })
  .then(function (res: any) {
    if (res.status === 200) {
      return res.data
    }
  })
  .catch(function (error: any) {
    console.log(error);
  });
}


