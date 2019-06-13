<template>
  <div class="upload-page">
    <div class="upload-page__standard">
			<img class="upload-page__standard__img" src="./images/viewText.png" alt="" />
			<span @click="showUploadRule">查看资料上传规范</span>
		</div>
    <detail-render class="upload-page__detail-render" :form-data="formData" :list="displayDetailInfo"></detail-render>
    <protocol :items="protocolData.items"
              v-model="protocolCode"
              name="checkboxChecked"
              class="upload-page__protocol">
      <span class="upload-page__blue-txt" slot="protocol-slot" @click.prevent="showProtocolSelectFun">《相关协议》</span>
    </protocol>
    <selection v-bind="selectionCard.props" v-model="selectionCard.model" ref="protocolSelect">
      <ul class="list" slot="selection-bottom">
        <li class="item" v-for="item in protocolList" ><a :href="item.contractUrl">{{ item.fileName }}</a></li>
      </ul>
    </selection>
    <button @click="submitFun" class="primary-button btn-top">提交</button>
  </div>
</template>

<script>
  import applyCommonMixin from '@/mixin/applyCommonMixin'
  import DetailRender from '@/components/detailListRender/detailRender'
  import Protocol from '@/components/protocol'
  import Selection from '@/components/selection'
  import { mapActions } from 'vuex'
  import {setStore, getStore, removeStore} from '@/utils/storage'
  import uploadInfo from 'pageConfigInfo/apply/uploadInfo'
  export default {
    mixins: [applyCommonMixin],
    data () {
      return {
        ...uploadInfo,
        protocolData: {
          items: [
            {
              fileName: '《相关协议》'
            }
          ]
        },
        protocolCode: '0',
        signTime: null
      }
    },
    methods: {
      isValidPic () {
        let isValid = true
        for (let i = 0, len = this.displayDetailInfo.length; i < len; i++) {
          const {label, model, needNum} = this.displayDetailInfo[i]
          if (this.formData[model].length < needNum) {
            isValid = false
            this.showToast(`请上传${label}`)
            break
          }
        }
        return isValid
      },
      submitFun () {
        if (!this.isValidPic()) {
          return
        }
        if (this.protocolCode === '0') {
          this.showToast('请阅读并勾选协议')
          return
        }
        let params = {signTime: this.signTime}
        this.submitLimitApply(params).then(({data, respCode}) => {
          if (respCode === '000000') {
            this.$router.push({
              name: 'applycomplete',
              query: {
                custName: data.applyInfo.custName,
                appAmt: data.applyInfo.appAmt,
                applyTime: data.applyInfo.applyTime
              }
            })
            removeStore('chbAndsTimeObj')
          }
        })
      },
      showUploadRule () {
        this.$router.push({name: 'uploadspec'})
      },
      getInitImageData () {  // 获取影像信息,然后把每种类型的图片push到formData对应的分类中
        this.queryImageInfoList().then(({data, respCode}) => {
          if (respCode === '000000') {
            Object.keys(this.typeObj).forEach(item => {
              const arrItem = data.imageInfoList.filter(({imageType}) => { return imageType === item })
              arrItem.length >= 1 && this.formData[this.typeObj[item]].push(...arrItem)
            })
          }
        })
      },
      ...mapActions([
        'queryImageInfoList',
        'submitLimitApply'
      ]),
      showToast (msg) {  // toast提示
        this.$store.commit('changeToast', {content: msg})
        this.eventBus.$emit('toast/show')
      },
      showProtocolSelectFun () {
        this.$refs.protocolSelect.showSelect()
      }
    },
    components: {
      DetailRender,
      Protocol,
      Selection
    },
    watch: {
      protocolCode (val) {  // 监听checkbox是否勾选，勾选了就改签约时间为当前时间，没有勾选不改签约时间
        if (val === '1') {
          this.signTime = new Date().format('yyyy-MM-dd hh:mm:ss')
        }
        setStore('chbAndsTimeObj', {val, 'signTime': this.signTime})
      }
    },
    mounted () {
      this.applyRouter.currentIndex = this.pageCurrentIndex
      // this.getInitImageData()
      if (getStore('chbAndsTimeObj')) {
        this.protocolCode = JSON.parse(getStore('chbAndsTimeObj')).val || '0'
        this.signTime = JSON.parse(getStore('chbAndsTimeObj')).signTime || new Date().format('yyyy-MM-dd hh:mm:ss')
      }
    }
  }
</script>

<style lang="scss">
  .upload-page {
    display: flex;
    flex-direction: column;
    background: #fff;
    height: calc(100vh - 3rem);
    &__standard {
      width: 2.8rem;
      height: 0.8rem;
      font-size: 0.24rem;
      background-color: #FFF5F5;
      border-radius: 0.4rem;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      align-self: center;
      &__img {
        width: 0.3rem;
        height: 0.34rem;
        margin-right: 0.15rem;
      }
    }
    &__detail-render {
      .item {
        .right-text {
          color: #D96267;
        }
        .txt-color {
          color: #333;
        }
      }
    }
    // 协议
    &__protocol {
      margin-top: 0.1rem!important;
      .protocol-label {
        color: #333!important;
      }
    }
    &__blue-txt {
      color: #599CCC!important;
    }
    .list {
      max-height: 6rem;
      overflow: auto;
      .item {
        position: relative;
        font-size: .3rem;
        color: #666;
        height: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        &:last-child {
          border-bottom: none;
        }
      }
    }
    .select-wrap {
      .list {
        .item {
          border-bottom: 1px solid #eee;
        }
      }
    }
  }
</style>
