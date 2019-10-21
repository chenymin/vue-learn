<template>
  <Portal to="popup">
    <PopupBase
      :label="label"
      @close="$router.back()"
    >
      <slot name="backdrop" slot="backdrop"/>
      <slot/>
    </PopupBase>
  </Portal>
</template>

<script>
  import PopupBase from './PopupBase.vue'

  export default {
    name: 'PopupRouterView',
    props: {
      label: {
        required: true,
        type: String
      }
    },
    components: {
      PopupBase
    }
  }
</script>
