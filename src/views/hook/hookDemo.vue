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
  // src/components/ContactFormContainer.vue
  import './tracking'
  import { post } from '@/api/loanApply'
  import { withHooks } from '@/utils/hooks'

  export default {
    provide: {
      // We pass an additional `id` context
      // property to make it easier to identify
      // calls of `post()` when running our Hooks.
      post: withHooks(post, { id: 'contact-form.post' })
    },
    data () {
      return { data: { name: '', message: '' } }
    },
    methods: {
      submit () {
        withHooks(this.test, { id: 'contact-form.post' })(this.data)
      },
      async test (param) {
        const {message, name} = await post(param)
        console.log(message, name)
        return param
      }
    }
  }
</script>
