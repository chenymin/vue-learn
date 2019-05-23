<template>
  <div class="apply-page">
    <prompt-alert v-model="isAlertShow" :content="alertMsg" :isShowTitle="false"></prompt-alert>
    <my-header
      :title="$route.meta.title"
      :is-middle="myHeaderInfo.isMiddle"
      :url="myHeaderInfo.url"
      v-if="isShowHeader">
    </my-header>
    <page-navigate :current-index="currentIndex" v-if="isShowPageNav" :label-text="pagenavigateInfo"></page-navigate>
    <router-view></router-view>
  </div>
</template>

<script>
  import MyHeader from '@/components/header'
  import PageNavigate from '@/components/pagenavigate/pagenavigate'
  import applyInfo from 'pageConfigInfo/common'
  import PromptAlert from '@/components/promptalert'

  export default {
    provide () {
      return {
        applyRouter: this
      }
    },
    data () {
      return {
        ...applyInfo,
        isShowPageNav: true,
        isShowHeader: true,
        currentIndex: 0,
        myHeaderInfo: {
          title: '星鑫保额度申请',
          isMiddle: true,
          url: ''
        },
        applyPageInfo: {},
        isAlertShow: false,
        alertMsg: ''
      }
    },
    components: {
      MyHeader,
      PageNavigate,
      PromptAlert
    }
  }
</script>

<style lang="scss">
  .component__margin-top {
    margin-top: .2rem;
  }
</style>
