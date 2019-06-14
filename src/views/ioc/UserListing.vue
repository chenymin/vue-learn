<template>
  <ul>
    <li v-for="user in users" :key="user.id">{{ user.name }}</li>
  </ul>
</template>

<script>
  export default {
    name: 'UserListing',
    inject: ['userRepository'],
    data () {
      return { users: [] }
    },
    async created () {
      this.users = await this.userRepository.list()
    }
  }
</script>
