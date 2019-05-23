<template>
  <div class="icon-component">
    <img class="icon-component__img" :src="imagePath" alt="" @click.prevent="imgAction">
  </div>
</template>

<script>
  export default {
    computed: {
      imagePath () {
        return require(`./images/${this.imgPath}`)
      }
    },
    props: {
      imgPath: {
        type: String,
        default: 'icon_prompt.png'
      },
      eventKey: {
        type: String,
        default: 'alert-show'
      },
      message: {
        type: String,
        default: ''
      }
    },
    methods: {
      imgAction () {
        this.eventBus.$emit(this.eventKey, this.message)
      }
    }
  }
</script>

<style lang="scss">
  .icon-component {
    display: flex;
    align-items: center;
    height: 100%;
    .icon-component__img {
      width: .32rem;
      height: .32rem;
    }
  }
</style>
