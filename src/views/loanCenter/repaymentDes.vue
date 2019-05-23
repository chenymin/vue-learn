<template>
  <!--还款说明界面-->
  <div class="repaymentdes-page">
  	<my-header :title="myHeaderInfo.title" :is-middle="myHeaderInfo.isMiddle" ></my-header>
    <!--顶部内容-->
    <div class="repaymentdes-page__contents">
    <div class="repaymentdes-page__contents__top">
      <h6 class="repaymentdes-page__contents__top__hdes">还款说明</h6>
      <p class="repaymentdes-page__contents__top__pdes">请在还款日前通过线上网上银行，或线下银行柜台汇款的方式将待还金额存至如下对公账号，还款备注
        <span class="repaymentdes-page__contents__top__pdes__span"> 请注明融资企业全称</span>，以免影响入账。
      </p>
    </div>
    <!--中间内容1-->
    <div class="repaymentdes-page__contents__middle1">
      <div class="repaymentdes-page__contents__middle1__users" >
        <div class="repaymentdes-page__contents__middle1__users__user">户名：</div>
        <div class="repaymentdes-page__contents__middle1__users__username">{{clientInfo.accountName}}</div>
      </div>
      <div class="repaymentdes-page__contents__middle1__bankinfo">
        <div class="repaymentdes-page__contents__middle1__bankinfo__banks">
          <div class="repaymentdes-page__contents__middle1__bankinfo__banks__bank">开户行：</div>
          <div class="repaymentdes-page__contents__middle1__bankinfo__banks__bankname">{{clientInfo.bankName}}</div>
        </div>
        <img  class="repaymentdes-page__contents__middle1__bankinfo__img" :src="clientInfo.bankImg">
      </div>
      <div class="repaymentdes-page__contents__middle1__accounts">
        <div class="repaymentdes-page__contents__middle1__accounts__account">账号：</div>
        <div class="repaymentdes-page__contents__middle1__accounts__accountname">{{clientInfo.accountNo}}</div>
      </div>
    </div>
    <!--中间内容2-->
    <div class="repaymentdes-page__contents__middle2">
      <h6 class="repaymentdes-page__contents__middle2__repaydesc">还款流程</h6>
      <div class="repaymentdes-page__contents__middle2--repaymoney">
        <div class="repaymentdes-page__contents--circle">1</div>
        <div class="repaymentdes-page__contents__middle2--repaymoney__desc">在「我的星鑫保」中查询本月待还金额</div>
      </div>
      <img class="repaymentdes-page__contents__middle2--img" src="./components/images/ping.png"/>
      <div class="repaymentdes-page__contents__middle2--repaymoney">
        <div class="repaymentdes-page__contents--circle">2</div>
        <div class="repaymentdes-page__contents__middle2--repaymoney__repaystoragedesc">通过网上银行，或线下银行柜台将还款存至上述对公账户</div>
      </div>

      <img class="repaymentdes-page__contents__middle2--img" src="./components/images/ping.png"/>

      <div class="repaymentdes-page__contents__middle2--repaymoney">
        <div class="repaymentdes-page__contents--circle">3</div>
        <div class="repaymentdes-page__contents__middle2--repaymoney__status">到账成功后，您可以在「我的星鑫保」里查看当月结清状态</div>
      </div>
    </div>
    <!--底部内容-->
    <div class="repaymentdes-page__contents__bottom">
      <h6 class="repaymentdes-page__contents__bottom__note">注意事项</h6>
      <div class="repaymentdes-page__contents__bottom__notedesc">
        1.&nbsp&nbsp还款时请务必在备注中注明融资企业全称，否则将影响入账。<br>
        2.&nbsp&nbsp若存在逾期，「本月待还」每日会增加上一日产生的逾期费用，请及时偿还款项。
      </div>
      <h6 class="repaymentdes-page__contents__bottom__hotline">客服热线<span>4007-008-807</span></h6>
    </div>
    </div>
  </div>
</template>

<script>
  import MyHeader from '@/components/header'
  export default {
    data () {
      return {
        myHeaderInfo: {
          title: '还款说明',
          isMiddle: true
        },
        clientInfos: {
          '101003SLH01': {
            accountName: '深圳星联商业保理有限公司',
            bankName: '上海银行浦西支行',
            bankImg: require('./components/images/bank.png'),
            accountNo: '03003089117'
          },
          '101003SHH01': {
            accountName: '上海化工品交易市场经营管理有限公司',
            bankName: '上海银行金桥支行',
            bankImg: require('./components/images/bank.png'),
            accountNo: '03003867535'
          }
        },
        clientInfo: {}
      }
    },
    mounted () {
      this.clientInfo = this.clientInfos['101003SLH01']
    },
    components: {
      MyHeader
    }
  }
