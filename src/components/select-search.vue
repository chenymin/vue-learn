<template>
  <div class="search-select">
    <div class="search-area">
      <input class="input" type="text" @input="changeValue($event)">
      <ul class="items">
        <li class="item" v-for="(item, index) in items" :key="index">{{item.label}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      items: [...this.list]
    }
  },
  props: {
    list: {
      type: Array,
      default () {
        return []
      }
    }
  },
  methods: {
    changeValue (event) {
      const val = event.target.value
      let newArr = []
      newArr = this.items.filter(({label, value}) => {
        return label.indexOf(val) >= 0
      })
      this.items = [...newArr]
      if (this.items.length === 0 || val === '') {
        this.items = [...this.list]
      }
    },
    watchList () {
      this.items = [...this.list]
    }
  },
  mounted () {
    this.$watch('list', this.watchList)
  }
}
</script>

<style scoped>
.search-select {
  position: relative;
  font-size: 0.28rem;
}

.search-select .input-wrap {
  height: .34rem;
  line-height: .34rem;
}

.search-select .input-wrap .label {
  height: .34rem;
  line-height: .34rem;
  color: #393939;
  background: none !important;
}

.search-select .input {
  width: 100%;
}

.search-select .search-area {
  position: relative;
  padding-left: 0;
  padding-right: 0;
}

.search-select .items {
  position: absolute;
  z-index: 1;
  background-color: #fff;
  width: 100%;
  max-height: 1.5rem;
  overflow-y: scroll;
  margin-left: 0;
  border: 1px solid #c4c4c4;
}

.search-select .item {
  height: .3rem;
  line-height: .3rem;
  padding-left: .2rem;
}

.search-select .item:hover,
.search-select .item .active {
  background-color: #0000ff;
}
</style>

