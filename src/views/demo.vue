<template>
  <div>
    <confirm-dialogue :is-touch-close='isTouchClose'>
    </confirm-dialogue>
    <button @click="myMethods">显示确认组件</button>
    <select-search :list="list"></select-search>
  </div>
</template>

<script>
  import ConfirmDialogue from '../components/confirmdialogue.vue'
  import SelectSearch from '../components/select-search.vue'
  export default {
    data () {
      return {
        isTouchClose: true,
        list: [
          {
            label: '工商银行',
            value: '01'
          },
          {
            label: '建设银行',
            value: '02'
          },
          {
            label: '农业银行',
            value: '03'
          },
          {
            label: '招商银行',
            value: '04'
          },
          {
            label: '交通银行',
            value: '05'
          }
        ]
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
      ConfirmDialogue,
      SelectSearch
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

