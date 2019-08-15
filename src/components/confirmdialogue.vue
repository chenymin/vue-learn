<template>
  <cover-container :is-touch-close='isTouchClose' ref='coverConfirmDialog' v-model="isShowConfirmDialogue">
    <div class='content-container' slot='cover-slot' v-if="isShowConfirmDialogue">
      <div class='content'>
      	<p class="title" v-if="showTitle">提示</p>
        <p class='text'>{{text}}</p>
        <slot name='btn-group'>
          <p class='btn-group'>
            <button class='button-common cancle' @click.stop='cancleModal'>{{cancel}}</button>
            <button class='button-common confirm' @click.stop='confirm'>{{sure}}</button>
          </p>
        </slot>
      </div>
    </div>
  </cover-container>

</template>

<script>
import CoverContainer from './base/cover'

export default {
  data () {
    return {
      isShowConfirmDialogue: this.isShow
    }
  },
  props: {
    isTouchClose: {
      type: Boolean,
      default: false
    },
    showTitle: {
      type: Boolean,
      default: false
    },
    text: {
      type: String,
      default: '确定申请提前还款'
    },
    isShow: {
      type: Boolean,
      default: false
    },
    sure: {
      type: String,
      default: '确定'
    },
    cancel: {
      type: String,
      default: '取消'
    }
  },
  methods: {
    confirm () {
      this.$emit('confirm-ok')
    },
    cancleModal () {
      this.isShowConfirmDialogue = false
      this.$emit('confirm-cancle')
    },
    showCofirm  () {
      this.isShowConfirmDialogue = true
    }
  },
  components: {
    CoverContainer
  },
  mounted () {
    this.eventBus.$on('confirm/show', this.showCofirm)
    this.eventBus.$on('confirm/hidden', this.cancleModal)
  },
  destroyed () {
    this.eventBus.$off('confirm/show')
    this.eventBus.$off('confirm/hidden')
  }
}
</script>

<style lang='scss' scoped>
.cover-container {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #333;
  opacity: 0.4;
  z-index: 10;
}

.content-container {
  position: absolute;
  top: 50%;
  z-index: 11;
  padding: 0 1rem;
  width: 100%;
  .content {
    background-color: #fff;
    border-radius: 8px;
    margin-top: -1.25rem;
    .title {
    	text-align: center;
    	font-size:0.3rem;
			font-family:PingFangSC-Regular;
			font-weight:400;
			color:rgba(51,51,51,1);
			line-height:0.42rem;
			padding: 0.3rem 0 0;
    }
    .text {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.24rem;
      color: #333;
      height: 1.6rem;
      padding: 0 0.5rem;
    }
    .btn-group {
      display: flex;
      .button-common {
        flex: 1;
        height: 0.9rem;
        border-top: 1px solid #eee;
        font-size: 0.36rem;
      }
      .cancle {
        border-right: 1px solid #eee;
      }
      .confirm {
        color: #cda76e;
      }
    }
  }
}
</style>


