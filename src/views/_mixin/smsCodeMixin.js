import PicAlert from '../../components/picalert'
import {url} from '../../utils/axios'
import {validMobile} from '../../utils/util'
import _ from 'lodash'
import {getStore} from '../../utils/storage'

export default {
  data () {
    return {
      url,
      smsMobile: '',
      methodType: 0,
      smsObj: {}
    }
  },
  methods: {
    validMobile,
    getStore,
    sendCode (value) {
      let captcha = ''
      this.methodType = 0
      if (_.isObject(value)) {
        this.smsObj = value
      } else {
        captcha = value
      }
      const mobile = this.smsObj.mobileNum.replace(/\s+/g, '')
      const type = this.smsObj.type
      const param = Object.assign({}, {mobile, type, captcha})
      this.$store.dispatch('sendSmsCode', {param}).then(({data, code, statusCode}) => {
        if (code === 'fail' && statusCode === '0001') {
          this.eventBus.$emit('picAlert/show', true)
          return
        }
        if (code === 'suss') {
          this.eventBus.$emit('picAlert/show', false)
          this.eventBus.$emit('smsverification/countdown')
        }
      })
      return true
    },
    comFn (mobile) {
      if (mobile.length === 11 || mobile.length === 13) {
        this.smsMobile = mobile
        this.smsVer.isSendDisable = this.validMobile(mobile)
      } else {
        this.smsVer.isSendDisable = false
      }
    },
    getSignMobileValue ({mobile}) {
      this.comFn(mobile)
    },
    getMobileValue ({mobile}) {
      this.$set(this.mobileInput['props'], 'validOff', false)
      this.mobileInput.originalidValue = ''
      this.comFn(mobile)
    },
    picAlertConfirm ({captchaCode, type}) {
      switch (type) {
        case 0:
          this.sendCode(captchaCode)
          break
        case 1:
          this.login(captchaCode)
          break
      }
    }
  },
  components: {
    PicAlert
  },
  mounted () {
    this.eventBus.$on('picAlert/confirm', this.picAlertConfirm)
    this.eventBus.$on('smsverification/send', this.sendCode)
  },
  destroyed () {
    this.eventBus.$off('smsverification/send')
    this.eventBus.$off('picAlert/confirm')
  }
}
