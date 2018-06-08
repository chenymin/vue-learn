<template>
  <div>
    <confirm-dialogue :is-touch-close='isTouchClose'>
    </confirm-dialogue>
    <button @click="myMethods">显示确认组件</button>
  </div>
</template>

<script>
  import ConfirmDialogue from '../components/confirmdialogue.vue'
  export default {
    data () {
      return {
        isTouchClose: true
      }
    },
    methods: {
      myMethods () {
        this.eventBus.$emit('confirm/show')
      },
      test () {
        console.log('点击确认')
      }
    },
    components: {
      ConfirmDialogue
    },
    mounted () {
      this.eventBus.$on('confirm/ok', this.test)
    },
    destroyed () {
      this.eventBus.$off('confirm/ok')
    }
  }
</script>

<style scoped>
</style>

