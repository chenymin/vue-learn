export default (Component, props) => ({
  functional: true,
  render (h) {
    return h(Component, { props })
  }
})
