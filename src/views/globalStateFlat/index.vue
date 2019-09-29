<template>
  <div class="global">
    <ArticleList :articles="articles"/>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'

  import ArticleList from './ArticleList'

  export default {
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
</style>
