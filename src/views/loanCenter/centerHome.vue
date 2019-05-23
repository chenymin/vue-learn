<template>
  <div class="center-home-page">
    <my-header :title="$route.meta.title"
               :is-middle="true"
               :is-arrow="false">
    </my-header>
    <prompt-alert :is-show-title="promptAlertInfo.isShowTitle"
                  :content="promptAlertInfo.content">
    </prompt-alert>
    <section class="center-home-page__info">
    	<div @click="viewDetail">
    		  <p class="center-home-page__info__logo-parent">
		        <img class="center-home-page__info__logo-parent__img" src="./components/images/logo.png" alt="">
		      </p>
		      <img class="center-home-page__info__five-img" src="./components/images/five-start-bg.png" alt="">
		      <p class="center-home-page__label">可用额度 (元)</p>
		      <div>
		      	<p v-if="loanInfo.limitStatus === '1'"><num-format bigFontSize="integernum"  :num="loanInfo.remainAmt | formatMoney"></num-format></p>
            <p class="center-home-page__value" v-else>{{status[loanInfo.limitStatus]}}</p>
		      </div>
		      <div class="center-home-page__status-wrap">
		      	<span class="center-home-page__btn" v-if="reapply.includes(loanInfo.limitStatus)" @click.prevent.stop="toApply">重新申请</span>
		      	<p class="center-home-page__valid-date" v-else>
			        <span class="center-home-page__valid-date__label">有效期至：</span>
			        <span class="center-home-page__valid-date__value">{{ loanInfo.endDate | formatDate}}</span>
			      </p>
		      </div>
    	</div>
      <div class="center-home-page__money">
        <p class="center-home-page__money__common" @click="viewMyRepay">
        	<img class="center-home-page__money__common__repayImg" src="./components/images/myRepayment.png" alt=""/>
          <span class="center-home-page__money__label">我的还款</span>
        </p>
        <p class="center-home-page__money_common" @click="viewDetail">
        	<span class="center-home-page__money_common__myLimit">¥</span>
          <span class="center-home-page__money__label">我的额度</span>
        </p>
      </div>
      <div class="center-home-page__item-bg">
        <title-des :to-url="jumpUrl"></title-des>
      </div>
    </section>
    <section class="center-home-page__list">
      <center-list :list="list" :to-url="detailUrl" v-if="list.length>0"></center-list>
      <div class="center-home-page__list__empty-parent" v-else>
      	<img class="center-home-page__list__empty-parent__img" src="./components/images/center_emptyInfo.png" alt="">
      	<p class="center-home-page__list__empty-parent__tips">当前没有融资信息</p>
      </div>
    </section>
  </div>
</template>

<script>
  import TitleDes from './components/titleDes'
  import PromptAlert from '@/components/promptalert'
  import NumFormat from '@/components/numFormat'
  import MyHeader from '@/components/header'
  import { mapGetters } from 'vuex'

  export default {
    data () {
      return {
        isArrow: false,
        promptAlertInfo: {
          isShowTitle: false,
          content: '待还金额中保理服务费、逾期费用(若有)计算至今日'
        },
        status: {
          '2': '额度已过期',
          '3': '额度已冻结',
          '4': '额度已终止',
          '5': '额度已过期'
        },
        reapply: ['2', '4', '5'],
        jumpUrl: '/center/borrow',
        detailUrl: '/borrow/detail',
        list: [
          {
            cino: 'YSB012019000000598001',
            status: 1,
            loanAmt: '20000',
            loanDays: 21,
            endDate: '20190520'
          },
          {
            cino: 'YSB012019000000598002',
            status: 0,
            loanAmt: '20000',
            loanDays: 21,
            endDate: '20190520'
          },
          {
            cino: 'YSB012019000000598003',
            status: 4,
            loanAmt: '20000',
            loanDays: 21,
            endDate: '20190520'
          }
        ]
      }
    },
    methods: {
      toApply () {
        this.$router.push({ path: '/home/noApply', query: {isReapply: true} })
      },
      showPromptAlert () {
        this.eventBus.$emit('promptAlert/show')
      },
      viewMyRepay () {
        this.$router.push({ name: 'repaymentList' })
      },
      viewDetail () {
        this.$router.push({ path: '/center/detail' })
      },
      getMyApplyFinanceList () {
        this.$store.dispatch('changeMyApplyFinanceList', {pageNo: 1, pageSize: 100, status: '0,1'}).then(res => {
          if (res.respCode === '000000') {
            this.list = res.data.cinoList
          }
        })
      }
    },
    components: {
      CenterList: () => import('@/views/loanCenter/components/centerList'),
      TitleDes,
      PromptAlert,
      NumFormat,
      MyHeader
    },
    mounted () {
      this.$store.dispatch('changeLoanInfo')
      this.getMyApplyFinanceList()
    },
    computed: {
      ...mapGetters(['loanInfo'])
    }
  }
