 <template>
  <div class="borrow-home-page">
    <my-header :title="$route.meta.title"
               :is-middle="true"
               :is-arrow="false">
    </my-header>
    <section class="borrow-home-page__list">
      <title-des :link-label="titleDesInfo.linkLabel" :to-url="titleDesInfo.toUrl"></title-des>
      <div class="borrow-home-page__list__wrap">
      	  <center-list :list="list" :to-url="toUrl" v-if="list.length>0"></center-list>
	      <div class="borrow-home-page__list__wrap__empty-parent" v-else>
	      	<img class="borrow-home-page__list__wrap__empty-parent__img" src="./components/images/center_emptyInfo.png" alt="">
	      	<p class="borrow-home-page__list__wrap__empty-parent__tips">当前没有融资信息</p>
	      </div>
      </div>
    </section>
  </div>
</template>

<script>
  import CenterList from './components/centerList'
  import TitleDes from './components/titleDes'
  import MyHeader from '@/components/header'

  export default {
    data () {
      return {
        titleDesInfo: {
          linkLabel: '历史融资',
          toUrl: '/borrow/history'
        },
        toUrl: '/borrow/detail',
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
      CenterList,
      TitleDes,
      MyHeader
    },
    methods: {
      getMyApplyFinanceList () {
        this.$store.dispatch('changeMyApplyFinanceList', {pageNo: 1, pageSize: 100, status: '0,1'}).then(res => {
          if (res.respCode === '000000' && res.data != null) {
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
  .borrow-home-page {
    background-color: #fff;
    height: calc(100vh);
    &__list {
       padding: 0 0.3rem;
       &__wrap {
       	  height: calc(100vh - 1rem - 1.22rem);
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
  }
</style>
