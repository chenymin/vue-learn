<template>
  <ul v-if="posts" class="BlogPostList">
    <li v-for="post in posts" :key="post.id">
      <h2>{{ post.title }}</h2>
      <p>{{ post.intro }}</p>
    </li>
  </ul>
</template>

<script>
  import { makePost } from '@/models/post'

  export default {
    name: 'BlogPostList',
    data () {
      return {
        posts: null
      }
    },
    async created () {
      this.posts = await makePost({ words: 6 }).all()
    }
  }
</script>

<style>
  .BlogPostList {
    list-style-type: none;
    padding: 0;
  }
</style>
