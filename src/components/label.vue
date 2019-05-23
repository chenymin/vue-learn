<template>
  <div class="label-component">
    <p class="label-component__text">*填写人行征信账户信息，最高可获取
      <span class="label-component__text_em">50万</span>
      额度
    </p>
  </div>
</template>

<script>
  export default {
    props: {
      labelText: {
        type: String,
        default: ''
      }
    }
  }
</script>

<style lang="scss" scoped>
  .label-component {
    &__text {
      display: flex;
      align-items: center;
      height: 0.6rem;
      font-size: 0.24rem;
      color: #666;
      padding: 0.3rem;
    }
    &__text_em {
      color: #FA4444;
    }
  }
</style>
