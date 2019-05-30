import EntityListing from '../components/list/EntityListing.vue'

export default class ListingBuilder {
  constructor () {
    this.props = {}
  }

  withProvider (provider) {
    this.provider = provider
    return this
  }

  withListingItem (item) {
    this.item = item
    return this
  }

  showFilter () {
    this.props.showFilter = true
    return this
  }

  showPagination () {
    this.props.showPagination = true
    return this
  }

  view (view) {
    this.props.view = view
    return this
  }

  build () {
    const Provider = this.provider
    const Item = this.item
    const props = this.props

    return {
      render (h) {
        return h(Provider, [
          h(
            EntityListing,
            {
              props,
              scopedSlots: { default: props => h(Item, { props }) }
            },
            [Item]
          )
        ])
      }
    }
  }
}
