<template>
  <cover-container :is-touch-close='isTouchClose' ref='coverCom' v-model="isPromptAlertShow">
    <div class="prompt-alert" slot='cover-slot' v-if="isPromptAlertShow">
      <div class="alert-content">
        <span class="title">{{showTitle}}</span>
        <slot name="prompt-content">
          <p class="content-text">{{content}}</p>
        </slot>
        <slot name="prompt-btn">
          <button class="confirm-btn" @click="cancel">我知道了</button>
        </slot>
      </div>
    </div>
  </cover-container>
</template>

<script>
  import CoverContainer from './base/cover'
  export default {
    model: {
      prop: 'isShow',
      event: 'prompt-cancel'
    },
    data () {
      return {
        isPromptAlertShow: this.isShow
      }
    },
    props: {
      content: {
        type: String,
        default: ''
      },
      showTitle: {
        type: String,
        default: '提示'
      },
      isTouchClose: {
        type: Boolean,
        default: false
      },
      isShow: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      cancel () {
        this.isPromptAlertShow = false
        this.$emit('prompt-cancel', false)
      },
      promptAlertShow () {
        this.isPromptAlertShow = true
        this.$refs.coverCom.showCover()
      },
      promptAlertHidden () {
        this.isPromptAlertShow = false
      }
    },
    components: {
      CoverContainer
    },
    mounted () {
      this.eventBus.$on('promptAlert/show', this.promptAlertShow)
      this.eventBus.$on('promptAlert/hidden', this.promptAlertHidden)
    },
    destroyed () {
      this.eventBus.$off('promptAlert/show')
      this.eventBus.$off('promptAlert/hidden')
    }
  }
</script>

<style lang="scss" scoped>
  .prompt-alert {
    font-size: 0.36rem;
    .alert-cover {
      position: fixed;
      left: 0;
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
