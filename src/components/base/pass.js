import Vue from 'vue'

// vue 2.5.0以上，使用scoped传值
// 看考链接：https://dev.to/loilo/an-approach-to-vuejs-template-variables-5aik
Vue.component('pass', {
  render () {
    return this.$scopedSlots.default(this.$attrs)
  }
})
