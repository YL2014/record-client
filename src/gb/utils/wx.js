import wx from 'weixin-js-sdk'
import ajax from './ajax'

const API = {
  config: '/'
}

export const wxConfig = () => {
  let localUrl = window.location.href
  return ajax.get(`${API.config}?urd=${localUrl}`)
}

export const imgPrev = (curImg, imgList) => {
  wxConfig().then(data => {
    wx.config({
      debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: data.appId,
      signature: data.signature,
      timestamp: data.timeStamp,
      nonceStr: data.nonceStr,
      jsApiList: [
          'chooseWXPay'
      ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    })
  })
}
