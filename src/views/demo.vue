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
    <!--<selection :props="selectionCard.props" :model="selectionCard.model"></selection>-->
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

      <!--<my-switch v-model="isSwitch"></my-switch>-->

      <!--<sms-verification v-model="smsVer.props.value"-->
                        <!--:props="smsVer.props"-->
                        <!--:model="smsVer.model">-->
      <!--</sms-verification>-->

      <multiplexing-input v-model="phone1"
                          :label="filed.label"
                          v-validate="'required|phone'"
                          :error="errors.first('手机号码1')">
      </multiplexing-input>
    </div>


    <list></list>
    <anchored-heading :level="1">
      <span>Hello</span> world!
    </anchored-heading>

    <mytest  :title="title" :massgae="massgae"></mytest>
  </div>
</template>

<script>
  import MultiplexingInput from '../components/multiplexingInput.vue'
  import ConfirmDialogue from '../components/confirmdialogue.vue'
  // import SelectSearch from '../components/select-search.vue'
  // import DotsLoader from '../components/loading/dots-loader.vue'
  import Selection from '../components/selection.vue'
  import PicAlert from '../components/picalert'
  import MyTextInput from '../components/myinput'
  import MySwitch from '../components/switch'
  import SmsVerification from '../components/smsverification'
  import PromptAlert from '../components/promptalert'
  import List from './List'
  import Vue from 'vue'

  var getChildrenTextContent = function (children) {
    return children.map(function (node) {
      return node.children
        ? getChildrenTextContent(node.children)
        : node.text
    }).join('')
  }

  Vue.component('anchored-heading', {
    methods: {
      clickHandler () {
        console.log('---->')
      }
    },
    render: function (createElement) {
      // 创建 kebab-case 风格的ID
      var headingId = getChildrenTextContent(this.$slots.default)
        .toLowerCase()
        .replace(/\W+/g, '-')

      return createElement(
        'h' + this.level,
        [
          createElement('a', {
            attrs: {
              name: headingId,
              href: '#' + headingId
            }
          }, this.$slots.default),
          createElement('p', {
            style: {
              color: 'red',
              fontSize: '14px'
            },
            on: {
              click: this.clickHandler
            }
          }, [
            createElement('label', '子组件1')
          ])
        ]
      )
    },
    props: {
      level: {
        type: Number,
        required: true
      }
    }
  })

  export default {
    data () {
      return {
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
      PromptAlert,
      List,
      MultiplexingInput,
      'mytest': {
        template: `<div>这是个h1标题{{title}}</div>`,
        props: ['title'],
        data () {
          return {
            mag: '111'
          }
        },
        created () {
          console.log(this.$attrs) // 注意这里
        }
      }
    },
    mounted () {
      this.eventBus.$on('confirm/ok', this.test)
    },
    destroyed () {
      this.eventBus.$off('confirm/ok')
    }
  }
</script>

<style scoped>
</style>

