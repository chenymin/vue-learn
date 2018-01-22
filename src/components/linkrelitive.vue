<template>
  <div class="address-container">
    <div class="form-filed" :class="{'no-border': isShow}" @click="jumpToPage">
      <label class="label">{{title}}</label>
      <span class="add-text">{{selectVal}}</span>
      <span class="arrow-right"></span>
    </div>
    <p class="link-detail" v-if="isShow">
      <span>{{linkDetail.relativesName}}</span>
      <span class="text-left">{{linkDetail.relativesNexus}}</span>
      <span class="text-left">{{linkDetail.relativesMobile}}</span>
    </p>
  </div>
</template>

<script>
  export default {
    data () {
      return {
      }
    },
    props: {
      title: {
        type: String,
        default: ''
      },
      selectVal: {
        type: String,
        default: ''
      },
      model: {
        type: String,
        default: ''
      },
      linkDetail: {
        type: Object,
        default () {
          return {
          }
        }
      }
    },
    computed: {
      isShow () {
        return !_.isEmpty(this.linkDetail)
      }
    },
    methods: {
      jumpToPage () {
        this.eventBus.$emit('address/jump')
      },
      emitValidate () {
        const values = _.values(this.linkDetail)
        let result = values.length > 1
        for (let i = 0, len = values.length; i < len; i++) {
          if (!values[i] || values[i] === '') {
            result = false
            break
          } else {
            result = true
          }
        }
        const msg = result ? '' : `请添加${this.title}`
        this.$store.commit('getValidatorMsg', {[this.model]: {msg, isValid: result}})
      }
    },
    watch: {
      'linkDetail' (val) {
        this.emitValidate()
      }
    },
    mounted () {
      setTimeout(() => {
        this.emitValidate()
      }, 0)
    }
  }
</script>

<style lang="scss" scoped>
  .address-container {
    .add-text {
      position: absolute;
      top:50%;
      right: 0.6rem;
      margin-top: -0.23rem;
      font-size: 0.32rem;
      color: #333;
    }
    .link-detail {
      position: relative;
      padding-left: 0.3rem;
      padding-bottom: 0.3rem;
      color: #333;
      font-size: 0.32rem;
      background-color: #fff;
      overflow: hidden;
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

