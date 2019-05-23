<template>
  <div class="bankcard-component">
    <div class="bankcard-component__content">
      <img class="bankcard-component__img" :src="imgBankLogoUrl()" alt="" v-if="bankLogo">
      <p class="bankcard-component__info">
        <span class="bankcard-component__info__name">{{bankName}}</span>
        <span class="bankcard-component__info__type">储蓄卡</span>
        <span class="bankcard-component__bankNum">{{bankNum | formatBankCard}}</span>
      </p>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {}
    },
    props: {
      bankNum: {
        type: String,
        default: ''
      },
      bankName: {
        type: String,
        default: ''
      },
      bankLogo: {
        type: String,
        default: 'ABC'
      }
    },
    methods: {
      imgBankLogoUrl () {
        return require(`../components/images/bank_logo/${this.bankLogo}.png`)
      }
    }
  }
</script>

<style lang="scss">
  .bankcard-component {
    background: url(./images/bankcard-bg.png);
    background-size: cover;
    background-position: center;
    padding: .3rem 0 .6rem .6rem;
    &__content {
      display: flex;
    }
    &__img {
      width: .93rem;
      height: .93rem;
    }
    &__info {
      display: flex;
      flex-direction: column;
      padding-left: .3rem;
    }
    &__info__name {
      font-size: .36rem;
      color: #333333;
    }
    &__info__type {
       color: #666666;
       font-size: .24rem;
       padding-top: .1rem;
    }
    &__bankNum {
      color: #666;
      font-size: .42rem;
      padding-top: 0.3rem;
    }
  }
</style>
