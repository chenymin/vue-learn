<template>
  <div class="layer-container">
    <my-header :title="title" :is-middle="isMiddle" :right-title="rightTitle"></my-header>
    <slot name="layer-slot"></slot>
  </div>
</template>

<script>
import MyHeader from '@/components/header'
export default {
  data () {
    return {}
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    isMiddle: {
      type: Boolean,
      default: false
    },
    rightTitle: {
      type: String,
      default: ''
    }
  },
  components: {
    MyHeader
  }
}
</script>

<style lang="scss">
.layer-container {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  z-index: 99;
}
</style>
