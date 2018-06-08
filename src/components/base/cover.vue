<template>
  <div class="cover-component" v-show="isShowCover">
    <div class="cover-container" @click.prevent="coverHidden">
    </div>
    <slot name='cover-slot'></slot>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        isShowCover: false
      }
    },
    props: {
      isTouchClose: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      coverHidden () {
        if (this.isTouchClose) return
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
    position: absolute;
    top: 0;
    width: 100%;
    height: 100vh;
    background-color: #333;
    opacity: 0.4;
    z-index: 10
  }
</style>

