<template>
  <div class="footer">
      <p class="footer__p">复星金服旗下<span class="footer__p__span">FinTech</span>供应链金融服务平台</p>
  </div>
</template>

<script>
  export default {}
</script>
<style lang="scss">
@import '../../scss/var.scss';
.footer {
    width: 100%;
    text-align: center;
    height: 1rem;
    line-height: 1rem;
    position: fixed;
    bottom: 0;
    background-color: #fff;
    &__p {
       font-size: $normal-font-size;
       color: #666;
       &__span {
           color: #BDA384;
           padding: 0 0.06rem;
       }
    }
}
</style>
