/**
 * 获取指定年月的最后日期描述：如果是当前月，则返回今天。如果是后面的日期，则返回指定年月的最后一天
 * @param year
 * @param month
 */
export function getLastDay (year, month) {
  var monthArray = [1, 3, 5, 7, 8, 10, 12]
  var day = 0
  var cdate = new Date()
  if (cdate.getFullYear() <= year && (cdate.getMonth() + 1) > month) {
    if (monthArray.indexOf(parseInt(month)) > 0) {
      day = 31
    } else if (parseInt(month) === 2) {
      if (this.isLeapYear(year)) {
        day = 29
      } else {
        day = 28
      }
    } else {
      day = 30
    }
  } else {
    day = cdate.getDate()
  }

  return year + '年' + month + '月' + day + '日'
}

export function isLeapYear (year) {
  return (year % 4 === 0) && (year % 100 !== 0 || year % 400 === 0)
}

export function formatToInput (date) {
  let month = (date.getMonth() + 1)
  if (month < 10) {
    month = '0' + '' + month
  }
  return date.getFullYear() + '-' + month + '-' + date.getDate()
}

export function subMonth (date, month) {
  date.setMonth(date.getMonth() + month)
  return date
}
export function dateForma(time) {
  var date=new Date(time);
  var year=date.getFullYear();
  /* 在日期格式中，月份是从0开始的，因此要加0
             * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
             * */
  var month= date.getMonth()+1<10 ? "0"+(date.getMonth()+1) : date.getMonth()+1;
  var day=date.getDate()<10 ? "0"+date.getDate() : date.getDate();
  var hours=date.getHours()<10 ? "0"+date.getHours() : date.getHours();
  var minutes=date.getMinutes()<10 ? "0"+date.getMinutes() : date.getMinutes();
  var seconds=date.getSeconds()<10 ? "0"+date.getSeconds() : date.getSeconds();
  // 拼接
  return year+"/"+month+"/"+day
}
