<template>
  <div class="protocol">
    <input type="checkbox" id="checkbox" name="protocol" ref="checkboxDom" value="0" @change="updateValue" class="check-box">
    <label class="protocol-label" for="checkbox">
      我已阅读并同意
      <slot name="protocol-slot">
        <router-link class="text-color" v-for="(item, index) in items" :key="index" :to = "'{{item.path}}'">{{item.fileName}}</router-link>
      </slot> 
    </label>
  </div>
</template>
<script>
  export default {
    props: {
      items: {
        type: Array,
        default: []
      },
      value: {
        type: null,
        default: null
      }
    },
    methods: {
      updateValue (e) {
        this.$emit('input', e.target.checked ? '1' : e.target.value)
      }
    },
    watch: {
      value (val) {
        this.$refs.checkboxDom.setAttribute('checked', val === '1')
      }
    }
  }
</script>
<style lang="scss" scoped>
  .protocol{
    position: relative;
    height: 40px;
    line-height: 40px;
    padding-left: 20px;
    margin-top: 0.3rem;
    .check-box {
    display: none;
    }
    .check-box + .protocol-label::before {
      content: '';
      position: absolute;
      top: 0.24rem;
      left: 0;
      border:1px solid #C0A778;
      width:0.26rem;
      height:0.26rem;
      display: inline-block;
      text-align: center;
      vertical-align: middle;
      line-height: 0.4rem;
    }
    .check-box:checked + .protocol-label::before {
      background-color: #fff;
    }
    .check-box:checked + .protocol-label::after {
      content: '';
      position: absolute;
      width: 0.16rem;
      height: 0.09rem;
      background: transparent;
      top: 0.29rem;
      left: 0.03rem;
      border:0.02rem solid #C0A778;
      border-top: none;
      border-right: none;
      transform: rotate(-45deg);
    }
    .protocol-label {
      position: absolute;
      top: 0;
      color: #999;
      font-size: 0.26rem;
      padding-left: 0.4rem;
    }
    .text-color{
      text-decoration:none;
      color: #fff;
    }
    .font-color{
      color: #6596f0;
    }
  }
  
</style>

