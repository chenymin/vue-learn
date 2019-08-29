<template>
  <div v-if="post">
    <h1>{{ post.title }}</h1>
    <span>Author: {{ post.authorFullName }}</span>
    <p>
      <template v-if="showBody">{{ post.body }}</template>
      <template v-else>
        {{ post.intro }}
        <button @click="showBody = true">read more</button>
      </template>
    </p>
  </div>
</template>

<script>
  import { makePost } from '@/models/post'

  export default {
    name: 'BlogPost',
    data () {
      return {
        post: null,
        showBody: false
      }
    },
    async created () {
      this.post = await makePost({ words: 20 })
        .where({ id: 1 })
        .first()
    }
  }
</script>
