<template>
  <div class="uploadpic-container">
    <transition-expand>
      <div class="uploadpic-container__wrap" v-if='isShow'>
        <ul class="pic-list">
          <li class="list-item" v-for="(item, index) in imgList" :key='index'>
            <img class='upload-pic' :src='item.imageUrl' alt="" :class="{'aspectFill-x': item.classType, 'aspectFill-y': item.classType === 0}">
            <img class="img-remove" src="./images/icon_close.png" @click.prevent="imgRemove(index)">
          </li>
          <li class="list-item" v-if="imgList.length < maxNumImg">
            <label class="list-item-label" :for="inputId">
              <img class="pic-camera" src="./images/icon_add.png" alt="" v-if="status === 0">
              <img class='pic-bg' :src="getPic()" alt="">
              <!-- <span class="upload-text" v-if="status === 0">上传图片</span> -->
              <span class="upload-fail" v-if="status === 2">图片上传失败<br>点击重新上传</span>
              <div class="uploading" v-if="status === 1">
                <p class='text'>图片上传中</p>
                <p class="upload-progress">
                  <span class="progressing" :style="progressStyle"></span>
                </p>
              </div>
              <input ref="uploadFileInput" class="upload-input" type="file" :id="inputId" :accept="accept" @change.prevent="upload" :disabled='status === 1'>
            </label>
          </li>
        </ul>
      </div>
    </transition-expand>
  </div>
</template>

