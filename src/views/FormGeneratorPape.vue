<template>
  <div class="form-wrap">
    <form-generator :schema="schema" v-model="formData" ref="formTest"></form-generator>
    <button @click="myMethods">显示确认组件</button>
  </div>
</template>

<script>
  import FormGenerator from '../components/base/FormGenerator'
  export default {
    data () {
      return {
        formData: {
          email: null,
          phone: null,
          smsCode: '23232'
        },
        schema: [
          {
            fieldType: 'MyLabel',
            labelText: '显示'
          },
          {
            fieldType: 'MyInput',
            model: 'email',
            label: '电子邮箱',
            placeholder: '请输入电子邮箱',
            rules: {
              required: true
            },
            slot: 'sdsdsd'
          },
          {
            fieldType: 'MyInput',
            model: 'phone',
            label: '手机号',
            placeholder: '请输入手机号',
            rules: {
              required: true,
              phone: true
            }
          },
          {
            fieldType: 'SmsCode',
            model: 'smsCode',
            label: '短信验证码',
            placeholder: '请输入短信验证码',
            mobile: '',
            rules: {
              required: true
            }
          }
        ]
      }
    },
    components: {
      FormGenerator
    },
    methods: {
      myMethods () {
        this.$refs.formTest.validator().then(({isValid}) => {
          console.log(isValid)
        }).catch(({errorMsg}) => {
          console.log(errorMsg)
        })
      }
    },
    mounted () {
      console.log(this.$createElement('div'))
    }
  }
</script>
