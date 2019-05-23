<template>
  <!--星保理额度申请界面-->
  <div class="complete-page">
    <div class="complete-page__top">
      <img class="status-page__top__img" src="./images/agree.png"/>
    </div>
    <div class="complete-page__middle">
      <div class="complete-page__middle__statu" >额度申请已提交</div>
      <div class="complete-page__middle__statudesc">我们将在3个工作日内完成申请审批</div>
    </div>
    <div class="complete-page__bottom">
      <show-detail-render :form-data="formData" :list="displayDetailInfo" class="complete-page__bottom__show"></show-detail-render>
    </div>
    <button class="primary-button btn-top" @click="applyCompleteSubmit">完成</button>
  </div>
</template>

<script>
  import applyCommonMixin from '@/mixin/applyCommonMixin'
  import ShowDetailRender from '@/components/detailListRender/detailRender'

  export default {
    mixins: [applyCommonMixin],
    data () {
      return {
        /**
         * 按钮
         */
        show: false,
        Status: {
          msg: 2
        },
        cinoStatus: {
          0: '待还款',
          1: '已逾期',
          5: '已结清'
        },
        formData: {
          appAmt: '',
          custName: '',
          applyTime: null
        },
        displayDetailInfo: [
          {
            label: '申请额度',
            model: 'appAmt',
            render: (h, { value, column, index }) => {
              const money = value
              return h('span', {
                'class': {
                  'right-text': true
                }
              }, `${money}元`)
            }
          },
          {
            label: '企业名称',
            model: 'custName'
          },
          {
            label: '申请时间',
            model: 'applyTime',
            render: (h, { value, column, index }) => {
              const data = value
              return h('span', {
                'class': {
                  'right-text': true
                }
              }, data)
            }
          }
        ]
      }
    },
    methods: {
      applyCompleteSubmit () {
        this.$router.replace({path: '/home/status'})
      },
      getapplyCompleteInfo () {}
    },
    components: {
      ShowDetailRender
    },
    mounted () {
      this.applyRouter.isShowPageNav = false
      this.applyRouter.myHeaderInfo.url = '/home/status'
      this.formData.custName = this.$route.query.custName
      this.formData.appAmt = this.$route.query.appAmt
      this.formData.applyTime = this.$route.query.applyTime
    }
  }
</script>

<style lang="scss">
  .complete-page{
    background: #FFFFFF;
    display: flex;
    flex-flow: column;
    height: calc(100vh - 1rem);
    &__top{
      margin-top: 1.5rem;
      text-align: right;
      margin-left: 0.6rem;
      margin-right: 0.6rem;
      &__img{
        width: .71rem;
        height: .71rem;
      }
    }
    &__middle{
      margin-top: 0.1rem;
      font-size: 0.28rem;
      margin-left: 0.6rem;
      margin-right: 0.6rem;
      text-align: right;
      color: #666666;
      &__statu{
        font-size: 0.32rem;
        font-weight: bold;
      }
      &__statudesc{
        margin-top: 0.3rem;
        line-height: 0.5rem;
        margin-bottom: 1rem;
      }
    }
    &__bottom{
      background: #F9F9F9;
    }
    &__bottom__show {
       .item {
         background:rgba(249,249,249,1)!important;
       }
       .item:after {
         border-bottom: none!important;
       }
    }
  }
</style>
