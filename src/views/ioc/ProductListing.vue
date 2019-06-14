<template>
  <ul>
    <li v-for="product in products" :key="product.id">{{ product.title }}</li>
  </ul>
</template>

<script>
  export default {
    name: 'ProductListing',
    inject: ['productRepository'],
    data () {
      return { products: [] }
    },
    async created () {
      this.products = await this.productRepository.list()
    }
  }
</script>