</script>


<style lang="scss">
  /*还款说明界面*/
.repaymentdes-page {
  display: flex;
  flex-flow: column;
  padding: 0;
  background: #FFFFFF;
  &__contents {
   padding:0 0.3rem;
  /*<!--顶部内容-->*/
  &__top {
    padding: 0.15rem;
    display: flex;
    flex-flow: column;
    &__hdes{
      color: #666666;
      font-size: 0.30rem;
      margin: 0;
      padding: .2rem 0 0 0;
    }
    &__pdes{
      color: #666666;
      font-size: 0.26rem;
      margin: 0;
      padding: .25rem 0 0 0;
      text-align: justify;
      &__span{
        color: #CD3A3A;
        font-size: 0.265rem;
      }
    }
  }

  /*<!--中间内容1-->*/
  &__middle1 {
    border-style:solid solid solid solid;
    border-width: 6px 1px 1px 1px ;
    border-color: #A0ABBD #E9E9E9 #E9E9E9 #E9E9E9;
    display: flex;
    flex-flow: column;
    padding: 0.28rem;
    margin: .1rem 0 .58rem 0 ;
    background: #FFFFFF;
    &__users{
      font-size: 0.26rem;
      display: flex;
      flex-flow: column;
      &__user{
        color: #999999;
      }
      &__username{
        color: #231916;
        flex: 1;
      }
    }
    &__bankinfo{
      font-size: 0.26rem;
      display: flex;
      flex-flow: row;
      &__banks{
        flex-grow: 1;
        &__bank{
          color: #999999;
        }
        &__bankname{
          color: #231916;
          flex: 1;
        }
      }
      &__img{
        width: 2.18rem;
        height: 0.73rem;
      }
    }
    &__accounts{
      font-size: 0.26rem;
      display: flex;
      flex-flow: column;
      &__account{
        color: #999999;
      }
      &__accountname{
        color: #231916;
        flex: 1;
      }
    }
  }

  /*<!--中间内容2-->*/
  &__middle2 {
    display: flex;
    flex-flow: column;
    padding: 0.15rem;
    background: #FFFFFF;
    &__repaydesc{
      color: #666666;
      font-size: 0.30rem;
      margin: 0;
      padding: 0 0 .15rem 0;
    }
    &--repaymoney{
      display: flex;
      flex-flow: row;
      padding: .15rem 0 .15rem 0;
      &__desc{
        color: #666666;
        font-size: 0.25rem;
        padding-left: 0.15rem;
        text-align: justify;
        flex: 1;
      }
      &__repaystoragedesc{
        color: #666666;
        font-size: 0.25rem;
        padding-left: 0.15rem;
        text-align: justify;
        flex: 1;
      }
      &__status{
        color: #666666;
        font-size: 0.25rem;
        padding-left: 0.15rem;
        text-align: justify;
        flex: 1;
      }
    }
    &--img{
      width: 0.4rem;
      height: 0.44rem;
    }
  }

  /*<!--底部内容-->*/
  &__bottom {
    margin: .42rem 0 .7rem 0;
    background: #FFFFFF;
    text-align: justify;
    &__note{
      color: #666666;
      font-size: 0.30rem;
      margin: 0;
      padding: 0 0 .15rem .15rem;
    }
    &__notedesc{
      padding: 0.3rem;
      background: #FBF6F4;
      font-size: 0.22rem;
      color: #666666;
      line-height: 0.43rem;
    }
    &__hotline{
      color: #666666;
      font-size: 0.30rem;
      margin: 0;
      padding: .2rem 0 .15rem .15rem;
      span{
       margin-left: .18rem;
       color: #469BE8;
       font-size: .28rem
      }
    }
  }

  /*圆形*/
  &--circle{
    width: 0.4rem;
    height: 0.4rem;
    background: #A0ABBD;
    border-radius: 0.2rem;
    font-size: 0.25rem;
    text-align: center;
    color: #FFFFFF;
    line-height: 0.4rem;
  }
  }
}
</style>
