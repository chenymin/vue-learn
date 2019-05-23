<template>
  <div class="login-common resetpwd-page">
    <div class="login-common__vh-height">
      <img @click="returnBack" class="login-common__back" src="./components/images/icon_back.png" alt="">
      <img class="login-common__bg" src="./components/images/bg_start.png" alt="">
      <h1 class="login-common__findpwd-h1">密码找回</h1>
      <h2 class="login-common__h2" v-cloak>{{ form.enterpriseName }}</h2>
      <div class="form-wrap login-common__form-wrap">
          <my-input
            class="login-common__form-wrap__mt20" 
            placeholder="企业法定代表人姓名"
            type="text"
            v-model="form.legalPersonName"
            name="legalPersonName"
            v-validate="'required'"
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
          <div v-if="whichPage === '2'">
            <!-- <selection v-bind="selectionCard.props" v-model="selectionCard.model"></selection>
            <my-input 
              placeholder="银行卡号"
              type="text"
              v-model="form.bankCardNo"
              name="bankCardNo"
              v-validate="'required'"
              data-vv-as="银行卡号"
              :error="errors.first('bankCardNo')">
            </my-input> -->
            <my-input 
              placeholder="银行预留手机号"
              type="text"
              v-model="form.bankPhoneNo"
              name="bankPhoneNo"
              v-validate="'required|phone'"
              data-vv-as="银行预留手机号"
              :maxlength="phoneMaxLength"
              :error="errors.first('bankPhoneNo')">
            </my-input>
            <smsverification 
              v-model="form.smsCode"
              :mobile="form.bankPhoneNo"
              :is-send-disable="isSendDisable"
              placeholder="验证码"
              :paramsObj="smsParamsObj"
              :interfaceUrl ="smsInterfaceUrl"
              name="smsCode"
              v-validate="'required'" 
              data-vv-as="验证码"
              :maxlength="smsMaxLength"
              ref='smscodeEle'
              :error="errors.first('smsCode')">
              </smsverification>
          </div>
          <my-input
            placeholder="重设登录密码"
            :type="pwdInputType"
            v-model="form.pw"
            name="pw"
            v-validate="'required|pwd|nocharacters'"
            data-vv-as="重设登录密码"
            :maxlength="pwMaxlength"
            :error="errors.first('pw')">
            <img v-if="eyeVisible===true" slot="input-slot" src="./components/images/eye_open.png" alt="" @click="clickEyeFun('text')">
            <img v-else slot="input-slot" src="./components/images/eye_close.png" alt="" @click="clickEyeFun('pwd')">
          </my-input>
          <p class="resetpwd-page__ptip">8~16位字母、数字、符号两种或以上组合</p>
          <button type="submit" class='primary-button login-common__form-wrap__btn' @click.prevent="nextFun">下一步</button>
      </div>
    </div>
    <my-footer></my-footer>
  </div>
</template>

<script>
import MyFooter from '@/components/base/footer'
import MyInput from '@/components/myinput'
import Selection from '@/components/selection'
import Smsverification from '@/components/smsverification'
import { mapGetters } from 'vuex'
import {validMobile} from '@/utils/util'

