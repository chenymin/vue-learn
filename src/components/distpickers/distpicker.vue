<template>
  <div class="area-container">
    <div class="cover" @click.prevent="hiddenArea" v-if="isShow"></div>
    <div class="form-filed" @click="showSelect">
      <label class="label">{{areaLabel}}</label>
      <input class="select-com" :value="detailAddress" readonly='readonly'/>
      <span class="arrow-right"></span>
    </div>
    <div :class="wrapper" v-if="isShow">
      <template v-if="type != 'mobile'">
        <select @change="getCities" v-model="currentProvince">
          <option :value="placeholders.province">{{ placeholders.province }}</option>
          <option v-for="(item, index) in provinces" :value="item" :key="index">{{ item }}</option>
        </select>
        <template v-if="!onlyProvince">
          <select @change="getAreas" v-model="currentCity">
            <option :value="placeholders.city">{{ placeholders.city }}</option>
            <option v-for="(item, index) in cities" :value="item" :key='index'>{{ item }}</option>
          </select>
          <select v-if="!hideArea" v-model="currentArea">
            <option :value="placeholders.area">{{ placeholders.area }}</option>
            <option v-for="(item, index) in areas " :value="item" :key='index'>{{ item }}</option>
          </select>
        </template>
      </template>
      <template v-else>
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
  </div>
</template>

<script>
import DISTRICTS from './districts'
import smartScrolls from '../../utils/smartScroll'

const DEFAULT_CODE = '000000'

