export default {
  functional: true,
  props: {
    objInfo: {
      type: Object,
      default () {
        return {}
      }
    },
    render: Function
  },
  render: (h, ctx) => {
    const params = {
      objInfo: ctx.props.objInfo
    }

    return ctx.props.render(h, params)
  }
}
