<template>
  <div class="center-detail-page">
  	<my-header :title="myHeaderInfo.title" :is-middle="myHeaderInfo.isMiddle" :isArrow="myHeaderInfo.isBack" ></my-header>
    <section class="center-detail-page__section">
    	<div class="center-detail-page__section__head">
    		<p class="center-detail-page__section__head__img-logo">
    			<img class="center-detail-page__section__head__img-logo__img" src="./components/images/detail-logo.png" alt=""/>
    		</p>
    		<p class="center-detail-page__section__head__limtStatus">
    			<span :class="statusImg[formDatas.limitStatus]">{{cinoStatus[formDatas.limitStatus]}}</span>
    		</p>
    	</div>

      <show-detail-render :form-data="formDatas" :list="displayDetailInfo"></show-detail-render>
    </section>
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
          title: '额度详情',
          isMiddle: true,
          isBack: true
        },
        cinoStatus: {
          '2': '额度已过期',
          '3': '额度已冻结',
          '4': '额度已终止',
          '5': '额度已过期'
        },
        statusImg: {
          '2': 'center-detail-page__section__head__limtStatus__grey',
          '3': 'center-detail-page__section__head__limtStatus__brown',
          '4': 'center-detail-page__section__head__limtStatus__brown',
          '5': 'center-detail-page__section__head__limtStatus__grey'
        },
        formData: {},
        displayDetailInfo: [
          {
            label: '总额度 (元)',
            model: 'approveAmt',
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
            label: '可用额度 (元)',
            model: 'remainAmt',
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
            label: '有效期至',
            model: 'endDate',
            render: (h, { value, column, index }) => {
              const data = formatDate(value)
              return h('span', {
                'class': {
                  'right-text': true
                }
              }, data)
            }
          },
          {
            label: '生效日期',
            model: 'startDate',
            render: (h, { value, column, index }) => {
              const data = formatDate(value)
              return h('span', {
                'class': {
                  'right-text': true
                }
              }, data)
            }
          },
          {
            label: '合同',
            render: (h, { value, column, index }) => {
              let _this = this
              return h('span', {
                'class': {
                  'right-text': true,
                  'right-text_margin': true
                },
                on: {
                  click () {
                    _this.$router.push({path: '/contract'})
                  }
                }
              }, ['查看合同', h('span', {
                'class': {
                  'arrow-right': true
                }
              })
              ])
            }
          },
          {
            label: '我的银行卡',
            model: ['bankName', 'bankNo', 'bankCode'],
            render: (h, { value, column, index }) => {
              const strArr = value.split(',')
              const bankNum = strArr[1].substring(strArr[1].length - 4)
              return h('a', {
                'class': {
                  'right-text': true,
                  'right-text_margin': true
                },
                on: {
                  click: () => {
                    this.$router.push({name: 'bankCard', query: {legalOpenBank: value.split(',')[0], legalCardNo: value.split(',')[1], legalBankCode: value.split(',')[2]}})
                  }
                }
              }, [`${strArr[0]}(${bankNum})`, h('span', {
                'class': {
                  'arrow-right': true
                }
              })
              ])
            }
          }
        ]
      }
    },
    methods: {
      toPrevPage () {
        this.$router.go(-1)
      }
    },
    components: {
      ShowDetailRender,
      MyHeader
    },
    mounted () {
      this.$store.dispatch('changeLoanInfo')
    },
    computed: {
      ...mapGetters(['formDatas'])
    }
  }
</script>

<style lang="scss">
  .center-detail-page {
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
    &__section {
      background-color: #fff;
      &__head {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        &__limtStatus {
          flex:1;
          padding-right: 0.3rem;
          font-size: 0.3rem;
          text-align: right;
          &__grey {
          	display: inline-block;
	          width: 2rem;
				    line-height: 0.6rem;
				    font-size: 0.1rem;
	          text-align: center;
	          background: linear-gradient(270deg,rgba(172,170,170,1) 0%,rgba(201,200,200,1) 100%);
				    color:#ffffff;
				    position: relative;
				    &:after {
					    content: '';
					    display: block;
					    height: 0.6rem;
					    width: 0.6rem;
					    background: #ffffff;
					    position: absolute;
					    top: -0.03rem;
					    right: -0.43rem;
					    transform-style: preserve-3d;
					    perspective: 600px;
					    transform-origin: center;
					    transform: rotateZ(60DEG) rotateX(20deg) skewX(27deg);
				    }
          }
          &__brown {
          	display: inline-block;
	          width: 2rem;
				    line-height: .6rem;
				    font-size: .24rem;
	          text-align: center;
	          background: linear-gradient(90deg,rgba(217,98,103,1) 0%,rgba(241,159,162,1) 100%);
				    color:#ffffff;
				    position: relative;
				    &:after {
					    content: '';
					    display: block;
					    height: .6rem;
					    width: .6rem;
					    background: #ffffff;
					    position: absolute;
					    top: -.03rem;
					    right: -.43rem;
					    transform-style: preserve-3d;
					    perspective: 600px;
					    transform-origin: center;
					    transform: rotateZ(60DEG) rotateX(20deg) skewX(27deg);
				    }
          }
        }
        &__img-logo {
        	flex: 1;
        	padding-left: 0.3rem;
	       &__img {
	       	 width:1.35rem;
	       }
	     }
      }
    }
  }
</style>
