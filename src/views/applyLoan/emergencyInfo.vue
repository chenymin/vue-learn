<template>
  <div class="emergency-info-page">
    <my-header
      :title="$route.meta.title"
      :is-middle="true"
      :url="preJumpUrl"
      :is-by-click-return="true"
      @header-back="backtrackThirdPage">
    </my-header>
    <form-generator :schema="schema" v-model="formData" ref="formEmergencyInfo"></form-generator>
  </div>
</template>

<script>
  import applyCommonMixin from '@/mixin/applyCommonMixin'
  import emergencyInfo from 'pageConfigInfo/apply/emergencyInfo'
  import MyHeader from '@/components/header'
  import {getStore, setStore} from '@/utils/storage'
  export default {
    mixins: [applyCommonMixin],
    data () {
      return {
        ...emergencyInfo,
        unMarriedList: ['03', '04', '05', '06']
      }
    },
    methods: {
      backtrackThirdPage () {
        this.formValid('formEmergencyInfo', this.emergencyInfoAction)
      },
      emergencyInfoAction () {
        setStore('emergencyInfo', this.formData)
        this.$router.push({name: this.preJumpUrl})
      },
      initListData () {
        const modifySchemeItem = [this.changeKey['relationShip1'], this.changeKey['relationShip2']]
        modifySchemeItem.forEach((item) => {
          this.findSchemaItems(item)[0].list[0].delete = this.unMarriedList.includes(this.$route.query.married || '03')
        })
        Object.assign(this.formData, JSON.parse(getStore('emergencyInfo')))
      }
    },
    components: {
      MyHeader
    },
    mounted () {
      this.applyRouter.isShowPageNav = false
      this.applyRouter.isShowHeader = false
      this.initListData()
    }
  }
</script>
