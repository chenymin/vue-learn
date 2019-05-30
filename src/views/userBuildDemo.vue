<template>
  <div class='test'>
    <h2>Product Listing</h2>
    <ProductListing/>

    <h2>User Listing</h2>
    <UserListing/>
  </div>
</template>
<script>
import ListingBuilder from '../builders/ListingBuilder'
import ListingDirector from '../builders/ListingDirector'
export default {
  components: {
    ProductListing: new ListingDirector(new ListingBuilder()).makeProductListing(),
    UserListing: new ListingDirector(new ListingBuilder()).makeUserListing()
  }
}
</script>

<style lang="scss" scoped>

h2 {
  font-size: 2em;
  margin-bottom: 0.75em;
}

h2:not(:first-child) {
  margin-top: 0.75em;
}

input,
textarea {
  border-radius: 0.25em;
  padding: 0.75em;
  border: 1px solid #999;
}
</style>
