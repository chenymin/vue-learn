<template>
  <ContactForm/>
</template>

<script>
  // src/components/ContactFormContainer.vue
  import './tracking'
  import { post } from '@/api/loanApply'
  import { withHooks } from '@/utils/hooks'

  import ContactForm from './ContactForm.vue'

  export default {
    components: {
      ContactForm
    },
    provide: {
      // We pass an additional `id` context
      // property to make it easier to identify
      // calls of `post()` when running our Hooks.
      post: withHooks(post, { id: 'contact-form.post' })
    }
  }
</script>
