import { Validator } from 'vee-validate'
import {validMobile, validIdCard, validNumber, checkPwdStrong, decimalNumber} from './util'

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
        return `请输入8位数字、字母组合的密码`
      },
      decimalNumber: (label) => {
        return `请输入数字`
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

Validator.extend('characters', {
  getMessage (field, args) {
    return '请输入汉字'
  },
  validate: value => {
    return value && /^[\u4e00-\u9fa5]{0,}$/.test(value)
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
    return '请输入8位数字、字母组合的密码'
  },
  validate: value => {
    return value && checkPwdStrong(value) >= 1
  }
})
export default dictionary
