<template>
  <Layout name="LayoutHome">
   <div class="apply-price-wrap">
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
     <!--<router-link :to='{name: "goodsSearch"}'-->
                  <!--class="apply-price-wrap__search-btn iconfont icon-sousuo1"-->
                  <!--v-if="listsObj.foodList.length > 0">-->
     <!--</router-link>-->
      <div class="apply-price-wrap__menu-nav" ref="menuWrapper">
        <ul class="apply-price-wrap__menu-nav__list">
          <li class="apply-price-wrap__menu-nav__list__item"
              v-for="(item, index) in listsObj.menuList"
              :key="index"
              :class="{'apply-price-wrap__menu-nav__list__item-active': currentIndex === index}"
              @click="selectMenu(index,$event)" ref="menuList">
            <span>{{item.category_name}}</span>
          </li>
        </ul>
      </div>
      <div class="apply-price-wrap__menu-content" ref="foodsWrapper">
        <ul>
          <li class="apply-price-wrap__menu-content-child"
              v-for="(item, index) in listsObj.foodList"
              :key="index"
              ref="foodList">
            <h4 class="apply-price-wrap__menu-content-child__title">{{item.category_name}}</h4>
            <adjust-list :list="item.productList"
                         :small-img='true'
                         :is-list-border='true'
                         :is-ul-padding='true'
                         :is-has-title='true'
                         @adjustListCom-price="priceAdjust"
                         @adjustListCom-shelf="onShelf"
            >
            </adjust-list>
          </li>
        </ul>
      </div>
    </div>
  </Layout>
</template>

<script>
import Layout from '../../layouts/Layout'
import AdjustList from './components/list'
import {mapGetters} from 'vuex'
import adjustAction from './_mixin/adjustAction'
import BScroll from 'better-scroll'

