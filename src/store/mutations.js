import _ from 'lodash'

const defaultKey = {myInput: 'value', mySelect: 'defaultVal', myDistPicker: 'defaultVal'}
export const bindDefaultValue = (state, key) => {
  const info = state.global.currentData[key]
  state.apply.applyEdit = {}
  _.forEach(info, ({type, props, model}) => {
    if (model) {
      state.apply.applyEdit[model] = props[defaultKey[type]] || ''
    }
  })
}

export const bindValue = (state, {key, data}) => {
  const info = state.global.currentData[key]
  if (typeof data === 'string') {
    data = JSON.parse(data)
  }
  _.forEach(info, (item) => {
    let {type, props, model} = item
    if (model && !_.isEmpty(data)) {
      _.assign(props, {[defaultKey[type]]: data[model]})
    }

    if (model && type === 'myDistPicker') {
      const citys = _.split(data.city, '-')
      item.province = citys[0]
      item.city = citys[1]
      item.area = citys[2]
    }
  })
}

export const changeToast = (state, obj) => {
  _.assign(state.global.toast, obj)
}
