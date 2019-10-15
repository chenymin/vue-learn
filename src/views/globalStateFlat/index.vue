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
      ...mapGetters('articles', { articles: 'list' })
    },
    created () {
      this.loadArticles()
    },
    methods: {
      ...mapActions('articles', { loadArticles: 'load' })
    }
  }
</script>

<style>
</style>
