<template>
  <div class="sms-input-component">
      <my-input
        v-model="innerValue"
        v-on="$listeners"
        v-bind="$attrs">
        <button slot="input-slot" class='sms-code'
                :disabled="!isCountDisable"
                :class="{'able-activity': isCountDisable}"
                v-text="countText" @click.prevent='sendCode()'>
        </button>
    </my-input>
  </div>
</template>

<script>
  import MyInput from './myinput'
  import axios from '@/utils/axios'
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
        default: '/entLimit/sendSmsValidate'
      },
      paramsObj: {  // 发送短信的传参（因为接口会不同）
        type: Object,
        default: () => {}
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
        axios.post(this.interfaceUrl, Object.assign(this.paramsObj, {bankPhoneNo: this.mobile})).then(({data, respCode}) => {
          if (respCode === '000000') {
            this.countdown()
          } else {
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
      height: 1rem;
      width: 2rem;
      position: absolute;
      top: 0;
      right: 0px;
      background-color: #f5f5f5;
      font-size: 0.28rem;
      color: #999;
    }
    .able-activity {
      background-color: #ffefea;
      color: #ff6633
    }
  }
</style>
