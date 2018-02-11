import axios from 'axios'
// import qs from 'qs'
import Toast from 'Gb/components/Toast'

axios.defaults = Object.assign(axios.defaults, {
  baseURL: process.env.API_URL || 'http://127.0.0.1:7001',
  // baseURL: 'http://192.168.0.102/7001',
  timeout: 5000,
  withCredentials: true
})

axios.interceptors.response.use(function (response) {
  let data = response.data
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data)
    } catch (e) {
      console.log(e)
    }
  }
  if (data.code !== 0) {
    if (data.code === -3) {
      // 未登录
      Toast(data.message)
      // 清除登陆信息
      localStorage.clear()
      return Promise.resolve(null)
    } else {
      Toast(data.message)
      return Promise.resolve(null)
    }
  }
  return data.data
}, function (error) {
  console.log(error, JSON.stringify(error))
  Toast('网络异常，请稍后再试')
  return Promise.resolve(null)
})

const ajax = {}

// 文件上传
ajax.upload = (url, params, progressCallback) => {
  // return axios.post(url, params, {
  //   headers: {
  //     'Content-Type': 'multipart/form-data'
  //   },
  //   timeout: 10000
  // })
  return axios({
    method: 'POST',
    url: url,
    data: params,
    timeout: 2000,
    headers: {
      'Content-Type': 'multipart/*'
    },
    onUploadProgress: progressCallback
  })
}

ajax.get = (url, params) => {
  return axios.get(url, {
    params
  })
}

ajax.post = (url, params) => {
  return axios(url, {
    method: 'post',
    data: params
  })
}

export default ajax
