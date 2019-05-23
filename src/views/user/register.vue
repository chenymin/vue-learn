<template>
    <div class="login-common">
      <div class="login-common__vh-height">
        <img @click="returnBack" class="login-common__back" src="./components/images/icon_back.png" alt="">
        <img class="login-common__bg" src="./components/images/bg_start.png" alt="">
        <img class="login-common__logo"src="./components/images/fosun_logo.png" alt="">
        <div class="form-wrap login-common__form-wrap">
            <my-input 
              placeholder="企业名称"
              type="text"
              v-model="form.enterpriseName"
              name="enterpriseName"
              v-validate="'required'"
              data-vv-as="企业名称"
              :maxlength="enNameLength"
              :error="errors.first('enterpriseName')">
            </my-input>
            <my-input 
              placeholder="企业法定代表人姓名"
              type="text"
              v-model="form.legalPersonName"
              name="legalPersonName"
              v-validate="'required|chineseAndLetter'"
              data-vv-as="企业法定代表人姓名"
              :error="errors.first('legalPersonName')">
            </my-input>
            <my-input 
              placeholder="企业法定代表人身份证号"
              type="text"
              v-model="form.legalPersonIdNo"
              name="legalPersonIdNo"
              v-validate="'required|idCard'"
              data-vv-as="企业法定代表人身份证号"
              :error="errors.first('legalPersonIdNo')">
            </my-input>
            <my-input
              placeholder="设置登录密码"
              :type="pwdInputType"
              v-model="form.pw"
              name="pw"
              v-validate="'required|pwd'"
              data-vv-as="登录密码"
              :maxlength="maxlength"
              :error="errors.first('pw')">
              <img v-if="eyeVisible===true" slot="input-slot" src="./components/images/eye_open.png" alt="" @click="clickEyeFun('text')">
              <img v-else slot="input-slot" src="./components/images/eye_close.png" alt="" @click="clickEyeFun('pwd')">
            </my-input>
            <p class="login-common__form-wrap__pwdtips">8～16位字母、数字、符号两种或以上组合</p>
            <my-input 
              placeholder="渠道平台编号"
              type="text"
              v-model="form.channelPlatformNo"
              name="channelPlatformNo"
              v-validate="'required'"
              data-vv-as="渠道平台编号" 
              @blur="getChannelPlatformlName"
              :error="errors.first('channelPlatformNo')">
              <div class="register__channel-num__right-div" slot="input-slot">
                <span>{{ this.channelPlatformlName }}</span>
                <img src="./components/images/icon_tips.png" alt="" @click="tipsFun">
              </div>
            </my-input>
            <!-- <protocol 
              :items="protocolData.items"
              v-model="protocolCode"
              v-validate="'checkboxChecked'"
              name="checkboxChecked"
              :error="errors.first('checkboxChecked')">
              </protocol> -->
            <button type="submit" class='primary-button login-common__form-wrap__btn'  @click.prevent="registerFun">注册</button>
        </div>
      </div>
      <my-footer></my-footer>
      <promptalert 
        showTitle="温馨提示"
        content="渠道平台编号请联系您的平台信贷经理获取">
      </promptalert>
    </div>
</template>

<script>
import MyFooter from '@/components/base/footer'
import MyInput from '@/components/myinput'
import Protocol from '@/components/protocol'
import Promptalert from '@/components/promptalert'
import { mapGetters, mapActions } from 'vuex'
import {setStore} from '@/utils/storage'

