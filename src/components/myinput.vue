<template>
  <div class="input-comp">
    <div class="form-filed">
      <label v-if='label ' class="label">{{ label }}</label>
      <input  class="value"
              :data-vv-as="label"
              :type='type'
              :value='value'
              @input='updateValue'
              @change='updateValue'
              @blur="$emit('blur')"
              :readonly="readonly"
              :disabled='disabled'
              :class="{ 'input': true, 'input__error': !!error }">
      <slot name='input-slot'></slot>
      <span class="unit" v-if="unit !== ''">{{unit}}</span>
    </div>
    <transition name='slide'>
      <p v-show='error' class='form__error'>{{ error }}</p>
    </transition>
  </div>
</template>

<script>
export default {
  $_veeValidate: {
    name () {
      return this.label
    },
    value () {
      return this.value
    }
  },
  props: {
    value: String,
    label: {
      type: String
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    error: {
      type: String,
      required: false
    },
    unit: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text',
      validator: val => {
        return (
          ['url', 'text', 'password', 'email', 'search', 'tel'].indexOf(val) !== -1
        )
      }
    }
  },
  methods: {
    updateValue (e) {
      this.$emit('input', e.target.value)
    }
  }
}
</script>

<style lang="scss" scoped>
  .form__error {
    font-size: 0.28rem;
    padding-left: 0.3rem;
    background-color: #fff;
    color: red;
  }
</style>
