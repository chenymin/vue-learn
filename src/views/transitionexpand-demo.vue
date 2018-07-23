<template>
  <div class="identity-valid-container">
    <confirm :text="'确定删除该图片'"></confirm>
    <div>
      <p class="accordion" :class="{'active': isShowIdCard}" @click.prevent="showIdCardUploadArea()">
        <label class='accordion-lable'>身份证照上传</label>
      </p>
      <div class="idcard-area">
        <p class="front-item">
          <upload-pic 
            :list='idCardFont.list' 
            :is-show="isShowIdCard" 
            :model="idCardFont.model"
            :bgPic="'idcard_front.png'"
            :at-least-img="idCardFont.atLeastImg"
            :label='idCardFont.label'
            :input-id='"idCardFont"'
            :valid-off='idCardFont.validOff'
            class='customized-cardfont'
            @upload-remove='removePic'
            >
          </upload-pic>
        </p>
        <p class="front-item">
          <upload-pic 
          :list='idCardBack.list'
          :bgPic="'idcard_back.png'" 
          :is-show="isShowIdCard"
          :model="idCardBack.model"
          :at-least-img="idCardBack.atLeastImg"
          :label='idCardBack.label'
          :valid-off='idCardBack.validOff'
          class='customized-cardback'
          @upload-remove='removePic'
          >
          </upload-pic>
        </p>
      </div>
    </div>
    <div v-for="(item, index) in listPics" :key="index">
      <p class="accordion" :class="{'active': item.isShow, 'no-box-show' : index === listPics.length - 1 && !item.isShow}" @click.prevent="showUploadArea(index)">
        <label class='accordion-lable'>{{item.label}}</label>
      </p>
      <upload-pic 
        :list='item.list' 
        :model='item.model'
        :limitImg='item.limitImg'
        :is-show="item.isShow"
        :at-least-img="item.atLeastImg"
        :label='item.label'
         :valid-off='item.validOff'
        @upload-remove='removePic'
        >
      </upload-pic>
    </div>
    <button class='primary-button top' @click.prevent="commitInfo" :disabled="isDisable">提交申请</button>
  </div>
</template>

