<template>
  <div class="adjust-list-component">
    <ul class="adjust-list-component__list" :class="{'adjust-list-component__list-padding': isUlPadding}">
      <li class="adjust-list-component__list__item"
        :class="{'adjust-list-component__list__item-border': isListBorder}"
        v-for="(item, index) in list"
        :key="index">
        <div class="adjust-list-component__list__item__content">
          <img class="adjust-list-component__list__item__content__pic"
            :class="{'adjust-list-component__list__item__content__pic-small': smallImg}"
            :src="item.product_pic_url" alt="">
          <div class="adjust-list-component__list__item__content__info">
            <span class="adjust-list-component__list__item__content__info__name">{{item.product_name}}</span>
            <span class="adjust-list-component__list__item__content__info__text">单价:{{item.product_supply_price}}元</span>
            <span class="adjust-list-component__list__item__content__info__text">单位:1{{item.product_unit}}</span>
            <p class="adjust-list-component__list__item__content__info__btn-area">
              <button @click.stop="adjustPrice(item)">调价</button>
              <button @click.stop="onShelf(item.on_shelf, item.product_code)"
              :class="{'adjust-list-component__list__item__content__info__btn-area-shelf': item.on_shelf === 1}">{{item.on_shelf === 1 ? '上架' : '下架'}}</button>
            </p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  props: {
    list: {
      type: Array,
      default () {
        return []
      }
    },
    smallImg: {
      type: Boolean,
      default: false
    },
    isListBorder: {
      type: Boolean,
      default: false
    },
    isUlPadding: {
      type: Boolean,
      default: false
    },
    isHasTitle: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    adjustPrice (item) {
      this.$emit('adjustListCom-price', item)
    },
    onShelf (shelfType, productId) {
      this.$emit('adjustListCom-shelf', {shelfType, productId})
    }
  }
}
</script>

<style lang="scss" scoped>
  .adjust-list-component {
    &__list {
      padding: 0 0.2rem 1rem;
    }
    &__list-padding {
      padding: 0;
    }
    &__list__item {
      border: 1px solid #e5e1de;
      border-radius: 3px;
      margin-top: 10px;
    }
    &__list__item-border {
      border: none;
      border-bottom: 1px solid #e5e1de;
    }
    &__list__item__title {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0;
      height: 0.6rem;
      font-size: 12px;
      color: #93999f;
      background-color: #ebebeb;
    }
    &__list__item__head {
      display: flex;
      background-color: #f1f1f1;
      font-size: 0.24rem;
      padding: .2rem;
    }
    &__list__item__head__text {
      flex: 1;
      &:nth-child(2) {
         text-align: center;
      }
    }
    &__list__item__content {
      display: flex;
      padding: .2rem;
    }
    &__list__item__content__pic {
      width: 2rem;
      height: 2rem;
    }
    &__list__item__content__pic-small {
      width: 1.5rem;
      height: 1.6rem;
    }
    &__list__item__content__info {
      display: flex;
      flex-direction: column;
      padding-left: .3rem;
    }
    &__list__item__content__info__name {
      color: #333;
      font-size: 0.24rem;
      font-weight: 700;
      height: 0.5rem;
      line-height: 0.5rem;
    }
    &__list__item__content__info__text {
      color: #666;
      font-size: 0.24rem;
      height: 0.5rem;
      line-height: 0.5rem;
    }
    &__list__item__content__info__btn-area {
      display: flex;
      &>button {
        padding: 1px 15px;
        border: 1px solid #158fda;
        color: #158fda;
        background: #fff;
        border-radius: 3px;
        margin-right: 10px;
      }
    }
    &__list__item__content__info__btn-area-shelf {
      border: 1px solid #aa5103!important;
      color: #fff!important;
      background: #aa5103!important;
    }
  }
</style>
