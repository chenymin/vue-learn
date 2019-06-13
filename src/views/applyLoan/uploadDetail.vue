<template>
  <div class="upload-detail-page">
    <my-header
    :title="title"
    :is-middle="true"
    :right-title="rightTitle"
    @header-right-space="showUploadRules">
    </my-header>
    <!-- 法定代表人身份证明 -->
    <div v-if="whichPage==1">
      <h3 class="upload-detail-page__title">请上传法定代表人身份证明</h3>
      <upload-pic
        :list='idCardFont.list'
        :is-show="idCardFont.isShow"
        :model="idCardFont.model"
        :bgPic="'idcard_front.png'"
        :min-num-img="idCardFont.minNumImg"
        :max-num-img="idCardFont.maxNumImg"
        :label='idCardFont.label'
        :valid-off='idCardFont.validOff'
        :imageType='idCardFont.imageType'
        inputId='idCardFont'
        class='customized-cardfont'
        >
      </upload-pic>
      <p class="upload-detail-page__txt">身份证正面照</p>
      <upload-pic
        :list='idCardBack.list'
        :is-show="idCardBack.isShow"
        :model="idCardBack.model"
        :bgPic="'idcard_back.png'"
        :min-num-img="idCardBack.minNumImg"
        :max-num-img="idCardBack.maxNumImg"
        :label='idCardBack.label'
        :valid-off='idCardBack.validOff'
        :imageType='idCardBack.imageType'
        inputId='idCardBack'
        class='customized-cardfont'
        >
      </upload-pic>
      <p class="upload-detail-page__txt">身份证背面照</p>
    </div>
    <!-- 企业一般经营资质证明 -->
    <div v-if="whichPage==2">
      <h3 class="upload-detail-page__title">请上传企业一般经营资质证明</h3>
      <upload-pic
        :list='businessLicense.list'
        :is-show="businessLicense.isShow"
        :model="businessLicense.model"
        :bgPic="'upld_info.png'"
        :min-num-img="businessLicense.minNumImg"
        :max-num-img="businessLicense.maxNumImg"
        :label='businessLicense.label'
        :valid-off='businessLicense.validOff'
        :imageType='businessLicense.imageType'
        inputId='businessLicense'
        class='customized-cardfont'
        >
      </upload-pic>
      <p class="upload-detail-page__txt">工商营业执照</p>
    </div>
    <!-- 企业特许经营资质证明 -->
    <div v-if="whichPage==3">
      <h3 class="upload-detail-page__title">请上传企业特许经营资质证明</h3>
      <section class="upload-detail-page__tips">经营场所门头照、经营场所内部照</section>
      <upload-pic
        :list='enterpriseSpecial.list'
        :is-show="enterpriseSpecial.isShow"
        :model="enterpriseSpecial.model"
        :bgPic="'upld_info.png'"
        :min-num-img="enterpriseSpecial.minNumImg"
        :max-num-img="enterpriseSpecial.maxNumImg"
        :label='enterpriseSpecial.label'
        :valid-off='enterpriseSpecial.validOff'
        :imageType='enterpriseSpecial.imageType'
        inputId='enterpriseSpecial'
        class='customized-cardfont'
        >
      </upload-pic>
    </div>
    <!-- 其他 -->
    <div v-if="whichPage==4">
      <h3 class="upload-detail-page__title">请上传其他资料图片</h3>
      <upload-pic
        :list='other.list'
        :is-show="other.isShow"
        :model="other.model"
        :bgPic="'upld_info.png'"
        :min-num-img="other.minNumImg"
        :max-num-img="other.maxNumImg"
        :label='other.label'
        :valid-off='other.validOff'
        class='customized-cardfont'
        :imageType='other.imageType'
        inputId='other'
        >
      </upload-pic>
    </div>
  </div>
</template>

