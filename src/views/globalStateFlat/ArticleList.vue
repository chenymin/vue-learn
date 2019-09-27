<template>
  <ul class="ArticleList">
    <li v-for="article in articles" :key="article.id">
      <h2>{{ article.title }}</h2>
      <p>{{ article.intro }}</p>
      <div class="ArticleList__author">
        <img class="ArticleList__avatar" :src="article.author.avatar" :alt="article.author.name">
        {{ article.author.name }}
      </div>
    </li>
  </ul>
</template>

<script>
  export default {
    name: 'ArticleList',
    props: {
      articles: {
        required: true,
        type: Array
      }
    }
  }
</script>

<style>
  .ArticleList {
    padding-left: 0;
    list-style-type: none;
  }

  .ArticleList__author {
    display: flex;
    align-items: center;
  }

  .ArticleList__avatar {
    margin-right: 0.5em;
    border-radius: 50%;
  }
</style>
