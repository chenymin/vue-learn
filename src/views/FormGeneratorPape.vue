<template>
  <div class="form-wrap">
    <form-generator :schema="schema" v-model="formData" ></form-generator>
  </div>
</template>

<script>
  import FormGenerator from '../components/base/FormGenerator'
  export default {
    data () {
      return {
        formData: {
          email: null,
          phone: null
        },
        schema: [
          {
            fieldType: 'MyInput',
            model: 'email',
            label: '电子邮箱',
            placeholder: '请输入电子邮箱',
            rules: {
              required: true
            }
          },
          {
            fieldType: 'MyInput',
            model: 'phone',
            label: '手机号',
            placeholder: '请输入手机号',
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
    }
  }
</script>
