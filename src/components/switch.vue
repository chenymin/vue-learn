<template>
  <div class="switch-container" >
    <div class="form-filed">
        <label class="label">{{label}}</label>
        <label class="switch-label" 
          :class="{'active': isActive, 'unactive': !isActive}"
          :style="labelStyle" 
          :checkedText='checkedText'
          :uncheckedText='uncheckedText'
          >
          <span class="circle" :style="circleStyle"></span>
          <span class="text" :style="textStyle" v-text="isActive ? checkedText : uncheckedText"></span> 
          <input @change.stop="toggle" type="checkbox" class="switch-input">
        </label>  
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        isActive: this.defauleValue
      }
    },
    props: {
      defauleValue: {
        type: Boolean,
        default: false
      },
      labelHeight: {
        type: Number,
        default: 0.6
      },
      labelWidth: {
        type: Number,
        default: 1.37
      },
      bgColor: {
        type: String,
        default: '#d5d5d5'
      },
      checkedText: {
        type: String,
        default: '是'
      },
      uncheckedText: {
        type: String,
        default: '否'
      },
      label: {
        type: String,
        default: '车位地址与居住地址相同'
      },
      eventType: {
        type: String,
        default: 'change'
      },
      model: {
        type: String,
        default: ''
      }
    },
    computed: {
      distance () {
        return `${this.labelWidth - this.labelHeight}rem`
      },
      labelStyle () {
        return {
          height: `${this.labelHeight}rem`,
          width: `${this.labelWidth}rem`,
          'background-color': `${this.bgColor}`
        }
      },
      circleStyle () {
        return {
          height: `${this.labelHeight - 0.1}rem`,
          width: `${this.labelHeight - 0.1}rem`,
          'margin-top': `-${(this.labelHeight - 0.1) / 2}rem`,
          transform: this.isActive ? `translate3d(${this.distance}, 0px, 0px)` : null
        }
      },
      textStyle () {
        return {
          'margin-top': `-${(this.labelHeight - 0.12) / 2}rem`
        }
      }
    },
    methods: {
      toggle () {
        this.isActive = !this.isActive
        this.eventBus.$emit(`switch/${this.eventType}`, this.isActive)
        this.commitValue()
      },
      commitValue () {
        this.$store.commit('changeApplyEdit', {[this.model]: this.isActive ? 1 : 0})
      }
    },
    watch: {
      defauleValue () {
        this.isActive = this.defauleValue
        this.commitValue()
      }
    },
    mounted () {
      this.commitValue()
    }
  }
</script>

<style lang="scss" scoped>
  .switch-container {
    .label {
      flex: 1
    }
    .switch-label {
      display: flex;
      position: relative;
      overflow: hidden;
      border-radius: 0.4rem; 
      .circle {
        content: '';
        position: absolute;
        z-index: 10;
        left: 0;
        top: 50%;
        background-color: #fff;
        border-radius: 50%;
        transform: translate(3px,0px);
        transition: transform .3s;
      }
      .text {
        content: '';
        position: absolute;
        z-index: 9;
        top: 50%;
        font-size: .32rem;
        color: #fff
      }
    }

    .active {
      background-color: #e0ac60!important;
      .text {
        content: attr(checkedText);
        left: .2rem;
      }
    }
    .unactive {
      .text {
        content: attr(uncheckedText);
        right: .2rem;
      }
    }
    .switch-input {
      display: none;
    }
  }
</style>

