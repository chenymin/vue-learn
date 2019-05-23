<template>
  <div class="borrow-detail-page">
  	<my-header :title="myHeaderInfo.title" :is-middle="myHeaderInfo.isMiddle" ></my-header>
    <div class="borrow-detail-page__headPart">
    	<p class="borrow-detail-page__headPart__img-logo">
    		<img class="borrow-detail-page__headPart__img-logo__img" src="./components/images/detail-logo.png" alt=""/>
    	</p>
    	<div class="borrow-detail-page__headPart__img-status">
    		<p class="borrow-detail-page__headPart__img-status__wraper">
    			<span class="borrow-detail-page__headPart__img-status__wraper__txt">已结清</span>
    		  <img class="borrow-detail-page__headPart__img-status__wraper__img" src="./components/images/center-borrow-finish.png">
    		</p>
    	</div>
    </div>
    <show-detail-render :form-data="borrowDetailDatas" :list="displayDetailInfo"></show-detail-render>
  </div>
</template>

<script>
  import MyHeader from '@/components/header'
  import ShowDetailRender from '../../components/detailListRender/detailRender'
  import {formatMoney, formatDate} from '../../utils/filters'
  import { mapGetters } from 'vuex'

  export default {
    data () {
      return {
        myHeaderInfo: {
          title: '融资详情',
          isMiddle: true
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
        displayDetailInfo: [
          {
            label: '已还总额(元)',
            model: 'actualSum',
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
    methods: {},
    components: {
      MyHeader,
      ShowDetailRender
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
    background-color: #fff;
    &__headPart {
    	display: flex;
    	flex-direction: row;
    	justify-content: space-between;
    	align-items: center;
    	padding: 0 0.3rem;
    	&__img-logo {
    		flex:1;
    		padding-left: 0.3rem;
	       &__img {
	       	 width:1.35rem;
	       }
    	}
    	&__img-status {
    		flex:1;
    		text-align: right;
    		&__wraper {
    			display: inline-block;
    			width: 1.32rem;
			    height: 0.52rem;
			    position: relative;
			    right: .2rem;
    			&__img {
    			width: 1.5rem;
	        position:absolute;
	    		top:0;
	    		left:0;
	    		z-index: 0;
    		}
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
    		}

    	}
    }
  }
</style>
