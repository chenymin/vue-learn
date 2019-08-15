<template>
  <div class="sms-input-component">
      <my-input
        v-model="innerValue"
        v-on="$listeners"
        v-bind="$attrs">
        <button slot="input-slot" class='sms-code'
                :disabled="!isCountDisable"
                :class="{'able-activity': !isCountDisable}"
                v-text="countText" @click.prevent='sendCode()'>
        </button>
    </my-input>
  </div>
</template>

<script>
  import MyInput from './myinput'
  import axios from 'axios'
  export default {
    inheritAttrs: false,
    $_veeValidate: {
      name () {
        return this.$attrs.label
      },
      value () {
        return this.value
      }
    },
    data () {
      return {
        innerValue: '',
        isCountDisable: this.isSendDisable,
        countInterval: '',
        countText: this.smsText
      }
    },
    props: {
      smsText: {
        type: String,
        default: '发送验证码'
      },
      isSendDisable: {
        type: Boolean,
        default: false
      },
      // must be included in props
      value: {
        type: null
      },
      mobile: {
        type: String,
        default: ''
      },
      isMobile: {
        type: Boolean,
        default: false
      },
      interfaceUrl: {  // 发送短信的接口地址（因为接口会不同）
        type: String,
        default: '/transfer-mng/entLimit/sendSmsValidate'
      },
      paramsObj: {  // 发送短信的传参（因为接口会不同）
        type: [Object, String]
      },
      config: {
        type: Object,
        default () {
          const config = {
            headers: {
              'Content-Type': 'application/json'
            }
          }
          return config
        }
      },
      responseCodeKey: {
        type: String,
        default: 'respCode'
      },
      responseMsgKey: {
        type: String,
        default: 'respMsg'
      },
      responseDataKey: {
        type: String,
        default: 'data'
      },
      responseSucessFlag: {
        type: String,
        default: '000000'
      }
    },
    components: {
      MyInput
    },
    watch: {
      // Handles internal model changes.
      innerValue (newVal) {
        this.$emit('input', newVal)
      },
      // Handles external model changes.
      value (newVal) {
        this.innerValue = newVal
      },
      isSendDisable (newVal) {
        this.isCountDisable = newVal
      },
      isMobile () {
        this.isCountDisable = !this.isMobile
      }
    },
    methods: {
      sendCode () {
        this.isCountDisable = false
        const prms = Object.assign(this.paramsObj, {bankPhoneNo: this.mobile})
        const url = process.env.NODE_ENV === 'development' ? `/api/${this.interfaceUrl}` : this.interfaceUrl
        axios.post(url, prms, this.config).then(({data}) => {
          this.$emit('emit-event', data[this.responseDataKey])
          if (data[this.responseCodeKey] === this.responseSucessFlag) {
            this.countdown()
          } else {
            this.eventBus.$emit('toast/show', data[this.responseMsgKey])
            this.isCountDisable = true
          }
        }).catch(() => {
          this.isCountDisable = true
        })
      },
      // 60秒倒计时
      countdown () {
        let count = 60
        window.clearInterval(this.countInterval)
        this.countInterval = setInterval(() => {
          if (count > 0) {
            this.countText = `${count--}s`
            this.isCountDisable = false
          } else {
            clearInterval(this.countInterval)
            this.countText = '发送验证码'
            this.isCountDisable = true
          }
        }, 1000)
      },
      closeInterval () {
        this.countInterval && window.clearInterval(this.countInterval)
      }
    },
    mounted () {
      if (this.value) {
        this.innerValue = this.value
      }
    }
  }
</script>


<style lang="scss" scoped>
  .sms-input-component {
    .sms-code {
      height: .7rem;
      width: 2rem;
      position: absolute;
      top: 50%;
      margin-top: -.35rem;
      right: 0.3rem;
      font-size: 0.28rem;
      border-radius: 4px;
      color: #FE5C02;
      background-color: #FDF5E4;
    }
    .able-activity {
      border: none;
      background-color: #EEE!important;
      color: #999;
    }
  }
</style>
