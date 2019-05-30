<template>
  <ProductProvider>
    <EntityListing view="grid" show-filter show-pagination v-slot="{ entity }">
      <ProductListingItem :entity="entity"/>
    </EntityListing>
  </ProductProvider>
</template>

<script>
import EntityListing from './EntityListing.vue';
import ProductListingItem from './ProductListingItem.vue';
import ProductProvider from './ProductProvider.vue';

export default {
  name: 'ProductListing',
  components: {
    EntityListing,
    ProductListingItem,
    ProductProvider
  }
}
</script>