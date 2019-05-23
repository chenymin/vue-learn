<template>
  <div class="borrow-info-page">
  	  <section class="borrow-info-page__headInfo">
  	  	<p class="borrow-info-page__headInfo__dt">需付款(元)</p>
  	  	<p class="borrow-info-page__headInfo__dd">{{formData.paidMoney | formatMoney}}</p>
  	  	<p class="borrow-info-page__headInfo__orderNo">订单号 009283N392801</p>
  	  	<img class="borrow-info-page__headInfo__logo" src="./images/pay_logo.png"/>
  	  </section>
  	  <detail-render class="borrow-info-page__detail-render" :form-data="formData" :list="borrowDetailInfo"></detail-render>
      <div>
      	<protocol :items="protocolData.items"
		              v-model="protocolCode"
		              name="checkboxChecked"
		              class="borrow-info-page__protocol">
		      <span class="borrow-info-page__blue-txt" slot="protocol-slot" @click.prevent="showProtocolSelectFun">《委托扣款授权书》</span>
		    </protocol>
      </div>
      <button @click.prevent.stop="payMoney" class="primary-button btn-top">支付</button>
      <p class="borrow-info-page__tips">起息日：以额度贷款合同中约定的收款账号收到该笔贷款的日期为准。</p>
      <confirm-dialogue :showTitle="true" :text="confirmTip" :sure="'更换还款卡'" @confirm-ok="confirmOk"></confirm-dialogue>
      <confirm-sms :showTitle="true" :phoneNo="'13566666666'" @confirmSms-ok="confirmSms"></confirm-sms>
  </div>
</template>

<script>
  import payMixin from '@/mixin/payMixin'
  import DetailRender from '@/components/detailListRender/detailRender'
  import ConfirmDialogue from '@/components/confirmdialogue'
  import ConfirmSms from '@/components/confirmSms'
  import Protocol from '@/components/protocol'
  import {formatMoney, formatDate} from '@/utils/filters'

  export default {
    components: {
      DetailRender,
      ConfirmDialogue,
      ConfirmSms,
      Protocol
    },
    mixins: [payMixin],
    data () {
      return {
        payDetail: {
          needPay: '',
          orderNo: ''
        },
        formData: {
          availableAmt: 30000,
          paidMoney: 3560,
          dayRate: '0.04%',
          repayWay: '到期一次性还本付息',
          endDate: '20190620'
        },
        borrowDetailInfo: [
          {
            label: '可用额度 (元)',
            model: 'availableAmt',
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
            label: '支付金额(元)',
            model: 'paidMoney',
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
            label: '借款日利率',
            model: 'dayRate'
          },
          {
            label: '还款方式',
            model: 'repayWay'
          },
          {
            label: '到期日',
            model: 'endDate',
            render: (h, { value, column, index }) => {
              const dates = formatDate(value)
              return h('span', {
                'class': {
                  'right-text': true
                }
              }, dates)
            }
          }
        ],
        protocolData: {
          items: [
            {
              fileName: '《相关协议》'
            }
          ]
        },
        protocolCode: '0',
        showChangeCard: false,
        confirmTip: '该银行卡暂不支持代扣还款,请更换您的还款银行卡'
      }
    },
    methods: {
      payMoney () {
        this.eventBus.$emit('confirm/show')
      },
      showProtocolSelectFun () {
        this.$refs.protocolSelect.showSelect()
      },
      confirmOk () {
        this.eventBus.$emit('confirm/hidden')
        this.eventBus.$emit('confirmSms/show')
      },
      confirmSms () {
        this.eventBus.$emit('confirmSms/hidden')
      }
    },
    mounted () {
    },
    watch: {
      protocolCode (val) {  // 监听checkbox是否勾选，勾选了就改签约时间为当前时间，没有勾选不改签约时间
        if (val === '1') {
          console.log('2223222')
        }
      }
    }
  }
</script>

<style lang="scss">
  .borrow-info-page {
    display: flex;
    flex-direction: column;
    &__headInfo {
      background:#ffffff;
      padding: 0.35rem 0.4rem 0;
      text-align: center;
      position: relative;
      &__dt {
      	font-size:0.03rem;
				font-family:PingFangSC-Light;
				font-weight:300;
				color:rgba(51,51,51,.7);
				line-height:0.42rem;
      }
      &__dd {
      	font-size: 0.88rem;
				font-family:DINAlternate-Bold;
				font-weight:bold;
				color:rgba(51,51,51,1);
				line-height:1.3rem;
      }
      &__orderNo {
      	font-size: 0.24rem;
				font-family:PingFangSC-Light;
				font-weight:300;
				color:rgba(51,51,51,.6);
				line-height:0.45rem;
				padding-bottom: 0.46rem;
				border-bottom: 2px solid rgba(176, 146, 100, .3);
      }
      &__logo {
      	width:1.2rem;
      	position: absolute;
      	top:0;
      	right:0.5rem
      }
    }
    &__protocol {
      margin-top: 0.5rem!important;
      .protocol-label {
        color: #333!important;
      }
    }
    &__blue-txt {
      color: #599CCC!important;
    }
    .borrow-info-page_form .form-filed {
    	padding: 0 0.4rem;
      height:1.15rem
    }
    .borrow-info-page_form .value {
    	text-align: right;
    }
    .primary-button {
    	background:linear-gradient(134deg,rgba(198,172,141,1) 0%,rgba(162,136,105,1) 100%);
			box-shadow:0px 0.03rem 0.09rem 0.02rem rgba(207,188,167,1);
			border-radius:0.08rem;
      margin-bottom: .31rem;
    }
    &__tips {
    	padding:0 0.4rem;
    	font-size:0.24rem;
			font-family:PingFangSC-Regular;
			font-weight:400;
			color:rgba(102,102,102,.6);
			line-height:0.33rem;
    }
  }
</style>