export default {
  data () {
    return {
      whichPage: '1',  // 根据这个字段判断显示哪个页面，1表示无法人四要素页面  2表示有法人四要素页面
      eyeVisible: false,  // 通过眼睛icon控制密码的显示与隐藏
      pwdInputType: 'password',  // 页面密码input的type类型
      form: {
        enterpriseName: null,  // 企业名称
        socialCreditCode: null,  // 统一社会信用代码
        legalPersonName: null,  // 法人姓名
        legalPersonIdNo: null,  // 法人身份证号
        // bankCode: null,  // 银行卡开户行code
        // bankCardNo: null,  // 银行卡号
        bankPhoneNo: null,  // 预留手机号
        smsCode: null,  // 短信验证码
        pw: null  // 密码
      },
      // selectionCard: {
      //   props: {
      //     title: '',
      //     defaultVal: '银行卡开户行',
      //     objKey: 'bankName',
      //     objValue: 'bankType',
      //     list: [],
      //     placeholder: '银行卡开户行'
      //   },
      //   model: ''
      // },
      applyIsExist: false,  // 是否存在额度申请,存在额度申请的展示whichpage:2，有四要素的页面。不存在的话没有四要素
      smsInterfaceUrl: '/user/sendResetPSms',  // 找回密码发送短信的接口地址
      smsParamsObj: {},  // 找回密码发送短信调接口需要的参数
      phoneMaxLength: 11,  // 手机号输入框的输入最大长度
      smsMaxLength: 6,  // 验证码输入框的输入最大长度
      isSendDisable: false,
      pwMaxlength: 16  // 密码输入框输入的最大长度
    }
  },
  computed: {
    ...mapGetters([
      'loginOrRegObj',
      'queryIsExistApplyObj'
    ])
  },
  methods: {
    clickEyeFun (typeVal) {  // 点击眼睛icon的事件
      this.eyeVisible = !this.eyeVisible
      typeVal === 'pwd' ? this.pwdInputType = 'text' : this.pwdInputType = 'password'
    },
    getInitData () {  // 获得页面初始的信息
      if (this.$route.params.applyIsExist) { // 从路由里看是否applyIsExist存在，不存在就从localstroage里取
        this.applyIsExist = this.$route.params.applyIsExist
      } else {
        this.applyIsExist = this.queryIsExistApplyObj.applyIsExist
      }
      this.applyIsExist ? this.whichPage = '2' : this.whichPage = '1'
      this.form.socialCreditCode = this.loginOrRegObj.socialCreditCode || ''
      this.form.enterpriseName = this.loginOrRegObj.enterpriseName || ''
      this.smsParamsObj = {
        socialCreditCode: this.form.socialCreditCode,
        enterpriseName: this.form.enterpriseName
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
        this.$store.dispatch('EntResetP', params).then(({data, respCode}) => {
          if (respCode === '000000') {
            this.showToast('重置密码成功')
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
    // getBankList () {  // 获取银行列表
    //   this.$store.dispatch('QueryAllBanksInfo').then(({data, respCode}) => {
    //     if (respCode === '000000') {
    //       this.selectionCard.props.list = data
    //     }
    //   })
    // },
    returnBack () {  // 返回
      this.$router.push({
        name: 'login',
        params: {
          whichPage: '2'
        }
      })
    },
    showToast (msg) {  // toast提示
      this.$store.commit('changeToast', {content: msg})
      this.eventBus.$emit('toast/show')
    }
  },
  components: {
    MyFooter,
    MyInput,
    Selection,
    Smsverification
  },
  watch: {
    'form.bankPhoneNo' (newVal) {
      this.isSendDisable = validMobile(newVal)
    }
  },
  mounted () {
    this.getInitData()
    // 后面可能会用到
    // this.getBankList()
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
  &__findpwd-h1 {
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
      /deep/ .input-comp {
        margin: .05rem 0;
      }
      /deep/ .form-filed {
        padding: 0 .56rem;
        &::after {
          width: 84%;
          left: .56rem;
      }
      /deep/ .arrow-right {
        right: 0.56rem;   
      }
    }
    &__btn {
      display: block;
      width: 84%;
      margin: .5rem auto 0;
      box-shadow: 0 .06rem .2rem #DBCFBF;
    }
    &__rlink {
      font-size: $normal-font-size;
      color: #666;
      text-align: center;
      padding: .4rem 0;
    }
    .form__error {
      padding: 0 .6rem!important;
    }
    .login-common__form-wrap__mt20 {
      margin-top: .2rem;
    }
  }
  .selection-container .form-filed {
    padding: 0 .56rem!important;
  }
  .selection-container .form-filed .label {
    width: 0;
  }
  .selection-container .form-filed .select-com {
    justify-content: flex-start!important;
  }
  .selection-container .form-filed .select-com::after {
    right: 0.8rem!important;
  }
  /deep/ .sms-input-component .sms-code {
    border: 1px solid #5F6381;
    color: #5F6381!important;
    height: .68rem!important;
    line-height: .68rem!important;
    background: #fff!important;
    border-radius: 4px;
    right: .6rem!important;
    top: .1rem!important;
  }
}
.resetpwd-page {
  &__ptip {
    font-size: .22rem;
    color: #999;
    padding: .2rem .6rem;
  }
}
</style>
