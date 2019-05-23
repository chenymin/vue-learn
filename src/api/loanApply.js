import axios from '../utils/axios'

export default {
  /*
   *用户额度申请状态查询
   * */
  queryApplyStatus: () => axios.post('/entLimit/queryApplyStatus'),
  /*
   *用户额度信息查询
   * */
  queryApplyInfo: () => axios.post('/entLimit/queryLimitApplyInfo'),
  /*
   *立即申请额度获取applyToken
   * */
  applyNow: () => axios.post('/entLimit/limitApply'),
  /*
   *获取企业信息
   * */
  enterpriseInfoGet: (data) => axios.post('/entLimit/queryEnterpriseInfo', data),
  /*
   *保存企业信息
   * */
  enterpriseInfoSave: (data) => axios.post('/entLimit/saveEnterpriseInfo', data),
  /*
   *获取企业法人信息
   * */
  legalPersonInfoGet: (data) => axios.post('/entLimit/queryLegalPersonInfo', data),
  /*
   *发送验证码
   * */
  sendMsgVerification: (data) => axios.post('/entLimit/sendSmsValidate', data),
  /*
   *保存企业法人信息
   * */
  legalPersonInfoSave: (data) => axios.post('/entLimit/saveLegalPersonInfo', data),
  /*
   *上传图片
   * */
  uploadPic: (url = '/entLimit/uploadImageFile', data, config) => axios.post(url, data, config),
  /*
   *删除图片
   * */
  deletePic: (url = '/entLimit/deleteImageInfo', data) => axios.post('/entLimit/deleteImageInfo', data),
   /*
   *获取影像信息
   * */
  queryImageInfoList: (data) => axios.post('/entLimit/queryImageInfoList', data),
   /*
   *提交额度申请
   * */
  submitLimitApply: (data) => axios.post('/entLimit/submitLimitApply', data)
}
