<template>
  <table>
    <tbody>
      <tr v-for="entity in entities" :key="entity.id">
        <slot :entity="entity"/>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'EntityListingTable',
  props: {
    entities: {
      default: () => [],
      type: Array
    }
  }
}
</script>
