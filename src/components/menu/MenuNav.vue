<template>
  <div class='menu-component-wrap'>
    <slot name='menuComponentPrefix'></slot>
    <ul class='menu-component-wrap__ul-root'>
      <items v-for='(item, index) in list'
        :model='item'
        :key='index'
        :level='`${index + 1 + ""}`'
        :crume-name='item.menuName'
        >
      </items>
    </ul>
    <slot name='menuComponentSuffix'></slot>
  </div>
</template>

<script>
import Items from './MenuItem'

export default {
  data () {
    return {}
  },
  props: {
    list: {
      type: Array,
      default () {
        return []
      }
    }
  },
  components: {
    Items
  }
}
</script>

<style lang='scss'>
  $height: 60px;
  $width: 120px;
  .menu-component-wrap {
    height: $height;
    line-height: $height;

    &__ul-root {
      height: $height;
      background-color: #203452;
    }

    &__text {
      position: relative;
      display: inline-block;
      position: relative;
      color: #babadb;
      width: 100%;
    }

    &__text-arrow::after {
      content: '';
      position: absolute;
      right: 5px;
      width: 6px;
      height: 6px;
      border-bottom: solid 2px #ccc;
      border-right: solid 2px #ccc;
      transform: rotate(-45deg);
      top: 50%;
      margin-top: -3px;
      right: 0.8rem;
    }

    &__li-level {
      width: $width;
      height: 40px;
      line-height: 40px;
      text-align: center;
      cursor: pointer;
    }

    &__li-level1 {
      position: relative;
      height: $height;
      line-height: $height;
      float: left;
    }

    &__li-level1:after {
      content: '';
      position: absolute;
      border-right: 1px solid #6d7797;
      height: 16px;
      right: 0;
      top: 50%;
      margin-top: -8px;
    }

    &__ul-level {
      background-color: #203452;
    }

    $levelColumns: 12 !default;
    @for $i from 1 through $levelColumns {
      &__li-level#{$i + 1}:hover {
        background-color: #142743;
      }
      &__li-level#{$i + 1} &__text:hover {
        color: #3b77e3;
      }
      &__li-level#{$i}:hover &__ul-level#{$i + 1} {
        display: block!important;
      }
      &__ul-level#{$i} {
        position: absolute;
        width: 100%;
        @if $i > 2 { height: 100%; }
        z-index: 4;
        @if $i == 2 { top: $height } @else{top: 0px}
        @if $i == 2 { left: 0px } @else{left: $width}
      }

      &__ul-level#{$i + 1}::after {
        content: '';
        position: absolute;
        top: 20px;
        right: 0px;
        height: calc(100% - 40px);
        border-right: 1px solid #4f5870;
      }
    }
  }
</style>