<script>
  import MyHeader from '@/components/header'
  import UploadPic from '@/components/upload/uploadPic'
  import {setStore, getStore} from '@/utils/storage'
  import { mapActions } from 'vuex'
  export default {
    data () {
      return {
        whichPage: '1',
        title: '个人身份证明',  // header的中间标题
        rightTitle: '规范',  // header右边显示的文字
        idCardFont: {
          list: [],
          label: '身份证正面',
          isShow: true,  // 上传图片的栏位是否显示
          minNumImg: 1,
          maxNumImg: 1,
          validOff: false,
          // model: ['idCardImageOn'],
          imageType: '11'
        },
        idCardBack: {
          list: [],
          label: '身份证反面',
          isShow: true,
          minNumImg: 1,
          maxNumImg: 1,
          validOff: false,
          // model: ['idCardImageOn'],
          imageType: '12'
        },
        businessLicense: {
          list: [],
          label: '企业一般经营资质证明',
          isShow: true,
          minNumImg: 1,
          maxNumImg: 1,
          validOff: false,
          model: ['idCardImageOn'],
          imageType: '04'
        },
        enterpriseSpecial: {
          list: [],
          label: '企业特许经营资质证明',
          isShow: true,
          minNumImg: 2,
          maxNumImg: 10,
          validOff: false,
          model: ['idCardImageOn'],
          imageType: '10'
        },
        other: {
          list: [],
          label: '其他',
          isShow: true,
          minNumImg: 1,
          maxNumImg: 100,
          validOff: false,
          model: ['idCardImageOn'],
          imageType: '09'
        },
        imgListData: null
      }
    },
    methods: {
      showUploadRules () {  // 点击header里规范二字，展示上传规范页面
        this.$router.push({
          name: 'uploadspec',
          params: {
            'whichPage': this.whichPage,
            'title': this.title
          }
        })
      },
      getInitImg () {  // 进入这个页面显示哪个标题、哪个页面
        let initDataObj = {}
        // localstorage里存的initDataObj对象，如果路由里有，就从路由里面取数据，路由里没有就去localstorage里取
        initDataObj.whichPage = this.$route.params.whichPage || JSON.parse(getStore('uploadDetailObj')).whichPage
        initDataObj.title = this.$route.params.title || JSON.parse(getStore('uploadDetailObj')).title
        setStore('uploadDetailObj', JSON.stringify(initDataObj))  // 把路由带过来的参数存到localstorage中，防止刷新数据清空
        let ulDetailObjFromLStorage = JSON.parse(getStore('uploadDetailObj'))
        this.whichPage = ulDetailObjFromLStorage.whichPage  // 进入这个路由时显示哪个页面
        this.title = ulDetailObjFromLStorage.title  // 进入这个路由时header显示哪个标题
      },
      getPicData () {  // 从接口里获取图片信息
        this.queryImageInfoList().then(({data, respCode}) => {
          if (respCode === '000000') {
            this.imgListData = data.imageInfoList
            this.imgListData && this.imgListData.forEach(item => {
              switch (item.imageType) {
                case '11':
                  this.idCardFont.list.push(item)
                  break
                case '12':
                  this.idCardBack.list.push(item)
                  break
                case '04':
                  this.businessLicense.list.push(item)
                  break
                case '10':
                  this.enterpriseSpecial.list.push(item)
                  break
                case '09':
                  this.other.list.push(item)
                  break
              }
            })
          }
        })
      },
      ...mapActions([
        'queryImageInfoList'
      ])
    },
    components: {
      MyHeader,
      UploadPic
    },
    created () {
      this.getInitImg()
      // this.getPicData()
    }
  }
</script>

<style lang="scss">
.upload-detail-page {
  background: #fff;
  position: fixed;
  left:0;
  top: 0;
  right: 0;
  bottom: 0;
  &__title {
    font-size: .3rem;
    color: #C6935E;
    font-weight: normal;
    text-align: center;
    padding: .3rem 0 .15rem;
  }
  &__txt {
    font-size: .3rem;
    color: #333;
    text-align: center;
    padding: .12rem 0;
  }
  &__tips {
    width: 82%;
    height: .7rem;
    font-size: .24rem;
    color: #D6A16C;
    background-color: #FBF4F0;
    margin: .2rem auto;
    line-height: .7rem;
    padding-left: 8%;
  }
  // uploadpic组件样式的修改
  .uploadpic-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    &__wrap {
      width: 3.85rem;
      height: 2.45rem;
    }
  }

}
</style>

