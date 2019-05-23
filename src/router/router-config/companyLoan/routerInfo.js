// 额度申请
const ApplyLoan = r => require.ensure([], () => r(require('@/views/applyLoan/applyRouter')), 'chunk-applyRouter')
const EnterpriseInfo = r => require.ensure([], () => r(require('@/views/applyLoan/enterpriseInfo')), 'chunk-enterpriseInfo')
const LegalInfo = r => require.ensure([], () => r(require('@/views/applyLoan/legalInfo')), 'chunk-legalInfo')
const AdditionalInfo = r => require.ensure([], () => r(require('@/views/applyLoan/additionalInfo')), 'chunk-additionalInfo')
const CreditReportDes = r => require.ensure([], () => r(require('@/views/applyLoan/creditReportDes')), 'chunk-creditReportDes')
const EmergencyInfo = r => require.ensure([], () => r(require('@/views/applyLoan/emergencyInfo')), 'chunk-emergencyInfo')
const SpouseInfo = r => require.ensure([], () => r(require('@/views/applyLoan/spouseInfo')), 'chunk-spouseInfo')
const Upload = r => require.ensure([], () => r(require('@/views/applyLoan/upload')), 'chunk-upload')
const UploadDetail = r => require.ensure([], () => r(require('@/views/applyLoan/uploadDetail')), 'chunk-uploadDetail')
const UploadSpec = r => require.ensure([], () => r(require('@/views/applyLoan/uploadSpec')), 'chunk-uploadSpec')
const Complete = r => require.ensure([], () => r(require('@/views/applyLoan/complete')), 'chunk-complete')
const Payment = r => require.ensure([], () => r(require('@/views/pay/payRouter')), 'chunk-payRouter')
const BorrowForPay = r => require.ensure([], () => r(require('@/views/pay/borrow')), 'chunk-borrow')
const PayResult = r => require.ensure([], () => r(require('@/views/pay/payResult')), 'chunk-payResult')

// 额度状态查询
const Status = r => require.ensure([], () => r(require('@/views/applyStatus/status')), 'chunk-status')
const routerList = [
  // 额度状态
  {name: 'status', path: '/status', component: Status, meta: {auth: false, needIntercept: false, title: '额度申请', transitionName: `slide`}},
  // 申请
  {
    path: '/apply',
    component: ApplyLoan,
    meta: { auth: false, title: '额度申请' },
    children: [
      { name: 'applyFirst', path: 'first', component: EnterpriseInfo, meta: { auth: false, title: '额度申请', needIntercept: false } },
      { name: 'applySecond', path: 'second', component: LegalInfo, meta: { auth: false, title: '额度申请', needIntercept: false } },
      { name: 'applyThird', path: 'third', component: AdditionalInfo, meta: {auth: false, title: '额度申请', needIntercept: false} },
      { name: 'applyFourth', path: 'fourth', component: Upload, meta: {auth: false, title: '额度申请', needIntercept: false} },
      { name: 'applyComplete', path: 'complete', component: Complete, meta: { auth: false, title: '额度申请' } },
      { name: 'applyEmergency', path: 'emergencyinfo', component: EmergencyInfo, meta: { auth: false, title: '紧急联系人信息' } },
      { name: 'applySpouse', path: 'spouseinfo', component: SpouseInfo, meta: { auth: false, title: '配偶信息' } }
    ]
  },
  { name: 'applyCreditReport', path: '/creditReport', component: CreditReportDes, meta: { auth: false, title: '获取方法' } },
  // 具体上传图片的页面
  { name: 'uploaddetail', path: '/uploaddetail', component: UploadDetail, meta: { auth: false, title: '材料上传', transitionName: `slide` } },
  // 上传图片规范
  { name: 'uploadspec', path: '/uploadspec', component: UploadSpec, meta: { auth: false, title: '材料上传规范', transitionName: `slide` } },
  {
    path: '/pay',
    component: Payment,
    meta: { auth: true, title: '支付', transitionName: `slide` },
    children: [
      { name: 'borrow', path: 'borrow', component: BorrowForPay, meta: { auth: false, title: '支付借款', needIntercept: false } },
      { name: 'result', path: 'result', component: PayResult, meta: { auth: false, title: '支付结果', needIntercept: false } }
    ]
  }
]

export default routerList
