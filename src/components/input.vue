<template>
  <div class="form-filed" :class="{'bottom': props.isBottom}">
    <label class="label">{{props.label}}</label>
    <input class="value" 
           :readonly = 'props.readOnly'
           @input="changeVal($event)"
           data-vv-value-path="innerValue" 
           v-validate="props.rules || {}"
           :data-vv-as="props.label"
           :data-vv-name="model"
           :type="props.type"
           :value="form[model]"
           :placeholder="props.placeholder"
    />
    <slot name='input-slot'></slot>
    <span class="unit" v-if="props.unit">{{props.unit}}</span>
  </div>
</template>

<script>
  export default {
    name: 'my-input',
    data () {
      return {
        form: {
          [this.model]: this.props.value || ''
        },
        timer: ''
      }
    },
    props: ['props', 'model'],
    methods: {
      changeVal (event) {
        // event.target.value = this.props.format && this.props.format(event.target.value) || event.target.value
        this.form[this.model] = this.props.format && this.props.format(event.target.value) || event.target.value
        if (this.props.format) {
          event.target.value = this.form[this.model]
        }
        this.$emit('myInput', {[this.model]: event.target.value})
        this.$store.commit('changeApplyEdit', {[this.model]: event.target.value})
        this.emitValidate()
      },
      emitValidate () {
        if (this.props.validOff) {
          this.$store.commit('getValidatorMsg', {[this.model]: {msg: '', isValid: true}})
          return
        }
        this.$validator.validate(this.model, this.form[this.model]).then((result) => {
          const {msg} = this.$validator.errors.items.length > 0 ? this.$validator.errors.items[0] : ''
          this.$store.commit('getValidatorMsg', {[this.model]: {msg, isValid: result}})
        })
      },
      watchValue (val, oldValue) {
        this.form[this.model] = val
        this.emitValidate()
        this.$store.commit('changeApplyEdit', {[this.model]: val})
      },
      watchValid () {
        this.emitValidate()
      },
      watchRules (val) {
        this.$validator.fields.items[0].rules.max_value[0] = val
        this.emitValidate()
      }
    },
    mounted () {
      this.$watch('props.value', this.watchValue)
      this.$watch('props.validOff', this.watchValid)
      this.$watch('props.rules.max_value', this.watchRules)
      if (this.props.value) {
        this.$store.commit('changeApplyEdit', {[this.model]: this.props.value})
      }
      setTimeout(() => {
        this.emitValidate()
      }, 0)
    },
    destroyed () {
      this.eventBus.$off('input/validate')
      this.props.format = null
    }
  }
</script>

<style lang="scss" scoped>
  .form-filed {
    position: relative;
    display: flex;
    align-items: center;
    background-color: #fff;
    height: 1rem;
    padding: 0 0.3rem;
    .label {
      width: 2rem;
      font-size: 0.32rem;
      color: #444;
    }
    .value {
      flex: 1;
      font-size: 0.32rem;
    }
    .unit {
      font-size: 0.32rem;
      color: #444;
      width: 1rem;
      position: absolute;
      right: 0.3rem;
      top: 50%;
      margin-top: -0.2rem;
    }
  }
</style>
