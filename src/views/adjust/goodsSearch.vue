<template>
  <Layout name="LayoutHome">
    <div class="goods-search-wrap">
      <prompta-alert :is-show-title="false">
        <div class="prompta-alert-slot" slot="prompt-content">
          <p class="prompta-alert-slot__p">
            <label class="prompta-alert-slot__p__label">菜品名称:</label>
            <span class="prompta-alert-slot__p__val">{{currentChooseItem.product_name}}</span>
          </p>
          <p class="prompta-alert-slot__p">
            <label class="prompta-alert-slot__p__label">单价:</label>
            <input class="prompta-alert-slot__p__val" v-model="currentChooseItem.product_supply_price"></input>
          </p>
          <p class="prompta-alert-slot__p" v-if="false">
            <label class="prompta-alert-slot__p__label">是否刚调价:</label>
            <span class="prompta-alert-slot__p__val prompta-alert-slot__p__input"></span>
          </p>
          <p class="prompta-alert-slot__switch">
            <my-switch :label="'是否上架:'" :model="'onShelf'"></my-switch>
          </p>
        </div>
        <div class="prompta-alert-slot__btn-area"  slot="prompt-btn">
          <button class="prompta-alert-slot__btn-area-cancle" @click.stop="cancelAlertAction">取消</button>
          <button class="prompta-alert-slot__btn-area-confirm" @click.stop="confirmAlertAction">确定</button>
        </div>
      </prompta-alert>
      <p class="goods-search-wrap__area">
        <input class="goods-search-wrap__area__input" type="text" placeholder="请输入商品名" v-model="shopName">
        <button class="goods-search-wrap__area__btn iconfont icon-sousuo1" @click="searchGoods()">搜索</button>
      </p>
      <apply-list :list="searchProductList"
        @adjustListCom-price="priceAdjust"
        @adjustListCom-shelf="onShelf">
      </apply-list>
    </div>
  </Layout>
</template>

<script>
import Layout from '../../layouts/Layout'
import ApplyList from './components/list'
import {mapGetters} from 'vuex'
import adjustAction from './_mixin/adjustAction'

export default {
  mixins: [adjustAction],
  data () {
    return {
      shopName: ''
    }
  },
  computed: {
    ...mapGetters([
      'searchProductList'
    ])
  },
  methods: {
    searchGoods () {
      const params = Object.assign({}, {keywords: this.shopName})
      this.$store.dispatch('searchProductList', {params})
    }
  },
  components: {
    Layout,
    ApplyList
  }
}
</script>

<style lang="scss" scoped>
  .goods-search-wrap {
    height: 100% !important;
    background: #fff;
    padding: 0 0.2rem;
    &__area {
      display: flex;
      padding: 0.4rem 0.2rem 0.2rem;
    }
    &__area__input{
      font-size: 14px;
      flex: 1;
      line-height: 1rem;
      height: 1rem;
      color: #999;
      border: 0;
      border-radius: 6px;
      background: 0 0;
      border: 1px solid #eee;
      text-align: left;
      padding-left: 10px;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    &__area__btn {
       display: flex;
       justify-content: center;
       font-size: 14px;
       line-height: 1rem;
       height: 1rem;
       text-align: center;
       border: 0;
       border-radius: 3px;
       background: #f12c26;
       color: #fff;
       margin-left: 10px;
       position: relative;
       width: 1.8rem;
    }
    .icon-sousuo1 {
      &::before {
        font-size: 22px;
      }
    }
  }
</style>
