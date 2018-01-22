<template>
  <div class="bankcard-container">
    <div class="bankcard-info">
      <img class="bankcard-img" :src="getPic()" alt="">
      <div class='name-common'>
        <p class="name-text">{{bankCardName}}</p>
        <p class="name-num">{{bankCardNo}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {}
    },
    props: {
      imgPath: {
        type: String,
        default: ''
      },
      bankCardName: {
        type: String,
        default: ''
      },
      bankCardNo: {
        type: String,
        default: ''
      }
    },
    methods: {
      getPic () {
        if (!this.imgPath) {
          return
        }
        return require(`../assets/bank_${this.imgPath.toLowerCase()}.png`)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .bankcard-container {
    .bankcard-img {
      width: 0.5rem;
      height: 0.5rem;
    }
    .bankcard-info {
      display: flex;
      padding: 0.3rem;
      background-color: #fff;
      border-radius: 4px;
      .name-common {
        padding-left: 0.2rem; 
      }
      .name-text {
        color: #444;
        font-size: .32rem;
      }
      .name-num {
        color: #666;
        font-size: .48rem;
        padding-top: 0.5rem; 
      }
    }
  }
</style>


