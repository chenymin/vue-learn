<script>
  import containerFactory from './factories/container'
  import provider from './providers/article'

  import ListingContainer from './ListingContainer'

  export default containerFactory(ListingContainer, {
    provider
  })
</script>
