/**
 * 将对象数组转换为显示的字符串
 * @param arr 数组
 * @param name 对象的字段，为null时直接显示对象
 * @param emptyShow 数组为空时显示的字符串
 * @returns {*}
 */
export function spiltArray (arr, name, emptyShow) {
  let result = ''
  if (arr === null || arr.length <= 0) {
    return emptyShow
  }
  arr.forEach(val => {
    if (name === null) {
      result += val
    } else {
      result += val[name]
    }
    result += ' , '
  })
  return result.substr(0, result.length - 2)
}
