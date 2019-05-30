<template>
  <EntityListingLayout>
    <NavFilter v-if="showFilter" :filters="filters" slot="filter"/>
    <EntityListingGrid v-if="view === 'grid'" :entities="entities" v-slot="{ entity }">
      <slot :entity="entity"/>
    </EntityListingGrid>
    <EntityListingTable v-else :entities="entities" v-slot="{ entity }">
      <slot :entity="entity"/>
    </EntityListingTable>
    <NavPagination v-if="showPagination" :pages="pages" slot="pagination"/>
  </EntityListingLayout>
</template>

<script>
import EntityListingGrid from './EntityListingGrid.vue'
import EntityListingLayout from './EntityListingLayout.vue'
import EntityListingTable from './EntityListingTable.vue'
import NavFilter from './NavFilter.vue'
import NavPagination from './NavPagination.vue'

export default {
  name: 'EntityListing',
  components: {
    EntityListingGrid,
    EntityListingLayout,
    EntityListingTable,
    NavFilter,
    NavPagination
  },
  inject: ['fetch'],
  props: {
    showFilter: {
      default: false,
      type: Boolean
    },
    showPagination: {
      default: false,
      type: Boolean
    },
    view: {
      default: 'grid',
      type: String
    }
  },
  data () {
    return {
      entities: [],
      // For demonstration purposes only.
      filters: [
        { slug: 'footwear', name: 'Footwear' },
        { slug: 'clothing', name: 'Clothing' }
      ],
      // For demonstration purposes only.
      pages: [1, 2, 3]
    }
  },
  async created () {
    this.entities = await this.fetch()
  }
}
</script>