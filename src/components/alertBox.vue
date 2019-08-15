<template>
  <div class="alert-box-component">
    <div class="alert-box-component__outer">
      <p class="alert-box-component__outer_bg"></p>
      <p class="alert-box-component__outer_text">{{message}}</p>
    </div>
  </div>
</template>
<script>
  export default {
    model: {
      prop: 'isShow',
      event: 'alert-box'
    },
    props: {
      isShow: {
        type: Boolean,
        default: true
      },
      message: {
        type: String,
        default: ''
      }
    }
  }
</script>
<style lang="scss">
  .alert-box-component {
    position: absolute;
    top: -.45rem;
    right: 0.3rem;
    width: calc(100vw - 2.5rem);
    height: .6rem;
    &::after {
      position: absolute;
      content: '';
      bottom: -12px;
      right: 0;
      opacity: 0.6;
      border: 6px solid #000;
      border-color: #000 #000 transparent transparent;
    }
    &__outer {
      height: 100%;
      width: 100%;
    }
    &__outer_bg {
      position: absolute;
      top:0;
      height: 100%;
      width: 100%;
      background-color: #000;
      opacity: 0.6;
      z-index: 1;
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
      border-bottom-left-radius: 4px;
    }
    &__outer_text {
      position: absolute;
      top:0;
      z-index: 2;
      font-size: .26rem;
      color: #fff;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
      width: 100%;
      padding: .1rem 0 0 .3rem;
      text-align: center;
    }
  }
</style>
