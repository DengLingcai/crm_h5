export function getTime (dateObj) {
  var year = dateObj.getFullYear()
  var month = ('0' + (dateObj.getMonth() + 1)).slice(-2)
  var day = ('0' + dateObj.getDate()).slice(-2)
  return year + '-' + month + '-' + day
}
export function getdetailTime (dateObj) {
  var year = dateObj.getFullYear()
  var month = ('0' + (dateObj.getMonth() + 1)).slice(-2)
  var day = ('0' + dateObj.getDate()).slice(-2)
  var Hour = dateObj.getHours() < 10 ? '0' + dateObj.getHours() : dateObj.getHours()
  var Minute = dateObj.getMinutes() < 10 ? '0' + dateObj.getMinutes() : dateObj.getMinutes()
  var Second = dateObj.getSeconds() < 10 ? '0' + dateObj.getSeconds() : dateObj.getSeconds()
  return year + '-' + month + '-' + day + ' ' + Hour + ':' + Minute + ':' + Second
}
