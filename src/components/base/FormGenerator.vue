<template>
  <div class="form-wrap">
    <component v-for="(field, index) in schema"
               :key="index"
               :is="field.fieldType"
               v-model="formData[field.model]"
               @input="updateForm(field.model, $event)"
               v-validate="field.rules || {}"
               :error="errors.first(field.label)"
               v-bind="field"
               v-if="!field.isComponentShow">
      <template :slot="field.slotName"  slot-scope="{slotInfo: {item}}">
        <!--对象-->
        <component
          v-if="!Array.isArray(item)"
          :is="item.fieldType"
          v-bind="item"
          v-model="field.formData[item.model]"
          v-validate="item.rules"
          v-show="field.formData[item.model] !== null">
        </component>
        <!--数组-->
        <component
          v-if="Array.isArray(item) && !itemChild.isComponentShow"
          v-for="(itemChild, index) in item"
          :is="itemChild.fieldType"
          :key="index"
          v-bind="itemChild"
          v-model="itemChild.formData && itemChild.formData[item.model]"
          v-validate="itemChild.rules || {}">
        </component>
      </template>
    </component>
  </div>
</template>

<script>
  import MyInput from '@/components/myinput'
  import SmsCode from '@/components/smsverification'
  import DatePicker from '@/components/datepicker/datepicker'
  import MySelection from '@/components/selection'
  import Distpicker from '@/components/distpickers/distpicker'
  import RouterLink from '@/components/routerLink'
  import LinkRelitive from '@/components/linkrelitive'
  import MyLabel from '@/components/label'
  import MyIcon from '@/components/icon/icon'
  import AlertBox from '@/components/alertBox'

  export default {
    name: 'FormGenerator',
    components: { MyInput, SmsCode, DatePicker, MySelection, Distpicker, RouterLink, LinkRelitive, MyLabel, MyIcon, AlertBox },
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
      validator () {
        const promise = new Promise((resolve, reject) => {
          this.$validator.validateAll().then((isValid) => {
            isValid ? resolve({isValid}) : reject({errorMsg: this.$validator.errors.items})
          })
        })
        return promise
      }
    }
  }
</script>
