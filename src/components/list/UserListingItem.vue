<template>
  <div :class='$style.main'>
    <td>{{ entity.id }}</td>
    <td>{{ entity.name }}</td>
  </div>
</template>

<script>
export default {
  name: 'UserListingItem',
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
  display: contents;
}
</style>