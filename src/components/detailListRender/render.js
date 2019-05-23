export default {
  functional: true,
  props: {
    column: {
      type: Object,
      default () {
        return {}
      }
    },
    index: {
      type: Number,
      default: -1
    },
    value: {
      type: [Number, String, Array],
      default: ''
    },
    render: Function
  },
  render: (h, ctx) => {
    const params = {
      value: ctx.props.value,
      column: ctx.props.column,
      index: ctx.props.index
    }

    return ctx.props.render(h, params)
  }
}
