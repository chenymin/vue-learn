<template>
  <nav>
    <ul :class="$style.list">
      <li v-for="filter in filters" :key="filter.slug" :class="$style.item">
        <a
          :href="`#${filter.slug}`"
          @click="$emit('filter', filter)"
          :class="$style.link"
        >{{ filter.name }}</a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'NavFilter',
  props: {
    filters: {
      default: () => [],
      type: Array
    }
  }
}
</script>

<style module>
.list {
  display: flex;
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
