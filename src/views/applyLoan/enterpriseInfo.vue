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
        const param = Object.assign({}, this.formData, {appAmt: this.formData.appAmt * 10000})
        this.$store.dispatch('saveLimitApplyInfo', param).then(res => {
          if (res.respCode === '000000') {
            this.$router.push({name: this.nextJumpUrl})
          }
        })
      },
      getEnterpriseInfo () {
        this.$store.dispatch('getLimitApplyInfo').then(res => {
          if (res.respCode === '000000') {
            const {province, city, area, appAmt} = res.data.enterpriseInfo
            const provincialDetail = province !== null && city !== null && area !== null ? `${province}-${city}-${area}` : ''
            Object.assign(this.formData, res.data.enterpriseInfo, {provincialDetail, appAmt: appAmt / 10000})
            if (res.data.enterpriseInfo.lfzxValidateResult === '01') {
              this.modifySchemeItem(this.schema, this.needModifyScheme)
            }
          }
        })
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
