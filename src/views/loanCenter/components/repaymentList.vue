<template>
  <div class="repayment-component">
    <ul class="repayment-component__list">
      <li class="repayment-component__item" v-for="(item, index) in list" :key="index">
        <p class="repayment-component__month">{{item.key | dateFormat}}月待还</p>
        <div class="repayment-component__list__child" v-for="(dItem, dIndex) in item.list">
        	<router-link :to="{path: toUrl, query: {cino: dItem.cino}}">
        	<div class="repayment-component__cinoInfo">
		          <div class="repayment-component__cinoInfo__leftPart">
		          	<p class="repayment-component__cinoInfo__leftPart__cino">融资单号:&nbsp;&nbsp;{{dItem.cino}}</p>
		          	<div class="repayment-component__cinoInfo__leftPart__repayDates">
			          		<p class="repayment-component__cinoInfo__leftPart__repayDates__common">
				              <span class="repayment-component__label">还款日</span>
				              <span class="repayment-component__cinoInfo__value">{{dItem.payDate | formatDate}}</span>
				            </p>
				            <p class="repayment-component__cinoInfo__leftPart__repayDates__common">
				              <span class="repayment-component__label">期数</span>
				              <span class="repayment-component__cinoInfo__value">{{dItem.planPeri}}</span>
				            </p>
		          	</div>
		          </div>
		          <span :class="overdueType(dItem.state).className">{{overdueType(dItem.state).contents}}</span>
        	</div>
        	<div class="repayment-component__detail">
        		<div class="repayment-component__detail__leftPart">
        			  <p class="repayment-component__label">本金&nbsp;&nbsp;{{dItem.unpayPri | formatMoney}}</p>
                <p class="repayment-component__label" v-if="platformNo === '101003SLH01'">保理服务费&nbsp;&nbsp;{{dItem.unpayInt | formatMoney}}</p>
                <p class="repayment-component__label" v-if="dItem.state == '1'">逾期费用&nbsp;&nbsp;{{dItem.unpayDint | formatMoney}}</p>
        		</div>
        		<div class="repayment-component__detail__rightPart">
        			  <p class="repayment-component__label">待还金额</p>
        			  <h4 class="repayment-component__detail__rightPart__value">{{dItem.unpaySum | formatMoney}} 元</h4>
                <p class="repayment-component__label" v-if="dItem.state == '1'">已还总额&nbsp;&nbsp;{{dItem.actualSum | formatMoney}}</p>
        		</div>
        	</div>
        	</router-link>
        </div>

      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        platformNo: ''
      }
    },
    props: {
      list: {
        type: Array,
        default () {
          return []
        }
      },
      toUrl: {
        type: String,
        default: ''
      }
    },
    mounted () {
      this.platformNo = '101003SLH01'
    },
    methods: {
      overdueType (val) {
        if (val === '0') {
          return {
            className: 'repayment-component__cinoInfo__status_replaymenting',
            contents: '待还款'
          }
        } else if (val === '1') {
          return {
            className: 'repayment-component__cinoInfo__status_overdue',
            contents: '已逾期'
          }
        } else if (val === '2') {
          return {
            className: 'repayment-component__cinoInfo__status_replaymenting',
            contents: '待还款'
          }
        }
      }
    },
    filters: {
      dateFormat (val) {
        return val.slice(0, val.length - 2) + '年' + val.slice(val.length - 2)
      }
    }
  }
</script>

<style lang="scss">
  .repayment-component {
  	background: #f8f8f8;
    padding: 0.2rem 0;
  	&__list {}
    &__item {
    	background:#ffffff;
      position: relative;
      display: flex;
      flex-direction: column;
      font-size: 0.22rem;
      color: #666;
    }
    &__list__child {
       position: relative;
       padding: 0 0.4rem;
       border-bottom: 0.2rem solid #f8f8f8;
    }
    &__month {
      display: flex;
      align-items: center;
      height: 0.6rem;
      padding: 0 .3rem 0.2rem;
      background:rgba(245,245,245,.7);
    }
    &__cinoInfo {
    	display: flex;
    	flex-direction: row;
    	justify-content: space-between;
    	align-items: center;
    	border-bottom: 1px solid #e4e3e3;
    	&__leftPart {
    		flex:8;
    		&__cino {
    		  padding: .2rem 0 .1rem;
					color: rgba(51,51,51,.8);
					font-size: .22rem;
    		}
    		&__repayDates {
    			display: flex;
    			flex-direction: row;
    			justify-content: flex-start;
    			align-items: center;
    			padding-bottom: .14rem;
    			&__common {
    				flex:1;
    			}
    		}
    	}
    	&__status_overdue {
    		flex:2;
    		color: #C9252C;
    		text-align: right;
    	}
    	&__status_replaymenting {
    		flex:2;
    		color: #5DA7EA;
    		text-align: right;
    	}
    }
    &__detail {
    	padding:0.26rem 0;
    	display: flex;
    	flex-direction: row;
    	justify-content: space-between;
    	align-items: center;
    	&__leftPart {
    		flex:1;
    	}
    	&__rightPart {
    		flex:1;
    		text-align: right;
    		&__value {
    			font-size:0.34rem;
					font-family:PingFangSC-Medium;
					font-weight:500;
					color:rgba(102,102,102,1);
					position: relative;
          top: -0.1rem;
    		}
    	}
    }
    &__label {
    	line-height: .5rem;
		  font-size:.24rem;
			font-family:PingFangSC-Light;
			font-weight:300;
			color:#666
		}
		&__value {
    	font-size:.2rem;
			font-family:PingFangSC-Light;
			font-weight:300;
			color:rgba(102,102,102,.6);
			line-height: .5rem;
    }
  }
</style>
