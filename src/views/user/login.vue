<template>
    <div class="login-common">
      <div class="login-common__vh-height">
        <img @click="returnBack" v-if="whichPage==='2'" class="login-common__back" src="./components/images/icon_back.png" alt="">
        <img class="login-common__bg" src="./components/images/bg_start.png" alt="">
        <img class="login-common__logo"src="./components/images/fosun_logo.png" alt="">
        <h2 class="login-common__h2" v-if="whichPage==='1'">供应链金融 FinTech 服务平台</h2>
        <h2 class="login-common__h2" v-if="whichPage==='2'">{{ loginObj.enterpriseName }}</h2>
        <div class="form-wrap login-common__form-wrap">
            <my-input
              v-show="whichPage==='1'"
              placeholder="统一社会信用代码"
              type="text"
              v-model="loginObj.socialCreditCode"
              name="socialCreditCode"
              v-validate="'required'"
              data-vv-as="统一社会信用代码"
              :error="errors.first('socialCreditCode')">
            </my-input>
            <my-input
              v-show="whichPage==='2'"
              placeholder="登录密码"
              :type="pwdInputType"
              v-model="loginObj.pw"
              name="pwd"
              v-validate="'required|pwd'"
              data-vv-as="登录密码"
              :error="errors.first('pwd')">
              <img v-if="eyeVisible===true" slot="input-slot" src="./components/images/eye_open.png" alt="" @click="clickEyeFun('text')">
              <img v-else slot="input-slot" src="./components/images/eye_close.png" alt="" @click="clickEyeFun('pwd')">
            </my-input>
            <button type="submit" class='primary-button login-common__form-wrap__btn' @click.prevent="nextFun(whichPage)">{{whichPage==='1'?'下一步':'登录'}}</button>
            <p class="login-common__form-wrap__rlink" @click="forgetPwdFun" v-if="whichPage==='2'">忘记密码</p>
        </div>
      </div>
      <my-footer></my-footer>
    </div>
</template>

