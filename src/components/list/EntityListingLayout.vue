<template>
  <div>
    <div v-if="$slots.filter">
      <slot name="filter"/>
    </div>
    <div :class="$style.list">
      <slot/>
    </div>
    <div v-if="$slots.pagination" :class="$style.pagination">
      <slot name="pagination"/>
    </div>
  </div>
</template>

<script>
export default {
  // TODO ListingLayout oder LayoutListing???
  name: 'EntityListingLayout'
}
</script>

<style module>
.list,
.pagination {
  margin-top: 2em;
}
</style>
