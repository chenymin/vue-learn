<template>
  <div class="header-wrap">
    <header class="header">
      <span class="left-arrow" @click="reboundPage" v-if="isArrow"></span>
      <span class="title" :class="{'title-middle': isMiddle, 'title-left': !isMiddle}">{{title}}</span>
      <span class="right-title" @click="jumpOtherPage" v-if="rightTitle !== ''">{{rightTitle}}</span>
    </header>
    <p class="space"></p>
  </div>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        default: ''
      },
      isArrow: {
        type: Boolean,
        default: true
      },
      isMiddle: {
        type: Boolean,
        default: false
      },
      rightTitle: {
        type: String,
        default: ''
      },
      isClose: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      reboundPage () {
        this.$router.go(-1)
      },
      jumpOtherPage () {
        this.$emit('header-right-space')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .header {
    display: flex;
    height: 1rem;
    align-items: center;
    border-bottom: 1px solid #eee;
    background-color: #fff;
    position: fixed;
    width: 100%;
    z-index: 5;
    .left-arrow {
      position: absolute;
      height: 100%;
      width: 1rem;
      display: flex;
      &::before {
        position: absolute;
        content: '';
        width: 16px;
        height: 16px;
        border-bottom: solid 1px #333;
        border-left: solid 1px #333;
        transform: rotate(45deg);
        top: 50%;
        margin-top: -8px;
        left: 50%;
      }
    }
    .title {
      font-size: .36rem;
      color: #333;
    }
    .right-title {
      position: absolute;
      right: 0;
      height: 100%;
      font-size: .28rem;
      color: #333;
      padding: 0 0.3rem;
      display: flex;
      align-items: center;
    }
    .title-left {
      padding-left: 1rem;
    }
    .title-middle {
      display: flex;
      flex: 1;
      justify-content: center;
    }
  }
  .space {
    height: 1rem;
  }
</style>

