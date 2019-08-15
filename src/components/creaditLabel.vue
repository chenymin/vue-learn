<template>
  <div class="creadit-label-component">
    <label class="creadit-label-component__label">{{label}}</label>
    <p class="creadit-label-component__content">
      <span class="">请在下方填写您“人行征信中心平台”的登录名、登录密码，以及申请「个人信用报告」时收到的短信身份验证码。</span>
      <router-link :to="{name: routerName, query: params}" class="creadit-label-component__link">{{linkText}}</router-link>
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
        default: '详细步骤说'
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
      creaditLabelComponentClass: {
        type: Array,
        default () {
          return []
        }
      }
    }
  }
</script>

<style lang="scss">
  .creadit-label-component {
    display: flex;
    background-color: #fff;
    flex-direction: column;
    padding: 0 .3rem;
    margin-top: .2rem;
    &__label {
      height: .7rem;
      line-height: .7rem;
      color: #000;
      font-size: .24rem;
    }
    &__content {
      padding: .1rem .2rem;
      background:rgba(253,250,245,1);
      border: 1px solid rgba(239,213,200,1);
      font-size: .2rem;
      color: #666;
    }
    &__link {
      color: #2B99EA;
    }
  }
</style>
