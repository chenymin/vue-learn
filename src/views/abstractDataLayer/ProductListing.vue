<script>
  import containerFactory from './factories/container'
  import provider from './providers/product'

  import ListingContainer from './ListingContainer'

  export default containerFactory(ListingContainer, {
    provider
  })
</script>
