import Vue from 'vue'

// vue 2.5.0以上，使用scoped传值
Vue.component('pass', {
  render () {
    return this.$scopedSlots.default(this.$attrs)
  }
})
