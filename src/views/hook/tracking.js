import { addHook } from '@/utils/hooks'

const CONTACT_FORM = 'contact-form.post'
const USER_CREATED = 'user-form.post'

addHook({
  condition ({ error, id }) {
    return !error && id === CONTACT_FORM
  },
  callback (context) {
    // This is where you'd trigger your Google
    // Analytics or Matomo tracking event.
    console.log('track contact form submission', context)
  }
})

addHook({
  condition ({ id }) {
    return id === USER_CREATED
  },
  callback (context) {
    if (context.error) {
      // This is where you'd trigger an event in
      // Sentry or some other error tracking service.
      return console.log('track error', context.error)
    }
    console.log('track new user', context)
  }
})
