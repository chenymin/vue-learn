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
          v-tip.bottom="'fdfdfdf'"
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
      <div>
        
      <span>Enter serial:</span>
      <input
        type="text"
        placeholder="xxx-xxx-xxx"
        v-model="formattedSerial"
        ref="input"/>
  </div>
</div>
    <!-- <span v-tip.top.light.click="msg">{{ msg }}</span>

    <button v-tip.right="options">
      指令使用-绑定一个对象
    </button> -->
  </div>
</template>

<script>
  import Vue from 'vue'
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
    computed: {
      formattedSerial: {
        get () {
          // We split the serial in chunks of 3
          const chunks = [];
          [...this.serial].forEach((c, i) => {
            let index = 0
            if (i > 5) index = 2
            else if (i > 2) index = 1
            if (!chunks[index]) chunks[index] = ''
            chunks[index] += c
          })
          // And then return the chunks joined by a "-"
          return chunks.join('-')
        },
        set (value) {
          // When we set the value, we remove all of the "-"
          // And also make sure the serial can't be bigger than 9 characters
          this.serial = value.replace(/-/g, '').substring(0, 9)
          this.$refs.input.value = this.formattedSerial
        }
      }
    },
    data () {
      return {
        options: {
          title: '这里是标题',
          content: '显示内容',
          theme: 'dark',
          //  tip 的容器，在不设置的情况下，tip 会自动在参考元素的父级元素上面查找合适的容器，但推荐手动设置一个 tip 对象容器
          container: document.body,
          customProps: { msg: '自定义渲染' },
          // 这里通过 customComponent 定义了一个自定义组件
          customComponent: Vue.extend({
            props: ['msg'],
            render (h) {
              return h('span', this.msg)
            }
          }),
          placements: ['top', 'buttom'],
          duration: 400,
          transition: true
        },
        msg: 'sfsfsfsfa',
        serial: '',
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

