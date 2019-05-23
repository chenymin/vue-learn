<template>
  <div class="uploadspec-container">
    <my-header :title="title" :is-middle="true" @rule-back="backFromPage"></my-header>
    <!--材料上传规范页面-->
    <div class="uploaddes-page">
      <div class="uploaddes-page__top">
        <div class="uploaddes-page__top__require">照片拍摄要求</div>
        <div class="uploaddes-page__top__desc">
          <div class="uploaddes-page__top__desc__1">
            <div class="uploaddes-page--circle"></div>
            <div>确保照片完整无缺失无遮挡</div>
          </div>
          <div class="uploaddes-page__top__desc__1">
            <div class="uploaddes-page--circle"></div>
            <div>拍摄环境光线柔和</div>
          </div>
          <div class="uploaddes-page__top__desc__1">
            <div class="uploaddes-page--circle"></div>
            <div>照片信息清晰可见</div>
          </div>
        </div>
        <div class="uploaddes-page__top__img">
          <img src="./images/specs01.png"/>
          <img src="./images/specs02.png"/>
          <img src="./images/specs03.png"/>
          <img src="./images/specs04.png"/>
        </div>
      </div>
      <div class="uploaddes-page__middle">
        <div>申请必传资料</div>
        <p>工商营业执照
          <span>（请注意有效期限）</span>
        </p>
      </div>
      <div class="uploaddes-page__bottom">
        <img src="./images/specs10.png" height="267" width="173"/>
      </div>
    </div>
  </div>
</template>

<script>
  import MyHeader from '@/components/header'
  export default {
    data () {
      return {
        title: '材料上传规范',  // header的中间标题
        fromWhichPage: '',  // 通过这个变量判断是从哪个页面跳转到材料上传规范页面
        formPageTitle: ''  // 来自页面的title
      }
    },
    methods: {
      backFromPage () {  // 点击header里的返回，返回到上一个页面，如果fromWhichPage不等于1,2,3,4，就返回到
        if (!this.fromWhichPage) {      // 上传页面，如果是1,2,3,4就返回到对应的个人身份证明，企业一般经营，企业
          this.$router.push({           //  企业特许经营、其他页面
            path: '/apply/third'
          })
        } else {
          this.$router.push({
            name: 'uploaddetail',
            params: {
              'whichPage': this.fromWhichPage,
              'title': this.formPageTitle
            }
          })
        }
      }
    },
    components: {
      MyHeader
    },
    created () {
      this.fromWhichPage = this.$route.params.whichPage
      this.formPageTitle = this.$route.params.title
    }
}
</script>

<style lang="scss">
// 上传规范
.uploaddes-page{
  font-size: 0.32rem;
  padding-top: 0.4rem;
  padding-right: 0.8rem;
  padding-left: 0.8rem;
  padding-bottom: 1rem;
  text-align: center;
  background: #FFFFFF;
  &__top{
    &__require{
      color: #DD7066;
    }
    &__desc{
      text-align: left;
      font-size: 0.28rem;
      color: #000000;
      &__1{
        display: flex;
        flex-flow: row;
        margin-top: 0.4rem;
        flex: 1;
      }
    }
    &__img{
      display: flex;
      flex-flow: row;
      margin-top: 0.8rem;
      img{
        width: 1.3rem;
        height: 1.01rem;
        flex-grow: 1;
        margin: 0 0.06rem;
      }
    }
  }
  &__middle{
    margin-top: 0.6rem;
    div{
      color: #DD7066;
      letter-spacing: 0.04rem;
    }
    p{
      margin-top: 0.2rem;
      font-size: 0.28rem;
      color: #9C9C9C;
      span{
        color: #D96267;
      }
    }
  }
  &__bottom{
    margin-top: 0.08rem;
  }
  /*圆形*/
  &--circle{
    width: 0.12rem;
    height: 0.12rem;
    border-radius: 0.06rem;
    margin: auto 0;
    margin-right: 0.06rem;
    background: #9C9C9C;
  }
}
</style>
