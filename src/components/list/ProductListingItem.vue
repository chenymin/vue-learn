<template>
  <div :class="$style.main">
    <h3>{{ entity.name }}</h3>
    <span>{{ entity.price }}</span>
  </div>
</template>

<script>
export default {
  name: 'ProductListingItem',
  props: {
    entity: {
      default: () => {},
      type: Object
    }
  }
}
</script>

<style module>
.main {
  padding: 1em;
  border: 1px solid #e9e9e9;
  border-radius: 0.25em;
}
</style>