<template>
  <div class="repayment-component">
     <div class="repayment-component__detail-list">
     	<p class="repayment-component__detail-list__common" v-for="(item, index) in platforms['101003SLH01']" :key="index" v-if="item.isShow">
     		<span>{{item.label}}</span>
        <span>{{repaymentInfo[item.model] | formatMoney}}</span>
     	</p>
     </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    data () {
      return {
        platforms: {
          '101003SLH01': [
            {
              label: '本金(元)',
              model: 'plTermPri',
              isShow: true
            },
            {
              label: '保理服务费(元)',
              model: 'plTermInt',
              isShow: true
            },
            {
              label: '逾期费用(元)',
              model: 'unpayDint',
              isShow: this.repaymentInfo.status === '1'
            },
            {
              label: '已还金额(元)',
              model: 'actualSum',
              isShow: this.repaymentInfo.status === '1'
            }
          ],
          '101003SHH01': [
            {
              label: '本金(元)',
              model: 'plTermPri',
              isShow: true
            },
            {
              label: '逾期费用(元)',
              model: 'unpayDint',
              isShow: this.repaymentInfo.status === '1'
            },
            {
              label: '已还金额(元)',
              model: 'actualSum',
              isShow: this.repaymentInfo.status === '1'
            }
          ]
        }
      }
    },
    props: {
      repaymentInfo: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    computed: {
      ...mapGetters(['platform'])
    }
  }
</script>

<style lang="scss">
  .repayment-component {
  	&__detail-list {
      background: #F5F5F5;
      border-radius: 4px;
      margin: 0.3rem;
      padding: .3rem .5rem;
      font-size: 0.24rem;
      color: #333;
    }
    &__detail-list__common {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    &__detail-list__common:nth-child(2) {
      padding: 0.2rem 0;
    }
  }
</style>
