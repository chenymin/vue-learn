<template>
  <div>
    <confirm-dialogue :is-touch-close='isTouchClose' :is-show="confirmDialogueIsShow">
    </confirm-dialogue>
    <button @click="myMethods">显示确认组件</button>
    <!-- <select-search :list="list"></select-search>
    <dots-loader></dots-loader> -->
    <selection :props="selectionCard.props" :model="selectionCard.model"></selection>
  </div>
</template>

<script>
  import ConfirmDialogue from '../components/confirmdialogue.vue'
  // import SelectSearch from '../components/select-search.vue'
  // import DotsLoader from '../components/loading/dots-loader.vue'
  import Selection from '../components/selection.vue'

  export default {
    data () {
      return {
        confirmDialogueIsShow: false,
        selectionCard: {
          props: {
            title: '开户行',
            defaultVal: '请选择开户行',
            selectType: 'term',
            isShowSelect: false,
            isTriggerClick: true,
            isBorder: false,
            label: 'label',
            value: 'value',
            validOff: false,
            isNeedValue: true,
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
          },
          model: 'bankCode'
        },
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
        this.confirmDialogueIsShow = true
        this.eventBus.$emit('confirm/show')
      },
      test () {
        console.log('点击确认')
      }
    },
    components: {
      ConfirmDialogue,
      // SelectSearch,
      // DotsLoader,
      Selection
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

