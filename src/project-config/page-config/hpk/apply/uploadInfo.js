import uploadInfo from '@/project-config/template/personLoan/apply/uploadInfo'
import {mergeInfo} from '@/utils/util'

// 要添加的组件
const modifyPageInfo = {
  protocolList: [
    {
      fileName: '《海拍客星鑫保用户服务协议》',
      contractUrl: '/static/contract/contract-user-service.html'
    },
    {
      fileName: '《个人信用评估授权书》',
      contractUrl: '/static/contract/contract-personal-credit.html'
    },
    {
      fileName: '《企业信用评估授权书》',
      contractUrl: '/static/contract/contract-enterprise-credit.html'
    },
    {
      fileName: '《个人担保函》',
      contractUrl: '/static/contract/contract-user-service.html'
    }
  ]
}
export default mergeInfo(uploadInfo, modifyPageInfo)
