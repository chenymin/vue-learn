<template>
  <div class="input-component">
    <div class="form-filed" :class="{'input-component__no-boeder': isNoBorderBottom}">
      <label v-if='label && isShowInputLabel' class="label">{{ label }}</label>
      <input  class="value"
              :type='type'
              :value="value"
              @input='updateValue'
              @blur="blurFun"
              @focus="focusFun"
              :readonly="readonly"
              :disabled='disabled'
              :placeholder="placeholder"
              :maxlength="maxlength"
              :class="[ {'input': true}, {'input__error': !!error}, ...inputClass]">
      <slot name="input-slot" :slotInfo="{item: componentChildList}"></slot>
      <span class="unit" v-if="unit !== ''">{{unit}}</span>
    </div>
    <transition name='slide'>
      <p v-show='isShowPError && error' class='form__error'>{{ error }}</p>
    </transition>
  </div>
</template>

<script>
import componentMinx from '@/components/mixin/componentMinx'
export default {
  mixins: [componentMinx],
  $_veeValidate: {
    name () {
      return this.label
    },
    value () {
      return this.value
    }
  },
  props: {
    value: [String, Number],
    isShowInputLabel: {
      type: Boolean,
      default: true
    },
    label: {
      type: String,
      default: ''
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
    },
    placeholder: {
      type: String,
      default: ''
    },
    isShowPError: {  // 是否把校验错误信息用p标签显示出来
      type: Boolean,
      default: false
    },
    maxlength: {  // input输入的最大长度
      type: Number,
      default: null
    },
    inputClass: {
      type: Array,
      default () {
        return []
      }
    },
    componentChildList: {
      type: Array,
      default () {
        return []
      }
    },
    isNoBorderBottom: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    updateValue (e) {
      this.$emit('input', e.target.value)
    },
    focusFun () {
      // 获得焦点隐藏子组件
      if (this.componentChildList.length > 0) {
        this.componentChildList[0].isComponentShow = true
      }
    },
    blurFun () {
      setTimeout(() => this.$emit('blur'), 0)  // 这样的写法作用是把事件往执行顺序的后面推了，让blur事件在后面执行
      setTimeout(function () {  // 作用：微信浏览器H5页面软键盘弹出又关闭导致页面空缺的问题
        window.scrollTo(0, 0)
      }, 100)
    }
  }
}
</script>

<style lang="scss" scoped>
  .input-component {
    &__no-boeder:after {
      border-bottom: none;
    }
  }
  .form__error {
    font-size: 0.28rem;
    padding-left: 0.3rem;
    background-color: #fff;
    color: red;
  }
  .input-component__padding-left {
    padding-left: .3rem;
  }
  .input-component-position_right {
    text-align: right;
    padding-right: .3rem;
  }

 .input-component-position_right__zero {
    text-align: right;
    padding-right: 0rem!important;
  }

  .input-component__value_black::placeholder {
    color: #333;
  }
  .input-component__value_black +.arrow-right{
    border-bottom-color: #333;
    border-right-color: #333;
  }

  .input-component__value_black_text +.arrow-right{
    border-bottom-color: #333;
    border-right-color: #333;
  }
</style>
