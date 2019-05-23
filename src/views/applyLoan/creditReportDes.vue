<template>
  <div class="credit-report-page">
    <my-header v-bind="myHeaderInfo"></my-header>
    <p class='credit-report-page__title'>人行征信账户信息获取方法</p>
    <ul class="credit-report-page__list">
      <li class="credit-report-page__item">
        <p>1.注册并登录征信中心网站 </p>
        <p>（人行征信中心网址：<a class="credit-report-page__link" href="https://ipcrs.pbccrc.org.cn/">https://ipcrs.pbccrc.org.cn/</a>）</p>
      </li>
      <li class="credit-report-page__item">
        <p>2.注册成功并登录后，通过银行卡验证或问题验证，完成征信报告的申请。</p>
      </li>
      <li class="credit-report-page__item">
        <p>
          3.申请结果将在<span class="credit-report-page__em">24小时</span>后获得。若审核通过，手机将收到身份验证码。注：<span class="credit-report-page__em">身份验证码有效期为7天</span>，请及时填写
        </p>
      </li>
    </ul>
    <p class="credit-report-page__account">您也可以查看获取账户教程:
      <br>
      <a class="credit-report-page__link" href="https://ipcrs.pbccrc.org.cn/html/help_center5.html">
        https://ipcrs.pbccrc.org.cn/html/help_center5.html
      </a>
    </p>
  </div>
</template>

<script>
  import MyHeader from '@/components/header'
  export default {
    data () {
      return {
        myHeaderInfo: {
          title: '获取方法',
          isMiddle: true
        }
      }
    },
    components: {
      MyHeader
    }
  }
</script>

<style lang="scss">
  .credit-report-page {
    height: calc(100vh);
    background-color: #fff;
    &__title {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 1rem;
      color: #333333;
      font-size: .3rem;
      padding: 0 .3rem;
    }
    &__list {
      padding: 0 .3rem;
      font-size: .24rem;
      color: #333;
    }
    &__item {
     margin-bottom: .3rem;
    }
    &__account {
      padding: 0 .3rem;
      color: #333333;
      font-size: .3rem;
    }
    &__link {
      color: #4290C9;
    }
    &__em {
      color: #ED6861;
    }
  }
</style>
