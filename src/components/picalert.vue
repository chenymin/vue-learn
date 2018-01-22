<template>
  <div class="pic-alert" v-if="isShow" @touchmove.prevent>
    <div class='alert-cover' @click.prevent="cancel"></div>
    <div class="common-bounced sendnum alert">
      <div class="title">图形验证码</div>
      <p class="promp-text">为了您的账户安全，请填写图形验证码</p>
      <div class="send-input">
        <span class="name">
          <input type="text" name="email" placeholder="请填写图形验证码" class="fs32" v-model="captchaCode">
          <img :src="picCodePath" @click.prevent="refreshCode" >
        </span>
      </div>
      <slot name="btu-group">
        <div class="btn text-center btn-group">
          <button class="cancel" @click.prevent="cancel">取消</button>
          <button class="confirm" @click.prevent.stop="confirm">确定</button>
        </div>
      </slot>
	  </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        captchaCode: '',
        picCodePath: '',
        isShow: false
      }
    },
    props: {
      url: {
        url: String,
        default: ''
      },
      mobile: {
        type: String,
        default: ''
      },
      type: {
        type: Number,
        default: 0
      }
    },
    methods: {
      cancel () {
        this.isShow = false
      },
      confirm () {
        if (!this.captchaCode.length >= 1) {
          this.$store.commit('changeToast', {content: '请输入图形验证码'})
          this.eventBus.$emit('toast/show')
          return
        }
        this.eventBus.$emit('picAlert/confirm', {captchaCode: this.captchaCode, type: this.type})
      },
      refreshCode () {
        this.picCodePath = `${this.url}/v1/captcha/captcha?mobile=${this.mobile.replace(/\s+/g, '')}&date=${new Date()}`
      },
      showPicAlert (isShow) {
        this.initData()
        this.isShow = isShow
      },
      initData () {
        this.captchaCode = ''
        this.refreshCode()
      }
    },
    mounted () {
      this.refreshCode()
      this.eventBus.$on('picAlert/show', this.showPicAlert)
      this.eventBus.$on('picAlert/init', this.initData)
    },
    destroyed () {
      this.eventBus.$off('picAlert/show')
      this.eventBus.$off('picAlert/init')
    }
  }
</script>

<style lang="scss" scoped>
  .pic-alert {
    .alert-cover {
      position: absolute;
      top: 0;
      z-index: 10;
      height: 100%;
      width: 100%;
      background-color: #929292;
      opacity: .8;
    }
    .btn-group {
      display: flex;
      .cancel {
        flex: 1;
        height: 1rem;
        border-right: 1px solid #ebebeb;
        border-bottom-left-radius: 4px; 
        font-size: 0.36rem;
      }
      .confirm {
        flex: 1;
        height: 1rem;
        color: #e0ac60!important;
        font-size: 0.28rem;
        font-size: 0.36rem;
        border-bottom-right-radius: 4px; 
      }
    }
    .promp-text {
      padding-left: 0.3rem;
      color: #999;
      font-size: 0.26rem;
    }
    ::-moz-placeholder {
      color: #bdbdbd;
    }
    ::-webkit-input-placeholder {
      color:#bdbdbd;
    }
    :-ms-input-placeholder {
      color:#bdbdbd;
    }
  }
  
  .btn{
    display: inline-block;
    cursor: pointer;
    user-select: none;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    border-top: 1px solid #ebebeb
  }
	.fs32 {
    font-size: 0.32rem;
  }
  .text-center {
    text-align: center;
  }
  
	.common-bounced {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 11;
    margin-left: -2.7rem;
    margin-top: -2.7rem; 
    width:5.4rem;
    font-size: 0.28rem;
    background-color:#FFFFFF;
    border-radius: 4px;
  }
	.common-bounced .title {
    text-align: center;
    height:1rem;
    line-height: 1rem;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }
	.common-bounced .name {
    display:block;
    width: 100%;
    padding: 0.3rem;
  }

	.common-bounced .cancel,.common-bounced .delete{
    display:inline-block;
    width: 2.49rem;
  }
	.common-bounced .delete{
    color:#e0ac60;
    border-left: 1px solid #ebebeb;
  }
	.common-bounced .cancel {
    color: #999999;
    font-size: 0.28rem;
  }
	.common-bounced .confirm,.common-bounced .cancel {
    background-color: #FFFFFF;
  }
	.sendnum input[type=text]{
    width: 4.6rem;
  }
	.sendnum .name {
    position: relative;
  }
	.sendnum .name img {
    position: absolute;
    width:1.7rem;
    right: 0.3rem;
    bottom: 0.3rem;
    height: .95rem;
  }
	.send-input input{
    background-color: #f5f5f5;
    padding: 0.3rem;
    text-align: left;
    width: 4.2rem;
    border-radius: 0;
  }
</style>


