<template>
  <div class="router-link-component" :class="[...routerLinkComponentClass]">
    <p class="router-link-component__des">
      <label class="router-link-component__label">{{label}}</label>
      <router-link :to="{name: routerName, query: params}" class="router-link-component__link"
                   :class="[...routerLinkComponentLinkClass]">{{linkText}}</router-link>
      <span class="arrow-right" v-if="!isShowArrow"></span>
    </p>
  </div>
</template>

<script>
  export default {
    props: {
      label: {
        type: String,
        default: '人行征信账户(选填)'
      },
      linkText: {
        type: String,
        default: '如何获取？'
      },
      routerName: {
        type: String,
        default: 'applyCreditReport'
      },
      params: {
        type: Object,
        default () {
          return {}
        }
      },
      routerLinkComponentClass: {
        type: Array,
        default () {
          return []
        }
      },
      routerLinkComponentLinkClass: {
        type: Array,
        default () {
          return []
        }
      },
      isShowArrow: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style lang="scss" scoped>
  .router-link-component {
    &__des {
      position: relative;
      display: flex;
      height: 1rem;
      padding: 0 .3rem;
      align-items: center;
    }
    &__label {
      color: #000;
      font-size: .24rem;
    }
    &__link {
       display: flex;
       flex: 1;
       color: #1973C5;
       font-size: .24rem;
       justify-content: flex-end;
    }
  }
  .router-link-component__bg_white {
    background: #fff;
    .router-link-component__label {
      font-size: 0.32rem;
      color: #333;
    }
  }
  .router-link-component__link_block {
    display: flex;
    align-items: center;
    padding-right: .3rem;
    color: #333;
    font-size: .32rem;
    height: 100%;
  }
</style>
