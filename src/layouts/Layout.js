import Vue from 'vue'

export default {
  name: 'Layout',
  props: {
    name: {
      type: String,
      default: 'div'
    }
  },
  created () {
    if (this.name !== 'div' && !Vue.options.components[this.name]) {
      Vue.component(
        this.name,
        () => import(`../layouts/${this.name}.vue`)
      )
    }
    this.$parent.$emit(`update:layout`, this.name)
  },
  render () {
    return this.$slots.default[0]
  }
}
