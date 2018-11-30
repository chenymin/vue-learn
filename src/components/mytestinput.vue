<template>
  <div class="form__input">
    <label v-if="label "class="form__label">{{ label }}</label>
    <input :type="type" :value="value" @input="updateValue" @change="updateValue" @blur="$emit('blur')" :disabled="disabled" :class="{ 'input': true, 'input__error': !!error }">
    <transition name="slide">
      <p v-show="error" class="form__error">{{ error }}</p>
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
      error: {
        type: String,
        required: false
      },
      type: {
        type: String,
        default: 'text',
        validator: val => {
          return (
            ['url', 'text', 'password', 'email', 'search'].indexOf(val) !== -1
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
