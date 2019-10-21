<template>
  <div class="PopupLightbox">
    <div class="PopupLightbox__header">
      <button class="PopupLightbox__close" @click="$parent.$emit('close')">Close</button>
    </div>
    <div class="PopupLightbox__content">
      <slot/>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'PopupLightbox'
  }
</script>

<style>
  .PopupLightbox {
    margin: auto;
    max-width: 80%;
  }

  .PopupLightbox__header {
    text-align: right;
  }

  .PopupLightbox__content {
    margin-top: 0.5em;
  }
</style>
