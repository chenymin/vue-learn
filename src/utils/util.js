import _ from 'lodash'
const IDValidator = require('id-validator')

/**
 * 验证手机号格式是否正确
 * @param mobile
 */
export const validMobile = (mobile) => {
  mobile = mobile && mobile.replace(/\D/g, '')
  return mobile.length === 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(mobile)
}

/**
 * 设置光标的位置
 * @param node input节点
 * @param pos 光标的位置
 */
export const setCaretPosition = (node, pos) => {
  if (node.setSelectionRange) {
    // IE Support
    node.focus()
    node.setSelectionRange(pos, pos)
  } else if (node.createTextRange) {
    // Firefox support
    var range = node.createTextRange()
    range.collapse(true)
    range.moveEnd('character', pos)
    range.moveStart('character', pos)
    range.select()
  }
}

/**
 * 获取图片相对url
 * @param name 图片名称
 */
export const getImgPath = (name) => {
  if (!name) return
  return require(`../assets/${name}`)
}

/**
 * 校验身份证是否合法
 * @param idNo 身份证号
 */
export const validIdCard = (idNo) => {
  const idValidator = new IDValidator()
  return idValidator.isValid(idNo)
}

/**
 * 校验是否为数字
 * @param val
 */
export const validNumber = (val) => {
  val = val && val.replace(/\s+/g, '')
  const reg = new RegExp('^[0-9]*$')
  return reg.test(val)
}

/**
 * 校验是否为整数数字、小数
 * @param val
 */
export const decimalNumber = (val) => {
  val = val && val.replace(/\s+/g, '')
  const reg = new RegExp('^[0-9]+.{0,1}[0-9]{0,2}$')
  return reg.test(val)
}

/**
 * 校验是否为邮箱
 * @param val
 */
export const validEmail = (val) => {
  const reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
  return reg.test(val)
}

/**
 * 设置title
 */
export const setTitle = (title) => {
  if (!title) return
  document.title = title
}

/**
 * 向下取整
 * 如4.0006->4
 * @param val
 */
export const floorNum = (val) => {
  if (!val || val === '') return
  if (_.isString(val)) {
    val = _.parseInt(val)
  }
  return _.floor(val)
}

export const formValid = (validatorMsg) => {
  let validResult = {msg: '', isValid: true}
  _.some(validatorMsg, ({msg, isValid}) => {
    if (!isValid) {
      _.assign(validResult, {msg, isValid})
      return true
    }
  })
  return validResult
}

/**
 * 判断是否是微信打开的页面
 */
export const isWeixin = () => {
  var ua = navigator.userAgent.toLowerCase()
  return /micromessenger/.test(ua)
}

/**
 * 检验密码强度
 * @param sValue 密码
 */
export const checkPwdStrong = (sValue) => {
  let modes = 0
  // 通过前端验证的再进行验证
  // 不合格 返回0
  // 任何字符数的两类字符组合，弱， 返回值为1
  // 10位字符数以下的三类组合，中 ，返回值为2
  // 10位字符数以上的三类组合，强，返回值为3
  if (sValue.length < 8) return modes
  if (/\d/.test(sValue)) modes++ // 数字
  if (/[a-z]/.test(sValue)) modes++ // 小写
  if (/[A-Z]/.test(sValue)) modes++ // 大写
  if (/\W/.test(sValue)) modes++ // 特殊字符

  // 逻辑处理
  switch (modes) {
    case 1:
      return 0
    case 2:
      return 1
    case 3:
      if (sValue.length < 10) {
        return 2
      } else {
        return 3
      }
    case 4:
      return 3
  }
}

export const getUrl = () => {
  let url = ''
  if (window.location.href.indexOf('cwd') > 0) {
    url = window.location.href.substring(0, window.location.href.indexOf('cwd') - 1)
  }
  return url
}

// 格式化的代码请写在这里

/**
 * 手机格式化13088889999-> 130 8888 9999
 * @param mobile 手机号
 */
export const formatPhone = (mobile) => {
  return mobile && mobile.replace(/\B(?=(?:\d{4})+$)/g, ' ')
}

/**
 * 手机格式化限制长度13088889999-> 130 8888 9999
 * @param value 手机号
 */
export const formatMobileLimit = (value) => {
  value = value.replace(/\D/g, '')
  if (value.length > 11) {
    value = value.substring(0, 11)
  }
  if (value.length === 11) {
    value = formatPhone(value)
  }
  return value
}

/**
 * 银行卡号格式化限制长度 6444 1213 2123 1234 1212
 * @param value 银行卡号
 */
export const formatBankCardLimit = (value) => {
  value = value.replace(/\D/g, '')
  if (value.length >= 20) {
    value = value.substring(0, 20)
  }
  if (value.length >= 16 && value.length <= 20) {
    value = value.replace(/(\d{4})(?=\d)/g, '$1 ')
  }
  return value
}

/**
 * 银行卡号格式化 6444 1213 2123 1234 1212
 * @param val 银行卡号
 */
export const formatBankNum = (val) => {
  return val && val.replace(/\B(?=(?:\d{4})+$)/g, ' ')
}

/**
 * 姓名格式化 复星星---->**星
 * @param val 姓名
 */
export const formatName = (val) => {
  if (!val) {
    return ''
  }
  return `*${val.substring(1, val.length)}`
}

/**
 * 身份证格式化 4334343434344343434343---->*****************3
 * @param val 身份证号
 */
export const formatIdCard = (val) => {
  if (!val) {
    return ''
  }
  return `${val.substring(0, 1)}****************${val.substring(val.length - 1, val.length)}`
}

/**
 * 手机脱敏处理 15023456789 --> 150****6789
 * @param val 手机号
 */
export const formatMobileStart = (val) => {
  if (!val) {
    return ''
  }
  return `${val.substring(0, 3)}****${val.substring(val.length - 4, val.length)}`
}

/**
 * 银行卡号 6212262201023557228---->**************7228
 * @param val 银行卡号
 */
export const formatBankCardStart = (val) => {
  if (!val) {
    return ''
  }
  return `**************${val.substring(val.length - 4, val.length)}`
}
