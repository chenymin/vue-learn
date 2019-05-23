// 额度状态查询
const Status = r => require.ensure([], () => r(require('@/views/applyStatus/status')), 'chunk-status')
// 额度中心
const CenterHome = r => require.ensure([], () => r(require('@/views/loanCenter/centerHome')), 'chunk-centerHome')
const CenterDetail = r => require.ensure([], () => r(require('@/views/loanCenter/centerDetail')), 'chunk-centerDetail')
const BorrowHome = r => require.ensure([], () => r(require('@/views/loanCenter/borrow')), 'chunk-borrow')
const BorrowHistory = r => require.ensure([], () => r(require('@/views/loanCenter/borrowHistory')), 'chunk-borrowHistory')
const BorrowDetail = r => require.ensure([], () => r(require('@/views/loanCenter/borrowDetail')), 'chunk-borrowDetail')
const HistoryBorrowDetail = r => require.ensure([], () => r(require('@/views/loanCenter/historyBorrowDetail')), 'chunk-historyBorrowDetail')
const MyBankCard = r => require.ensure([], () => r(require('@/views/loanCenter/repaymentBankCard')), 'chunk-myBankCard')
const Contract = r => require.ensure([], () => r(require('@/views/loanCenter/contract')), 'chunk-contract')
const RepaymentDes = r => require.ensure([], () => r(require('@/views/loanCenter/repaymentDes')), 'chunk-repaymentDes')
const RepaymentList = r => require.ensure([], () => r(require('@/views/loanCenter/repayment')), 'chunk-repayment')

// 额度申请
const ApplyLoan = r => require.ensure([], () => r(require('@/views/applyLoan/applyRouter')), 'chunk-applyRouter')
const EnterpriseInfo = r => require.ensure([], () => r(require('@/views/applyLoan/enterpriseInfo')), 'chunk-enterpriseInfo')
const LegalInfo = r => require.ensure([], () => r(require('@/views/applyLoan/legalInfo')), 'chunk-legalInfo')
const Upload = r => require.ensure([], () => r(require('@/views/applyLoan/upload')), 'chunk-upload')
const UploadDetail = r => require.ensure([], () => r(require('@/views/applyLoan/uploadDetail')), 'chunk-uploadDetail')
const UploadSpec = r => require.ensure([], () => r(require('@/views/applyLoan/uploadSpec')), 'chunk-uploadSpec')
const Complete = r => require.ensure([], () => r(require('@/views/applyLoan/complete')), 'chunk-complete')

const routerList = [
  // 额度状态
  {name: 'status', path: '/status', component: Status, meta: {auth: false, needIntercept: false, title: '额度状态', transitionName: `slide`}},
  // 额度中心
  {name: 'centerHome', path: '/center/home', component: CenterHome, meta: {auth: false, title: '我的星鑫保', transitionName: `slide`}},
  {name: 'centerDetail', path: '/center/detail', component: CenterDetail, meta: {auth: false, title: '额度详情', transitionName: `slide`}},
  {name: 'borrowHistory', path: '/borrow/history', component: BorrowHistory, meta: {auth: false, title: '历史融资', transitionName: `slide`}},
  {name: 'borrowDetail', path: '/borrow/detail', component: BorrowDetail, meta: {auth: false, title: '融资详情', transitionName: `slide`}},
  {name: 'historyBorrowDetail', path: '/borrow/historyDetail', component: HistoryBorrowDetail, meta: {auth: false, title: '历史融资详情', transitionName: `slide`}},
  {name: 'bankCard', path: '/center/card', component: MyBankCard, meta: {auth: false, title: '我的银行卡', transitionName: `slide`}},
  {name: 'repaymentDes', path: '/repaymentDes', component: RepaymentDes, meta: {auth: false, title: '还款说明', transitionName: `slide`}},
  {name: 'contract', path: '/contract', component: Contract, meta: {auth: false, title: '查看合同', transitionName: `slide`}},
  {name: 'repaymentList', path: '/center/repayment', component: RepaymentList, meta: {auth: false, along: 'repaymentList', title: '我的还款', transitionName: `slide`}},
  {name: 'borrowHome', path: '/center/borrow', component: BorrowHome, meta: {auth: false, along: 'borrowHome', title: '我的借款', transitionName: `slide`}},
  // 申请
  {
    path: '/apply',
    component: ApplyLoan,
    meta: { auth: false, title: '额度申请' },
    children: [
      { name: 'applyFirst', path: 'first', component: EnterpriseInfo, meta: { auth: false, title: '额度申请', needIntercept: false } },
      { name: 'applySecond', path: 'second', component: LegalInfo, meta: { auth: false, title: '额度申请', needIntercept: false } },
      { name: 'applyThird', path: 'third', component: Upload, meta: {auth: false, title: '额度申请', needIntercept: false} },
      { name: 'applyComplete', path: 'complete', component: Complete, meta: { auth: false, title: '额度申请' } }
    ]
  },
  // 具体上传图片的页面
  { name: 'uploaddetail', path: '/uploaddetail', component: UploadDetail, meta: { auth: false, title: '材料上传', transitionName: `slide` } },
  // 上传图片规范
  { name: 'uploadspec', path: '/uploadspec', component: UploadSpec, meta: { auth: false, title: '材料上传规范', transitionName: `slide` } }
]

export default routerList

