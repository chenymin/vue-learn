<template>
  <Portal to="popup">
    <PopupBase :label="label" @close="$emit('close')">
      <PopupOverlay slot="backdrop"/>
      <div class="ModalDialog__content">
        <slot/>
        <div class="ModalDialog__buttons">
          <button @click="$emit('no')">
            No
          </button>
          <button @click="$emit('yes')">
            Yes
          </button>
        </div>
      </div>
    </PopupBase>
  </Portal>
</template>

<script>
  import PopupBase from './PopupBase.vue'
  import PopupOverlay from './PopupOverlay.vue'

  export default {
    name: 'PopupModalDialog',
    props: {
      label: {
        required: true,
        type: String
      }
    },
    components: {
      PopupBase,
      PopupOverlay
    }
  }
</script>

<style>
  .ModalDialog__content {
    background-color: #fff;
    padding: 2em;
  }

  .ModalDialog__buttons {
    margin-top: 1em;
    text-align: right;
  }
</style>
