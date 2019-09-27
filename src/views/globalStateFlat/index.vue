<template>
  <div id="app">
    <ArticleList :articles="articles"/>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'

  import ArticleList from './ArticleList'

  export default {
    name: 'App',
    components: {
      ArticleList
    },
    computed: {
      ...mapGetters('article', { articles: 'list' })
    },
    created () {
      this.loadArticles()
    },
    methods: {
      ...mapActions('article', { loadArticles: 'load' })
    }
  }
</script>

<style>
  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
