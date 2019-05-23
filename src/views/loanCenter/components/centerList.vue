<template>
  <div class="center-list-component">
    <ul class="center-list-component__list">
      <li class="center-list-component__item" v-for="(item, index) in list" :key="index">
        <router-link :to="{path: toUrl, query: {cino: item.cino}}">
          <div class="center-list-component__cino">
          	<p class="center-list-component__wrap">
          		<span class="center-list-component__wrap__cino-text">融资单号:{{item.cino}}</span>
          	</p>
            <p class="center-list-component__cino-status">
            	<img :src="imgStatusUrl(item.status)"  class="center-list-component__cino-status__img"/>
            </p>
          </div>
          <div class="center-list-component__detail-des">
            <p class="center-list-component__detail-des__item">
              <span class="center-list-component__detail-des_val" style="font-size:.36rem">{{item.loanAmt | formatMoney}}<span class="center-list-component__detail-des_yuan" style="font-size:.24rem">元</span></span>
              <span class="center-list-component__detail-des__label">融资金额</span>
            </p>
            <p class="center-list-component__detail-des__item">
              <span class="center-list-component__detail-des_val">{{item.loanDays}}<span style="font-size:.24rem">天</span></span>
              <span class="center-list-component__detail-des__label">期限</span>
            </p>
            <p class="center-list-component__detail-des__item">
              <span class="center-list-component__detail-des_val">{{item.endDate | formatDate}}</span>
              <span class="center-list-component__detail-des__label">到期日期</span>
            </p>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      imgName: {
        1: 'center-overdue',
        0: 'center-repayment',
        4: 'center-finish'
      }
    }
  },
  computed: {
  },
  props: {
    list: {
      type: Array,
      default () {
        return []
      }
    },
    toUrl: {
      type: String,
      default: ''
    },
    param: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  methods: {
    imgStatusUrl (key) {
      return require(`../components/images/center_list/${this.imgName[key]}.png`)
    }
  }
}
</script>

<style lang="scss">
  .center-list-component {
    &__list {
      background: #fff;
      font-size: .32rem;
       color: #333;
    }
    &__item {
      padding-bottom: 0.3rem;
      border: 1px solid rgba(220,220,220,0.5);
      border-radius:4px;
      margin-bottom: 0.25rem;
      box-shadow: 0 0.03rem 0.06rem #e3e3e3;
    }

    &__cino {
      display: flex;
      flex-direction: row;
      padding-bottom: 0.2rem;
      justify-content: space-around;
      align-items: center;
    }
    &__detail-des__item {
      display: flex;
      flex-direction: column;
      flex: 1;
      align-items: center;
    }
    &__detail-des {
      display: flex;
      &__label {
        font-size: 0.24rem;
      }
    }
    &__detail-des_val {
       font-weight:bold;
       font-size: .36rem;
    }
    &__wrap {
      flex: 3;
      position: relative;
      top: -.08rem;
    	&__cino-text {
      display: inline-block;
      width: 5rem;
      background: url(./images/trapezoid.png) no-repeat;
      background-size: cover;
      padding: .1rem 0 .1rem .2rem;
      font-size: .22rem;
    }
    }
    &__cino-status {
    	flex:1;
      text-align: right;
      padding-right: 0.23rem;
       &__img {
       	width: 0.91rem;
        height: 0.59rem;
        position: relative;
        top: -0.06rem;
       }
    }
  }
</style>