<script>
import MyFooter from '@/components/base/footer'
import MyInput from '@/components/myinput'
import {setStore, removeStore} from '@/utils/storage'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      whichPage: '1',  // 根据这个字段判断显示哪个页面，1表示统一社会信用代码  2表示显示登录密码页面
      eyeVisible: false,  // 通过眼睛icon控制密码的显示与隐藏
      pwdInputType: 'password',  // 登录密码页面input的type类型
      loginObj: {
        socialCreditCode: null,  // 统一社会信用代码
        pw: null,  // 登录密码
        enterpriseName: null,  // 企业名称
        terminalType: 'wap'
      },
      tokenId: null,
      channelPlatformNo: null,  // 渠道平台编号
      methodsObj: {  // 两个页面的按钮提交，执行不同的函数，定义一个对象放这两个函数
        1: this.pageFun1,
        2: this.pageFun2
      },
      applyIsExist: false  // 是否存在额度申请
    }
  },
  methods: {
    clickEyeFun (typeVal) {  // 点击眼睛icon的事件
      this.eyeVisible = !this.eyeVisible
      typeVal === 'pwd' ? this.pwdInputType = 'text' : this.pwdInputType = 'password'
    },
    pageFun1 () {  // 统一社会信用代码按钮提交事件
      this.$validator.validate('socialCreditCode', this.loginObj.socialCreditCode).then((validateResult) => {
        if (!validateResult) {  // 校验不通过，展示错误消息，跳出函数
          const {msg} = this.$validator.errors.items[0]
          this.$store.commit('changeToast', {content: msg})
          this.eventBus.$emit('toast/show')
          return
        }
        this.$store.dispatch('LoginOrRegister', {socialCreditCode: this.loginObj.socialCreditCode.replace(/\s/g, '')}).then(({data, respCode}) => {
          if (respCode === '000000') {
            this.loginObj.enterpriseName = data.enterpriseName
            if (data.loginOrRegisterFlag === '01') {  // 01表示登录，02表示注册
              this.whichPage = '2'
            } else if (data.loginOrRegisterFlag === '02') {
              this.$router.push({
                name: 'register'
              })
            }
          }
        })
      })
    },
    pageFun2 () {  // 登录密码按钮提交事件
      // vee-validate单个校验的写法
      this.$validator.validate('pwd', this.loginObj.pw).then((validateResult) => {
        if (!validateResult) {  // 校验不通过，展示错误消息，跳出函数
          const {msg} = this.$validator.errors.items[0]
          this.$store.commit('changeToast', {content: msg})
          this.eventBus.$emit('toast/show')
          return
        }
        let params = {}
        Object.assign(params, this.loginObj)
        this.$store.dispatch('EntLogin', params).then(({data, respCode}) => {
          if (respCode === '000000') {
            this.tokenId = data.tokenId
            this.channelPlatformNo = data.channelPlatformNo
            setStore('token', this.tokenId)
            this.$router.replace({
              path: '/home/noApply'
            })
          }
        })
      })
    },
    nextFun (prmWhichpage) {  // 按钮提交
      this.methodsObj[prmWhichpage]()
    },
    forgetPwdFun () {  // 忘记密码
      let params = {}
      Object.assign(params, this.loginObj)
      this.$store.dispatch('QueryIsExistApply', params).then(({data, respCode}) => {
        if (respCode === '000000') {
          this.applyIsExist = data.applyIsExist
          this.$router.push({
            name: 'findpwd',
            params: {
              'applyIsExist': this.applyIsExist
            }
          })
        }
      })
    },
    getRedirectPath () {  // 判断客户是直接到登录页面还是因为没有登录重定向过来的,如果是重定向过来的，登录
      let redirectPath = decodeURIComponent(this.$route.query.redirect || '/')    // 成功后就必须调回被重定向过来的页面
      setStore('redirectPath', redirectPath)
    },
    returnBack () {  // 从登录密码页面点击返回
      this.whichPage = '1'
    },
    getSocialCodeFromLocalStorage () {  // 用户输入社会信用代码后存到localstorage里然后下次从里面拿，不用用户再次输入
      Object.assign(this.loginObj, this.loginOrRegObj)
    },
    goPageByWhichpage () {
      if (this.$route.params.whichPage) this.whichPage = this.$route.params.whichPage
    }
  },
  computed: {
    ...mapGetters([
      'loginOrRegObj'
    ])
  },
  components: {
    MyFooter,
    MyInput
  },
  mounted () {
    this.goPageByWhichpage()
    this.getRedirectPath()
    this.getSocialCodeFromLocalStorage()
  },
  destroyed () {  // 作用是防止上传材料页面勾选协议勾选中的localstorage没有清除，默认会给第二次登录或者第二个客户勾选上。
    removeStore('chbAndsTimeObj')  // 这样重新登录到上传材料页面始终保持是没有勾选
  }
}
</script>

<style lang="scss" scoped>
@import '../../scss/var.scss';
.login-common {
    background: #fff;
    position: absolute;
    left:0;
    top: 0;
    right: 0;
    bottom: 0;
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
    &__h2 {
        font-size: $primary-font-size;
        font-weight: normal;
        color: #666;
        padding: .16rem .56rem;
    }
    &__form-wrap {
    /deep/  .input-comp {
        margin: .6rem 0 .8rem;
      }
    /deep/  .form-filed {
        padding: 0 .56rem;
        &::after {
          width: 84%;
          left: .56rem;
        }
      }
      &__btn {
        display: block;
        width: 84%;
        margin: 0 auto;
        box-shadow: 0 .06rem .2rem #DBCFBF;
        margin-bottom: .4rem;
      }
      &__rlink {
        font-size: $normal-font-size;
        color: #666;
        text-align: center;
        margin-bottom: .4rem;
      }
      .form__error {
        padding: 0 .6rem!important;
      }
    }
}
</style>
