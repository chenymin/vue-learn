<template>
  <div class="page-navigate">
    <div v-for="(item, index) in labelText" :key="index" class="flow" :class="{'active': currentIndex === index}">
      <div class="pentagram" v-if="currentIndex === index">
        <img src="../assets/star_five.png" alt="" class="star"/>
      </div>
      <div class="round hollow-round" :class="{'solid-round': currentIndex >= index}"></div>
      <div class="line" :class="{'noline': index === 3}"></div>
      <span class="text" :class="{'text-color': index === currentIndex}">{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        labelText: ['身份认证', '个人信息', '贷款信息', '材料上传']
      }
    },
    props: {
      currentIndex: {
        type: Number,
        default: 0
      }
    }
  }
</script>

<style lang="scss" scoped>
  .page-navigate{
    padding: 0.5rem 0 0.95rem 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .flow{
      display: flex;
      flex-direction: row;
      align-items: center;
      position: relative;
    }
    .text{
      position: absolute;
      top:0.45rem;
      left: -0.4rem;
      font-size: 0.24rem;
      width: 1rem;
    }
    .pentagram{
      position: absolute;
      top: 50%;
      margin-top: -0.25rem;
      width: 0.5rem;
      height: 0.5rem;
      border-radius: 50%;
      background: linear-gradient(to bottom, #e9bc5d, #e0ac60);
    }
    .round{
      width: 0.2rem;
      height: 0.2rem;
      border-radius: 50%;
    }
    .solid-round{
      background-color:#cda76e; 
    }
    .hollow-round{
      border:1px solid #cda76e;
    }
    .line{
      width: 1.35rem;
      border-top:1px dashed #cda76e;
    }
    .noline{
      width: 0;
    }
    .star{
      width: 0.24rem;
      position: absolute;
      top:0.13rem;
      left: 0.14rem;
    }
    .active .text{
      left: -0.22rem;
      color: #cda76e;
    }
  }
</style>

