<template>
  <div class="pull-wrap">
    <header class="pull-wrap-header">
      Pull Tp Refresh
    </header>
    <p class="pull-wrap-header-space"></p>
    <pulltoload-data>
      <ul class="list" slot="pull-commpent-slot">
        <li class="item">1</li>
        <li class="item">2</li>
        <li class="item">3</li>
        <li class="item">4</li>
        <li class="item">5</li>
        <li class="item">6</li>
        <li class="item">7</li>
        <li class="item">8</li>
        <li class="item">9</li>
        <li class="item">10</li>
        <li class="item">11</li>
        <li class="item">12</li>
        <li class="item">13</li>
        <li class="item">14</li>
        <li class="item">15</li>
        <li class="item">16</li>
        <li class="item">17</li>
        <li class="item">18</li>
        <li class="item">19</li>
        <li class="item">20</li>
      </ul>
    </pulltoload-data>
  </div>
</template>

<script>
  import PulltoloadData from '../components/pulltoloaddata.vue'
  export default {
    data () {
      return {
        pullData: {
        }
      }
    },
    components: {
      PulltoloadData
    }
  }
</script>

<style lang="scss" scoped>
  .pull-wrap {
    background-color: #333;
    height: 95vh;
    .pull-wrap-header {
      position: fixed;
      width: 100%;
      height: 1rem;
      background-color: #ddd;
      font-size: 0.3rem;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1;
    }
    .pull-wrap-header-space {
      width: 100%;
      height: 1rem;
    }
    .list {
      .item {
        height: 1rem;
        font-size: 0.3rem;
      }
    }
  }
</style>

