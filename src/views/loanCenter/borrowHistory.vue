<template>
  <div class="borrow-history-page">
  	<my-header :title="myHeaderInfo.title" :is-middle="myHeaderInfo.isMiddle" ></my-header>
    <section class="borrow-history-page__list">
      <center-list :list="list" :to-url="toUrl" v-if="list.length>0"></center-list>
      <div class="borrow-history-page__list__empty-parent" v-else>
      	<img class="borrow-history-page__list__empty-parent__img" src="./components/images/center_emptyInfo.png" alt="">
      	<p class="borrow-history-page__list__empty-parent__tips">当前没有融资信息</p>
      </div>
    </section>
  </div>
</template>

<script>
  import MyHeader from '@/components/header'
  import CenterList from './components/centerList'

  export default {
    data () {
      return {
        myHeaderInfo: {
          title: '历史融资',
          isMiddle: true
        },
        toUrl: '/borrow/historyDetail',
        list: [
          {
            cino: '1212',
            status: 1,
            loanAmt: '20000',
            loanDays: 21,
            endDate: '20190520'
          },
          {
            cino: '1212',
            status: 0,
            loanAmt: '20000',
            loanDays: 21,
            endDate: '20190520'
          },
          {
            cino: '1212',
            status: 4,
            loanAmt: '20000',
            loanDays: 21,
            endDate: '20190520'
          }
        ]
      }
    },
    components: {
      MyHeader,
      CenterList
    },
    methods: {
      getMyApplyFinanceList () {
        this.$store.dispatch('changeMyApplyFinanceList', {pageNo: 1, pageSize: 100, status: '4'}).then(res => {
          if (res.respCode === '000000') {
            this.list = res.data.cinoList
          }
        })
      }
    },
    mounted () {
      this.getMyApplyFinanceList()
    }
  }
</script>

<style lang="scss">
  .borrow-history-page {
    background-color: #fff;
    height: 100vh;
    &__list {
       padding: .3rem;
       height: calc(100vh - 1.22rem);
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

