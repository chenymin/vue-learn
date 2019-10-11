<template>
  <div id="app">
    <h2>Products (Vuex)</h2>
    <ProductListing/>

    <h2>Articles (API Service)</h2>
    <ArticleListing/>
  </div>
</template>

<script>
  import ArticleListing from './ArticleListing'
  import ProductListing from './ProductListing'

  export default {
    components: {
      ArticleListing,
      ProductListing
    }
  }
</script>