export default {
  name: 'v-distpicker',
  props: {
    province: { type: [String, Number], default: '' },
    city: { type: [String, Number], default: '' },
    area: { type: [String, Number], default: '' },
    type: { type: String, default: 'mobile' },
    hideArea: { type: Boolean, default: false },
    onlyProvince: { type: Boolean, default: false },
    staticPlaceholder: { type: Boolean, default: false },
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
    wrapper: { type: String, default: 'address' },
    addressHeader: { type: String, default: 'address-header' },
    addressContainer: { type: String, default: 'address-container' },
    areaLabel: {
      type: String,
      default: '所在省份'
    },
    'props': '',
    'model': ''
  },
  data () {
    return {
      tab: 1,
      showCityTab: false,
      showAreaTab: false,
      provinces: [],
      cities: [],
      areas: [],
      currentProvince: this.determineType(this.province) || this.placeholders.province,
      currentCity: this.determineType(this.city) || this.placeholders.city,
      currentArea: this.determineType(this.area) || this.placeholders.area,
      isShow: false
    }
  },
  mounted () {
    if (this.type !== 'mobile') {
      this.provinces = this.props.isAll ? this.getDistricts() : this.props.needDist
      this.cities = this.province ? this.getDistricts(this.getAreaCode(this.determineType(this.province))) : []
      this.areas = this.city ? this.getDistricts(this.getAreaCode(this.determineType(this.city))) : []
    } else {
      if (this.area && !this.hideArea && !this.onlyProvince) {
        this.tab = 3
        this.showCityTab = true
        this.showAreaTab = true
        this.areas = this.getDistricts(this.getAreaCode(this.determineType(this.city)))
      } else if (this.city && this.hideArea && !this.onlyProvince) {
        this.tab = 2
        this.showCityTab = true
        this.cities = this.getDistricts(this.getAreaCode(this.determineType(this.province)))
      } else {
        this.provinces = this.props.isAll ? this.getDistricts() : this.props.needDist
      }
    }
    this.$watch('props.validOff', this.watchValid)
    if (this.detailAddress.indexOf('请选择') < 0) {
      const provinceValue = /^[\u4e00-\u9fa5]{0,}$/.test(this.province) ? this.province : this.getCodeValue(this.province)
      const cityCalue = /^[\u4e00-\u9fa5]{0,}$/.test(this.city) ? this.city : this.getCodeValue(this.city)
      const areaValue = /^[\u4e00-\u9fa5]{0,}$/.test(this.area) ? this.area : this.getCodeValue(this.area)

      this.currentProvince = provinceValue || this.placeholders.province
      this.currentCity = cityCalue || this.placeholders.city
      this.currentArea = areaValue || this.placeholders.area

      this.applyEditInfo()
    }
    this.emitValidate()
  },
  watch: {
    currentProvince (vaule) {
      this.$emit('province', this.setData(vaule))
      if (this.onlyProvince) this.emit('selected')
      this.reset()
    },
    currentCity (value) {
      this.$emit('city', this.setData(value, this.currentProvince))
      if (value !== this.placeholders.city && this.hideArea) this.emit('selected')
      this.reset()
    },
    currentArea (value) {
      this.$emit('area', this.setData(value, this.currentCity))
      if (value !== this.placeholders.area) this.emit('selected')
      this.reset()
    },
    province (value) {
      const provinceValue = /^[\u4e00-\u9fa5]{0,}$/.test(this.province) ? this.province : this.getCodeValue(this.province)
      this.currentProvince = provinceValue || this.placeholders.province
      this.cities = this.determineValue(this.currentProvince, this.placeholders.province)
    },
    city (value) {
      const cityCalue = /^[\u4e00-\u9fa5]{0,}$/.test(this.city) ? this.city : this.getCodeValue(this.city)
      this.currentCity = cityCalue || this.placeholders.city
      this.areas = this.determineValue(this.currentCity, this.placeholders.city, this.currentProvince)
    },
    area (value) {
      const areaValue = /^[\u4e00-\u9fa5]{0,}$/.test(this.area) ? this.area : this.getCodeValue(this.area)
      this.currentArea = areaValue || this.placeholders.area
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
    setData (value, check = '') {
      return {
        code: this.getAreaCode(value, check),
        value: value
      }
    },
    emit (name) {
      let data = {
        province: this.setData(this.currentProvince)
      }

      if (!this.onlyProvince) {
        this.$set(data, 'city', this.setData(this.currentCity))
      }

      if (!this.onlyProvince || this.hideArea) {
        this.$set(data, 'area', this.setData(this.currentArea))
      }

      this.$emit(name, data)
    },
    getCities () {
      this.currentCity = this.placeholders.city
      this.currentArea = this.placeholders.area
      this.cities = this.determineValue(this.currentProvince, this.placeholders.province)
      this.cleanList('areas')
      if (this.cities == null) {
        this.emit('selected')
        this.tab = 1
        this.showCityTab = false
      }
    },
    getAreas () {
      this.currentArea = this.placeholders.area
      this.areas = this.determineValue(this.currentCity, this.placeholders.city, this.currentProvince)
      if (this.areas == null) {
        this.emit('selected')
        this.tab = 2
        this.showAreaTab = false
      }
    },
    resetProvince () {
      this.tab = 1
      this.provinces = this.props.isAll ? this.getDistricts() : this.props.needDist
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
      this.$emit('myDistPicker', {[this.model]: this.detailAddress})
      this.reset()
    },
    chooseCity (name) {
      this.currentCity = name
      if (this.hideArea) return
      this.tab = 3
      this.showCityTab = true
      this.showAreaTab = true
      this.getAreas()
      this.$emit('myDistPicker', {[this.model]: this.detailAddress})
      this.reset()
    },
    chooseArea (name) {
      this.currentArea = name
      this.$emit('myDistPicker', {[this.model]: this.detailAddress})
      this.reset()
      this.hiddenArea()
    },
    getAreaCode (name, check = '') {
      for (var x in DISTRICTS) {
        for (var y in DISTRICTS[x]) {
          if (name === DISTRICTS[x][y]) {
            if (check.length > 0) {
              if (y.slice(0, 2) !== this.getAreaCode(check).slice(0, 2)) {
                continue
              } else {
                return y
              }
            } else {
              return y
            }
          }
        }
      }
    },
    getCodeValue (code) {
      for (var x in DISTRICTS) {
        for (var y in DISTRICTS[x]) {
          if (code === y) {
            return DISTRICTS[x][y]
          }
        }
      }
    },
    getDistricts (code = DEFAULT_CODE) {
      return DISTRICTS[code] || null
    },
    determineValue (currentValue, placeholderValue, check = '') {
      if (currentValue === placeholderValue) {
        return []
      } else {
        return this.getDistricts(this.getAreaCode(currentValue, check))
      }
    },
    determineType (value) {
      if (typeof value === 'number') {
        return this.getCodeValue(value)
      }
      return value
    },
    cleanList (name) {
      this[name] = []
    },
    showSelect () {
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
    emitValidate () {
      if (this.props.validOff) {
        this.$store.commit('getValidatorMsg', {[this.model]: {msg: '', isValid: true}})
        return
      }
      const msg = this.currentProvince === '省' || this.currentArea === '区' ? '请选择居住地址' : ''
      const isValid = this.currentProvince === '省' || this.currentArea === '区' ? 0 : 1
      this.$store.commit('getValidatorMsg', {[this.model]: {msg, isValid}})
    },
    reset () {
      this.applyEditInfo()
      this.emitValidate()
    },
    applyEditInfo () {
      const proviceCode = this.getAreaCode(this.determineType(this.currentProvince))
      const cityCode = this.getAreaCode(this.determineType(this.currentCity))
      const areaCode = this.getAreaCode(this.determineType(this.currentArea))
      const applyEditValue = this.props.isNeedValue ? `${proviceCode}-${cityCode}-${areaCode}` : this.detailAddress
      this.$store.commit('changeApplyEdit', {[this.model]: applyEditValue})
    },
    watchValid (val) {
      this.emitValidate()
    }
  }
}
</script>

<style lang="scss" scoped>
  .form-filed {
      position: relative;
      display: flex;
      align-items: center;
      background-color: #fff;
      height: 1rem;
      padding: 0 0.3rem;
      .select-com {
        display: flex;
        flex: 1;
        font-size: 0.32rem;
        color: #444;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .arrow-right {
        content: '';
        position: absolute;
        right: 5px;
        width: 12px;
        height: 12px;
        border-bottom: solid 2px #ccc;
        border-right: solid 2px #ccc;
        transform: rotate(-45deg);
        top: 50%;
        margin-top: -6px;
        right: 0.3rem;
      }
      .select-no-arrow {
        margin-right: 0; 
        &::after {
          display: none;
        }
      }
    }
  .area-container {
    font-size: 0.36rem;
    color: #444;
    .cover {
      position: absolute;
      top:0;
      width: 100%;
      height: 100%;
      background-color: #333;
      opacity: 0.8;
      z-index: 10
    }
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
  select {
    padding: .5rem .75rem;
    height: 40px;
    font-size: 1rem;
    line-height: 1.25;
    color: #464a4c;
    background-color: #fff;
    background-image: none;
    -webkit-background-clip: padding-box;
    background-clip: padding-box;
    border: 1px solid rgba(0,0,0,.15);
    border-radius: .25rem;
    -webkit-transition: border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;
    transition: border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;
    -o-transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
    transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
    transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;

    option {
      font-weight: normal;
      display: block;
      white-space: pre;
      min-height: 1.2em;
      padding: 0px 2px 1px;
    }
  }
  ul {
    margin: 0;
    padding: 0;

    li {
      list-style: none;
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
