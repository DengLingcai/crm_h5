'use strict'

// Object.defineProperty(exports, '__esModule', {
//   value: true
// })
// 判断是否是iPhoneX手机
export function isIphoneX () {
  var agent = navigator.userAgent.indexOf('Mac OS X') > -1
  var height = window.screen.height === 812
  return agent && height
}
// 判断是否是安卓还是ios
export function isAndroidOrios () {
  let u = navigator.userAgent
  // app = navigator.appVersion
  var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1 // android终端或者uc浏览器
  // var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
  return isAndroid === true
}

// 数字格式化
export function number (data) {
  if (data != null) {
    var y = String(data).indexOf(".") + 1;
    if(y > 0) {
      return data.toFixed(2).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,')
    }else{
      return data.toFixed(0).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,')
    }

  } else {
    return false
  }
}

export function dateFormatter (fmt, date) {
  // author: meizz
  var o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    'S': date.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
  } return fmt
}

// exports.default = {
//   isIphoneX: isIphoneX,
//   isAndroidOrios: isAndroidOrios,
//   number: number,
//   dateFormatter: dateFormatter
// }
