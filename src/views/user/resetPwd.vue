<template>
    <div class="login-common resetpwd-page">
      <div class="login-common__vh-height">
        <img @click="returnBack" class="login-common__back" src="./components/images/icon_back.png" alt="">
        <img class="login-common__bg" src="./components/images/bg_start.png" alt="">
        <h1 class="login-common__resetpwd-h1">密码找回</h1>
        <h2 class="login-common__h2">{{ enterpriseName }}</h2>
        <div class="form-wrap login-common__form-wrap resetpwd-page__form-wrap">
          <my-input
            placeholder="重设登录密码"
            :type="pwdInputType"
            v-model="pw"
            name="pw"
            v-validate="'required|pwd|nocharacters'"
            data-vv-as="登录密码"
            :maxlength="maxlength"
            :error="errors.first('pw')">
            <img v-if="eyeVisible===true" slot="input-slot" src="./components/images/eye_open.png" alt="" @click="clickEyeFun('text')">
            <img v-else slot="input-slot" src="./components/images/eye_close.png" alt="" @click="clickEyeFun('pwd')">
          </my-input>
          <p class="resetpwd-page__form-wrap__ptip">8~16位字母、数字、符号两种或以上组合</p>
          <button type="submit" class='primary-button login-common__form-wrap__btn' @click.prevent="nextFun">确定</button>
        </div>
      </div>
      <my-footer></my-footer>
    </div>
</template>

<script>
import MyFooter from '@/components/base/footer'
import MyInput from '@/components/myinput'
import {decrypt} from '@/utils/encryption/aesEncryptUtil'
import {getStore, removeStore} from '@/utils/storage'
export default {
  data () {
    return {
      eyeVisible: false,  // 通过眼睛icon控制密码的显示与隐藏
      pwdInputType: 'password',  // 页面密码input的type类型
      pw: null,
      enterpriseName: null,  // 企业名称
      findpwdObj: {},  // 找回密码信息对象
      maxlength: 16  // 密码输入框输入的最大长度
    }
  },
  methods: {
    clickEyeFun (typeVal) {  // 点击眼睛icon的事件
      this.eyeVisible = !this.eyeVisible
      typeVal === 'pwd' ? this.pwdInputType = 'text' : this.pwdInputType = 'password'
    },
    nextFun () {  // 下一步按钮
      this.$validator.validateAll().then((validateResult) => {
        if (!validateResult) {  // 校验不通过，展示错误消息，跳出函数
          const {msg} = this.$validator.errors.items[0]
          this.$store.commit('changeToast', {content: msg})
          this.eventBus.$emit('toast/show')
          return false
        }
        let params = {}
        Object.assign(params, this.findpwdObj)
        params.pw = this.pw
        this.$store.dispatch('EntResetP', params).then(({data, respCode}) => {
          if (respCode === '000000') {
            removeStore('findPwdObj')
            this.$router.push({
              name: 'login',
              params: {
                whichPage: '2'
              }
            })
          }
        })
      })
    },
    getInitData () {
      let paramsObj = getStore('findPwdObj') && JSON.parse(decrypt(getStore('findPwdObj')))
      this.findpwdObj = paramsObj
      this.enterpriseName = paramsObj && paramsObj.enterpriseName
    },
    returnBack () {  // 返回
      // window.history.go(-1)
      this.$router.push({
        name: 'findpwd'
      })
    }
  },
  components: {
    MyFooter,
    MyInput
  },
  mounted () {
    this.getInitData()
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
  &__resetpwd-h1 {
    font-size: .56rem;
    padding: 2.2rem 0 0 .56rem;
  }
  &__h2 {
      font-size: $primary-font-size;
      font-weight: normal;
      color: #666;
      padding: .16rem .56rem;
  }
  &__form-wrap {
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
      margin: .5rem auto 0;
      box-shadow: 0 .06rem .2rem #DBCFBF;
    }
  }
}
.resetpwd-page {
  &__form-wrap {
    .input-comp {
      margin-top: .5rem
    }
    &__ptip {
      font-size: .22rem;
      color: #999;
      padding: .2rem .6rem;
    }
  }
}
</style>
