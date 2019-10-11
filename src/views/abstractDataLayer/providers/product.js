import makeProvider from './Provider'
import makeVuexDriver from './drivers/vuex'
import store from '@/store/index'

export default makeProvider(makeVuexDriver({ namespace: 'carLoanApply', store }))
