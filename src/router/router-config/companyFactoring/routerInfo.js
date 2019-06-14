// 额度状态查询
const Status = r => require.ensure([], () => r(require('@/views/applyStatus/status')), 'chunk-status')

// 额度申请
const ApplyLoan = r => require.ensure([], () => r(require('@/views/applyLoan/applyRouter')), 'chunk-applyRouter')
const EnterpriseInfo = r => require.ensure([], () => r(require('@/views/applyLoan/enterpriseInfo')), 'chunk-enterpriseInfo')
const LegalInfo = r => require.ensure([], () => r(require('@/views/applyLoan/legalInfo')), 'chunk-legalInfo')
const Upload = r => require.ensure([], () => r(require('@/views/applyLoan/upload')), 'chunk-upload')
const UploadDetail = r => require.ensure([], () => r(require('@/views/applyLoan/uploadDetail')), 'chunk-uploadDetail')
const UploadSpec = r => require.ensure([], () => r(require('@/views/applyLoan/uploadSpec')), 'chunk-uploadSpec')
const Complete = r => require.ensure([], () => r(require('@/views/applyLoan/complete')), 'chunk-complete')

const UserBuildDemo = r => require.ensure([], () => r(require('@/views/userBuildDemo')), 'chunk-userBuildDemo')
const HookDemo = r => require.ensure([], () => r(require('@/views/hook/hookDemo')), 'chunk-userBuildDemo')
const IOC = r => require.ensure([], () => r(require('@/views/ioc/IOC')), 'chunk-userBuildDemo')

const routerList = [
  { name: 'builddemo', path: '/builddemo', component: UserBuildDemo, meta: { auth: false, title: '测试build模式', transitionName: `slide` } },
  { name: 'hookDemo', path: '/hookDemo', component: HookDemo, meta: { auth: false, title: '测试hook模式', transitionName: `slide` } },
  { name: 'iocDemo', path: '/iocDemo', component: IOC, meta: { auth: false, title: '测试hook模式', transitionName: `slide` } },
  // 额度状态
  {name: 'status', path: '/status', component: Status, meta: {auth: false, needIntercept: false, title: '额度状态', transitionName: `slide`}},
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

