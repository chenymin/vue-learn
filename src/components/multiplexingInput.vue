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
        isCountDisable: false,
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
      }
    },
    methods: {
      sendCode () {
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