<script>
  import Exif from 'exif-js'
  import {getStore} from '../../utils/storage'
  import uploadPicService from '../../api/loanApply'
  import TransitionExpand from '../transition/transitionExpand'

  export default {
    data () {
      return {
        headerImage: '',
        imgList: this.list,
        currentIndex: 0,
        status: 0,
        progressStyle: {width: `${0}%`},
        removeIndex: 0
      }
    },
    props: {
      label: {
        type: String,
        default: ''
      },
      list: {
        type: Array,
        default () {
          return []
        }
      },
      limitImg: {
        type: Number,
        default: 1
      },
      accept: {
        type: String,
        default: 'image/jpg,image/jpeg,image/png,image/gif'
      },
      type: {
        type: Number,
        default: 1
      },
      isShow: {
        type: Boolean,
        default: false
      },
      model: {
        type: Array,
        default () {
          return []
        }
      },
      bgPic: {
        type: String,
        default: 'upld_info.png'
      },
      minNumImg: {
        type: Number,
        default: 0
      },
      maxNumImg: {
        type: Number,
        default: 0
      },
      inputId: {
        type: String,
        default: 'upload'
      },
      validOff: {
        type: Boolean,
        default: false
      },
      imageType: {
        type: String,
        default: ''
      },
      uploadUrl: {
        type: String,
        default: ''
      },
      deleteUrl: {
        type: String,
        default: ''
      }
    },
    methods: {
      getStore,
      upload (e) {
        let files = e.target.files || e.dataTransfer.files
        if (!files.length) return
        this.picValue = files[0]
        if (this.picValue.size > 10240000) {
          let msg = '上传大小不能超过10M'
          this.$store.commit('changeToast', {content: msg})
          this.eventBus.$emit('toast/show')
          return
        }
        this.imgPreview(this.picValue)
        return
      },
      imgPreview (file) {
        let self = this
        let Orientation
        // 去获取拍照时的信息，解决拍出来的照片旋转问题
        Exif.getData(file, function () {
          Orientation = Exif.getTag(this, 'Orientation')
        })
        // 看支持不支持FileReader
        if (!file || !window.FileReader) return

        if (/^image/.test(file.type)) {
          // 创建一个reader
          let reader = new FileReader()
          // 将图片2将转成 base64 格式
          reader.readAsDataURL(file)
          // 读取成功后的回调
          reader.onloadend = function () {
            let result = this.result
            let img = new Image()
            img.src = result
            // 判断图片是否大于100K,是就直接上传，反之压缩图片
            if (this.result.length <= (100 * 1024)) {
              self.headerImage = this.result
              // self.files.push(this.result)
              self.postImg()
            } else {
              img.onload = function () {
                let data = self.compress(img, Orientation)
                self.headerImage = data
                // self.files.push(data)
                self.postImg()
              }
            }
          }
        }
      },
      rotateImg (img, direction, canvas) {
        // 最小与最大旋转方向，图片旋转4次后回到原方向
        const minstep = 0
        const maxstep = 3
        if (img === null) return
        // img的高度和宽度不能在img元素隐藏后获取，否则会出错
        let height = img.height
        let width = img.width
        let step = 2
        if (step == null) {
          step = minstep
        }
        if (direction === 'right') {
          step++
          // 旋转到原位置，即超过最大值
          step > maxstep && (step = minstep)
        } else {
          step--
          step < minstep && (step = maxstep)
        }
        // 旋转角度以弧度值为参数
        let degree = step * 90 * Math.PI / 180
        let ctx = canvas.getContext('2d')
        switch (step) {
          case 0:
            canvas.width = width
            canvas.height = height
            ctx.drawImage(img, 0, 0)
            break
          case 1:
            canvas.width = height
            canvas.height = width
            ctx.rotate(degree)
            ctx.drawImage(img, 0, -height)
            break
          case 2:
            canvas.width = width
            canvas.height = height
            ctx.rotate(degree)
            ctx.drawImage(img, -width, -height)
            break
          case 3:
            canvas.width = height
            canvas.height = width
            ctx.rotate(degree)
            ctx.drawImage(img, -width, 0)
            break
        }
      },
      compress (img, Orientation) {
        let canvas = document.createElement('canvas')
        let ctx = canvas.getContext('2d')
        // 瓦片canvas
        let tCanvas = document.createElement('canvas')
        let tctx = tCanvas.getContext('2d')
        // let initSize = img.src.length
        let width = img.width
        let height = img.height
        // 如果图片大于四百万像素，计算压缩比并将大小压至400万以下
        let ratio
        if ((ratio = width * height / 4000000) > 1) {
          ratio = Math.sqrt(ratio)
          width /= ratio
          height /= ratio
        } else {
          ratio = 1
        }
        canvas.width = width
        canvas.height = height
        // 铺底色
        ctx.fillStyle = '#fff'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        // 如果图片像素大于100万则使用瓦片绘制
        let count
        if ((count = width * height / 1000000) > 1) {
          count = ~~(Math.sqrt(count) + 1) // 计算要分成多少块瓦片
          // 计算每块瓦片的宽和高
          let nw = ~~(width / count)
          let nh = ~~(height / count)
          tCanvas.width = nw
          tCanvas.height = nh
          for (let i = 0; i < count; i++) {
            for (let j = 0; j < count; j++) {
              tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh)
              ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh)
            }
          }
        } else {
          ctx.drawImage(img, 0, 0, width, height)
        }
        // 修复ios上传图片的时候 被旋转的问题
        if (Orientation !== '' && Orientation !== 1) {
          switch (Orientation) {
            case 6:// 需要顺时针（向左）90度旋转
              this.rotateImg(img, 'left', canvas)
              break
            case 8:// 需要逆时针（向右）90度旋转
              this.rotateImg(img, 'right', canvas)
              break
            case 3:// 需要180度旋转
              this.rotateImg(img, 'right', canvas) // 转两次
              this.rotateImg(img, 'right', canvas)
              break
          }
        }
        // 进行最小压缩
        let ndata = canvas.toDataURL('image/jpeg', 0.1)
        tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0
        return ndata
      },
      getPic () {
        return require(`./images/${this.bgPic}`)
      },
      imgRemove (index, id) {
        this.removeIndex = index
        this.$emit('upload-remove', this.confirmDeleteImg(index))
      },
      confirmDeleteImg (index) {
        let param = {}
        param.applyToken = getStore('applyToken')
        param.imageNo = this.imgList[index].imageNo
        uploadPicService.deletePic(this.deleteUrl, param).then(({data, respCode}) => {
          if (respCode === '000000') {
            this.currentIndex--
            this.imgList.splice(this.removeIndex, 1)
            this.eventBus.$emit('confirm/hidden')
          }
        })
      },
      postImg () {
        this.status = 1
        /* eslint-disable no-undef */
        let randomCode = new Date().getTime() + '-' + Math.ceil(Math.random() * 100)
        let param = new FormData() // 创建form对象
        param.append('applyToken', getStore('applyToken')) // 通过append向form对象添加数据
        param.append('file', this.picValue)
        param.append('randomCode', randomCode)
        param.append('imageType', this.imageType)
        uploadPicService.uploadPic(this.uploadUrl, param, {
          method: 'post',
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          onUploadProgress: (e) => {
            const percentCompleted = Math.round((e.loaded * 100) / e.total)
            this.progressStyle = {width: `${percentCompleted}%`}
          }
        }).then(({data, respCode}) => {
          this.$refs.uploadFileInput.value = null
          if (respCode === '000000') {
            this.status = 0
            this.currentIndex++
            this.imgList.push(data.imageInfo)
          } else {
            this.status = 2
          }
        }).catch(() => {
          this.status = 2
        })
        return true
      },
      resizeImage (item, mode) {
        const itemW = document.getElementsByClassName('list-item')[0].offsetWidth
        const itemH = document.getElementsByClassName('list-item')[0].offsetHeight
        const itemR = itemW / itemH
        // 显示框宽度W,高度H
        const image = new Image()
        image.src = item.fileUrl

        image.onload = () => {
          const imgW = image.naturalWidth
          const imgH = image.naturalHeight
          const imgR = imgW / imgH
          let resultMode
          switch (mode) {
            case 'aspectFill' :
              resultMode = imgR > 1 ? 'aspectFill-x' : 'aspectFill-y'
              break
            case 'wspectFill':
              resultMode = itemR > imgR ? 1 : 0
              break
            default:
          }
          this.$set(item, 'classType', resultMode)
        }
      },
      initImg () {
        this.imgList.map((item) => {
          // this.resizeImage(item, 'wspectFill')
        })
      }
    },
    watch: {
      'list' (val) {
        this.imgList = val
        this.initImg()
        this.currentIndex = this.imgList.length
      }
    },
    components: {
      TransitionExpand
    },
    mounted () {
      this.initImg()
    }
  }
