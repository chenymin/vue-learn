<template>
  <nav>
    <ul :class="$style.list">
      <li v-for="page in pages" :key="`page-${page}`" :class="$style.item">
        <a :href="`#page-${page}`" @click="$emit('page', page)" :class="$style.link">{{ page }}</a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'NavPagination',
  props: {
    pages: {
      default: () => [],
      type: Array
    }
  }
}
</script>

<style module>
.list {
  display: flex;
  justify-content: center;
}

.item:not(:first-child) {
  margin-left: 1em;
}

.link {
  text-decoration: none;
}

.link:hover,
.link:focus {
  text-decoration: underline;
}
</style>
