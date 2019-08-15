<template>
  <label class="my-checkbox-component">
    <span class="checkbox-container">
      <input
        v-if="group"
        type="checkbox"
        :disabled="disabled"
        :value="label"
        v-model="model"
        class="check-box"
        @change="change">
      <input
        v-else
        type="checkbox"
        :disabled="disabled"
        :checked="currentValue"
        class="check-box"
        @change="change">
        <i class="checkbox-label"></i>
    </span>
    <slot name="checkbox-slot"></slot>
  </label>
</template>

<script>
  import {findComponentUpward} from '../assists/assists'
  export default {
    name: 'myCheckbox',
    data () {
      return {
        currentValue: this.value,
        model: [],
        group: false,
        parent: null
      }
    },
    props: {
      disabled: {
        type: Boolean,
        default: false
      },
      value: {
        type: [String, Number, Boolean],
        default: false
      },
      trueValue: {
        type: [String, Number, Boolean],
        default: true
      },
      falseValue: {
        type: [String, Number, Boolean],
        default: false
      },
      label: {
        type: [String, Number, Boolean]
      },
      checkedIndex: {
        type: Number,
        default: -1
      }
    },
    watch: {
      value (val) {
        if (val === this.trueValue || val === this.falseValue) {
          this.updateModel()
        }
      }
    },
    methods: {
      updateModel () {
        this.currentValue = this.value === this.trueValue
      },
      change (event) {
        if (this.disabled) {
          return false
        }
        const checked = event.target.checked
        this.currentValue = checked
        const value = checked ? this.trueValue : this.falseValue
        this.$emit('input', value)
        if (this.group) {
          this.parent.change(this.model)
        } else {
          this.$emit('on-change', value)
        }
      }
    },
    mounted () {
      this.parent = findComponentUpward(this, 'myCheckboxGroup')
      if (this.parent) {
        this.group = true
      }
      if (this.group) {
        this.parent.updateModel(true)
      } else {
        this.updateModel()
      }
    }
  }
</script>

<style lang="scss">
  .checkbox-container {
    position: relative;
    .check-box {
      display: none;
    }
    .checkbox-label {
      display: none;
    }
    .check-box + .checkbox-label::before {
      content: '';
      position: absolute;
      left: 0;
      border: 1px solid #999;
      width: .4rem;
      height: .4rem;
      display: inline-block;
      text-align: center;
      vertical-align: middle;
      line-height: .4rem;
      border-radius: 50%;
    }
    .check-box:checked + .checkbox-label::before {
      border: 1px solid #FF864A;
      background-color: #FF864A;
    }
    .check-box:checked + .checkbox-label::after {
      content: '';
      position: absolute;
      width: 0.26rem;
      height: 0.12rem;
      background: transparent;
      top: 0.1rem;
      left: 0.06rem;
      border: 1px solid #fff;
      border-top: none;
      border-right: none;
      transform: rotate(-45deg);
    }
  }
  .checkbox-container-selected {
    left: .3rem;
  }
</style>