</script>

<style lang="scss" scoped>
  .uploadpic-container {
    .pic-list {
      overflow: hidden;
      background-color: #fff;
    }

    .list-item {
      position: relative;
      display: flex;
      float: left;
      margin: 0.15rem;
      width:calc(50% - 0.3rem);
      height: 2.1rem;
      justify-content: center;
      overflow: hidden;
      border-radius: 6px;
      box-shadow: 0 5px 5px #d5d5d5;
      .list-item-label {
        display: flex;
        flex: 1;
      }
      .upload-input {
        display: none;
      }
      .upload-text {
        position: absolute;
        top: 50%;
        left: 50%;
        color: #fff;
        font-size: 0.24rem;
        width: 1.2rem;
        height: .3rem;
        margin-top: 0.1rem;
        margin-left: -0.45rem
      }
      .upload-fail {
        position: absolute;
        top: 50%;
        left: 50%;
        font-size: 0.24rem;
        color: #fff;
        width: 1.8rem;
        height: 0.64rem;
        margin-left: -0.9rem;
        margin-top: -0.375rem;
        text-align: center;
      }
      .uploading {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 1.5rem;
        height: .75rem;
        margin-left: -0.75rem;
        margin-top: -0.375rem;
        font-size: 0.24rem;
        color: #fff;
        text-align: center;
        .upload-progress {
          position: relative;
          margin-top: 0.25rem;
          border-radius: 4px;
          height: 0.1rem;
          background-color: #949494;
          .progressing {
            position: absolute;
            left: 0;
            border-radius: 4px;
            width: 0;
            height: 100%;
            background-color: #fff;
          }
        }
      }
      .pic-bg {
        width: 100%;
        height: 100%;
        border-radius: 6px;
      }
      .pic-camera {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0.6rem;
        height: 0.6rem;
        margin-top: -0.3rem;
        margin-left: -0.3rem;
      }
      .img-remove {
        position: absolute;
        right: 0.3rem;
        top: 0.3rem;
        width: 0.46rem;
        height: .46rem;
      }
      .upload-pic {
        position: absolute;
        width: 100%;
        height: 100%;
      }
      .prompting-text {
        position: absolute;
        top: 50%;
        left: 50%;
        color: #fff;
        font-size: 0.24rem;
      }
    }
    .aspectFill-y {
      height: 100%;
      left: 50%;
      transform: translateX(-50%);
    }
    .aspectFill-x {
      width: 100%;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  .customized-cardfont .pic-list, .customized-cardback .pic-list {
    padding: 0.15rem;
    .list-item {
      margin: 0.12rem 0;
      width: 100%;
    }
  }
</style>


