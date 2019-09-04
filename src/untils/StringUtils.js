/**
 * 0值处理
 * @param val 原值
 * @param rep 为0值返回值
 */
export function zeroHandle (val, rep) {
  if (val === 0) {
    return rep
  }
  return val
}
