<template>
    <div class="selection-component">
      <my-input v-model="innerValue" v-if="isShowInput" v-bind="$attrs" @click.native.stop.prevent="showSelect">
        <span slot="input-slot" class="arrow-right" v-if="isNoArrow"></span>
      </my-input>
      <cover-container :is-show='isShow' v-on:cover-hidden='noticeClose'>
        <transition-expand slot='cover-slot'>
          <div id="mySelect" class="select-wrap" v-if="isShow">
            <p class="title" v-if="isShowHeaderTitle">
              <span class="remove" @click="hiddenSelect"></span>
              请选择{{this.$attrs.label || ''}}
            </p>
            <p class="area" v-if="selectType === 'area' && isShowHeaderTitle">
              <span class="choice">请选择</span>
              <span class="province">{{this.$attrs.label || ''}}</span>
            </p>
            <ul class="list">
              <li class="item" v-for="(item, index) in list" :key='index'
                              :class="{'selected': (index === currentIndex) && selectType !== 'area'}"
                              v-show="!item.delete"
                              @click="selectItem(item, index)">
                {{getOptionLabel(item)}}
              </li>
              <slot name="selection-bottom"></slot>
            </ul>
          </div>
        </transition-expand>
      </cover-container>
    </div>

</template>

<script>
  import smartScrolls from '../utils/smartScroll'
  import TransitionExpand from './transition/transitionExpand'
  import CoverContainer from './base/cover'
  import MyInput from '@/components/myinput.vue'

  export default {
    $_veeValidate: {
      name () {
        return this.$attrs.label
      },
      value () {
        return this.value
      }
    },
    data () {
      return {
        innerValue: '',
        currentIndex: this.getDefaultIndex(),
        isShow: this.isShowSelect || false,
        selectVal: this.getDetaultVal()
      }
    },
    props: {
      list: {
        type: Array,
        default () {
          return []
        }
      },
      objKey: {
        type: String,
        default: 'label'
      },
      objValue: {
        type: String,
        default: 'value'
      },
      value: {
        type: null
      },
      title: {
        type: String,
        default: ''
      },
      isNoArrow: {
        type: Boolean,
        default: true
      },
      isShowSelect: {
        type: Boolean,
        default: false
      },
      selectType: {
        type: String,
        default: ''
      },
      isTriggerClick: {
        type: Boolean,
        default: true
      },
      isNeedValue: {
        type: Boolean,
        default: true
      },
      isShowHeaderTitle: {
        type: Boolean,
        default: true
      },
      isShowInput: {
        type: Boolean,
        default: true
      }
    },
    watch: {
      // Handles external model changes.
      value (newVal) {
        this.watchCommon(newVal)
      },
      list (newVal) {
        this.currentIndex = this.getDefaultIndex()
      }
    },
    methods: {
      noticeClose () {
        this.hiddenSelect()
      },
      getDetaultVal () {
        const item = this.list[this.currentIndex]
        return this.currentIndex === -1 ? this.value : this.getOptionLabel(item)
      },
      getOptionValue (option) {
        if (typeof option === 'object') {
          if (this.objValue && option[this.objValue]) {
            return option[this.objValue]
          }
        }
        return option
      },
      getOptionLabel (option) {
        if (typeof option === 'object') {
          if (this.objKey && option[this.objKey]) {
            return option[this.objKey]
          }
        }
        return option
      },
      hiddenSelect () {
        this.isShow = false
        $('html').removeClass('noscroll')
        Array.from($('.selection-container')).forEach((item) => {
          $(item).off()
        })
      },
      showSelect () {
        if (!this.isTriggerClick) {
          this.isShow = false
          return
        }
        $('html').addClass('noscroll')
        Array.from($('.selection-container')).forEach((item) => {
          smartScrolls($(item), '.list')
        })
        this.isShow = true
      },
      selectItem (item, index) {
        $('html').removeClass('noscroll')
        this.currentIndex = index
        this.isShow = false
        this.selectVal = this.getOptionLabel(item)
        const val = this.isNeedValue ? this.getOptionValue(item) : this.selectVal
        this.innerValue = this.getOptionLabel(item)
        this.$emit('input', val)
      },
      getDefaultIndex () {
        let defaultIndex = -1
        if (typeof this.value === 'number') {
          defaultIndex = this.value - 1
        } else {
          for (let i = 0, len = this.list.length; i < len; i++) {
            const label = this.list[i][this.objKey]
            const value = this.list[i][this.objValue]
            if (label === this.value || value === this.value) {
              defaultIndex = i
              break
            } else {
              defaultIndex = -1
            }
          }
        }
        return defaultIndex
      },
      watchCommon (newVal) {
        this.currentIndex = this.getDefaultIndex()
        this.selectVal = this.currentIndex === -1 ? newVal : this.getDetaultVal()
        this.innerValue = this.selectVal
      }
    },
    components: {
      TransitionExpand,
      CoverContainer,
      MyInput
    },
    mounted () {
      this.watchCommon(this.value)
    }
  }
</script>

<style lang="scss" scoped>
  .selection-component {
    .select-wrap {
      position: fixed;
      width: 100%;
      bottom: 0;
      left: 0;
      background-color: #fff;
      z-index: 11;
      .common {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 1rem;
      }
      .area {
        @extend .common;
        font-size: 0.36rem;
        .choice {
          color: #444;
          padding-right: 0.8rem;
        }
        .province {
          color: #cda76e;
        }
      }
      .title {
        @extend .common;
        position: relative;
        font-size: 0.3rem;
        color: #999;
        .remove-common {
          position: absolute;
          content: '';
          width: 0.5rem;
          height: 1px;
          background-color: currentColor;
          top: 50%;
        }
        .remove {
          position: absolute;
          left: 0.3rem;
          width: 0.5rem;
          height: 1rem;
          margin-top: -0.5rem;
          top: 50%;
          &::after {
            @extend .remove-common;
            transform: rotate(-45deg);
          }
          &::before {
            @extend .remove-common;
            transform: rotate(45deg);
          }
        }
      }
      .list {
        max-height: 6rem;
        overflow: auto;
        .item {
          @extend .common;
          position: relative;
          font-size: 0.36rem;
          color: #444;
          border-top: 1px solid #eee;
        }
        .selected {
          color: #cda76e;
          &::after {
            position: absolute;
            content: '';
            color: #cda76e;
            width: 0.4rem;
            height: 0.2rem;
            border-bottom: solid 2px #cda76e;
            border-left: solid 2px #cda76e;
            -webkit-transform: rotate(-45deg);
            transform: rotate(-45deg);
            right: 0.3rem;
            top: 50%;
            margin-top: -0.1rem;
          }
        }
      }
    }
  }
</style>
