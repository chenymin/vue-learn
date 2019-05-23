<template>
    <!--关于我们界面-->
  <div class="about-page">
    <!--上半部分-->
    <img @click="returnBack" class="about-page__back" src="./images/icon_back.png" alt="">
    <div class="about-page__top">
        <h6 class="about-page__top__us">关于我们</h6>
    </div>

    <!--中间部分-->
    <div class="about-page__middle">
      <h6 class="about-page__middle__fosun">复星金服</h6>
      <p>复星金服是复星旗下专注于银行、类金融、金融科技机构投资及运营管理的综合性金融服务平台。</p>
      <p>秉承复星“植根中国，服务全球十亿家庭客户，智造健康、快乐、富足的幸福生态系统”之愿景，复星金服致力于用创新化、国际化的金融服务助力消费升级和产业升级，矢志成为一家汇聚产业深度、全球广度和科技高度的综合性金融服务集团。</p>
      <p>聚焦供应链金融、普惠金融、汽车金融、支付及金融科技等相关领域，复星金服将金融与互联网技术深度融合，以大数据、区块链、人工智能等创新科技为引擎，以完备的风险管控体系为基石，为小微企业客户和高成长性家庭客户提供专业、高效、值得信赖的综合性金融服务。</p>
      <p>复星金服旗下拥有多家持牌金融机构，已获得第三方支付、互联网小贷、传统小贷、保理、融资租赁及企业征信等类金融牌照或资质。</p>
      <h6 class="about-page__middle__xinxinfu">深圳星联</h6>
      <p>深圳星联商业保理有限公司（简称“深圳星联”）成立于2016年6月15日，注册地是深圳市前海深港合作区，为复星国际全资子公司，注册资本1亿人民币，致力于成为未来复星银行业务排头兵。</p>
      <p> 母公司复星已形成“保险、产业运营、投资、资本管理”四大业务引擎，并矢志向“以保险为核心的综合金融能力”与“以产业深度为基础的投资能力” 双轮驱动的全球一流投资集团大步迈进。在投资理念上，复星坚持扎根中国，投资于中国成长根本动力，以及紧抓中国中产阶级生活方式改变带来的机遇，同时亦紧抓全球经济转型，将“中国动力嫁接全球资源”的投资模式融入价值投资理念，努力成为具备全球能力的中国专家，持续为社会和股东创造价值。</p>
    </div>

    <!--下半部分-->
    <div class="about-page__bottom">
      <label class="about-page__bottom__logo">复星金服旗下
        <span class="about-page__bottom__logo__span">FinTech</span> 金融服务平台
      </label>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      //
    }
  },
  methods: {
    returnBack () {  // 返回
      window.history.go(-1)
    }
  }
}
</script>


<style lang="scss">
  /*<!--关于我们-->*/
  .about-page{
    display: flex;
    flex-flow: column;
    padding-left: 0.82rem;
    background: #FFFFFF;
    &__back {
      position: absolute;
      left: 0.3rem;
      top: 0.3rem;
      width: 0.18rem;
    }
    /*<!--上半部分-->*/
    &__top{
      background:#FFFFFF url(images/bg.png) no-repeat right top;
      background-size: 4.48rem 3.48rem;
      height: 3.62rem;
      padding-top: 2.16rem;
      &__us{
        margin: 0;
        padding: 0;
        letter-spacing: 0.02rem;
        font-size:.56rem;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color: #333333;
        line-height:78px;
      }
    }
    /*<!--中间部分-->*/
    &__middle{
      margin-right: 0.5rem;
      &__fosun{
        padding: 0;
        letter-spacing: 0.02rem;
        font-size:0.41rem;
        color: #F08D00;
        margin: 0 0 0.30rem 0;
      }
      &__xinxinfu{
        padding: 0;
        display:inline-block;
        vertical-align:middle;
        letter-spacing: 0.02rem;
        margin: 0 0 0.48rem 0;
        font-size:.44rem;
        font-family:PingFangSC-Semibold;
        font-weight:600;
        color:#333;
        line-height:.62rem;
      }
      p{
        margin-bottom: 0.25rem;
        text-align: justify;
        font-size:.24rem;
        font-family:PingFangSC-Light;
        font-weight:300;
        color:#333;
        line-height:.36rem;
      }
    }
      /*<!--下半部分-->*/
    &__bottom{
      text-align: center;
      color: #666;
      font-size: .24rem;
      margin: 0.25rem 0.5rem 0.55rem 0;
      &__logo{
        &__span{
          color: #BDA384
        }
      }
    }
  }
</style>
