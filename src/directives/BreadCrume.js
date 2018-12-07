import Vue from 'vue'
import ButtonAction from '../components/breadcrume/ButtonAction'

let signInstance
let ButtonActionConstructor = Vue.extend(ButtonAction)

export default {
  // 当被绑定的元素插入到 DOM 中时……
  bind: function (el, binding) {
    if (!signInstance) {
      signInstance = new ButtonActionConstructor({
        el: document.createElement('div')
      })
    }
    el.onmouseover = function () {
      el.appendChild(signInstance.$el)
      signInstance.objInfo = binding.value
      if (signInstance.objInfo.list.length > 1) {
        signInstance.isShow = true
      } else {
        signInstance.isShow = false
      }
    }
    el.onmouseout = function () {
      signInstance.isShow = false
    }
  },
  inserted: function () {
  }
}
