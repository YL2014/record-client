import axios from 'axios'
import qs from 'qs'
import Toast from 'Gb/components/Toast'

axios.defaults = Object.assign(axios.defaults, {
  baseURL: 'http://127.0.0.1:7001',
  timeout: 3000,
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
      return Promise.reject(data)
    } else {
      Toast(data.message)
      return Promise.resolve(null)
    }
  }
  return data.data
}, function (error) {
  console.log(error)
  Toast('网络异常，请稍后再试')
  return Promise.reject(null)
})

const ajax = {}

ajax.get = (url, params) => {
  return axios.get(url, {
    params
  })
}

ajax.post = (url, params) => {
  return axios(url, {
    method: 'post',
    data: qs.stringify(params)
  })
}

export default ajax
