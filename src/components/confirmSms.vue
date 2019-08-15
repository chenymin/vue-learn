<template>
  <cover-container :is-touch-close='isTouchClose' ref='coverConfirmDialog' v-model="isShowConfirmDialogue">
    <div class='content-container' slot='cover-slot' v-if="isShowConfirmDialogue">
      <div class='content' >
      	<p class="title" v-if="showTitle">短信验证</p>
        <p class='text' v-if="sentSms">验证码已发送至手机 {{phoneNo | formatPhone}}，请查收</p>
        <sms-verification :placeholder="'输入短信验证码'" :is-send-disable="isPhoneNo" v-model="smsTxt" class="confirmSms"></sms-verification>
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
import {validMobile} from '@/utils/util'
import {formatPhone} from '@/utils/filters'
import SmsVerification from '@/components/smsverification'
import CoverContainer from './base/cover'

export default {
  data () {
    return {
      isShowConfirmDialogue: this.isShow,
      sentSms: true,
      isPhoneNo: true,
      smsTxt: null
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
    phoneNo: {
      type: String,
      default: '13666666666'
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
      this.$emit('confirmSms-ok')
    },
    cancleModal () {
      this.isShowConfirmDialogue = false
      this.$emit('confirmSms-cancle')
    },
    showCofirm  () {
      this.isShowConfirmDialogue = true
    }
  },
  filters: {
    formatPhone: formatPhone
  },
  components: {
    SmsVerification,
    CoverContainer
  },
  mounted () {
    this.isPhoneNo = validMobile(this.phoneNo)
    this.eventBus.$on('confirmSms/show', this.showCofirm)
    this.eventBus.$on('confirmSms/hidden', this.cancleModal)
  },
  destroyed () {
    this.eventBus.$off('confirmSms/show')
    this.eventBus.$off('confirmSms/hidden')
  }
}
</script>

<style lang='scss'>
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
			padding-top: 0.3rem;
    }
    .text {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.26rem;
      color: #949494;
      padding: 0.3rem;
    }
    .confirmSms {
    	.input-component {
    		padding: 0 0.38rem 0.3rem;
    		.form-filed {
    			position: relative;
          display: flex;
          .input {
            height: 0.6rem;
            width: calc(100% - 2rem);
            font-size: 0.24rem;
            padding-left:0.2rem;
            border: 1px solid rgba(151,151,151,.6);
          }
          .sms-code {
            position: relative;
            margin-top: 0;
          	height: 0.6rem;
				    width: 2rem;
            right: 0;
				    background-color: #f5f5f5;
				    font-size: 0.28rem;
				    color: #999;
            border-radius: 0;
            border: 1px solid rgba(151, 151, 151, 0.6);
            border-left: none;
          }
    		}
    	}
    }
    .btn-group {
      display: flex;
      .button-common {
        flex: 1;
        height: 0.9rem;
        border-top: 1px solid #eee;
        font-size: 0.3rem;
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


