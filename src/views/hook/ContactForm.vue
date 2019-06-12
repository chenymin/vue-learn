<template>
  <form @submit.prevent="submit">
    <label class="contact-form-label">
      Name
      <input v-model="data.name">
    </label>
    <label class="contact-form-label">
      Message
      <textarea v-model="data.message"/>
    </label>
    <button>Submit</button>
  </form>
</template>

<script>
  export default {
    inject: ['post'],
    data () {
      return { data: { name: '', message: '' } }
    },
    methods: {
      submit () {
        this.post(this.data)
      }
    }
  }
</script>

<style>
  .contact-form-label {
    display: block;
  }
</style>
