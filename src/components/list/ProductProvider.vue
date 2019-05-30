<script>
export default {
  name: 'ProductProvider',
  provide: {
    fetch: () =>
      Promise.resolve([
        { id: 1, name: 'Pants', price: '€ 99' },
        { id: 2, name: 'Shoes', price: '€ 199' },
        { id: 3, name: 'Socks', price: '€ 9' }
      ])
  },
  render () {
    return this.$slots.default
  }
}
</script>