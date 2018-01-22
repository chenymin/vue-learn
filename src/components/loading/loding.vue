<template>
  <div class='loading-container'>
    <div class="cover-container" v-if="show"></div>
    <div class='spinner-warp' v-if="show">
      <div class="spinner">
        <div class="bar1 spinner-animation"></div>
        <div class="bar2 spinner-animation"></div>
        <div class="bar3 spinner-animation"></div>
        <div class="bar4 spinner-animation"></div>
        <div class="bar5 spinner-animation"></div>
        <div class="bar6 spinner-animation"></div>
        <div class="bar7 spinner-animation"></div>
        <div class="bar8 spinner-animation"></div>
        <div class="bar9 spinner-animation"></div>
        <div class="bar10 spinner-animation"></div>
        <div class="bar11 spinner-animation"></div>
        <div class="bar12 spinner-animation"></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        show: false
      }
    },
    methods: {
      loadShow () {
        this.show = true
      },
      loadHidden () {
        this.show = false
      }
    },
    mounted () {
      this.eventBus.$on('loding/show', this.loadShow)
      this.eventBus.$on('loding/hidden', this.loadHidden)
    },
    destroyed () {
      this.eventBus.$off('loding/show')
      this.eventBus.$off('loding/hidden')
    }
  }
</script>

<style lang="scss" scoped>
  .loading-container {
    .cover-container {
      position: absolute;
      top:0;
      width: 100%;
      height: 100%;
      z-index: 10
    }
    .spinner .spinner-animation {
      width: 5%;
      height: 15%;
      background-color: white;
      position: absolute;
      left: 50%;
      top: 50%;
      margin-left: -0.05rem;
      margin-top: -0.15rem;
      opacity: 0;
      border-radius: 30%;
      animation: fade 1s linear infinite;
    }
    .spinner {
      position: absolute;
      width: 1.5rem;
      height: 1.5rem;
      z-index: 11;
      top:50%;
      left: 50%;
      margin-left: -0.75rem;
      margin-top: -0.75rem;
      background-color: #333;
      opacity: 0.8;
      border-radius: 4px; 
      .bar1 {
        transform:rotate(0deg) translate(0, -142%); 
        animation-delay: 0s;
      }    
      .bar2 {
        transform:rotate(30deg) translate(0, -142%); 
        animation-delay: -0.9167s;
      }
      .bar3 {
        transform:rotate(60deg) translate(0, -142%); 
        animation-delay: -0.833s;
      }
      .bar4 {
        transform:rotate(90deg) translate(0, -142%); 
        animation-delay: -0.75s;
      }
      .bar5 {
        transform:rotate(120deg) translate(0, -142%); 
        animation-delay: -0.667s;
      }
      .bar6 {
        transform:rotate(150deg) translate(0, -142%); 
        animation-delay: -0.5833s;
      }
      .bar7 {
        transform:rotate(180deg) translate(0, -142%); 
        animation-delay: -0.5s;
      }
      .bar8 {
        transform:rotate(210deg) translate(0, -142%); 
        animation-delay: -0.41667s;
      }
      .bar9 {
        transform:rotate(240deg) translate(0, -142%); 
        animation-delay: -0.333s;
      }
      .bar10 {
        transform:rotate(270deg) translate(0, -142%); 
        animation-delay: -0.25s;
      }
      .bar11 {
        transform:rotate(300deg) translate(0, -142%); 
        animation-delay: -0.1667s;
      }
      .bar12 {
        transform:rotate(330deg) translate(0, -142%); 
        animation-delay: -0.0833s;
      }
    } 
    
    @keyframes fade{
      from {opacity: 1;}
      to {opacity: 0.25;}
    }
  }
</style>

