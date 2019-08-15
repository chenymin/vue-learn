import applyInfo from 'pageConfigInfo/common'
import {setStore} from '@/utils/storage'

const {projectNo} = applyInfo
const platformType = ['Android', 'iOS']
export default function getPlatformUrl ({to, next, store}) {
  const {query: {platform}} = to
  setStore('platformType', platform || 'other')
  let terminalType = platformType.includes(platform) ? 'wap' : 'weixin'
  store.dispatch('getPlatformUrl', {projectNo, terminalType}).catch(() => {
    next()
  })
  return next()
}
