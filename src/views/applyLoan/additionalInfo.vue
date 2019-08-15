<template>
  <div class="additional-page">
    <form-generator :schema="schema" v-model="formData" ref="formAdditionalInfo"></form-generator>
    <button @click.prevent="additionalInfoSubmit" class="primary-button btn-top">下一步</button>
  </div>
</template>

<script>
  import applyCommonMixin from '@/mixin/applyCommonMixin'
  import formGeneratorMixin from '@/mixin/formGeneratorMixin'
  import additionalInfo from 'pageConfigInfo/apply/additionalInfo'
  import {getStore} from '@/utils/storage'
  import Dictionary from '@/utils/dictionary'
  export default {
    mixins: [applyCommonMixin, formGeneratorMixin],
    data () {
      return {
        ...additionalInfo,
        marriedStr: '20'
      }
    },
    methods: {
      additionalInfoSubmit () {
        this.formValid('formAdditionalInfo', this.additionalInfoAction)
      },
      additionalInfoAction () {
        this.$router.push({name: this.nextJumpUrl})
      },
      initSpouseInfoData () {
        const spouseInfoItem = this.findSchemaItems('spouseInfo')[0]
        if (getStore('spouseInfo')) {
          Object.assign(spouseInfoItem.formData, JSON.parse(getStore('spouseInfo')))
          Object.assign(this.formData, JSON.parse(getStore('spouseInfo')))
        }
      },
      initEmergencyInfoData () {
        const emergencyInfoItem = this.findSchemaItems('emergencyInfo')[0]
        if (getStore('emergencyInfo')) {
          const emergencyInfo = JSON.parse(getStore('emergencyInfo'))
          const relationshipItem1 = Dictionary.relationship.filter(({dataVal}) => dataVal === emergencyInfo[this.changeKey.relationShip1])
          const relationshipItem2 = Dictionary.relationship.filter(({dataVal}) => dataVal === emergencyInfo[this.changeKey.relationShip2])
          Object.assign(emergencyInfoItem.formData, emergencyInfo, {[this.changeKey.relationShip1]: relationshipItem1[0].dataTrsVal, [this.changeKey.relationShip2]: relationshipItem2[0].dataTrsVal})
          Object.assign(this.formData, emergencyInfo)
        }
      },
      initData () {
        this.initSpouseInfoData()
        this.initEmergencyInfoData()
      },
      watchMarriage (newVal) {
        this.findSchemaItems('spouseInfo')[0].isComponentShow = !(newVal === this.marriedStr)
        Object.assign(this.findSchemaItems('emergencyInfo')[0].params, {married: newVal})

        if (newVal === this.marriedStr) {
          Object.assign(this.formData, JSON.parse(getStore('spouseInfo')))
        } else {
          Object.assign(this.formData, {
            [this.changeKey.spouseName]: null,
            [this.changeKey.spouseIdNo]: null,
            [this.changeKey.spouseMobile]: null
          })
        }
      }
    },
    watch: {
      'formData.provincialDetail' (newVal) {
        this.splitProvincialDetail(newVal)
      }
    },
    mounted () {
      this.$watch(`formData.${this.changeKey.marriage}`, this.watchMarriage)
      this.applyRouter.myHeaderInfo.url = this.preJumpUrl
      this.initData()
    }
  }
</script>

<style lang="scss">
  .additional-page {
    display: flex;
    flex-direction: column;
    padding-bottom: .3rem;
    .link-relitive-component__item .form-filed {
      padding: 0;
    }
    .link-relitive-component__item:nth-child(3n + 1) .form-filed {
      width: 1.5rem;
    }
    .link-relitive-component__item:nth-child(3n) .form-filed {
      padding-right: .3rem;
      width: 2.3rem;
    }
    .link-relitive-component__item:nth-child(3n + 2) .form-filed {
      width: calc(100vw - 4.1rem);
      .value {
        text-align: center;
      }
    }
    .link-relitive-component__item .form-filed::after {
      border: none;
    }
  }
</style>
