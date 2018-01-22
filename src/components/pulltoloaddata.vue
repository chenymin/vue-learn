<template>
  <div class="pull-commpent-wrap">
    <div class="pull-commpent-anim-up-wrap"></div>
    <div class="pull-commpent-scroll-wrap" :id='pullScrollId'>
      <slot name="pull-commpent-slot">
      </slot>
    </div>
    <div class="pull-commpent-anim-bottom-wrap"></div>
  </div>
</template>
<script>
  export default {
    props: {
      pullScrollId: {
        type: String,
        defaults: 'pullScrollId'
      }
    },
    methods: {},
    mounted () {
    }
  }
</script>

<style lang="scss" scoped>

</style>

