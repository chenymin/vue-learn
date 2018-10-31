import PromptaAlert from '../../../components/promptalert'
import MySwitch from '../../../components/switch'
import {mapGetters} from 'vuex'

export default {
  data () {
    return {
      currentChooseItem: {}
    }
  },
  computed: {
    ...mapGetters([
      'applyEdit'
    ])
  },
  methods: {
    priceAdjust (item) {
      console.log(item)
      this.currentChooseItem = Object.assign({}, item)
      this.eventBus.$emit('promptAlert/show')
    },
    onShelf ({shelfType, productId}) {
      const params = {productCode: productId, onShelf: shelfType}
      this.$store.dispatch('applyOnlineOrOffLine', {params}).then(({code}) => {
        if (code === 200) {
          this.$store.commit('changeToast', {content: `商品${shelfType === 1 ? '上架' : '下架'}成功，请等待后台审核`})
          this.eventBus.$emit('toast/show')
        }
      })
    },
    cancelAlertAction () {
      this.eventBus.$emit('promptAlert/hidden')
    },
    confirmAlertAction () {
      const {product_code, product_supply_price} = this.currentChooseItem
      const params = Object.assign({},
        {
          productCode: product_code,
          supplyPrice: product_supply_price,
          onShelf: this.applyEdit.onShelf
        })
      this.$store.dispatch('applyUpdatePrice', {params}).then(({code}) => {
        if (code === 200) {
          this.eventBus.$emit('promptAlert/hidden')
          this.$store.commit('changeToast', {content: `商品调价成功，请等待后台审核`})
          this.eventBus.$emit('toast/show')
        }
      })
    }
  },
  components: {
    PromptaAlert,
    MySwitch
  }
}
