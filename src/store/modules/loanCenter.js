import * as types from '../mutation-types'
import LoanService from '@/api/loanCenter'
const state = {
  repayment: {},
  repaymentDetial: {},
  loanInfo: {
    limitStatus: '1',
    remainAmt: '50000',
    endDate: '20190601'
  },
  formDatas: {
    approveAmt: 5000,
    remainAmt: 5000,
    endDate: '20190601',
    startDate: '20190501',
    bankName: '工商银行',
    bankNo: '6222020903001483077',
    bankCode: 'ICBC'
  },
  myApplyFinanceList: [],
  borrowDetailDatas: {
    cino: 'YSB012019000000598001',
    actualSum: '1000',
    loanDays: '21',
    loanAmt: '50000',
    rtnTypes: '04',
    putoutDate: '20190122',
    dayRate: '0.2',
    plTermPri: '5000',
    plTermInt: '200',
    unpaySum: 5200,
    endDate: '20190521',
    status: '0'
  },
  contractList: []
}

const getters = {
  repayment: state => state.repayment,
  repaymentDetial: state => state.repaymentDetial,
  loanInfo: state => state.loanInfo,
  formDatas: state => state.formDatas,
  myApplyFinanceList: state => state.myApplyFinanceList,
  borrowDetailDatas: state => state.borrowDetailDatas,
  contractList: state => state.contractList
}

const mutations = {
  [types.REPAYMENT] (state, {data}) {
    state.repayment = data
  },
  [types.REPAYMENTDETAIL] (state, {data}) {
    state.repaymentDetial = data
  },
  [types.LOANINFO] (state, {data}) {
    state.loanInfo = data
    state.formDatas = data
  },
  [types.MYAPPLYFINANCELIST] (state, {data}) {
    state.myApplyFinanceList = data.cinoList
  },
  [types.APPLYDETAIL] (state, {data}) {
    state.borrowDetailDatas = data
  },
  [types.LOAN_CONTRACT] (state, {data}) {
    state.contractList = data.fileInfoList
  }
}

const actions = {
  async changeRepayment ({commit}, params) {
    const {data, respCode} = await LoanService.requiredRepaymentAmt(params)
    if (respCode === '000000') {
      data && commit(types.REPAYMENT, {data})
    }
    return {data, respCode}
  },
  async changeRepaymentDetial ({commit}, params) {
    const {data, respCode} = await LoanService.queryLoanInfoByMonth(params)
    if (respCode === '000000') {
      data && commit(types.REPAYMENTDETAIL, {data})
    }
    return {data, respCode}
  },
  async changeLoanInfo ({commit}, params) {
    const {data, respCode} = await LoanService.centerHome(params)
    if (respCode === '000000') {
      data && commit(types.LOANINFO, {data})
    }
    return {data, respCode}
  },
  async changeMyApplyFinanceList ({commit}, params) {
    const {data, respCode} = await LoanService.myFinanceList(params)
    if (respCode === '000000') {
      data && commit(types.MYAPPLYFINANCELIST, {data})
    }
    return {data, respCode}
  },
  async changeBorrowDetailDatas ({commit}, params) {
    const {data, respCode} = await LoanService.allRepayList(params)
    if (respCode === '000000') {
      data && commit(types.APPLYDETAIL, {data})
    }
    return {data, respCode}
  },
  async getContractListInfo ({commit}, params) {
    const {data, respCode} = await LoanService.queryContractListInfo(params)
    if (respCode === '000000') {
      data && commit(types.LOAN_CONTRACT, {data})
    }
    return {data, respCode}
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
