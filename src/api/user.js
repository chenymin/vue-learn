import axios from '../utils/axios'

export default {
  // 企业客户登陆或注册判断
  loginOrRegister: (data) => axios.post('/user/loginOrRegister', data),
  // 企业用户登陆
  entLogin: (data) => axios.post('/user/entLogin', data),
  // 企业用户注册
  entRegister: (data) => axios.post('/user/entRegister', data),
  // 企业用户找回密码
  entResetP: (data) => axios.post('/user/entResetP', data),
  // 查询客户是否存在额度申请
  queryIsExistApply: (data) => axios.post('/user/queryIsExistApply', data),
  // 获取全量银行信息列表
  queryAllBanksInfo: (data) => axios.get('/banksUtil/queryAllBanksInfo', data),
  // 找回密码发送短信
  sendResetPSms: (data) => axios.post('/user/sendResetPSms', data),
  // 修改密码
  modifyP: (data) => axios.post('/user/modifyP', data),
  // 退出登陆
  entLogout: (data) => axios.post('/user/loginOut', data),
  // 获取渠道中文名称
  queryChannelName: (data) => axios.post('/user/queryChannelName', data)
}
