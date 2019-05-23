<template>
  <div class="header-component">
    <header class="header">
      <slot name="left-slot">
        <p v-if="isArrow" @click="reboundPage" class="header-component__arrow-area">
          <span class="left-arrow"></span>
          <span class="header-component__rebound-text">返回</span>
        </p>
      </slot>
      <span class="title" :class="{'title-middle': isMiddle, 'title-left': !isMiddle}">{{title}}</span>
      <slot name="right-slot">
        <span class="right-title" @click="jumpOtherPage" v-if="rightTitle !== ''">{{rightTitle}}</span>
      </slot>
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
      isByClickReturn: {
        type: Boolean,
        default: false
      },
      url: {
        type: String,
        default: ''
      }
    },
    methods: {
      reboundPage () {
        // 点击返回按钮处理页面的逻辑
        if (this.isByClickReturn) {
          this.$emit('header-back')
          return
        }
        if (this.url === '') {
          this.$router.go(-1)
          return
        }
        this.$router.replace({name: this.url})
      },
      jumpOtherPage () {
        this.$emit('header-right-space')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .header-component {
    &__rebound-text {
       position: absolute;
       display: flex;
       align-items: center;
       width: 1rem;
       height: 1rem;
       left: .8rem;
       top: 0
    }
    &__arrow-area {
      position: relative;
      height: 100%;
    }
    &__rebound-text{
      font-size: .3rem;
      color: #333;
    }
  }
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
        width: 12px;
        height: 12px;
        border-bottom: solid 1px #333;
        border-left: solid 1px #333;
        transform: rotate(45deg);
        top: 50%;
        margin-top: -6px;
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

