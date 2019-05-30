<template>
  <div :class='$style.main'>
    <div v-for='entity in entities' :key='entity.id'>
      <slot :entity='entity'/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EntityListingGrid',
  props: {
    entities: {
      default: () => [],
      type: Array
    }
  }
}
</script>

<style module>
.main {
  display: grid;
  grid-gap: 1.5em;
  grid-template-columns: 1fr 1fr 1fr;
}
</style>