export default {
  name: 'container',
  mixins: [adjustAction],
  data () {
    return {
      listHeight: [],
      scrollY: 0,
      list: [
        {
          category_id: 1000,
          category_name: '赠品',
          productList: [
            {
              category_id: 1000,
              category_name: '赠品',
              product_id: 83230,
              product_name: '小米辣约5颗 （限一份）',
              description: '小米辣约5颗 （限一份）',
              is_sold_out: 0,
              is_updatePrice: null,
              on_shelf: 0,
              product_supply_price: 20,
              product_unit: '份',
              product_pic_url: 'https://tangcl.oss-cn-beijing.aliyuncs.com/images/bd717600-f188-4b8a-b3fe-547f0a3d5b0b.jpg',
              product_code: '8775210118',
              shop_id: 10134
            },
            {
              category_id: 1000,
              category_name: '赠品2',
              product_id: 83227,
              product_name: '测试商品001',
              description: '测试商品001',
              is_sold_out: 0,
              is_updatePrice: null,
              on_shelf: 0,
              product_supply_price: 12.89,
              product_unit: '份',
              product_pic_url: 'https://tangcl.oss-cn-beijing.aliyuncs.com/images/adf950fb-ad2a-47b4-b36a-c34c31370ebb.jpg',
              product_code: '0053223056',
              shop_id: 10134
            },
            {
              category_id: 1000,
              category_name: '赠品3',
              product_id: 83227,
              product_name: '测试商品001',
              description: '测试商品001',
              is_sold_out: 0,
              is_updatePrice: null,
              on_shelf: 0,
              product_supply_price: 12.89,
              product_unit: '份',
              product_pic_url: 'https://tangcl.oss-cn-beijing.aliyuncs.com/images/adf950fb-ad2a-47b4-b36a-c34c31370ebb.jpg',
              product_code: '0053223056',
              shop_id: 10134
            },
            {
              category_id: 1000,
              category_name: '赠品4',
              product_id: 83227,
              product_name: '测试商品001',
              description: '测试商品001',
              is_sold_out: 0,
              is_updatePrice: null,
              on_shelf: 0,
              product_supply_price: 12.89,
              product_unit: '份',
              product_pic_url: 'https://tangcl.oss-cn-beijing.aliyuncs.com/images/adf950fb-ad2a-47b4-b36a-c34c31370ebb.jpg',
              product_code: '0053223056',
              shop_id: 10134
            },
            {
              category_id: 1000,
              category_name: '赠品',
              product_id: 83227,
              product_name: '测试商品001',
              description: '测试商品001',
              is_sold_out: 0,
              is_updatePrice: null,
              on_shelf: 0,
              product_supply_price: 12.89,
              product_unit: '份',
              product_pic_url: 'https://tangcl.oss-cn-beijing.aliyuncs.com/images/adf950fb-ad2a-47b4-b36a-c34c31370ebb.jpg',
              product_code: '0053223056',
              shop_id: 10134
            },
            {
              category_id: 1000,
              category_name: '赠品5',
              product_id: 83227,
              product_name: '测试商品001',
              description: '测试商品001',
              is_sold_out: 0,
              is_updatePrice: null,
              on_shelf: 0,
              product_supply_price: 12.89,
              product_unit: '份',
              product_pic_url: 'https://tangcl.oss-cn-beijing.aliyuncs.com/images/adf950fb-ad2a-47b4-b36a-c34c31370ebb.jpg',
              product_code: '0053223056',
              shop_id: 10134
            }
          ]
        },
        {
          category_id: 1000,
          category_name: '赠品2',
          productList: [
            {
              category_id: 1000,
              category_name: '赠品',
              product_id: 83230,
              product_name: '小米辣约5颗 （限一份）',
              description: '小米辣约5颗 （限一份）',
              is_sold_out: 0,
              is_updatePrice: null,
              on_shelf: 0,
              product_supply_price: 20,
              product_unit: '份',
              product_pic_url: 'https://tangcl.oss-cn-beijing.aliyuncs.com/images/bd717600-f188-4b8a-b3fe-547f0a3d5b0b.jpg',
              product_code: '8775210118',
              shop_id: 10134
            },
            {
              category_id: 1000,
              category_name: '赠品2',
              product_id: 83227,
              product_name: '测试商品001',
              description: '测试商品001',
              is_sold_out: 0,
              is_updatePrice: null,
              on_shelf: 0,
              product_supply_price: 12.89,
              product_unit: '份',
              product_pic_url: 'https://tangcl.oss-cn-beijing.aliyuncs.com/images/adf950fb-ad2a-47b4-b36a-c34c31370ebb.jpg',
              product_code: '0053223056',
              shop_id: 10134
            },
            {
              category_id: 1000,
              category_name: '赠品3',
              product_id: 83227,
              product_name: '测试商品001',
              description: '测试商品001',
              is_sold_out: 0,
              is_updatePrice: null,
              on_shelf: 0,
              product_supply_price: 12.89,
              product_unit: '份',
              product_pic_url: 'https://tangcl.oss-cn-beijing.aliyuncs.com/images/adf950fb-ad2a-47b4-b36a-c34c31370ebb.jpg',
              product_code: '0053223056',
              shop_id: 10134
            },
            {
              category_id: 1000,
              category_name: '赠品4',
              product_id: 83227,
              product_name: '测试商品001',
              description: '测试商品001',
              is_sold_out: 0,
              is_updatePrice: null,
              on_shelf: 0,
              product_supply_price: 12.89,
              product_unit: '份',
              product_pic_url: 'https://tangcl.oss-cn-beijing.aliyuncs.com/images/adf950fb-ad2a-47b4-b36a-c34c31370ebb.jpg',
              product_code: '0053223056',
              shop_id: 10134
            },
            {
              category_id: 1000,
              category_name: '赠品',
              product_id: 83227,
              product_name: '测试商品001',
              description: '测试商品001',
              is_sold_out: 0,
              is_updatePrice: null,
              on_shelf: 0,
              product_supply_price: 12.89,
              product_unit: '份',
              product_pic_url: 'https://tangcl.oss-cn-beijing.aliyuncs.com/images/adf950fb-ad2a-47b4-b36a-c34c31370ebb.jpg',
              product_code: '0053223056',
              shop_id: 10134
            },
            {
              category_id: 1000,
              category_name: '赠品5',
              product_id: 83227,
              product_name: '测试商品001',
              description: '测试商品001',
              is_sold_out: 0,
              is_updatePrice: null,
              on_shelf: 0,
              product_supply_price: 12.89,
              product_unit: '份',
              product_pic_url: 'https://tangcl.oss-cn-beijing.aliyuncs.com/images/adf950fb-ad2a-47b4-b36a-c34c31370ebb.jpg',
              product_code: '0053223056',
              shop_id: 10134
            }
          ]
        },
        {
          category_id: 1000,
          category_name: '赠品3',
          productList: [
            {
              category_id: 1000,
              category_name: '赠品',
              product_id: 83230,
              product_name: '小米辣约5颗 （限一份）',
              description: '小米辣约5颗 （限一份）',
              is_sold_out: 0,
              is_updatePrice: null,
              on_shelf: 0,
              product_supply_price: 20,
              product_unit: '份',
              product_pic_url: 'https://tangcl.oss-cn-beijing.aliyuncs.com/images/bd717600-f188-4b8a-b3fe-547f0a3d5b0b.jpg',
              product_code: '8775210118',
              shop_id: 10134
            },
            {
              category_id: 1000,
              category_name: '赠品2',
              product_id: 83227,
              product_name: '测试商品001',
              description: '测试商品001',
              is_sold_out: 0,
              is_updatePrice: null,
              on_shelf: 0,
              product_supply_price: 12.89,
              product_unit: '份',
              product_pic_url: 'https://tangcl.oss-cn-beijing.aliyuncs.com/images/adf950fb-ad2a-47b4-b36a-c34c31370ebb.jpg',
              product_code: '0053223056',
              shop_id: 10134
            },
            {
              category_id: 1000,
              category_name: '赠品3',
              product_id: 83227,
              product_name: '测试商品001',
              description: '测试商品001',
              is_sold_out: 0,
              is_updatePrice: null,
              on_shelf: 0,
              product_supply_price: 12.89,
              product_unit: '份',
              product_pic_url: 'https://tangcl.oss-cn-beijing.aliyuncs.com/images/adf950fb-ad2a-47b4-b36a-c34c31370ebb.jpg',
              product_code: '0053223056',
              shop_id: 10134
            },
            {
              category_id: 1000,
              category_name: '赠品4',
              product_id: 83227,
              product_name: '测试商品001',
              description: '测试商品001',
              is_sold_out: 0,
              is_updatePrice: null,
              on_shelf: 0,
              product_supply_price: 12.89,
              product_unit: '份',
              product_pic_url: 'https://tangcl.oss-cn-beijing.aliyuncs.com/images/adf950fb-ad2a-47b4-b36a-c34c31370ebb.jpg',
              product_code: '0053223056',
              shop_id: 10134
            },
            {
              category_id: 1000,
              category_name: '赠品',
              product_id: 83227,
              product_name: '测试商品001',
              description: '测试商品001',
              is_sold_out: 0,
              is_updatePrice: null,
              on_shelf: 0,
              product_supply_price: 12.89,
              product_unit: '份',
              product_pic_url: 'https://tangcl.oss-cn-beijing.aliyuncs.com/images/adf950fb-ad2a-47b4-b36a-c34c31370ebb.jpg',
              product_code: '0053223056',
              shop_id: 10134
            },
            {
              category_id: 1000,
              category_name: '赠品5',
              product_id: 83227,
              product_name: '测试商品001',
              description: '测试商品001',
              is_sold_out: 0,
              is_updatePrice: null,
              on_shelf: 0,
              product_supply_price: 12.89,
              product_unit: '份',
              product_pic_url: 'https://tangcl.oss-cn-beijing.aliyuncs.com/images/adf950fb-ad2a-47b4-b36a-c34c31370ebb.jpg',
              product_code: '0053223056',
              shop_id: 10134
            }
          ]
        },
        {
          category_id: 1000,
          category_name: '赠品4',
          productList: [
            {
              category_id: 1000,
              category_name: '赠品',
              product_id: 83230,
              product_name: '小米辣约5颗 （限一份）',
              description: '小米辣约5颗 （限一份）',
              is_sold_out: 0,
              is_updatePrice: null,
              on_shelf: 0,
              product_supply_price: 20,
              product_unit: '份',
              product_pic_url: 'https://tangcl.oss-cn-beijing.aliyuncs.com/images/bd717600-f188-4b8a-b3fe-547f0a3d5b0b.jpg',
              product_code: '8775210118',
              shop_id: 10134
            },
            {
              category_id: 1000,
              category_name: '赠品2',
              product_id: 83227,
              product_name: '测试商品001',
              description: '测试商品001',
              is_sold_out: 0,
              is_updatePrice: null,
              on_shelf: 0,
              product_supply_price: 12.89,
              product_unit: '份',
              product_pic_url: 'https://tangcl.oss-cn-beijing.aliyuncs.com/images/adf950fb-ad2a-47b4-b36a-c34c31370ebb.jpg',
              product_code: '0053223056',
              shop_id: 10134
            },
            {
              category_id: 1000,
              category_name: '赠品3',
              product_id: 83227,
              product_name: '测试商品001',
              description: '测试商品001',
              is_sold_out: 0,
              is_updatePrice: null,
              on_shelf: 0,
              product_supply_price: 12.89,
              product_unit: '份',
              product_pic_url: 'https://tangcl.oss-cn-beijing.aliyuncs.com/images/adf950fb-ad2a-47b4-b36a-c34c31370ebb.jpg',
              product_code: '0053223056',
              shop_id: 10134
            },
            {
              category_id: 1000,
              category_name: '赠品4',
              product_id: 83227,
              product_name: '测试商品001',
              description: '测试商品001',
              is_sold_out: 0,
              is_updatePrice: null,
              on_shelf: 0,
              product_supply_price: 12.89,
              product_unit: '份',
              product_pic_url: 'https://tangcl.oss-cn-beijing.aliyuncs.com/images/adf950fb-ad2a-47b4-b36a-c34c31370ebb.jpg',
              product_code: '0053223056',
              shop_id: 10134
            },
            {
              category_id: 1000,
              category_name: '赠品',
              product_id: 83227,
              product_name: '测试商品001',
              description: '测试商品001',
              is_sold_out: 0,
              is_updatePrice: null,
              on_shelf: 0,
              product_supply_price: 12.89,
              product_unit: '份',
              product_pic_url: 'https://tangcl.oss-cn-beijing.aliyuncs.com/images/adf950fb-ad2a-47b4-b36a-c34c31370ebb.jpg',
              product_code: '0053223056',
              shop_id: 10134
            },
            {
              category_id: 1000,
              category_name: '赠品5',
              product_id: 83227,
              product_name: '测试商品001',
              description: '测试商品001',
              is_sold_out: 0,
              is_updatePrice: null,
              on_shelf: 0,
              product_supply_price: 12.89,
              product_unit: '份',
              product_pic_url: 'https://tangcl.oss-cn-beijing.aliyuncs.com/images/adf950fb-ad2a-47b4-b36a-c34c31370ebb.jpg',
              product_code: '0053223056',
              shop_id: 10134
            }
          ]
        },
        {
          category_id: 1000,
          category_name: '赠品5',
          productList: [
            {
              category_id: 1000,
              category_name: '赠品',
              product_id: 83230,
              product_name: '小米辣约5颗 （限一份）',
              description: '小米辣约5颗 （限一份）',
              is_sold_out: 0,
              is_updatePrice: null,
              on_shelf: 0,
              product_supply_price: 20,
              product_unit: '份',
              product_pic_url: 'https://tangcl.oss-cn-beijing.aliyuncs.com/images/bd717600-f188-4b8a-b3fe-547f0a3d5b0b.jpg',
              product_code: '8775210118',
              shop_id: 10134
            },
            {
              category_id: 1000,
              category_name: '赠品2',
              product_id: 83227,
              product_name: '测试商品001',
              description: '测试商品001',
              is_sold_out: 0,
              is_updatePrice: null,
              on_shelf: 0,
              product_supply_price: 12.89,
              product_unit: '份',
              product_pic_url: 'https://tangcl.oss-cn-beijing.aliyuncs.com/images/adf950fb-ad2a-47b4-b36a-c34c31370ebb.jpg',
              product_code: '0053223056',
              shop_id: 10134
            },
            {
              category_id: 1000,
              category_name: '赠品3',
              product_id: 83227,
              product_name: '测试商品001',
              description: '测试商品001',
              is_sold_out: 0,
              is_updatePrice: null,
              on_shelf: 0,
              product_supply_price: 12.89,
              product_unit: '份',
              product_pic_url: 'https://tangcl.oss-cn-beijing.aliyuncs.com/images/adf950fb-ad2a-47b4-b36a-c34c31370ebb.jpg',
              product_code: '0053223056',
              shop_id: 10134
            },
            {
              category_id: 1000,
              category_name: '赠品4',
              product_id: 83227,
              product_name: '测试商品001',
              description: '测试商品001',
              is_sold_out: 0,
              is_updatePrice: null,
              on_shelf: 0,
              product_supply_price: 12.89,
              product_unit: '份',
              product_pic_url: 'https://tangcl.oss-cn-beijing.aliyuncs.com/images/adf950fb-ad2a-47b4-b36a-c34c31370ebb.jpg',
              product_code: '0053223056',
              shop_id: 10134
            },
            {
              category_id: 1000,
              category_name: '赠品',
              product_id: 83227,
              product_name: '测试商品001',
              description: '测试商品001',
              is_sold_out: 0,
              is_updatePrice: null,
              on_shelf: 0,
              product_supply_price: 12.89,
              product_unit: '份',
              product_pic_url: 'https://tangcl.oss-cn-beijing.aliyuncs.com/images/adf950fb-ad2a-47b4-b36a-c34c31370ebb.jpg',
              product_code: '0053223056',
              shop_id: 10134
            },
            {
              category_id: 1000,
              category_name: '赠品5',
              product_id: 83227,
              product_name: '测试商品001',
              description: '测试商品001',
              is_sold_out: 0,
              is_updatePrice: null,
              on_shelf: 0,
              product_supply_price: 12.89,
              product_unit: '份',
              product_pic_url: 'https://tangcl.oss-cn-beijing.aliyuncs.com/images/adf950fb-ad2a-47b4-b36a-c34c31370ebb.jpg',
              product_code: '0053223056',
              shop_id: 10134
            }
          ]
        },
        {
          category_id: 1000,
          category_name: '赠品6',
          productList: [
            {
              category_id: 1000,
              category_name: '赠品',
              product_id: 83230,
              product_name: '小米辣约5颗 （限一份）',
              description: '小米辣约5颗 （限一份）',
              is_sold_out: 0,
              is_updatePrice: null,
              on_shelf: 0,
              product_supply_price: 20,
              product_unit: '份',
              product_pic_url: 'https://tangcl.oss-cn-beijing.aliyuncs.com/images/bd717600-f188-4b8a-b3fe-547f0a3d5b0b.jpg',
              product_code: '8775210118',
              shop_id: 10134
            },
            {
              category_id: 1000,
              category_name: '赠品2',
              product_id: 83227,
              product_name: '测试商品001',
              description: '测试商品001',
              is_sold_out: 0,
              is_updatePrice: null,
              on_shelf: 0,
              product_supply_price: 12.89,
              product_unit: '份',
              product_pic_url: 'https://tangcl.oss-cn-beijing.aliyuncs.com/images/adf950fb-ad2a-47b4-b36a-c34c31370ebb.jpg',
              product_code: '0053223056',
              shop_id: 10134
            },
            {
              category_id: 1000,
              category_name: '赠品3',
              product_id: 83227,
              product_name: '测试商品001',
              description: '测试商品001',
              is_sold_out: 0,
              is_updatePrice: null,
              on_shelf: 0,
              product_supply_price: 12.89,
              product_unit: '份',
              product_pic_url: 'https://tangcl.oss-cn-beijing.aliyuncs.com/images/adf950fb-ad2a-47b4-b36a-c34c31370ebb.jpg',
              product_code: '0053223056',
              shop_id: 10134
            },
            {
              category_id: 1000,
              category_name: '赠品4',
              product_id: 83227,
              product_name: '测试商品001',
              description: '测试商品001',
              is_sold_out: 0,
              is_updatePrice: null,
              on_shelf: 0,
              product_supply_price: 12.89,
              product_unit: '份',
              product_pic_url: 'https://tangcl.oss-cn-beijing.aliyuncs.com/images/adf950fb-ad2a-47b4-b36a-c34c31370ebb.jpg',
              product_code: '0053223056',
              shop_id: 10134
            },
            {
              category_id: 1000,
              category_name: '赠品',
              product_id: 83227,
              product_name: '测试商品001',
              description: '测试商品001',
              is_sold_out: 0,
              is_updatePrice: null,
              on_shelf: 0,
              product_supply_price: 12.89,
              product_unit: '份',
              product_pic_url: 'https://tangcl.oss-cn-beijing.aliyuncs.com/images/adf950fb-ad2a-47b4-b36a-c34c31370ebb.jpg',
              product_code: '0053223056',
              shop_id: 10134
            },
            {
              category_id: 1000,
              category_name: '赠品5',
              product_id: 83227,
              product_name: '测试商品001',
              description: '测试商品001',
              is_sold_out: 0,
              is_updatePrice: null,
              on_shelf: 0,
              product_supply_price: 12.89,
              product_unit: '份',
              product_pic_url: 'https://tangcl.oss-cn-beijing.aliyuncs.com/images/adf950fb-ad2a-47b4-b36a-c34c31370ebb.jpg',
              product_code: '0053223056',
              shop_id: 10134
            }
          ]
        }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'foodsInfoList'
    ]),
    listsObj () {
      const menuList = []
      const foodList = []
      this.list.forEach((item) => {
        const {category_id, category_name, productList} = item
        menuList.push(Object.assign({}, {category_id, category_name}))
        foodList.push(Object.assign({category_name, productList: [...productList]}))
      })
      return {menuList, foodList}
    },
    currentIndex () {
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i]
        let height2 = this.listHeight[i + 1]
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          this._followScroll(i)
          return i
        }
      }
      return 0
    }
  },
  components: {
    Layout,
    AdjustList
  },
  methods: {
    selectMenu (index, event) {
      if (!event._constructed) {
        return
      }
      let foodList = this.$refs.foodList
      let el = foodList[index]
      this.foodsScroll.scrollToElement(el, 300)
    },
    _initScroll () {
      this.meunScroll = new BScroll(this.$refs.menuWrapper, {
        click: true
      })

      this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
        click: true,
        probeType: 3
      })

      this.foodsScroll.on('scroll', (pos) => {
        // 判断滑动方向，避免下拉时分类高亮错误（如第一分类商品数量为1时，下拉使得第二分类高亮）
        if (pos.y <= 0) {
          this.scrollY = Math.abs(Math.round(pos.y))
        }
      })
    },
    _calculateHeight () {
      let foodList = this.$refs.foodList
      let height = 0
      this.listHeight.push(height)
      for (let i = 0; i < foodList.length; i++) {
        let item = foodList[i]
        height += item.clientHeight
        this.listHeight.push(height)
      }
    },
    _followScroll (index) {
      let menuList = this.$refs.menuList
      let el = menuList[index]
      this.meunScroll.scrollToElement(el, 300, 0, -100)
    }
  },
  created () {
    setTimeout(() => {
      this._initScroll()
      this._calculateHeight()
    }, 200)
    // this.$store.dispatch('fetchGoodsInfo').then(({code}) => {
    //   if (code === 200) {
    //     setTimeout(() => {
    //       this._initScroll()
    //       this._calculateHeight()
    //     }, 200)
    //   }
    // })
  }
}
</script>

<style lang="scss" scoped>
  .apply-price-wrap {
    height: calc(100vh - 2.08rem)!important;
    display: flex;
    position: absolute;
    overflow:hidden;
    width: 100%;
    &__search-btn {
       position: absolute;
       color: red;
       right: 0.3rem;
       top: 0;
       font-size: 28px;
       text-decoration: none;
       z-index: 1;
    }
    &__menu-nav {
      overflow-y: scroll;
       background-color: #f5f5f5;
    }
    &__menu-nav__list__item {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 2rem;
      height: 1rem;
      color: #333;
      font-size: 0.28rem;
      border-bottom: 1px solid #ebebeb;
    }
    &__menu-nav__list__item-active {
      background-color: #fff;
      &::after {
       position: absolute;
       content: '';
       height: 100%;
       width: 10px;
       border-left: 1px solid red;
       left: 0;
      }
    }
    &__menu-content {
      width: 100%;
      flex: 1;
    }
    &__menu-content-child {
      display: flex;
      flex-direction: column;
    }
    &__menu-content-child__title {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0;
      height: 0.6rem;
      font-size: 0.28rem;
      color: #93999f;
      background-color: #ebebeb;
    }
  }
</style>
