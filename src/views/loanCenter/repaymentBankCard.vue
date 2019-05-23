<template>
  <div class="bankcard-page">
  	<my-header :title="myHeaderInfo.title" :is-middle="myHeaderInfo.isMiddle" ></my-header>
    <section class="bankcard-page__content">
      <bank-card
        :bank-num="bankInfo.legalCardNo"
        :bank-name="bankInfo.legalOpenBank"
        :bank-logo="bankInfo.legalBankCode"></bank-card>
    </section>
  </div>
</template>

<script>
  import MyHeader from '@/components/header'
  import BankCard from './components/bankcard'
  export default {
    data () {
      return {
        myHeaderInfo: {
          title: '我的银行卡',
          isMiddle: true
        },
        bankInfo: {
          legalCardNo: '',
          legalOpenBank: '',
          legalBankCode: ''
        }
      }
    },
    components: {
      MyHeader,
      BankCard
    },
    mounted () {
      this.bankInfo = this.$route.query
    }
  }
</script>

<style lang="scss" scoped>
  .bankcard-page {
    display: flex;
    flex-direction: column;
    min-height: calc(100vh);
    background: #fff;
    &__content {
    	padding:0.3rem;
    }
  }
</style>
