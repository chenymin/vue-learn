<template>
  <div>
    <confirm-dialogue :is-touch-close='isTouchClose'>
    </confirm-dialogue>
    <pic-alert :is-touch-close='isTouchClose' ></pic-alert>
    <prompt-alert :is-touch-close='isTouchClose'
                  :content="'sdfsdfsfsfssdfsdf'"
                  v-model="promptShow">
    </prompt-alert>
    <button @click="myMethods">显示确认组件</button>
    <!-- <select-search :list="list"></select-search>
    <dots-loader></dots-loader> -->
    <selection :props="selectionCard.props" :model="selectionCard.model"></selection>
    <div class="form-wrap">
      <my-text-input
        v-model="email"
        label="Email"
        type="email"
        v-validate="'required|email'"
        :error="errors.first('Email')"
      ></my-text-input>

      <my-text-input
        v-model="phone"
        label="手机号"
        type="text"
        v-validate="'required|phone'"
        :error="errors.first('手机号')"
        :disabled="true"
        :unit="'元'"
      ></my-text-input>
      <my-switch v-model="isSwitch"></my-switch>
      <sms-verification v-model="smsVer.props.value"
                        :props="smsVer.props"
                        :model="smsVer.model">
      </sms-verification>
    </div>
  </div>
</template>

<script>
  import ConfirmDialogue from '../components/confirmdialogue.vue'
  // import SelectSearch from '../components/select-search.vue'
  // import DotsLoader from '../components/loading/dots-loader.vue'
  import Selection from '../components/selection.vue'
  import PicAlert from '../components/picalert'
  import MyTextInput from '../components/myinput'
  import MySwitch from '../components/switch'
  import SmsVerification from '../components/smsverification'
  import PromptAlert from '../components/promptalert'

  export default {
    data () {
      return {
        promptShow: false,
        smsVer: {
          isSendDisable: false,
          props: {
            label: '验证码',
            type: 'tel',
            placeholder: '请填写短信验证码',
            value: '',
            isBorder: false
          },
          model: 'verifyCode'
        },
        isSwitch: false,
        email: null,
        phone: null,
        selectionCard: {
          props: {
            title: '开户行',
            defaultVal: '请选择开户行',
            selectType: 'term',
            isShowSelect: false,
            isTriggerClick: true,
            isBorder: false,
            label: 'label',
            value: 'value',
            validOff: false,
            isNeedValue: true,
            list: [
              {
                label: '工商银行',
                value: '01'
              },
              {
                label: '建设银行',
                value: '02'
              },
              {
                label: '农业银行',
                value: '03'
              },
              {
                label: '招商银行',
                value: '04'
              },
              {
                label: '交通银行',
                value: '05'
              }
            ]
          },
          model: 'bankCode'
        },
        isTouchClose: false,
        list: [
          {
            label: '工商银行',
            value: '01'
          },
          {
            label: '建设银行',
            value: '02'
          },
          {
            label: '农业银行',
            value: '03'
          },
          {
            label: '招商银行',
            value: '04'
          },
          {
            label: '交通银行',
            value: '05'
          }
        ]
      }
    },
    methods: {
      myMethods () {
        // this.eventBus.$emit('confirm/show')
        // this.eventBus.$emit('picAlert/show')
        this.eventBus.$emit('promptAlert/show')
        // this.promptShow = !this.promptShow
        this.$validator.validateAll().then((item, a) => {
          console.log(item, this.$validator.errors.items)
        })
      },
      test () {
        console.log('点击确认')
      }
    },
    components: {
      ConfirmDialogue,
      // SelectSearch,
      // DotsLoader,
      Selection,
      PicAlert,
      MyTextInput,
      MySwitch,
      SmsVerification,
      PromptAlert
    },
    mounted () {
      this.eventBus.$on('confirm/ok', this.test)
      setTimeout(() => {
        this.email = '912072089@qq.com'
      }, 1000)
    },
    destroyed () {
      this.eventBus.$off('confirm/ok')
    }
  }
</script>

<style scoped>
</style>

