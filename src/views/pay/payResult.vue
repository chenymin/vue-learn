<template>
	<div class="payResult-page">
		<div class="payResult-page__head">
			<img class="payResult-page__head__pic" :src="infos.success.resultImg" alt=""/>
			<p class="payResult-page__head__result">{{infos.success.resultMsg}}</p>
			<p class="payResult-page__head__tips">{{infos.success.resultTips}}</p>
		</div>
		<detail-render class="payResult-page__detail-render" :form-data="formData" :list="resultInfo"></detail-render>
		<div class="payResult-page__buttonWrap">
		  <button @click.prevent.stop="complete" class="payResult-page__primary-button btn-top">完成</button>
		</div>
	</div>
</template>

<script>
  import payMixin from '@/mixin/payMixin'
  import DetailRender from '@/components/detailListRender/detailRender'
  import {formatMoney, formatDate} from '@/utils/filters'
  export default {
    components: {
      DetailRender
    },
    mixins: [payMixin],
    data () {
      return {
        paySuccess: true,
        formData: {
          paidMoney: 3560,
          endDate: '20190620'
        },
        resultInfo: [
          {
            label: '支付金额',
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
            label: '到期日期',
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
        infos: {
          success: {
            resultImg: require('../../views/pay/images/agree.png'),
            resultMsg: '支付受理成功！',
            resultTips: '支付受理已成功，请记得在到期日前完成还款'
          },
          fail: {
            resultImg: require('../../views/pay/images/fail.png'),
            resultMsg: '支付失败！',
            resultTips: '可用额度不足'
          }
        }
      }
    },
    methods: {
      complete () {
        console.log('点击完成')
      }
    }
  }
</script>

<style lang="scss">
	.payResult-page{
	  &__head {
	  	text-align: right;
	  	padding:1.69rem 0.7rem 0.77rem;
	  	&__pic {
	  		width:1.08rem;
	  	}
	  	&__result {
	  	  font-size:0.3rem;
		  font-family:FZLTZHK--GBK1-0;
		  font-weight:normal;
		  color:rgba(0,0,0,.8);
		  line-height:0.45rem;
		  padding:0.3rem 0 0.4rem;
	  	}
	  	&__tips {
	  	 font-size:0.24rem;
		 font-family:FZLTXHK--GBK1-0;
		 font-weight:normal;
		 color:rgba(102,102,102,.6);
		 line-height:0.45rem;
	  	}
	  }
	  &__detail-render {
	  	.list .item {
	  	  padding: 0 0.4rem!important;
		  background-color:rgba(249,249,249,1)!important;
		  color:rgba(102, 102, 102, .6)!important;
		  &:after {
		  	content: '';
		  	border: none!important;
		  }
		 }
	  }
	  &__buttonWrap {
	  	padding: 0 0.3rem;
	  }
	  &__primary-button {
	  	    width:100%;
    	    background:linear-gradient(134deg,rgba(198,172,141,1) 0%,rgba(162,136,105,1) 100%);
			box-shadow:0px 0.03rem 0.09rem 0.02rem rgba(207,188,167,1);
			border-radius:0.08rem;
            font-size:0.36rem;
			font-family:PingFangSC-Regular;
			font-weight:400;
			color:rgba(255,255,255,1);
			line-height:0.94rem;
       }
	}
</style>
