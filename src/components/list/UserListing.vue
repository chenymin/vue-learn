<template>
  <UserProvider>
    <EntityListing view='table' show-pagination v-slot='{ entity }'>
      <UserListingItem :entity='entity'/>
    </EntityListing>
  </UserProvider>
</template>

<script>
import EntityListing from './EntityListing.vue'
import UserListingItem from './UserListingItem.vue'
import UserProvider from './UserProvider.vue'

export default {
  name: 'UserListing',
  components: {
    EntityListing,
    UserListingItem,
    UserProvider
  }
}
</script>