import { Validator } from 'vee-validate'
import {validMobile, validIdCard, validNumber, checkPwdStrong, decimalNumber, compareDate} from './util'

const dictionary = {
  zh_CN: {
    messages: {
      email: () => '邮箱格式不正确',
      required: (label) => {
        return `${label}是必填项`
      },
      max_value: (label, value) => {
        if (label === '申请贷款金额') {
          return '贷款金额3万~50万，且不能大于车位售价'
        }
        return `${label}有误`
      },
      min_value: (label, value) => {
        return `${label}有误`
      },
      between: (label, ref) => {
        return `${label} 必须在${ref[0]}-${ref[1]}之间`
      },
      phone: () => {
        return '请填写正确的11位手机号码'
      },
      characters: (label) => {
        return `${label}请输入汉字`
      },
      nocharacters: (label) => {
        return `${label}不能输入汉字`
      },
      idCard: (label) => {
        return '身份证号有误'
      },
      numAndStr: (label) => {
        return `${label}请输入数字、字母`
      },
      nums: (label) => {
        return `${label}请输入数字`
      },
      pwd: (label) => {
        return `请输入8～16位字母、数字、符号两种或以上组合的密码`
      },
      cardDate: (label) => {
        return `身份证日期已过期`
      },
      decimalNumber: (label) => {
        return `请输入数字`
      },
      checkboxChecked: (label) => {
        return `请阅读并勾选协议`
      },
      chineseAndLetter: (label) => {
        return `${label}请输入汉字或字母`
      },
      socialCode: (label) => {
        return `请输入正确的统一社会信用代码`
      },
      unEqual: (label, arr) => {
        const obj = {
          contact2Phone: '紧急联系人2手机号'
        }
        return `${label}与${obj[arr[0]] || ''}相同`
      },
      dateCompare: (label) => {
        return `${label}有误`
      }
    }
  }
}

Validator.extend('phone', {
  getMessage (field, args) { // 添加到默认的英文错误消息里面
    return '请填写正确的11位手机号码'
  },
  validate: value => {
    return validMobile(value)
  }
})

Validator.extend('chineseAndLetter', {
  getMessage (field, args) {
    return '请输入汉字或字母'
  },
  validate: value => {
    return value && /^[\u4e00-\u9fa5_a-zA-Z]+$/.test(value.trim())
  }
})

Validator.extend('characters', {
  getMessage (field, args) {
    return '请输入汉字'
  },
  validate: value => {
    return value && /^[\u4e00-\u9fa5]{0,}$/.test(value)
  }
})

Validator.extend('nocharacters', {
  getMessage (field, args) {
    return '不能输入汉字'
  },
  validate: value => {
    return value && /^[^\u4e00-\u9fa5]+$/.test(value)
  }
})

Validator.extend('idCard', {
  getMessage (field, args) {
    return '请输入正确的身份证号'
  },
  validate: value => {
    return validIdCard(value)
  }
})

Validator.extend('numAndStr', {
  getMessage (field, args) {
    return '请输入字符和数字'
  },
  validate: value => {
    return value && /^[A-Za-z0-9]+$/.test(value)
  }
})

Validator.extend('socialCode', {  // 统一社会信用代码校验
  getMessage (field, args) {
    return '请输入正确的统一社会信用代码'
  },
  validate: value => {
    return value && /^[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}$/.test(value)
  }
})

Validator.extend('nums', {
  getMessage (field, args) {
    return '请输入数字'
  },
  validate: value => {
    return value && validNumber(value)
  }
})

Validator.extend('decimalNumber', {
  getMessage (field, args) {
    return '请输入数字'
  },
  validate: value => {
    return value && decimalNumber(value)
  }
})

Validator.extend('pwd', {
  getMessage (field, args) {
    return '请输入8～16位字母、数字、符号两种或以上组合的密码'
  },
  validate: value => {
    return value && checkPwdStrong(value) >= 1
  }
})

// 检验身份证日期
Validator.extend('cardDate', {
  validate: (value) => {
    let isValid = false
    if (value === '永久期限') {
      isValid = true
    } else {
      isValid = compareDate(value)
    }
    return isValid
  }
})

Validator.extend('checkboxChecked', {  // 复选框校验
  validate: function (value) {
    return value === '1'
  }
})

// 检验字符窜或数值不等
Validator.extend('unEqual', (value, [otherValue]) => {
  return value !== otherValue
}, {
  hasTarget: true
})

// 比较两个日期的大小
Validator.extend('dateCompare', {
  validate: function (value = '') {
    if (value === '') {
      return false
    }
    const [statDate, endDate] = value.split(',')
    return new Date(endDate).getTime() > new Date(statDate).getTime()
  }
})
export default dictionary
