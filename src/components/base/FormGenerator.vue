<template>
  <div class="form-wrap">
    <component v-for="(field, index) in schema"
               :key="index"
               :is="field.fieldType"
               v-model="formData[field.model]"
               @input="updateForm(field.model, $event)"
               v-validate="field.rules"
               :error="errors.first(field.label)"
               v-bind="field">
    </component>
    <button @click="myMethods">显示确认组件</button>
  </div>
</template>

<script>
  import MyInput from '../myinput'

  export default {
    name: 'FormGenerator',
    components: { MyInput },
    props: {
      value: {
        type: Object,
        default () {
          return {}
        }
      },
      schema: {
        type: Array,
        default () {
          return []
        }
      }
    },
    data () {
      return {
        formData: this.value || {}
      }
    },
    methods: {
      updateForm (fieldName, value) {
        this.$set(this.formData, fieldName, value)
        this.$emit('input', this.formData)
      },
      myMethods () {
        this.$validator.validateAll().then((item, a) => {
          console.log(item, this.$validator.errors.items)
        })
      }
    }
  }
</script>
