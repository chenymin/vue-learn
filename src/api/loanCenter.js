import axios from '../utils/axios'
export default {
  /*
   *获取额度信息查询数据
   * */
  centerHome: (data) => axios.post('/entLimitCenter/queryLimitInfo', data),
  /*
   *借据查询-我的融资列表数据请求
   * */
  myFinanceList: (data) => axios.post('/entLimitCenter/queryLoanList', data),
  /*
   *借据详情查询-融资详情数据请求
   * */
  allRepayList: (data) => axios.post('/entLimitCenter/getLoanDetail', data),
  /*
   *我的还款-本月待还
   * */
  requiredRepaymentAmt: (data) => axios.post('/entLimitCenter/requiredRepaymentAmt', data),
  /*
   *我的还款信息详情
   * */
  queryLoanInfoByMonth: (data) => axios.post('/entLimitCenter/queryLoanInfoByMonth', data),
  /*
   *额度相关合同查询
   * */
  queryContractListInfo: (data) => axios.post('/entLimitCenter/queryContractListInfo', data)
}
