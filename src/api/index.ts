import axios from 'axios'
import { url, token } from './config'
import { createApi } from 'unsplash-js';
// url是我的serverless地址，这里不提供

type iconType = {
  id?: string
  url: string
  name: string
  icon: string
  isImg: boolean
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

export const updateIcon = (data: iconType) => {
  return axios.post(url, {
    method: 'updateIcon',
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

// 随机拿一张宇宙封面
export const getCover = () => {
  const unsplash = createApi({
    accessKey: token,
    fetch: window.fetch
  })

  return unsplash.photos.getRandom({count: 1, query: 'universe'})
}





