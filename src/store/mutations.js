import _ from 'lodash'
import {removeStore} from '@/utils/storage'

export const changeToast = (state, obj) => {
  _.assign(state.global.toast, obj)
}

export const removePlatformStore = (state, obj) => {
  const removesKey = ['spouseInfo', 'emergencyInfo']
  _.forEach(removesKey, (item) => removeStore(item))
}
