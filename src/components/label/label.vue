<template>
  <div class="label-component">
    <p class="label-component__text" v-if="!render">*填写人行征信账户信息，最高可获取
      <span class="label-component__text_em">50万</span>
      额度
    </p>
    <render :render="render" v-if="render"></render>
  </div>
</template>

<script>
  import render from './render'
  export default {
    props: {
      labelText: {
        type: String,
        default: ''
      },
      render: Function
    },
    components: {
      render
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
    &__text-color_orange {
      color: #FF864A;
    }
    &__text_size {
      display: flex;
      align-items: center;
      height: 0.6rem;
      font-size: 0.24rem;
      padding: 0.3rem;
    }
  }
</style>
