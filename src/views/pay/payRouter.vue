<template>
  <div class="pay-page">
    <my-header :title="myHeaderInfo.title" :is-middle="myHeaderInfo.isMiddle" :url="myHeaderInfo.url"></my-header>
    <router-view></router-view>
  </div>
</template>

<script>
  import MyHeader from '@/components/header'

  export default {
    provide () {
      return {
        payRouter: this
      }
    },
    data () {
      return {
        isShowPageNav: true,
        currentIndex: 0,
        myHeaderInfo: {
          title: '星鑫付',
          isMiddle: true,
          url: ''
        }
      }
    },
    components: {
      MyHeader
    }
  }
</script>
<style lang="scss">
	.pay-page {
		background:#ffffff;
		height:100vh;
	}
</style>
