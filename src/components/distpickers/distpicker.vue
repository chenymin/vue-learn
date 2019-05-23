<template>
  <div class="distpicker-component">
    <my-input v-model="innerValue" v-bind="$attrs" @click.native.stop.prevent="showSelect">
      <span slot="input-slot" class="arrow-right" v-if="isNoArrow"></span>
    </my-input>
    <cover-container :is-show='isShow' v-on:cover-hidden='noticeClose'>
      <transition-expand slot='cover-slot'>
        <div :class="wrapper" v-if="isShow">
          <template>
          <div :class="addressHeader">
            <span class="remove" @click.prevent="hiddenArea"></span>
            <ul>
              <li :class="{'active': tab == 1}" @click="resetProvince">{{ currentProvince && !staticPlaceholder ? currentProvince : placeholders.province }}</li>
              <template v-if="!onlyProvince">
                <li v-if="showCityTab" :class="{'active': tab == 2}" @click="resetCity">{{  currentCity && !staticPlaceholder ? currentCity : placeholders.city }}</li>
                <li v-if="showAreaTab && !hideArea" :class="{'active': tab == 3}">{{ currentArea && !staticPlaceholder ? currentArea : placeholders.area }}</li>
              </template>
            </ul>
          </div>
          <div :class="addressContainer">
            <ul class="list" v-if="tab == 1">
              <li v-for="(item, index) in provinces" :key="index" :class="{'active': item == currentProvince}" @click="chooseProvince(item)">{{ item }}</li>
            </ul>
            <template v-if="!onlyProvince">
              <ul class="list" v-if="tab == 2">
                <li v-for="(item, index) in cities" :key="index" :class="{'active': item == currentCity}" @click="chooseCity(item)">{{ item }}</li>
              </ul>
              <ul class="list" v-if="tab == 3 && !hideArea">
                <li v-for="(item, index) in areas" :key="index" :class="{'active': item == currentArea}" @click="chooseArea(item)">{{ item }}</li>
              </ul>
            </template>
          </div>
        </template>
        </div>
      </transition-expand>
    </cover-container>
  </div>
</template>

<script>
import DISTRICTS from './districts'
import smartScrolls from '@/utils/smartScroll'
import TransitionExpand from '@/components/transition/transitionExpand'
import CoverContainer from '@/components/base/cover'
import MyInput from '@/components/myinput.vue'

const DEFAULT_CODE = '000000'

