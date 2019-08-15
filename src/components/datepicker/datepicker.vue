<template>
  <div class="date-picker-component">
    <my-input v-model="innerValue" v-if="datePickType === 'IdCardDate'" v-bind="$attrs" @click.native.stop.prevent="showDatePicker">
      <span slot="input-slot" class="arrow-right"></span>
    </my-input>
    <section class="date-picker-component__input-group" v-if="datePickType === 'multipleDate'">
      <p class="date-picker-component__input-group__title">营业执照有效期限</p>
      <div class="date-picker-component__input-group__list">
        <my-input v-for="(item, index) in inputChild"
                  v-model="dateObj[item.model]"
                  v-bind="item"
                  :key="index"
                  @click.native.stop.prevent="showDatePicker(item.model)">
          <span slot="input-slot" class="arrow-right"></span>
        </my-input>
      </div>
    </section>
    <cover v-bind="$attrs" ref='coverDatePicker' v-model="isDatePickerShow">
      <transition-expand slot='cover-slot'>
        <div class="date-picker-component__content" v-if="isDatePickerShow">
          <van-datetime-picker
            @cancel="datePickerCancel"
            @confirm="datePickerConfirm"
            :formatter="formatter"
            v-model="currentDate"
            type="date"
            :min-date="minDate"
            :max-date="maxDate"
            :visible-item-count="visibleItemCount"
          />
          <slot name="datePickerFooter">
            <p class="date-picker-component__content__text" @click.stop.prevent="longDate" v-if="datePickType === 'IdCardDate'">永久期限</p>
          </slot>
        </div>
      </transition-expand>
    </cover>
  </div>
</template>

<script>
  import Cover from '@/components/base/cover'
  import MyInput from '@/components/myinput'
  import TransitionExpand from '@/components/transition/transitionExpand'

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
        currentDate: new Date(),
        isDatePickerShow: false,
        multipleDateType: '',
        dateObj: {
          startDateValue: null,
          endDateValue: null
        }
      }
    },
    computed: {
      isDateObjNull () {
        return Object.keys(this.dateObj).some((item) => this.dateObj[item] === null || this.dateObj[item] === '')
      }
    },
    methods: {
      formatter (type, value) {
        if (type === 'year') {
          return `${value}年`
        } else if (type === 'month') {
          return `${value}月`
        } else if (type === 'day') {
          return `${value}日`
        }
        return value
      },
      datePickerConfirm (value) {
        if (this.datePickType === 'multipleDate') {
          this.dateObj[this.multipleDateType] = value.format('yyyy-MM-dd')
        } else {
          this.innerValue = value.format('yyyy-MM-dd')
        }
        this.datePickerCancel()
      },
      datePickerCancel () {
        this.isDatePickerShow = false
      },
      showDatePicker (value) {
        if (!this.isTriggerClick) {
          return
        }
        this.isDatePickerShow = true
        if (this.datePickType === 'multipleDate') {
          this.multipleDateType = value
          if (this.dateObj[value]) {
            this.currentDate = new Date(this.dateObj[value])
          }
        }
      },
      longDate () {
        this.innerValue = '永久期限'
        this.datePickerCancel()
      },
      changeModelValue () {
        if (!this.isDateObjNull) {
          this.$emit('input', `${this.dateObj.startDateValue},${this.dateObj.endDateValue}`)
        }
      },
      defaultsValue (newVal) {
        if (this.datePickType === 'IdCardDate') {
          this.innerValue = newVal
        } else if (this.datePickType === 'multipleDate') {
          const [startDateValue, endDateValue] = this.value.split(',')
          Object.assign(this.dateObj, {startDateValue, endDateValue})
        }
      }
    },
    watch: {
      // Handles internal model changes.
      innerValue (newVal) {
        if (newVal !== '永久期限') {
          this.currentDate = new Date(newVal)
        }
        this.$emit('input', newVal)
      },
      // Handles external model changes.
      value (newVal) {
        this.defaultsValue(newVal)
      },
      'dateObj.startDateValue' () {
        this.changeModelValue()
      },
      'dateObj.endDateValue' () {
        this.changeModelValue()
      }
    },
    props: {
      value: {
        type: null
      },
      minDate: {
        type: Date,
        default () {
          return new Date('1997', 0, 1)
        }
      },
      maxDate: {
        type: Date,
        default () {
          return new Date('2100', 0, 1)
        }
      },
      visibleItemCount: {
        type: Number,
        default: 3
      },
      isTriggerClick: {
        type: Boolean,
        default: true
      },
      datePickType: {
        type: String,
        default: 'IdCardDate',
        validator: val => {
          return (
            ['IdCardDate', 'multipleDate'].indexOf(val) !== -1
          )
        }
      },
      inputChild: {
        type: Array,
        default () {
          return []
        }
      }
    },
    components: {
      Cover,
      MyInput,
      TransitionExpand
    },
    mounted () {
      if (this.value) {
        this.defaultsValue(this.value)
      }
    }
  }
</script>

<style lang="scss">
  .date-picker-component {
    &__content {
      position: fixed;
      bottom: 0;
      z-index: 11;
      width: 100%;
    }
    &__content__text {
      display: flex;
      height: 1rem;
      justify-content: center;
      align-items: center;
      background-color: #fff;
      color: #333;
      text-align: center;
      font-size: .32rem;
    }

    &__input-group__list {
      display: flex;
      .input-component {
        padding: 0;
        flex: 1;
        .form-filed {
          padding: 0;
        }
      }
      .input-component:nth-child(1) {
        .value {
          padding-left: .3rem;
        }
      }
      .input-component:nth-child(2) {
        overflow: hidden;
        .form-filed:after{
          left: 0;
        }
        .label {
          min-width: auto;
        }
        .value {
          padding-left: .3rem;
        }
      }
    }
    &__input-group__title {
      padding: 0 .3rem;
      font-size: .3rem;
      color: #333;
      height: 1rem;
      line-height: 1rem;
      background-color: #fff;
    }
  }
</style>
