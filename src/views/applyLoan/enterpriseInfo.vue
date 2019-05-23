<template>
  <div class="enterprise-info-page">
      <form-generator :schema="schema" v-model="formData" ref="formentErpriseInfo"></form-generator>
      <button @click.prevent.stop="enterpriseInfoSubmit" class="primary-button btn-top">下一步</button>
  </div>
</template>

<script>
  import applyCommonMixin from '@/mixin/applyCommonMixin'
  import enterpriseInfo from 'pageConfigInfo/apply/enterpriseInfo'

  export default {
    mixins: [applyCommonMixin],
    data () {
      return {
        ...enterpriseInfo
      }
    },
    methods: {
      enterpriseInfoSubmit () {
        this.formValid('formentErpriseInfo', this.enterpriseInfoAction)
      },
      enterpriseInfoAction () {
        // TODO 待删除
        this.$router.push({name: this.nextJumpUrl})
      },
      getEnterpriseInfo () {
        // this.modifySchemeItem(this.schema, this.needModifyScheme)
      }
    },
    watch: {
      'formData.provincialDetail' (newVal) {
        this.splitProvincialDetail(newVal)
      },
      'formData.businessLicensePeriod' (newVal) {
        const [businessLicenseStart, businessLicenseEnd] = newVal.split(',')
        Object.assign(this.formData, {businessLicenseStart, businessLicenseEnd})
      }
    },
    mounted () {
      this.getEnterpriseInfo()
    }
  }
</script>

<style lang="scss">
  .enterprise-info-page {
    display: flex;
    flex-direction: column;
    .primary-button {
      margin-bottom: .5rem;
    }
  }

  .input-component__input-position_small .value {
    text-align: right;
    padding-right: .4rem;
  }
  .input-component__input-position .value {
    text-align: right;
    padding-right: .7rem;
  }

  .distpicker-component .value{
    text-align: right;
    padding-right: .3rem;
  }
</style>
