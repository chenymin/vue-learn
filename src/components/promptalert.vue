<template>
  <div class="prompt-alert" v-if="isShow">
    <div class='alert-cover' @click.prevent="cancel"></div>
    <div class="alert-content">
      <span class="title">提示</span>
      <slot name="prompt-content">
        <p class="content-text">{{content}}</p>
      </slot>
      <button class="confirm-btn" @click="cancel">我知道了</button>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        isShow: false
      }
    },
    props: ['content'],
    methods: {
      cancel () {
        this.isShow = false
      },
      promptAlertShow () {
        this.isShow = true
      }
    },
    created () {
      this.eventBus.$on('promptAlert/show', this.promptAlertShow)
    },
    destroyed () {
      this.eventBus.$off('promptAlert/show')
    }
  }
</script>

<style lang="scss" scoped>
  .prompt-alert {
    font-size: 0.36rem;
    .alert-cover {
      position: absolute;
      top: 0;
      z-index: 10;
      height: 100%;
      width: 100%;
      background-color: #333;
      opacity: .4;
    }
    .title {
      display: flex;
      justify-content: center;
      padding-top: 0.4rem;
      padding-bottom: 0.2rem;  
      color: #333;
    }
    .alert-content {
      position: fixed;
      top: 3.5rem;
      left: 50%;
      margin-left:-2.68rem; 
      width: 5.36rem;
      background-color: #fff;
      z-index: 11;
      border-radius: 4px;
    }
    .content-text {
      text-align: center;
      padding-bottom: 0.4rem;
      color: #999;
      font-size: .3rem
    }
    .confirm-btn {
      text-align: center;
      color: #cda76e;
      font-size: 0.36rem;
      height: 1rem;
      width: 100%;
      border-top: 1px solid #eee;
    }
  }
</style>


