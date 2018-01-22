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
  const numArr = (money || 0).toString().split('.')
  let num = numArr[0]
  let result = ''
  while (num.length > 3) {
    result = ',' + num.slice(-3) + result
    num = num.slice(0, num.length - 3)
  }
  if (num) { result = num + result }
  if (numArr[1]) { result += `.${numArr[1]}` }
  return result
}
