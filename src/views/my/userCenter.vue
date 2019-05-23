<template>
  <!--个人中心界面-->
  <div class="my-page">
    <!--上半部分-->
    <div class="my-page__top">
      <div class="my-page__top__2">
        <label class="my-page__top__2__img"><img src="./images/company.png" class="my-page__top__2__img__info"></label>
      </div>
      <div class="my-page__top__3">
        <label class="my-page__top__3__comp">{{ loginOrRegObj.enterpriseName }}</label>
      </div>
      <div class="my-page__top__4">
        <label class="my-page__top__4__num">{{ loginOrRegObj.socialCreditCode }}</label>
      </div>
    </div>
    <show-detail-render :form-data="formData" :list="displayDetailInfo"></show-detail-render>
    <prompt-alert :is-touch-close='isTouchClose' :content="'请输入平台代码'" :showTitle="'新增平台'" v-if="!isTouchClose">
      <div slot="prompt-content" class="my-page__alert">
        <label>请输入平台代码</label>
        <input slot="input-slot">
      </div>
      <div slot="prompt-btn" class="my-page__btn">
        <button class="primary-button btn-bg-white my-page__btn__cancelbtn" @click="cancel">取消</button>
        <button class="primary-button btn-bg-white my-page__btn__confirmbtn" @click="confirm">确定</button>
      </div>
    </prompt-alert>
  </div>
</template>

<script>
  import ShowDetailRender from '../../components/detailListRender/detailRender'
  import PromptAlert from '@/components/promptalert'
  import Myinput from '@/components/myinput'
  import Selection from '@/components/selection'
  import homeMixin from '@/mixin/homeMixin'
  import { mapGetters } from 'vuex'

  export default {
    mixins: [homeMixin],
    data () {
      return {
        formData: {
          currentPlatform: '四联化工'
        },
        displayDetailInfo: [
          {
            label: '当前渠道平台',
            model: 'currentPlatform',
            render: (h, { value, column, index }) => {
              return h('span', {
                'class': {
                  'right-text': true
                },
                on: {
                  click: () => {
                  }
                }
              }, [value])
            }
          },
          {
            label: '修改密码',
            model: 'modifyPwd',
            render: (h, { value, column, index }) => {
              return h('span', {
                'class': {
                  'right-text': true
                },
                on: {
                  click: () => {
                    this.$router.push({
                      name: 'modifyPwd',
                      params: {
                        enterpriseName: this.loginOrRegObj.enterpriseName
                      }
                    })
                  }
                }
              }, ['', h('span', {
                'class': {
                  'arrow-right': true
                }
              })
              ])
            }
          },
          {
            label: '关于我们',
            model: 'aboutUs',
            render: (h, { value, column, index }) => {
              return h('span', {
                'class': {
                  'right-text': true
                },
                on: {
                  click: () => {
                    this.$router.push({name: 'aboutUs'})
                  }
                }
              }, ['', h('span', {
                'class': {
                  'arrow-right': true
                }
              })
              ])
            }
          }
        ],
        filed: {
          label: '手机号码1',
          type: 'text',
          value: '123456'
        },
        title: '测试title',
        massgae: 'message111',
        promptShow: false,
        smsVer: {
          isSendDisable: false,
          props: {
            label: '验证码',
            type: 'tel',
            placeholder: '请填写短信验证码',
            value: '',
            isBorder: false
          },
          model: 'verifyCode'
        },
        isSwitch: false,
        email: null,
        phone: null,
        phone1: null,
        selectionCard: {
          props: {
            title: '',
            defaultVal: '',
            selectType: 'term',
            isShowSelect: false,
            isTriggerClick: true,
            isBorder: false,
            label: 'label',
            value: 'value',
            validOff: false,
            isNeedValue: true,
            list: [
              {
                label: '四联化工',
                value: '01'
              },
              {
                label: '上海化交',
                value: '02'
              },
              {
                label: '新增平台',
                value: '03'
              }
            ]
          },
          model: 'bankCode'
        },
        isTouchClose: false,
        list: [
          {
            label: '工商银行',
            value: '01'
          }
        ]
      }
    },
    computed: {
      ...mapGetters([
        'loginOrRegObj'  // 拿到社会信用代码和企业名称
      ])
    },
    methods: {
      mySection () {
        this.eventBus.$emit('promptAlert/show')
      },
      cancel () {
        this.isTouchClose = true
      },
      confirm () {
        this.isTouchClose = true
      }
    },
    components: {
      PromptAlert,
      Myinput,
      Selection,
      ShowDetailRender
    },
    mounted () {
      this.eventBus.$on('confirm/ok', this.test)
    },
    destroyed () {
      this.eventBus.$off('confirm/ok')
    }
  }
</script>

<style lang="scss">
  /*<!--个人中心界面-->*/
  .my-page {
    /*<!--顶部内容-->*/
    &__top{
      display: flex;
      flex-flow:column;
      background: linear-gradient(to top right, #B29668, #B8A584);
      color: #FFFFFF;
      margin-bottom:0.20rem;
      &__1{
        display: flex;
        margin-top: 0.6rem;
        justify-content:center;
        position:relative;
        &__my{
          font-size:0.36rem;
          text-align: center;
          font-family: PingFangSC-Light, sans-serif;
          letter-spacing:0.06rem;
          line-height: 0.2rem;
          position: absolute;
        }
        &__login{
          font-size: 0.24rem;
          font-family: PingFangSC-Light, sans-serif;
          letter-spacing:0.06rem;
          position:absolute;
          right:0.15rem;
        }
      }
      &__2{
        display: flex;
        margin-top: 0.6rem;
        &__img{
          width: 100%;
          text-align: center;
          &__info{
            width:1.76rem ;
            height:1.76rem ;
          }
        }
      }
      &__3{
        display: flex;
        text-align: center;
        &__comp{
          font-size:0.36rem;
          width: 100%;
          text-align: center;
          margin-top: 0.3rem;
        }
      }
      &__4{
        display: flex;
        &__num{
          font-size:0.24rem;
          width: 100%;
          text-align: center;
          margin: .2rem 0 .7rem 0;
        }
      }

    }
    /*<!--弹窗内容-->*/
    &__alert{
      padding: .3rem .4rem .4rem .4rem;
      input{
        width: 100%;
        height: 0.7rem;
        margin-top: 0.2rem;
        text-align: right;
        border-style:none none solid none;
        border-width: 0px 0px 0.2px 0px ;
        border-color: #666666;
        color: #333333;
      }
      label{
        font-size: 0.28rem;
        color: #333333;
      }
    }
    &__btn{
      display: flex;
      flex: 1;
      border-style:solid none none none;
      border-width: 0.2px 0px 0px 0px ;
      border-color: #DDDDDD;
      background: white;
      &__cancelbtn{
        flex: 1;
        border: none;
        letter-spacing: 0.04rem;
        background: white;
      }
      &__confirmbtn{
        flex: 1;
        border: none;
        color: #A88E6F;
        letter-spacing: 0.04rem;
        background: white;
      }
    }
    .detail-render-component {
       .item:last-child{
          margin-top: .3rem;
       }
       .item:nth-child(2)::after{
          border-bottom: none
       }
       .item:nth-child(3)::after{
          border-bottom: none
       }
    }
  }
</style>
