<template>
  <div class="borrow-detail-page">
  	<my-header :title="myHeaderInfo.title" :is-middle="myHeaderInfo.isMiddle" ></my-header>
    <prompt-alert class="detail-alert" v-bind="promptAlertInfo[promptDefault]">
      <div class="" slot="prompt-content" v-if="promptDefault === '01'">
      	<repayment-info :repaymentInfo="borrowDetailDatas"></repayment-info>
      	 <p class="borrow-detail-page__totals">
        	<span class="borrow-detail-page__totals__label">总计(元)</span>
          <span class="borrow-detail-page__totals__label borrow-detail-page__totals__label-right">{{borrowDetailDatas.unpaySum | formatMoney}}</span>
        </p>
      </div>
    </prompt-alert>
    <p class="borrow-detail-page__img-logo">
    	<img class="borrow-detail-page__img-logo__img" src="./components/images/detail-logo.png" alt=""/>
    </p>
    <detail-amount-des @show-alert="showPromptalert" :borrowDetailInfo="borrowDetailDatas"></detail-amount-des>
    <show-detail-render :form-data="borrowDetailDatas" :list="displayDetailInfo"></show-detail-render>
  </div>
</template>

<script>
  import MyHeader from '@/components/header'
  import PromptAlert from '@/components/promptalert'
  import ShowDetailRender from '@/components/detailListRender/detailRender'
  import DetailAmountDes from './components/detailAmountDes'
  import RepaymentInfo from './components/repaymentInfo'
  import {formatMoney, formatDate} from '@/utils/filters'
  import { mapGetters } from 'vuex'

  export default {
    data () {
      return {
        myHeaderInfo: {
          title: '融资详情',
          isMiddle: true
        },
        promptDefault: '01',
        promptAlertInfo: {
          '01': {
            isShowTitle: true,
            showTitle: '明细',
            content: '待还金额中保理服务费、逾期费用(若有)计算至今日'
          },
          '02': {
            isShowTitle: false,
            content: '待还金额中保理服务费、逾期费用(若有)计算至今日'
          }
        },
        rtnTypes: {
          '01': '等额本息',
          '02': '等额本金',
          '03': '按月付息到期还本',
          '04': '一次性还本付息',
          '06': '到期一次性还款',
          '07': '放款一次性收息'
        },
        cinoStatus: {
          0: '待还款',
          1: '已逾期',
          5: '已结清'
        },
        displayRepayentInfo: {},
        formData: {
          cino: 'YSB012019000000598001',
          loanAmt: '50000',
          loanDays: '21',
          rtnTypes: '04',
          putoutDate: '20190122',
          dayRate: '0.2%'
        },
        displayDetailInfo: [
          {
            label: '融资单号',
            model: 'cino'
          },
          {
            label: '融资金额 (元)',
            model: 'loanAmt',
            render: (h, { value, column, index }) => {
              const money = formatMoney(value)
              return h('span', {
                'class': {
                  'right-text': true
                }
              }, money)
            }
          },
          {
            label: '期限',
            model: 'loanDays',
            unit: '天'
          },
          {
            label: '费率',
            model: 'dayRate',
            unit: '%/天'
          },
          {
            label: '还款方式',
            model: 'rtnTypes',
            render: (h, { value, column, index }) => {
              const repaymentStatus = this.rtnTypes[value] || ''
              return h('span', {
                'class': {
                  'right-text': true
                }
              }, repaymentStatus)
            }
          },
          {
            label: '融资时间',
            model: 'putoutDate',
            render: (h, { value, column, index }) => {
              const data = formatDate(value)
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
      showPromptalert (val) {
        this.promptDefault = val
        this.eventBus.$emit('promptAlert/show')
      }
    },
    components: {
      MyHeader,
      ShowDetailRender,
      RepaymentInfo,
      DetailAmountDes,
      PromptAlert
    },
    computed: {
      ...mapGetters(['borrowDetailDatas'])
    },
    mounted () {
      let cino = this.$route.query.cino
      this.$store.dispatch('changeBorrowDetailDatas', {cino})
    }
  }
</script>

<style lang="scss">
  .borrow-detail-page {
    height: 100vh;
    background-color: #fff;
    .detail-alert {
      .cover-container {
         z-index: 20!important;
      }
      .prompt-alert {
        .alert-content {
           z-index: 30!important;
         }
      }
    }
    &__img-logo {
       padding-left: 0.3rem;
	       &__img {
	       	 width:1.35rem;
	       }
    }
    &__detail-list {
      background: #F5F5F5;
      border-radius: 4px;
      margin: 0.3rem;
      padding: .3rem .5rem;
      font-size: 0.24rem;
      color: #333;
    }
    &__totals {
    	font-size: 0.24rem;
	    color: #333;
	    padding: 0 0.3rem 0.3rem;
	    display: flex;
	    flex-direction: row;
	    justify-content: space-between;
      align-items: center;
      margin: 0 .5rem;
	    &__label {
        flex:1;
      }
      &__label-right {
        text-align: right;
      }
    }
    &__detail-list__common {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    &__detail-list__common:nth-child(2) {
      padding: 0.2rem 0;
    }
    &__prompt-text {
       color: #666;
       padding: 0 0.3rem 0.2rem;
       font-size: 0.24rem;
    }
  }
</style>
