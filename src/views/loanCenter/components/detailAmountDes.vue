<template>
  <div class="detail-amount-des-component">
    <div class="detail-amount-des-component__top">
      <p class="detail-amount-des-component__top__common">
        <span class="detail-amount-des-component__label" @click="showPromotDialog('01')">
          待还金额 (元)
          <img class="detail-amount-des-component__prompt__img" src="./images/icon_prompt-yellow.png">
        </span>
        <span :class="statusStyle[borrowDetailInfo.status]">{{borrowDetailInfo.unpaySum | formatMoney}}</span>
      </p>
      <div class="detail-amount-des-component__top__common">
      	<p class="detail-amount-des-component__imgWraper">
      		<span class="detail-amount-des-component__imgWraper__txt">{{statusTxt[borrowDetailInfo.status]}}</span>
      		<img class="detail-amount-des-component__imgWraper__img" :src="statusSrc[borrowDetailInfo.status]">
      	</p>
        <span class="detail-amount-des-component__label">还款日：{{borrowDetailInfo.endDate | formatDate}}</span>
      </div>
    </div>
    <p class="detail-amount-des-component__bottom" @click="jumpUrl">
      <img class="detail-amount-des-component__prompt__img" src="./images/icon_prompt-yellow.png">
      还款说明</p>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        statusStyle: {
          '1': 'detail-amount-des-component__borrow-overdue',
          '0': 'detail-amount-des-component__borrow-repayment'
        },
        statusTxt: {
          '1': '已逾期',
          '0': '待还款'
        },
        statusSrc: {
          '1': require('../components/images/center-borrow-overdue.png'),
          '0': require('../components/images/center-borrow-repaying.png')
        }
      }
    },
    props: {
      borrowDetailInfo: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    methods: {
      showPromotDialog (type) {
        this.$emit('show-alert', type)
      },
      jumpUrl () {
        this.$router.push({'name': 'repaymentDes'})
      }
    }
  }
</script>

<style lang="scss">
  .detail-amount-des-component {
    display: flex;
    flex-direction: column;
    padding: 0.3rem;
    margin: 0 0.3rem;
    color: #333;
    background:rgba(255,255,255,1);
    box-shadow:0px 2px 3px 6px rgba(254,254,254,1);
    border-radius:10px;
    border:1px solid rgba(231,231,231,1);
    &__top {
       display: flex;
    }
    &__top__common {
      display: flex;
      flex-direction: column;
      flex: 1;
    }
    &__top__common:nth-child(2) {
      align-items: flex-end;
    }
    &__label {
       display: flex;
       font-size: 0.24rem;
       align-items: center;
       font-size: 0.24rem;
    }
    &__borrow-repayment {
      font-weight:bold;
      font-size: .64rem;
      color: #B09364;
      padding-top: 0.1rem;
    }
    &__borrow-overdue {
      font-weight:bold;
      font-size: .64rem;
      color: rgba(201,37,44,1);
      padding-top: 0.1rem;
    }
    &__bottom {
       display: flex;
       justify-content: flex-end;
       align-items: center;
       font-size: .3rem;
       color: #B09364;
       margin-top: 0.5rem;
    }
    &__prompt__img {
      height: 0.29rem;
      width: .29rem;
      margin: 0 0.15rem;
    }
    &__imgWraper {
    	  width: 1.32rem;
		    height: 0.52rem;
		    position: relative;
		    right: .2rem;
		    margin-bottom: 0.2rem;
    	&__txt {
    		    display: inline-block;
				    width: 100%;
				    line-height: 0.65rem;
				    color: rgba(255,255,255,.8);
				    text-align: center;
				    font-size: 0.24rem;
				    position: absolute;
				    top: 0;
				    left: 0;
				    z-index: 10;
    	}
      &__img {
        width: 1.5rem;
        position:absolute;
    		top:0;
    		left:0;
    		z-index: 0;
     }	
    }
  }
</style>
