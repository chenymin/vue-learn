<script>
export default {
  name: 'UserProvider',
  provide: {
    fetch: () =>
      Promise.resolve([
        { id: 1, name: 'Jane Doe' },
        { id: 2, name: 'John Doe' }
      ])
  },
  render () {
    return this.$slots.default
  }
}
</script>