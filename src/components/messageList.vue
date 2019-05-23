<template>
  <section class="message-list-component">
    <div class="material-ready">
      <p class="material-text">{{material.title}}</p>
      <ol class="ol-wrap">
        <li class="item" v-for="(item, index) in material.list" :key="index">{{item}}</li>
      </ol>
    </div>
  </section>
</template>

<script>
  export default {
    data () {
      return {
      }
    },
    props: {
      material: {
        type: Object,
        default () {
          return {
            title: '',
            list: []
          }
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .message-list-component {
    background-color: #fff;
    .material-ready {
      border: 1px dashed #cda76e;
      background-color: #f5ede2;
      margin: 0 0.3rem;
      padding: 0.05rem;
      .material-text {
        padding-left: 0.3rem;
        font-size: 0.24rem;
        padding: 0.1rem;
      }
      .ol-wrap{
        font-size: 0.24rem;
      }
      .item {
        padding: 0.1rem;
      }
    }
  }
</style>
