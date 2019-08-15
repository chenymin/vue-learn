<template>
  <div class="legal-info-page">
    <form-generator :schema="schema" v-model="formData" ref="formLegalInfo"></form-generator>
    <button @click.prevent="legalInfoSubmit" class="primary-button btn-top">下一步</button>
  </div>
</template>

<script>
  import applyCommonMixin from '@/mixin/applyCommonMixin'
  import formGeneratorMixin from '@/mixin/formGeneratorMixin'
  import {validMobile} from '@/utils/util'
  import {getStore} from '@/utils/storage'
  import legalInfo from 'pageConfigInfo/apply/legalInfo'

  export default {
    mixins: [applyCommonMixin, formGeneratorMixin],
    data () {
      return {
        ...legalInfo
      }
    },
    methods: {
      legalInfoSubmit () {
        this.formValid('formLegalInfo', this.legalInfoAction)
      },
      legalInfoAction () {
        // TODO 待删除
        this.$router.push({name: this.nextJumpUrl})
      },
      getlegalInfo () {
        // this.modifySchemeItem(this.schema, this.needModifyScheme)
      },
      isShowSendCodeBtn (newVal) {
        const smsInfo = this.findSchemaItems(['smsCode'])[0]
        smsInfo.isSendDisable = validMobile(newVal)
        if (smsInfo.isSendDisable) {
          smsInfo.paramsObj = {applyToken: getStore('applyToken'), phoneNo: newVal}
        }
      },
      setIdIsPermanent (newVal) {
        this.formData[this.changeKey.idIsPermanent] = newVal === '永久期限' ? '01' : '02'
      }
    },
    mounted () {
      this.$watch(`formData.${this.changeKey.phoneNo}`, this.isShowSendCodeBtn)
      this.$watch(`formData.${this.changeKey.idPeriod}`, this.setIdIsPermanent)
      this.getlegalInfo()
    }
  }
</script>

<style lang="scss">
  .legal-info-page {
    display: flex;
    flex-direction: column;
    .date-picker-component .value, .selection-component .value{
      text-align: right;
      padding-right: .3rem;
    }
    .primary-button {
      margin-bottom: .5rem;
    }

    .input-component__input-position_small .value {
      text-align: right;
      padding-right: .4rem;
    }
    .input-component__input-position .value {
      text-align: right;
      padding-right: .7rem;
    }
  }
</style>
