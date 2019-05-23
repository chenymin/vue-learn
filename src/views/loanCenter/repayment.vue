<template>
  <div class="repayment-page">
    <my-header :title="$route.meta.title"
               :is-middle="true"
               :is-arrow="false">
    </my-header>
    <section class="repayment-page__num-info">
      <p class="repayment-page__label repayment-page__label_center">本月待还 (元)</p>
      <p class="repayment-page__value_big" v-if="repaymentDetial.monthUnpayAmt === 0">{{repayment.loanFlag === '0'?'当月无待还':'当月已结清'}}</p>
      <p v-else><num-format bigFontSize="integernum" :num="repaymentDetial.monthUnpayAmt | formatMoney"></num-format></p>
      <p class="repayment-page__des" @click.prevent="jumpPage">
        <img class="repayment-page__img" src="./components/images/icon_prompt-white.png" alt="">
        还款说明
      </p>
      <p class="repayment-page__logo">
        <img class="repayment-page__five-img" src="./components/images/five-start-bg.png" alt="">
      </p>
    </section>
    <section class="repayment-page__list">
    	<repayment-list :list="list" :to-url="detailUrl" v-if="list.length > 0"></repayment-list>
	    <div class="repayment-page__list__empty-parent" v-else>
	      	<img class="repayment-page__list__empty-parent__img" src="./components/images/center_emptyInfo.png" alt="">
	      	<p class="repayment-page__list__empty-parent__tips">当前没有待还的融资信息</p>
	      </div>
    </section>
  </div>
</template>

<script>
  import RepaymentList from './components/repaymentList'
  import NumFormat from '@/components/numFormat'
  import MyHeader from '@/components/header'

  export default {
    data () {
      return {
        detailUrl: '/borrow/detail',
        repayment: {},
        repaymentDetial: {
          monthUnpayAmt: 0
        },
        list: [
          {
            key: '201907',
            list: [
              {
                cino: 'YSB012019000000598001',
                payDate: '20190522',
                state: '0',
                unpayPri: '5000',
                unpayInt: '200',
                unpaySum: '5200',
                planPeri: '6|12'
              },
              {
                cino: 'YSB012019000000598002',
                payDate: '20190522',
                state: '1',
                unpayPri: '5000',
                unpayInt: '200',
                unpaySum: '5300',
                planPeri: '6|12',
                unpayDint: '100'
              },
              {
                cino: 'YSB012019000000598002',
                payDate: '20190522',
                state: '2',
                unpayPri: '5000',
                unpayInt: '200',
                unpaySum: '5300',
                planPeri: '6|12',
                unpayDint: '100'
              }
            ]
          }
        ]
      }
    },
    methods: {
      jumpPage () {
        this.$router.push({'name': 'repaymentDes'})
      },
      getRepaymentData () {
        this.$store.dispatch('changeRepayment').then(res => {
          if (res.respCode === '000000' && res.data != null) {
            this.repayment = res.data
          }
        })
      },
      getRepaymentDetials () {
        this.$store.dispatch('changeRepaymentDetial').then(res => {
          if (res.respCode === '000000' && res.data != null) {
            Object.assign(this.repaymentDetial, res.data)
            this.list = res.data.monthMap
          }
        })
      }
    },
    components: {
      RepaymentList,
      NumFormat,
      MyHeader
    },
    mounted () {
      this.getRepaymentData()
      this.getRepaymentDetials()
    }
  }
</script>

<style lang="scss">
  .repayment-page {
  	height: calc(100vh);
    overflow-x: hidden;
    &__num-info {
       background:linear-gradient(157deg,rgba(178,150,104,1) 0%,rgba(198,177,141,1) 100%);
       box-shadow:0px 2px 4px 2px rgba(255,243,224,1);
    }
    &__alert-text {
      background-color: #FEF9DD;
      color: #FF864A;
      font-size: .2rem;
      padding: 0.1rem .3rem;
    }
    &__label {
      color: #fff;
      font-size: .3rem;
    }
    &__label_center {
      padding: .6rem 0 .2rem;
      text-align: center;
    }
    &__value_big {
      text-align: center;
      font-size: .72rem;
      color: #fff;
    }
    &__des {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: .3rem;
      color: #fff;
      padding: .2rem 0 0.6rem;
    }
    &__current {
       position: relative;
       display: flex;
       align-items: center;
       justify-content: space-between;
       padding: 0 .3rem;
       height: 1rem;
    }
    &__current:before {
       content: '';
       position: absolute;
       left: 0;
       top: 0;
       background: rgba(255,255,255, 0.2);
       width: 100%;
       height: 100%;
    }
    &__img {
      width: .29rem;
      height: .29rem;
      margin-right: .1rem;
    }
    &__logo {
      position: relative;
    }
    &__five-img {
      position: absolute;
      width: 3.28rem;
      height: 3.53rem;
      right: -.45rem;
      bottom: -.8rem;
    }
    &__list {
      position: relative;
      height: calc(100vh - 3.2rem - 1.22rem);
      overflow-y: auto;
      &__empty-parent {
      	display: flex;
      	flex-direction: column;
      	justify-content: center;
      	align-items: center;
      	padding-top: 1rem;
        &__img {
          width: 2.3rem;
          height: 2.3rem;
        }
        &__tips {
        	flex: 1;
        	text-align: center;
        	font-size:12px;
					font-family:FZLTXHK--GBK1-0;
					font-weight:normal;
					color:rgba(51,51,51,1);
					line-height:1rem;
        }
      }
    }
  }
</style>
