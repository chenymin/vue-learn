<template>
  <div id="app">
    <component :is="layout">
      <router-view :layout.sync="layout"/>
    </component>
    <my-toast
      :title="toast.title"
      :content="toast.content">
    </my-toast>
    <loding></loding>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import MyToast from '@/components/toast'
import Loding from '@/components/loading/loding'
import {isAndroid} from '@/utils/util'
import _ from 'lodash'
export default {
  name: 'app',
  data () {
    return {
      layout: `div`
    }
  },
  computed: {
    ...mapGetters([
      'toast'
    ])
  },
  components: {
    MyToast,
    Loding
  },
  created () {
    // 删除localstore的值
    this.$store.commit('removePlatformStore')
  },
  mounted () {
    // 如果是安卓手机的话就监听resize方法，将不在浏览器窗口的可见区域内的元素滚动到浏览器窗口的可见区域
    // 解决H5输入框获取焦点，软键盘弹出会遮挡表单问题
    isAndroid() && window.addEventListener('resize', _.throttle(() => {
      document.activeElement.scrollIntoViewIfNeeded()
    }, 500))
  }
}
</script>

<style lang="scss">
  @import 'scss/app.scss';
</style>