<script>
  import _ from 'lodash'
  import formValidMixin from './_mixin/formValidMixin'
  import UploadPic from '../components/uploadPic'
  import Confirm from '../components/confirmdialogue'
  import {setStore} from '../utils/storage'
  import {getUrl} from '../utils/util'
  import {mapGetters} from 'vuex'

  export default {
    mixins: [formValidMixin],
    data () {
      return {
        isDisable: false,
        isShowIdCard: true,
        idCardFont: {
          list: [],
          label: '身份证正面',
          isShow: false,
          atLeastImg: 1,
          validOff: false,
          model: ['idCardImageOn']
        },
        idCardBack: {
          list: [],
          label: '身份证反面',
          isShow: false,
          atLeastImg: 1,
          validOff: false,
          model: ['idCardImagein']
        },
        listPics: [
          {
            list: [],
            label: '工作及收入证明',
            isShow: false,
            limitImg: 2,
            atLeastImg: 1,
            validOff: false,
            model: ['workImageOne', 'workImageTwo']
          },
          {
            list: [],
            label: '产调信息',
            isShow: false,
            limitImg: 3,
            atLeastImg: 1,
            validOff: false,
            model: ['chanDiaoImageOne', 'chanDiaoImageTwo', 'chanDiaoImageThree']
          },
          {
            list: [],
            label: '车位销售意向书',
            isShow: false,
            limitImg: 1,
            atLeastImg: 1,
            validOff: false,
            model: ['carAddressBookImage']
          },
          {
            list: [],
            label: '其他材料',
            isShow: false,
            limitImg: 5,
            validOff: true,
            model: ['otherImageOne', 'otherImageTwo', 'otherImageThree', 'otherImageFour', 'otherImageFive']
          }
        ],
        protocolData: {
          items: [
            {
              fileName: '《个人信用报告查询授权书》',
              contractUrl: `${getUrl()}/pdf/cwd_grzxbgsqs.pdf`
            }
          ]
        }
      }
    },
    computed: {
      ...mapGetters([
        'channelNo',
        'sellerId'
      ])
    },
    methods: {
      setStore,
      setDisable () {
        this.isDisable = false
      },
      showIdCardUploadArea () {
        this.isShowIdCard = !this.isShowIdCard
        _.forEach(this.listPics, (item, index) => {
          item.isShow = false
        })
      },
      showUploadArea (currentIndex) {
        this.isShowIdCard = false
        _.forEach(this.listPics, (item, index) => {
          if (currentIndex === index) {
            item.isShow = !item.isShow
          } else {
            item.isShow = false
          }
        })
      },
      commitInfo () {
        if (this.isFormValid()) {
          return
        }
        this.isDisable = true
        this.setStore('jumpToComplete', 1)
        this.$router.push({name: 'applycomplete'})

        const channelNo = this.channelNo
        const sellerId = this.sellerId
        const param = _.assign({}, {channelNo, sellerId, step: 4})
        this.$store.dispatch('savaLoanInfo', {param, fn: this.setDisable})
      },
      initData (image, address = '') {
        const {idImageOn, idImageIn, workImage, chandiaoImage, yixiangImage, otherImage} = image || {}
        this.idCardFont.list = idImageOn || []
        this.idCardBack.list = idImageIn || []
        this.listPics[0].list = workImage
        this.listPics[1].list = chandiaoImage
        this.listPics[2].list = yixiangImage
        this.listPics[3].list = otherImage

        if (address !== '' && address.indexOf('310000') > -1) {
          this.listPics[1].validOff = true
        }
      },
      removePic (fn) {
        this.fn = fn
        this.eventBus.$emit('confirm/show', true)
      },
      confirmRemove () {
        this.fn && this.fn()
      }
    },
    mounted () {
      this.eventBus.$on('confirm/ok', this.confirmRemove)
      this.initData(_.assign({}, this.loanInfo.image), this.loanInfo.address)
    },
    components: {
      UploadPic,
      Confirm
    },
    destroyed () {
      this.fn = null
      this.eventBus.$off('confirm/ok')
    }
  }
</script>

<style lang="scss" scoped>
.container {
  font-size: 0.28rem;
}
.expand-enter-active,
.expand-leave-active {
  transition-property: opacity, height;
}
.expand-enter,
.expand-leave-to {
  opacity: 0;
}

  .identity-valid-container {
    display: flex;
    flex-direction: column;
    .accordion {
      position: relative;
      display: flex;
      align-items: center;
      height: 1rem;
      background-color: #fff;
      color: #333333;
      font-size: .32rem;
      overflow: hidden;
      box-shadow: 0 5px 5px#eee;
      &::after {
        content: '';
        position: absolute;
        right: 5px;
        width: 12px;
        height: 12px;
        border-bottom: solid 2px #ccc;
        border-right: solid 2px #ccc;
        transform-origin:center center;
        transition: transform .2s ease-in;
        transform: rotate(45deg);
        top: 50%;
        margin-top: -6px;
        right: .3rem;
      }
      &::before {
        content: '';
        position: absolute;
        border-bottom: 1px solid #eee;
        width: 100%;
        height: 1px;
        margin-top: -1px;
        top: 100%;
      }
      .accordion-lable {
        padding-left: 0.3rem;
      }
    }
    .no-box-show {
      box-shadow: none;
    }
    .active {
      &::after {
        transform: rotate(-135deg);
        margin-top: 0px;
      }
    }
    .idcard-area {
      display: flex;
      flex-direction: row;
      .front-item {
        flex: 1;
      }
    }
    .top {
      margin-top: 0.3rem!important;
    }
  }
</style>