<template>
  <div class="detail-render-component">
    <ul class="list">
      <li class="item" v-for="(item, index) in list" :key="index" >
        <span class="left-text">{{item.label}}</span>
        <template v-if="item.render">
          <Render :column="item" :index="index" :render="item.render" :value="extractDetailValue(item.model)"></Render>
        </template>
        <template v-else><span class="right-text">{{formData[item.model] || ''}}{{item.unit || ''}}</span></template>
      </li>
    </ul>
  </div>
</template>

<script>
  import Render from './render'
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
      },
      formData: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    components: {
      Render
    },
    methods: {
      extractDetailValue (model) {
        let customizeVal = ''
        if (Array.isArray(model)) {
          model.forEach((item, index) => {
            customizeVal += `${this.formData[item]},`
          })
        } else {
          customizeVal = this.formData[model] || ''
        }
        return customizeVal
      }
    }
  }
</script>

<style lang="scss" scoped>
  .list{
    .item {
      position: relative;
      display: flex;
      align-items: center;
      font-size: 0.32rem;
      color: #444;
      height: 1rem;
      padding: 0 0.3rem;
      background-color: #fff;
      overflow: hidden;
      &::after {
        position: absolute;
        content: '';
        border-bottom: 1px solid rgba(231,231,231,1);;
        width: 100%;
        height: 1px;
        margin-top: -1px;
        top:100%;
        left: 0.3rem;
      }
      .right-text {
        display: flex;
        flex: 1;
        height: 100%;
        align-items: center;
        justify-content: flex-end;
      }
      .right-text_margin {
        margin-right: 0.3rem;
      }
    }
    .on-border {
      &::after {
        border-bottom: none;
      }
    }
    .prompt-img {
      position: absolute;
      top: 50%;
      left: 1.7rem;
      margin-top: -0.16rem;
      width: 0.32rem;
      height: 0.32rem;
      z-index: 1;
    }
  }
</style>
