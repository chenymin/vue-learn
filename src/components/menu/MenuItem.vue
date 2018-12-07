<template>
  <li class="menu-component-wrap__li-level" :class="liClassName">
    <span class="menu-component-wrap__text"
    :class="{'menu-component-wrap__text-arrow': this.hasChild && this.level.length > 1, 'menu-component-wrap__text-border': this.level.length === 1}"
    @click="toggle(crumeName, linkUrl, model.menuName)">{{ model.menuName }}</span>
    <ul class="menu-component-wrap__ul-level" :class="ulClassName" v-if="hasChild" style="display:none">
      <item v-for="(item, index) in model.childTree"
        :model="item" :key="index"
        :level='hasChild ? `${level}-${index}` : level'
        :crume-name='hasChild ? `${crumeName}>${item.menuName}`: crumeName'
        :link-url='item.url'
      ></item>
    </ul>
  </li>
</template>

<script>
export default {
  name: 'item',
  data () {
    return {
    }
  },
  props: {
    crumeName: {
      type: String,
      default: ''
    },
    linkUrl: {
      type: String,
      default: ''
    },
    level: {
      type: String,
      default: ''
    },
    model: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  computed: {
    // 是否还有子列表需要渲染，作为v-if的判断条件
    hasChild () {
      return this.model.childTree && this.model.childTree.length
    },
    liClassName () {
      let className = `menu-component-wrap__li-level${this.level.split('-').length}`
      return {
        [className]: true
      }
    },
    ulClassName () {
      let className = `menu-component-wrap__ul-level${this.level.split('-').length + 1}`
      return {
        [className]: true
      }
    }
  },
  methods: {
    // 切换列表显示隐藏的方法
    toggle (crumeName, url, menuName) {
      if (url && url !== 'null' && url !== '') {
        this.$eventBus.$emit('menuNav/jump', {crumeName, url, menuName})
      }
    }
  }
}
</script>
