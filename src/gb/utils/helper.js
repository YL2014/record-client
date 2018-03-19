const helper = {
  reg: {
    // telephone: /^1[34578][0-9]{9}$/
    telephone: /^\d{5,11}$/
  },
  // 获取地址里的query param
  getQueryParam (param) {
    let url = window.location.href
    if (url.split('?').length === 2) {
      let params = url.split('?')[1].split('&')
      let obj = {}
      for (let i = 0; i < params.length; i++) {
        let key = params[i].split('=')[0]
        let val = params[i].split('=')[1]
        obj[key] = val
      }
      return obj[param]
    }
  },
  getBaseUrl () {
    return process.env.API_URL || 'http://127.0.0.1:7001'
    // return 'http://api.ngrok.frontjs.cc'
  }
}

module.exports = helper