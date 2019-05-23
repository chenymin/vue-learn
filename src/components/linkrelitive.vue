<template>
  <div class="link-relitive-component">
    <router-link :label="$attrs.label"
                 :link-text="isShowAddText ? $attrs.linkText : ''"
                 :router-name="$attrs.routerName"
                 :params="$attrs.params"
                 :router-link-component-class="$attrs.routerLinkComponentClass"
                 :router-link-component-link-class="$attrs.routerLinkComponentLinkClass">
    </router-link>
    <ul class="link-relitive-component__list" v-show="!isShowAddText">
      <li class="link-relitive-component__item"
          :class="{'link-relitive-component__item_more-three': linkList.length > 3}"
          v-for="(item, index) in linkList" :key="index">
          <slot name="linkRelitive" :slotInfo="{item}">
            <span class="link-relitive-component__text">{{formData[item.model]}}</span>
          </slot>
      </li>
    </ul>
  </div>
</template>

<script>
  import RouterLink from '@/components/routerLink'
  import MyInput from '@/components/myinput'
  export default {
    data () {
      return {
      }
    },
    props: {
      model: {
        type: String,
        default: ''
      },
      formData: {
        type: [Object],
        default () {
          return {}
        }
      },
      linkList: {
        type: Array,
        default () {
          return []
        }
      }
    },
    computed: {
      isShowAddText () {
        return Object.keys(this.formData).every((item) => this.formData[item] === null || this.formData[item] === '')
      }
    },
    watch: {
    },
    components: {
      RouterLink,
      MyInput
    }
  }
</script>

<style lang="scss" scoped>
  .link-relitive-component {
    .add-text {
      position: absolute;
      top:50%;
      right: 0.6rem;
      margin-top: -0.23rem;
      font-size: 0.32rem;
      color: #333;
    }
    &__list {
      display: flex;
      position: relative;
      padding-left: 0.3rem;
      color: #333;
      font-size: 0.32rem;
      background-color: #fff;
      overflow: hidden;
      flex-wrap: wrap;
      &::after{
        position: absolute;
        content: '';
        border-bottom: 1px solid #eee;
        width: 100%;
        height: 1px;
        margin-top: -1px;
        top: 100%;
        left: 0.3rem;
      }
      .text-left {
        padding-left: 0.3rem;
      }
    }
    &__item {
      display: flex;
      align-content: center;
      height: 1rem;
      line-height: 1rem;
    }
    /*&__item:nth-child(3n + 2) {*/
      /*flex: 1;*/
      /*text-align: center;*/
    /*}*/
    /*&__item:nth-child(3n) {*/
     /*padding-right: .3rem;*/
     /*min-width: 2.5rem;*/
    /*}*/

    /*&__item_more-three:nth-child(3n) {*/
      /*min-width: 4rem;*/
    /*}*/

    &__text {
      width: 100%;
    }
    .arrow-right {
      right: 0.3rem
    }
    .no-border {
      &::after {
        border: none;
      }
    }
  }
</style>

