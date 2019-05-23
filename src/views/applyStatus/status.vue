<template>
	<div class="applyResult-page">
    <my-header :title="$route.meta.title"
               :is-middle="true">
    </my-header>
		<div class="applyResult-page__head">
			<div class="applyResult-page__head__wrap">
				<img class="applyResult-page__head__wrap__pic" :src="infos[status].resultImg" alt=""/>
			  <p class="applyResult-page__head__wrap__result">{{infos[status].resultMsg}}</p>
			  <p class="applyResult-page__head__wrap__tips">{{infos[status].resultTips}}</p>
			</div>
			<div class="applyResult-page__head__refferReasons" v-if="status === '03'">
				<p class="applyResult-page__head__refferReasons__h5">请参考以下原因，重新发起申请</p>
				<p class="applyResult-page__head__refferReasons__reason">1.身份证正反面照片缺失、过期或不符合要求 </p>
				<p class="applyResult-page__head__refferReasons__reason">2.营业执照缺失或与申请所对应企业不一致</p>
				<p class="applyResult-page__head__refferReasons__reason">3.申请人非法人，请提供加盟协议</p>
			</div>
		</div>
		<detail-render class="applyResult-page__detail-render" :form-data="formData" :list="applyInfo"></detail-render>
		<div class="applyResult-page__buttonWrap">
		  <button @click.prevent.stop="complete" class="applyResult-page__primary-button btn-top" v-if="status === '01'">返回</button>
		  <button @click.prevent.stop="complete" class="applyResult-page__primary-button btn-top" v-if="status === '02' || status === '03'">重新申请</button>
		  <button @click.prevent.stop="complete" class="applyResult-page__empty-button btn-top" v-if="status === '02' || status === '03'">返回</button>
		</div>
	</div>
</template>

<script>
  import {formatMoney, formatDate} from '@/utils/filters'
  import DetailRender from '@/components/detailListRender/detailRender'
  import MyHeader from '@/components/header'
  export default {
    components: {
      DetailRender,
      MyHeader
    },
    data () {
      return {
        status: '01',
        infos: {
          '01': {
            resultImg: require('../../views/applyStatus/components/images/waiting.png'),
            resultMsg: '额度申请审核中',
            resultTips: '我们将在3个工作日内完成申请审批，审批结果会以短信的形式通知您，届时请注意查收'
          },
          '02': {
            resultImg: require('../../views/applyStatus/components/images/fail.png'),
            resultMsg: '额度审核未通过',
            resultTips: '很遗憾！您的1药贷申请审批未通过'
          },
          '03': {
            resultImg: require('../../views/applyStatus/components/images/fail.png'),
            resultMsg: '额度审核未通过',
            resultTips: ''
          }
        },
        formData: {
          appAmt: 200000,
          applicant: '张三',
          applyTime: '20190620'
        },
        applyInfo: [
          {
            label: '申请额度',
            model: 'appAmt',
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
            label: '申请人',
            model: 'applicant',
            render: (h, { value, column, index }) => {
              return h('span', {
                'class': {
                  'right-text': true
                }
              }, value)
            }
          },
          {
            label: '申请时间',
            model: 'applyTime',
            render: (h, { value, column, index }) => {
              const dates = formatDate(value)
              return h('span', {
                'class': {
                  'right-text': true
                }
              }, dates)
            }
          }
        ]
      }
    },
    methods: {
      complete () {
        console.log('点击完成')
      }
    },
    mounted () {
      this.status = this.$route.query.status || '01'
    }
  }
</script>

<style lang="scss">
	.applyResult-page{
		min-height:calc(100vh);
		background:#ffffff;
    padding-bottom: 0.3rem;
	  &__head {
	  	text-align: right;
	  	padding:1rem 0.3rem 0.5rem;
	  	&__wrap {
	  		padding: 0 0.4rem;
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
	  	&__refferReasons {
	  		padding:0.27rem 0.39rem;
	  		border:1px dashed rgba(151,151,151,.6);
	  		text-align: left;
	  		 &__h5 {
	  		 	  font-size:0.24rem;
					  font-family:FZLTXHK--GBK1-0;
					  font-weight:normal;
					  color:rgba(102,102,102,.6);
					  line-height:0.5rem;
	  		 }
	  		 &__reason {
	  		  	font-size:0.22rem;
						font-family:FZLTXHK--GBK1-0;
						font-weight:normal;
						color:rgba(102,102,102,.6);
						line-height:0.5rem;
	  		 }
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
       &__empty-button {
	  	    width: 100%;
			    background: white;
			    outline: none;
			    border-radius: 0.1rem;
			    border: 1px solid #a3896a;
			    font-size: 0.36rem;
			    font-family: PingFangSC-Light;
			    font-weight: 300;
			    color: rgba(163, 137, 106, .8);
			    line-height: 0.84rem;
       }
	}
</style>
