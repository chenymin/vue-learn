<template>
  <div class="contract-home-page">
  	<my-header :title="myHeaderInfo.title" :is-middle="myHeaderInfo.isMiddle" ></my-header>
  	<div class="contract-home-page__listWraper">

  		<ul v-if="contractList && contractList.length > 0">
	      <li class="contract-home-page__listWraper__list" v-for="(item, index) in contractList">
	        <p class="contract-home-page__listWraper__list__filename">{{item.fileName}}</p>
	        <a class="contract-home-page__listWraper__list__download" :href="item.url" target="_blank">下载</a>
	      </li>
	    </ul>
	    <div class="contract-home-page__empty-parent" v-else>
      	<img class="contract-home-page__empty-parent__img" src="./components/images/center_emptyInfo.png" alt="">
      	<p class="contract-home-page__empty-parent__tips">当前没有合同信息</p>
      </div>
  	</div>
  </div>
</template>

<script>
  import MyHeader from '@/components/header'
  import { mapGetters } from 'vuex'
  export default {
    components: {
      MyHeader
    },
    data () {
      return {
        myHeaderInfo: {
          title: '查看合同',
          isMiddle: true
        },
        contract: '个人信用评估授权书'
      }
    },
    mounted () {
      this.$store.dispatch('getContractListInfo')
    },
    computed: {
      ...mapGetters(['contractList'])
    }
  }
</script>

<style lang="scss">
  .contract-home-page {
    background-color: #fff;
    height: 100vh;
    &__listWraper {
    	padding:0.3rem 0.6rem;
    &__list {
      padding:0.5rem 0.25rem;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
      background:rgba(255,255,255,1);
      box-shadow:0px 2px 4px 0px rgba(0,0,0,0.15);
      margin-bottom: 0.3rem;
      &__filename {
      	flex: 6;
      	font-size: 15px;
      	color:#272D56;
      	text-align: left;
      }
      &__download {
      	flex: 2;
      	font-size: 15px;
      	text-align: right;
      	color:#49ADEF
      }
     }
    }
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
</style>
