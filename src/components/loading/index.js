import Vue from 'vue'
import Loding from './loding.vue'

let instance

// loading 是否存在的标记位
let showing = false

// init constructor
let LoadConstructor = Vue.extend(Loding)

// init loading instance
let initInstance = () => {
  instance = new LoadConstructor({
    el: document.createElement('div')
  })
  document.body.appendChild(instance.$el)
}

// 显示
let Loading = () => {
   // 如果没有显示, 则不显示
  if (!showing) {
    showing = true
    initInstance()
  }
  return {
    show () {
      instance.show = true
    },
    hide () {
      instance.show = false
    }
  }
}
export default {
  install (Vue) {
    Vue.prototype.$loading = Loading()
  }
}
