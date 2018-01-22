<template>
  <div class="circle-container">
    <div class="circle">
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .circle-container {
      @keyframes spin {
        to {
          transform: rotate(.5turn);
        }
      }
     .circle {
      position: relative;
      width: 3rem;
      height: 3rem;
      background: #ddd;
      border-radius: 50%;
      transform: rotate(-90deg);
      background-image: linear-gradient(to right, transparent 50%, #999 0);
      clip:rect(0,auto,auto,3rem);
      &::before {
        content: '';
        display: block;
        margin-left: 50%;
        height: 100%;
        background-color: inherit;
        border-radius: 0 100% 100% 0 / 50%;
        transform-origin: left;
        transform: rotate(0turn);
        animation: spin 10s linear infinite
      }
      &::after {
        content: '';
        display: block;
        height: 80%;
        width: 80%;
        position: absolute;
        z-index: 1;
        top: 10%;
        left: 10%;
        background-color: #fff;
        border-radius: 50%;
      }
    }
  }
</style>

