<template>
  <div class="spouse-info-page">
    <my-header
      :title="$route.meta.title"
      :is-middle="true"
      :is-by-click-return="true"
      @header-back="backtrackThirdPage">
    </my-header>
    <form-generator :schema="schema" v-model="formData" ref="formSpouseInfo"></form-generator>
  </div>
</template>

<script>
  import applyCommonMixin from '@/mixin/applyCommonMixin'
  import formGeneratorMixin from '@/mixin/formGeneratorMixin'
  import spouseInfo from 'pageConfigInfo/apply/spouseInfo'
  import MyHeader from '@/components/header'
  import {getStore, setStore} from '@/utils/storage'

  export default {
    mixins: [applyCommonMixin, formGeneratorMixin],
    data () {
      return {
        ...spouseInfo
      }
    },
    methods: {
      backtrackThirdPage () {
        this.formValid('formSpouseInfo', this.spouseInfoAction)
      },
      spouseInfoAction () {
        setStore('spouseInfo', this.formData)
        this.$router.push({name: this.preJumpUrl})
      }
    },
    components: {
      MyHeader
    },
    mounted () {
      this.applyRouter.isShowPageNav = false
      this.applyRouter.isShowHeader = false
      Object.assign(this.formData, JSON.parse(getStore('spouseInfo')))
    }
  }
</script>
