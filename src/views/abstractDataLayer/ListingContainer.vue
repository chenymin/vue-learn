<template>
  <div>
    <ul>
      <li v-for="item in provider.items" :key="item.title">{{ item.title }}</li>
    </ul>
    <button @click="provider.list">Reload</button>
  </div>
</template>

<script>
  import { Provider } from './providers/Provider'

  export default {
    name: 'ListingContainer',
    props: {
      provider: {
        required: true,
        type: Provider
      }
    },
    created () {
      this.provider.list()
    }
  }
</script>
