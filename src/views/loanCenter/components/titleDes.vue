<template>
  <div class="title-des-component">
    <p class="title-des-component__head">
      <span class="title-des-component__head__text">{{titleLabel}}</span>
      <router-link class="title-des-component__head__link" :to="toUrl">
        {{linkLabel}}
      </router-link>
      <span class="arrow-right arrow-right_right-15"></span>
    </p>
  </div>
</template>
<script>
  export default {
    props: {
      titleLabel: {
        type: String,
        default: '我的融资'
      },
      linkLabel: {
        type: String,
        default: '全部融资'
      },
      toUrl: {
        type: String,
        default: ''
      },
      param: {
        type: Object,
        default () {
          return {}
        }
      }
    }
  }
</script>

<style lang="scss">
  .title-des-component {
    &__head {
       position: relative;
       height: 1rem;
       align-items: center;
       display: flex;
       font-size: 0.3rem;
       color: #333;
     }
    &__head__text {
       font-weight: bold;
       flex: 1;
     }
    &__head__link {
       padding-right: 0.4rem;
       font-size: 0.24rem;
    }
    .arrow-right {
      width: .14rem;
      height: .14rem;
      margin-top: -.04rem;
    }
  }
</style>
