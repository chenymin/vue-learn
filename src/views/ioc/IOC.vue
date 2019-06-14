<template>
  <div id="app">
    <h2>Products</h2>
    <ProductListing/>

    <h2>Users</h2>
    <UserListing/>
  </div>
</template>

<script>
  import ProductListing from './ProductListing'
  import UserListing from './UserListing'

  export default {
    components: {
      ProductListing,
      UserListing
    }
  }
</script>
