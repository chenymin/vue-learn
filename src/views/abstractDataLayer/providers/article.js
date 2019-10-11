import makeProvider from './Provider'
import makeServiceDriver from './drivers/service'
import service from '../services/article'

export default makeProvider(makeServiceDriver({ service }))
