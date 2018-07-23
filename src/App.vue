<template>
  <div id="app">
    <transition-page>
      <router-view></router-view>
    </transition-page>
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
import TransitionPage from './components/transition/transitionpage'

export default {
  name: 'app',
  computed: {
    ...mapGetters([
      'toast'
    ])
  },
  components: {
    MyToast,
    Loding,
    TransitionPage
  },
  created () {
    this.$store.commit('getChannelInfo')
  }
}
</script>

<style lang="scss">
  @import 'scss/app.scss';
</style>
