/**
 * 显示手机前三位后四位中间用****代替
 * @param phone
 */
export const formatPhone = (phone) => {
  if (typeof phone === 'number') {
    phone = phone.toString()
  }
  return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
}

/**
 * 格式化邮箱中间用****代替
 * @param email
 */
export const formatEmail = (email) => {
  let arr = email.split('@')
  let start = ''
  let end = ''
  if (arr[0].length > 7) {
    start = arr[0].substring(0, 3)
    end = arr[0].substring(7, arr[0].length)
  }
  return arr[0].length > 7 ? `${start}****${end}@${arr[1]}` : email
}

/**
 * 格式化金额
 * 如10000->10,000
 * @param money
 */
export const formatMoney = (money) => {
  money = (money || 0).toString()
  if (!money.indexOf('.') > -1) {
    money += '.00'
  }
  var numArr = money.toString().split('.')
  var num = numArr[0]
  if (numArr[1].length === 1) {
    numArr[1] += '0'
  }
  var result = ''
  while (num.length > 3) {
    result = ',' + num.slice(-3) + result
    num = num.slice(0, num.length - 3)
  }
  if (num) { result = num + result }
  if (numArr[1]) { result += '.' + numArr[1] }
  return result
}

/**
 * 将时间字符串以符号年月日分隔，例：'20190312'分隔后'2019-03-12'
 * @param {String} value 字符窜日期
 * @param {String} mark 分割符
 */
export const formatDate = (value = '', mark = '/') => {
  const year = value.substr(0, 4)
  const month = value.substr(4, 2)
  const date = value.substr(6, 2)
  return `${year}${mark}${month}${mark}${date}`
}

/**
 * 显示银行卡后四位，例：'3265986532146598'---->'**** **** **** 6598'
 * @param {String} value 字符窜日期
 * @param {String} mark 分割符
 */
export const formatBankCard = (value = '') => {
  return value.replace(/\s/g, '').replace(/(\d{4})\d+(\d{4})$/, '**** **** **** $2')
}