export default {
  name: 'v-distpicker',
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
      tab: 1,
      showCityTab: false,
      showAreaTab: false,
      provinces: [],
      cities: [],
      areas: [],
      currentProvince: '',
      currentCity: '',
      currentArea: '',
      isShow: false
    }
  },
  props: {
    isTriggerClick: {
      type: Boolean,
      default: true
    },
    value: {
      type: null
    },
    type: {
      type: String,
      default: 'mobile'
    },
    hideArea: {
      type: Boolean,
      default: false
    },
    onlyProvince: {
      type: Boolean,
      default: false
    },
    staticPlaceholder: {
      type: Boolean,
      default: false
    },
    isNoArrow: {
      type: Boolean,
      default: true
    },
    placeholders: {
      type: Object,
      default () {
        return {
          province: '省',
          city: '市',
          area: '区'
        }
      }
    },
    wrapper: {
      type: String,
      default: 'address'
    },
    addressHeader: {
      type: String,
      default: 'address-header'
    },
    addressContainer: {
      type: String,
      default: 'address-container'
    },
    areaLabel: {
      type: String,
      default: '所在省份'
    },
    isAll: {
      type: Boolean,
      default: true
    },
    isNeedValue: {
      type: Boolean,
      default: true
    },
    // 可选部分省分城市，如北京、上海
    needDist: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  watch: {
    value (newVal, oldVal) {
      !oldVal && this.watchCommon(newVal)
    }
  },
  computed: {
    detailAddress () {
      if (this.currentProvince === '省') {
        return `请选择${this.currentProvince}${this.currentCity}${this.currentArea}`
      }
      return `${this.currentProvince}-${this.currentCity}-${this.currentArea}`
    }
  },
  methods: {
    watchCommon (newVal) {
      const detailAddressArr = newVal && newVal.indexOf('-') >= 0 && newVal.split('-')
      if (!detailAddressArr) {
        return
      }
      this.currentProvince = /^[\u4e00-\u9fa5]{0,}$/.test(detailAddressArr[0]) ? detailAddressArr[0] : this.provinces[detailAddressArr[0]]
      this.cities = DISTRICTS[this.getKeyByObjectValue(this.provinces, this.currentProvince)]

      this.currentCity = /^[\u4e00-\u9fa5]{0,}$/.test(detailAddressArr[1]) ? detailAddressArr[1] : this.cities[detailAddressArr[1]]
      this.areas = DISTRICTS[this.getKeyByObjectValue(this.cities, this.currentCity)]

      this.currentArea = /^[\u4e00-\u9fa5]{0,}$/.test(detailAddressArr[2]) ? detailAddressArr[2] : this.areas[detailAddressArr[2]]
      this.innerValue = `${this.currentProvince}-${this.currentCity}-${this.currentArea}`
    },
    noticeClose () {
      this.hiddenArea()
    },
    getCities () {
      this.currentCity = this.placeholders.city
      this.currentArea = this.placeholders.area
      this.cities = DISTRICTS[this.getKeyByObjectValue(this.provinces, this.currentProvince)]
      this.cleanList('areas')
      if (this.cities == null) {
        this.tab = 1
        this.showCityTab = false
      }
    },
    getAreas () {
      this.currentArea = this.placeholders.area
      this.areas = DISTRICTS[this.getKeyByObjectValue(this.cities, this.currentCity)]
      if (this.areas == null) {
        this.tab = 2
        this.showAreaTab = false
      }
    },
    resetProvince () {
      this.tab = 1
      this.provinces = this.isAll ? this.getDistricts() : this.needDist
      this.showCityTab = false
      this.showAreaTab = false
    },
    resetCity () {
      this.tab = 2
      this.showCityTab = true
      this.showAreaTab = false
      this.getCities()
    },
    chooseProvince (name) {
      this.currentProvince = name
      if (this.onlyProvince) return
      this.tab = 2
      this.showCityTab = true
      this.showAreaTab = false
      this.getCities()
    },
    chooseCity (name) {
      this.currentCity = name
      if (this.hideArea) return
      this.tab = 3
      this.showCityTab = true
      this.showAreaTab = true
      this.getAreas()
    },
    chooseArea (name) {
      this.currentArea = name

      const currentProvinceCode = this.getKeyByObjectValue(this.provinces, this.currentProvince)
      const currentCityCode = this.getKeyByObjectValue(this.cities, this.currentCity)
      const currentAreaCode = this.getKeyByObjectValue(this.areas, this.currentArea)
      const addressDetailCode = this.isNeedValue ? `${currentProvinceCode}-${currentCityCode}-${currentAreaCode}` : this.detailAddress

      this.innerValue = `${this.currentProvince}-${this.currentCity}-${this.currentArea}`
      this.$emit('input', addressDetailCode)
      this.hiddenArea()
    },
    getDistricts (code = DEFAULT_CODE) {
      return DISTRICTS[code] || null
    },
    cleanList (name) {
      this[name] = []
    },
    showSelect () {
      if (!this.isTriggerClick) {
        return
      }
      $('html').addClass('noscroll')
      Array.from($('.area-container')).forEach((item) => {
        smartScrolls($(item), '.list')
      })
      this.isShow = true
    },
    hiddenArea () {
      $('html').removeClass('noscroll')
      this.isShow = false
    },
    /**
     *  根据对象的value值获取key，如{110000: '北京市', 120000: '天津市'}, name: 北京市---> 110000
     *  @param object {Object}
     *  @param name {String}
     *  @return {String}
     */
    getKeyByObjectValue (object, name) {
      return Object.entries(object).filter((item) => item.includes(name))[0][0]
    }
  },
  components: {
    TransitionExpand,
    CoverContainer,
    MyInput
  },
  mounted () {
    this.provinces = this.isAll ? this.getDistricts() : this.needDist
    this.watchCommon(this.value)
  }
}
</script>

<style lang="scss" scoped>
  .distpicker-component {
    font-size: 0.36rem;
    color: #444;
  }
  .address {
    color: #444;
    position: fixed;
    bottom: 0;
    width: 100%;
    z-index: 11;
  }
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
     &::after {
      @extend .remove-common;
      transform: rotate(-45deg);
    }
    &::before {
      @extend .remove-common;
      transform: rotate(45deg);
    }
  }
  .address-header {
    background-color: #fff;
    ul {
      display: flex;
      justify-content: space-around;
      align-items: stretch;
      li {
        display: flex;
        align-items: center;
        height: 1rem;
        &.active {
          border-bottom: #cda76e solid 3px;
          color: #cda76e;
            &:first-child {
            padding-left: 0rem
          }
        }
        &:first-child {
          padding-left: 0.65rem
        }
      }

    }
  }
  .address-container {
    background-color: #fff;
    height: 7rem;
    overflow: scroll;
    ul {
      height: 100%;
      overflow: auto;

      li {
        display: flex;
        align-items: center;
        height: 1rem;
        padding-left: 0.3rem;
        border-top: 1px solid #f6f6f6;
        &.active {
          color: #cda76e;
        }
      }
    }
  }
</style>