</script>

<style lang="scss">
  .center-home-page {
    background-color: #fff;
    height: calc(100vh);
    overflow-x: hidden;
    .title-des-component__head {
      margin-top: .2rem;
    }
    &__alert-img {
      height: .29rem;
      margin-left: .1rem;
    }
    &__item-bg {
      padding: 0 .3rem;
      background: url("./components/images/center-home-item-bg.png");
      height: 1rem;
      background-size: cover;
      background-position: center;
      position: absolute;
      width: 100%;
      z-index: 1;
      bottom: -.5rem;
    }
    &__info {
      position: relative;
      background:linear-gradient(157deg,rgba(178,150,104,1) 0%,rgba(198,177,141,1) 100%);
      box-shadow:0px 1px 2px 1px rgba(255,243,224,1);
    }
    &__info__logo-parent {
      position: relative;
    }
    &__info__logo-parent__img {
      position: absolute;
      width: 1.25rem;
      height: .99rem;
      top: 0;
      left: .3rem;
    }
    &__info__five-img {
       position: absolute;
       width: 3.28rem;
       height: 3.53rem;
       right: -.45rem;
       bottom: -.26rem;
    }
    &__label {
      font-size: .3rem;
      color: #fff;
      padding-top: .65rem;
      text-align: center;
    }
    &__value {
       font-size: .72rem;
       color: #fff;
       text-align: center;
       padding: .2rem 0;
    }
    &__status-wrap {
    	text-align: center;
    	padding-bottom: .5rem;
    }
    &__btn {
    	display: inline-block;
    	width:2.6rem;
      line-height:0.63rem;
      border-radius:0.32rem;
      border:2px solid rgba(255,255,255,1);
      font-size:15px;
      font-family:PingFangSC-Regular;
      color:rgba(255,255,255,1);
      text-align: center;
    }
    &__valid-date {
      display: flex;
      font-size: .22rem;
      justify-content: center;
      align-items: center;
      color: #fff;
    }
    &__money {
      position: relative;
      display: flex;
      background-color: #fff;
      margin: 0 .3rem;
      padding: 0.3rem 0 0.5rem
    }
    &__money__common {
      display: flex;
      flex: 1;
      flex-direction: column;
      align-items: center;
      position:relative;
      &__repayImg {
      	width:0.46rem;
      	height:0.5rem;
      }
      &:after {
      		content: '';
      		display: inline-block;
      		width:1px;
      		height:0.34rem;
      		background:#999999;
      		position:absolute;
      		right:0;
      		top:0.35rem;
      	}
    }
    &__money_common {
    	display: flex;
      flex: 1;
      flex-direction: column;
      align-items: center;
    	&__myLimit {
      	display: inline-block;
      	font-size: .3rem;
		    background: #bea37f;
		    color: #ffffff;
		    width: 0.5rem;
		    line-height: 0.5rem;
		    text-align: center;
		    border-radius: 50%;
      }
    }
    &__money__label {
      display: flex;
      align-items: center;
      font-size: .3rem;
      color: #333;
      padding-top:0.15rem
    }
    &__money__value {
       font-size: .24rem;
       color: #666;
       padding-top: .1rem;
    }
    &__list {
      position: relative;
      padding: 0 0.3rem;
      margin-top: .6rem;
      height: calc(100vh - 5.8rem);
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
        	font-size:0.24rem;
					font-family:FZLTXHK--GBK1-0;
					font-weight:normal;
					color:rgba(51,51,51,1);
					line-height:1rem;
        }
      }
    }
  }
  .title-des-component__head__link{
    font-size: .24rem
  }
 .center-list-component__detail-des__item{
     justify-content: center
  }
</style>
