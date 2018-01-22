<template>
  <div class="toast-content" v-if="isShow">
    <p class="text">{{title}}</p>
    <p class="text">{{content}}</p>
  </div>
</template>

<script>
  export default {
    name: 'toast',
    data () {
      return {
        isShow: false,
        timers: [],
        autoClose: true
      }
    },
    props: [
      'title',
      'content',
      'duration'
    ],
    methods: {
      showToast () {
        this.isShow = true
      },
      countdown () {
        if (this.autoClose) {
          const t = setTimeout(() => {
            this.isShow = false
          }, this.duration || 1500)
          this.timers.push(t)
        }
      }
    },
    watch: {
      'isShow' (val) {
        if (val) {
          this.timers.forEach((timer) => {
            window.clearTimeout(timer)
          })
          this.timers = []
          this.countdown()
        }
      }
    },
    created () {
      this.eventBus.$on('toast/show', this.showToast)
    },
    destroyed () {
      this.eventBus.$off('toast/show')
    }
  }
</script>

<style lang="scss" scoped>
  .toast-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: fixed;
    z-index: 9999;
    width: 3rem;
    height: 1.4rem;
    background-color: #4c4c4c;
    border-radius: 4px;
    opacity: 0.8;
    top: 50%;
    left: 50%;
    margin-left: -1.4rem;
    margin-top: -2.4rem;
    padding: 0.3rem;
    .text {
      color: #fff;
      font-size: 0.26rem;
    }
  }
</style>