export default {
  data () {
    return {
      eyeVisible: false,  // 通过眼睛icon控制密码的显示与隐藏
      pwdInputType: 'password',  // 页面密码input的type类型
      form: {
        socialCreditCode: null,  // 统一社会信用代码
        enterpriseName: null,  // 企业名称
        legalPersonName: null,  // 法人姓名
        legalPersonIdNo: null,  // 身份证号
        pw: null,  // 登陆密码
        channelPlatformNo: null  // 渠道平台编号
      },
      channelPlatformlName: '',  // 渠道平台的中文名称
      enNameLength: 60,  // 企业名称可以输入的最大长度
      maxlength: 16  // 密码输入框输入的最大长度
      // protocolData: {
      //   items: [
      //     {
      //       protocol: '《平台注册协议》',
      //       path: ''
      //     }
      //   ]
      // },
      // protocolCode: '0'  // 协议复选框是否勾选，0表示没有勾选，1表示勾选
    }
  },
  computed: {
    ...mapGetters([
      'loginOrRegObj'
    ])
  },
  methods: {
    ...mapActions([
      'queryChannelName',
      'EntLogin'  // 登录的action
    ]),
    clickEyeFun (typeVal) {  // 点击眼睛icon的事件
      this.eyeVisible = !this.eyeVisible
      typeVal === 'pwd' ? this.pwdInputType = 'text' : this.pwdInputType = 'password'
    },
    tipsFun () {  // 渠道平台编号icon的弹框
      this.eventBus.$emit('promptAlert/show')
    },
    registerFun () {  // 注册按钮
      this.$validator.validateAll().then((validateResult) => {
        if (!validateResult) {  // 校验不通过，展示错误消息，跳出函数
          const {msg} = this.$validator.errors.items[0]
          this.$store.commit('changeToast', {content: msg})
          this.eventBus.$emit('toast/show')
          return false
        }
        let params = Object.assign({}, this.form, {socialCreditCode: this.loginOrRegObj.socialCreditCode})
        this.$store.dispatch('EntRegister', params).then(({respCode}) => {
          if (respCode === '000000') {
            // 注册成功后把信用代码和企业名称赋值到store里的state.loginOrRegObj
            let data = {'enterpriseName': this.form.enterpriseName, 'socialCreditCode': params.socialCreditCode}
            this.$store.commit('LOGIN_OR_REGISTER', {data})
            //  注册成功后跳转到输入登录密码页面（可以暂留，防止后面又让改回来）
            // this.$router.push({
            //   name: 'login',
            //   params: {
            //     whichPage: '2'
            //   }
            // })
            // 注册成功后跳转到首页
            let loginParams = {'socialCreditCode': this.loginOrRegObj.socialCreditCode, 'enterpriseName': this.form.enterpriseName, 'pw': this.form.pw, 'terminalType': 'wap'}
            this.EntLogin(loginParams).then(data => {
              if (data.respCode === '000000') {
                setStore('token', data.data.tokenId)
                this.showToast('注册成功')
                this.$router.push('/home/noApply')
              }
            })
          }
        })
      })
    },
    returnBack () {  // 返回
      this.$router.push({
        name: 'login'
      })
    },
    getChannelPlatformlName () {  // 获取渠道名称
      if (this.form.channelPlatformNo) {
        let params = {channelPlatformNo: this.form.channelPlatformNo}
        this.queryChannelName(params).then(({data, respCode}) => {
          if (respCode === '000000') {
            this.channelPlatformlName = data.channelPlatformName
          }
        })
      }
    },
    showToast (msg) {  // toast提示
      this.$store.commit('changeToast', {content: msg})
      this.eventBus.$emit('toast/show')
    }
  },
  components: {
    MyFooter,
    MyInput,
    Protocol,  // 协议组件
    Promptalert  // 弹框组件
  },
  mounted () {
    this.form.socialCreditCode = this.$route.params.socialCreditCode
    this.form.enterpriseName = this.$route.params.enterpriseName
  }
}
</script>

<style lang="scss" scoped>
@import '../../scss/var.scss';
.login-common {
    background: #fff;
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    top: 0;
    &__vh-height {
      height:calc(100vh - 1rem);
      overflow-y: scroll;
    }
    &__back {
      position: absolute;
      left: 0.3rem;
      top: 0.3rem;
      width: 0.18rem;
    }
    &__bg {
      width: 4.98rem;
      height: 3.48rem; 
      position: absolute;
      top: 0;
      right: 0;
    }
    &__logo {
        width: 2.8rem;
        height: .56rem;
        margin: 2.2rem 0 0 .56rem;
    }
    &__form-wrap {
    /deep/ .input-comp {
        margin: .05rem 0;
      }
    /deep/ .form-filed {
        padding: 0 .56rem;
        &::after {
          width: 84%;
          left: .56rem;
        }
      }
      &__btn {
        display: block;
        width: 84%;
        margin: 0.6rem auto;
        box-shadow: 0 .06rem .2rem #DBCFBF;
      }
      .form__error {
        padding: 0 .6rem!important;
      }
    }
  .login-common__form-wrap__pwdtips {
    font-size: .2rem;
    color: #999;
    padding: 0 0 0 0.6rem;
  }
  .protocol {
    padding-left: 0.6rem!important;
  }
  .protocol .text-color {
      color: #599CCC!important;  
  }
  .prompt-alert .content-text {
    width: 3.4rem;
    margin: 0 auto;
  }
  .register__channel-num__right-div {
    line-height: 0.8rem;
    span {
      font-size: 0.32rem;
      color: #aaa;
      position: relative;
      top: -0.1rem;
    }
  }
}
</style>
