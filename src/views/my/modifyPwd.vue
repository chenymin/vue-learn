<template>
  <!--修改密码-界面-->
  <div class="login-common resetpwd-page">
    <div class="login-common__vh-height">
      <img @click="returnBack" class="login-common__back" src="./images/icon_back.png" alt="">
      <img class="login-common__bg" src="./images/bg_start.png" alt="">
      <h1 class="login-common__modifypwd-h1">修改密码</h1>
      <h2 class="login-common__h2">{{ enterpriseName }}</h2>
      <div class="form-wrap login-common__form-wrap resetpwd-page__form-wrap">
        <my-input
          placeholder="原密码"
          :type="pwdInputType"
          v-model="form.oldPw"
          name="oldPw"
          v-validate="'required|pwd'"
          data-vv-as="原密码"
          :maxlength="maxlength"
          :error="errors.first('oldPw')">
          <img v-if="pwdeyeVisible===true" slot="input-slot" src="./images/eye_open.png" alt="" @click="clickEyeFun('pwd')">
          <img v-else slot="input-slot" src="./images/eye_close.png" alt="" @click="clickEyeFun('pwd')">
        </my-input>
        <my-input
          placeholder="重设登录密码"
          :type="newPwdInputType"
          v-model="form.newPw"
          name="newPw"
          v-validate="'required|pwd|nocharacters'"
          data-vv-as="重设登录密码"
          :maxlength="maxlength"
          :error="errors.first('newPw')">
          <img v-if="newPwdeyeVisible===true" slot="input-slot" src="./images/eye_open.png" alt="" @click="clickEyeFun('newPwd')">
          <img v-else slot="input-slot" src="./images/eye_close.png" alt="" @click="clickEyeFun('newPwd')">
        </my-input>
        <p class="resetpwd-page__form-wrap__ptip">8~16位字母、数字、符号两种或以上组合</p>
        <button class='primary-button login-common__form-wrap__btn' @click.prevent="nextFun">确定</button>
      </div>
    </div>
    <my-footer></my-footer>
  </div>
</template>

<script>
  import MyFooter from '@/components/base/footer'
  import MyInput from '@/components/myinput'

  export default {
    data () {
      return {
        pwdeyeVisible: false,  // 通过眼睛icon控制密码的显示与隐藏
        newPwdeyeVisible: false,  // 通过眼睛icon控制密码的显示与隐藏
        pwdInputType: 'password',  // 页面密码input的type类型
        newPwdInputType: 'password',  // 页面密码input的type类型
        form: {
          oldPw: null,  // 原密码
          newPw: null // 重设的登录密码
        },
        enterpriseName: '',  // 企业名称
        maxlength: 16  // 密码输入框输入的最大长度
      }
    },
    methods: {
      clickEyeFun (typeVal) {  // 点击眼睛icon的事件
        if (typeVal === 'pwd') {
          this.pwdeyeVisible = !this.pwdeyeVisible
          this.pwdeyeVisible === false ? this.pwdInputType = 'password' : this.pwdInputType = 'text'
        }
        if (typeVal === 'newPwd') {
          this.newPwdeyeVisible = !this.newPwdeyeVisible
          this.newPwdeyeVisible === false ? this.newPwdInputType = 'password' : this.newPwdInputType = 'text'
        }
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
          Object.assign(params, this.form)
          this.$store.dispatch('modifyP', params).then(({data, respCode}) => {
            if (respCode === '000000') {
              this.showToast('修改密码成功')
              this.$router.push('/home/my')
            }
          })
        })
      },
      returnBack () {  // 返回
        window.history.go(-1)
      },
      showToast (msg) {  // toast提示
        this.$store.commit('changeToast', {content: msg})
        this.eventBus.$emit('toast/show')
      }
    },
    components: {
      MyFooter,
      MyInput
    },
    mounted () {
      this.enterpriseName = this.$route.params.enterpriseName
    }
  }
</script>

<style lang="scss">
  @import '../../scss/var.scss';
  .login-common {
    background: #fff;
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
    &__modifypwd-h1 {
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
      .form-filed {
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
