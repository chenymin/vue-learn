<template>
  <div class="demo">
    <confirm-dialogue :is-touch-close='isTouchClose'>
    </confirm-dialogue>
    <pic-alert :is-touch-close='isTouchClose' ></pic-alert>
    <prompt-alert :is-touch-close='isTouchClose'
                  :content="'sdfsdfsfsfssdfsdf'"
                  v-model="promptShow">
    </prompt-alert>
    <button @click="myMethods">显示确认组件</button>

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
      ></my-text-input>

      <multiplexing-input v-model="phone1"
                          :label="filed.label"
                          v-validate="'required|phone'"
                          :error="errors.first('手机号码1')">
      </multiplexing-input>
      <date-picker v-model="datePickerInfo.value" v-bind="datePickerInfo" v-validate="'required|cardDate'"></date-picker>
      <dist-picker
        v-bind="distpicker"
        v-model="distpicker.detailCode"
        v-validate="'required'"
      >
      </dist-picker>
    </div>
  </div>
</template>

<script>
  import MultiplexingInput from '../components/smsverification.vue'
  import ConfirmDialogue from '../components/confirmdialogue.vue'
  import Selection from '../components/selection.vue'
  import PicAlert from '../components/picalert'
  import MyTextInput from '../components/myinput'
  import MySwitch from '../components/switch'
  import SmsVerification from '../components/smsverification'
  import PromptAlert from '../components/promptalert'
  import DatePicker from '../components/datepicker/datepicker'
  import DistPicker from '../components/distpickers/distpicker'

  export default {
    data () {
      return {
        distpicker: {
          detailCode: '北京市-北京市-东城区',
          model: 'address',
          label: '企业实际经营地址',
          placeholder: '请选择省市区',
          readonly: true
        },
        datePickerInfo: {
          label: '身份证有效期',
          readonly: true,
          type: 'text',
          value: '2019-03-30',
          placeholder: '请设置有效期限'
        },
        filed: {
          label: '手机号码1',
          type: 'text',
          value: '123456'
        },
        title: '测试title',
        massgae: 'message111',
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
        phone1: null,
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
        // this.eventBus.$emit('promptAlert/show')
        this.promptShow = !this.promptShow
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
      Selection,
      PicAlert,
      MyTextInput,
      MySwitch,
      SmsVerification,
      PromptAlert,
      MultiplexingInput,
      DatePicker,
      DistPicker
    },
    mounted () {
    },
    destroyed () {
      this.eventBus.$off('confirm/ok')
    }
  }
</script>

<style scoped>
</style>

