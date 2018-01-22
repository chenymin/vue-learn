<template>
  <div>
   <p class="protocol" :class="{'p30': isPadding}">
      <input type="checkbox" id="checkbox" checked="checked" name="protocol" value="1" v-model="protocolChecked" class="check-box">
      <label class="protocol-label" for="checkbox">
        我已阅读并同意
      </label>
      <a class="protocol-link" :class="{'font-color': bool}" :href="item.contractUrl" v-for='(item, index) in items' :key='index' target="_blank" >{{item.fileName}}</a>
    </p>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        protocolChecked: this.isChecked
      }
    },
    props: {
      items: {
        type: Array,
        default () {
          return []
        }
      },
      bool: '',
      isChecked: {
        type: Number,
        default: 1
      },
      promptText: {
        type: String,
        default: '请勾选协议'
      },
      isPadding: {
        type: Boolean,
        default: true
      }
    },
    watch: {
      isChecked (val) {
        this.protocolChecked = val
      },
      protocolChecked () {
        this.validSeleted()
      }
    },
    methods: {
      validSeleted () {
        const msg = this.protocolChecked ? '' : this.promptText
        this.$store.commit('getValidatorMsg', {protocol: {msg, isValid: this.protocolChecked}})
      }
    },
    mounted () {
      this.validSeleted()
    }
  }
</script>
<style lang="scss" scoped>
  .p30 {
    padding-left: 0.3rem;
  }
 .protocol{
    position: relative;
    padding-right: 0.3rem;
    line-height: 20px; 
  }
  .check-box {
    display: none;
  }
  .check-box + .protocol-label::before {
    content: '';
    position: absolute;
    left: 0;
    border:1px solid #e0ac60;
    width:0.4rem;
    height:0.4rem;
    top: 50%;
    margin-top: -0.2rem; 
  }
  .check-box:checked + .protocol-label::before {
     background-color: #e0ac60;
  }
  .check-box:checked + .protocol-label::after {
    content: '';
    position: absolute;
    width: 0.28rem;
    height: 0.15rem;
    background: transparent;
    top: 50%;
    margin-top: -0.12rem;
    left: 0.06rem;
    border:0.03rem solid #fff;
    border-top: none;
    border-right: none;
    transform: rotate(-45deg);
  }
  .protocol-label {
    position: relative;
    padding-left: 0.5rem;
    color: #999;
    font-size: 0.26rem;
  }
  .protocol-link {
    color: #78a3f1;
    font-size: 0.26rem;
    text-decoration: none;
    height: 40px;
  }
  .font-color {
    color: #fff;
  }
</style>

