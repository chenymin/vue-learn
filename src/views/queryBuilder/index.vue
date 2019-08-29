<template>
  <div>
    <BlogPost/>
    <hr>
    <BlogPostList/>
  </div>
</template>

<script>
  import BlogPost from './BlogPost'
  import BlogPostList from './BlogPostList'

  export default {
    components: {
      BlogPost,
      BlogPostList
    }
  }
</script>
