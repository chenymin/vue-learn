<template>
  <div class="page-navigate-component">
    <ul class="page-navigate-component__list">
      <li v-for="(item, index) in labelText" :key="index" class="page-navigate-component__item" :class="{'active': currentIndex === index}">
        <div class="pentagram" v-if="currentIndex === index">
          <img src="./images/star_five.png" alt="" class="star"/>
        </div>
        <p class="round hollow-round" :class="{'solid-round': currentIndex >= index}"></p>
        <p class="line" :class="{'solid-line': currentIndex > index, 'noline': index === labelText.length - 1}"></p>
        <span class="text" :class="{'text-color': currentIndex >= index}">{{item}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    props: {
      currentIndex: {
        type: Number,
        default: 0
      },
      labelText: {
        type: Array,
        default: function () {
          return ['申请企业信息', '法定代表人信息', '材料上传', '提交成功']
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../scss/var';
  .page-navigate-component{
    padding: 0.5rem 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    &__list {
      display: flex;
      flex-direction: row;
      flex: 1;
    }
    &__item {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      flex: 1;
    }
    .text{
      font-size: 0.22rem;
      min-width: 1rem;
      padding-top: .2rem;
      color: #666;
    }
    .pentagram{
      position: absolute;
      top: -.06rem;
      width: 0.5rem;
      height: 0.5rem;
      border-radius: 50%;
      background: linear-gradient(to bottom, $pagenavigate-component-circle-bg-color1, $pagenavigate-component-circle-bg-color2);
      z-index: 3;
    }
    .round{
      width: 0.4rem;
      height: 0.4rem;
      border-radius: 50%;
    }
    .solid-round{
      background: linear-gradient(to bottom, $pagenavigate-component-circle-bg-color1,$pagenavigate-component-circle-bg-color2);
      border: none!important;
    }
    .hollow-round{
      border:1px solid $pagenavigate-component-circle-border-color;
    }
    .line{
      position: absolute;
      left: calc(50% + .2rem);
      top: 0.17rem;
      width: calc(100% - 0.4rem);
      border-top: 1px dashed $pagenavigate-component-circle-border-color;
      z-index: 0;
    }

    .solid-line {
      border: 1px solid $pagenavigate-component-circle-bg-color2;
    }
    .noline{
      width: 0;
    }
    .star{
      width: 0.24rem;
      position: absolute;
      top: 0.13rem;
      left: 0.14rem;
    }
    .active .text{
      color: $pagenavigate-component-text-color;
    }
  }
</style>

