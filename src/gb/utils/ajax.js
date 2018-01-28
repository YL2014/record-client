import axios from 'axios'
import qs from 'qs'
import Toast from 'Gb/components/Toast'

axios.defaults = Object.assign(axios.defaults, {
  baseURL: 'http://127.0.0.1:7001',
  timeout: 3000
})

axios.interceptors.response.use(function (response) {
  const data = response.data
  if (data.code !== 0) {
    if (data.code === -3) {
      // 未登录
      Toast(data.message)
      return Promise.reject(data)
    } else {
      Toast(data.message)
      return Promise.reject(null)
    }
  }
  return data
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
    data: qs.stringify(params),
    withCredentials: true
  })
}

export default ajax
