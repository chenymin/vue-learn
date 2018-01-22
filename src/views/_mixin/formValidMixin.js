import {formValid} from '../../utils/util'
import {mapGetters} from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'validatorMsg',
      'applyEdit',
      'loanInfo',
      'channelNo',
      'sellerId',
      'openId'
    ])
  },
  methods: {
    formValid,
    showToast (msg) {
      this.$store.commit('changeToast', {content: msg})
      this.eventBus.$emit('toast/show')
    },
    isFormValid () {
      let temp = false
      const {msg, isValid} = this.formValid(this.validatorMsg)
      if (!isValid) {
        temp = true
        this.showToast(msg)
        return temp
      }
    }
  }
}
