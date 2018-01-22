<template>
  <div id="app">
    <router-view></router-view>
    <my-toast
           :title="toast.title"
           :content="toast.content">
    </my-toast>
    <loding></loding>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import MyToast from './components/toast'
import Loding from './components/loading/loding'
export default {
  name: 'app',
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
    this.$store.commit('getChannelInfo')
  }
}
</script>

<style lang="scss">
  @import 'scss/app.scss';
</style>
