<template>
  <div class="cover-component">
    <div class="cover-container" @click.prevent="coverHidden" v-show="isShowCover">
    </div>
    <slot name='cover-slot'></slot>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        isShowCover: this.isShow
      }
    },
    model: {
      prop: 'isShow',
      event: 'cover-hidden'
    },
    props: {
      isTouchClose: {
        type: Boolean,
        default: false
      },
      isShow: {
        type: Boolean,
        default: false
      }
    },
    watch: {
      'isShow' (newVal, oldVal) {
        this.isShowCover = this.isShow
      }
    },
    methods: {
      coverHidden () {
        if (this.isTouchClose) return
        this.$emit('cover-hidden')
        this.hiddenCover()
      },
      hiddenCover () {
        this.isShowCover = false
      },
      showCover () {
        this.isShowCover = true
      }
    }
  }
</script>


<style lang="scss" scoped>
  .cover-compent {
    position: relative;
  }
  .cover-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: #333;
    opacity: 0.4;
    z-index: 10
  }
</style>

