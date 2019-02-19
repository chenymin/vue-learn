<template>
  <div class="multiplex-input-component">
      <my-input
        v-model="innerValue"
        v-on="$listeners"
        v-bind="$attrs">
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
        innerValue: ''
      }
    },
    props: {
      rules: {
        type: [Object, String],
        default: ''
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
    created () {
      if (this.value) {
        this.innerValue = this.value
      }
    }
  }
</script>
