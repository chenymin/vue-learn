<template>
  <div>
    <template v-if="data">
      <div
        class="info"
      >ℹ️ Scroll to the bottom of the page to trigger loading of the comments for this article.</div>
      <h1>{{ data.title }}</h1>
      <template v-if="data.user.data">By {{ data.user.data.name }}</template>
      <p v-for="n in 20" :key="`p-${n}`">{{ data.body }}.</p>

      <hr>

      <!-- The comments beneath are automatically resolved when the become visible -->
      <div v-observe-visibility="visibilityChanged">
        <h2>Comments</h2>
        <template v-if="commentsVisible">
          <template v-if="data.comments.data">
            <div v-for="comment in data.comments.data" :key="comment.id">
              <h3>{{ comment.name }}</h3>
              <p>{{ comment.body }}</p>
            </div>
          </template>
          <div v-else>Loading ...</div>
        </template>
      </div>
    </template>
  </div>
</template>

<script>
  import postService from './api/post'

  // TODO
  // - richtige Demo mit schönem artikel und dann comments die on-demand geladen werden

  export default {
    data () {
      return { data: null, commentsVisible: false }
    },
    async created () {
      this.data = await postService.find(1)
    },
    methods: {
      visibilityChanged (isVisible) {
        this.commentsVisible = isVisible
      }
    }
  }
</script>
