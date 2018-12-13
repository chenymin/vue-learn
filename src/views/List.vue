<template>
  <div>
    <h1>Devs to follow</h1>
    <ul>
      <pass v-for="id in users" :key="id" :metadata="getUserData(id)">
        <li slot-scope="{ metadata }">
          <img :src="metadata.avatar" /><br />
          🏷️ {{ metadata.name }}<br />
          🔗 {{ metadata.homepage }}
        </li>
      </pass>
    </ul>
  </div>
</template>

<script>
  export default {
    data: () => ({
      users: ['dan', 'una', 'alex']
    }),
    methods: {
      getUserData (id) {
        // Imagine that this method was way more
        // complex and expensive to execute
        return {
          dan: {
            name: 'Dan',
            avatar: 'https://avatars0.githubusercontent.com/u/810438?v=4',
            homepage: 'overreacted.io'
          },
          una: {
            name: 'Una',
            avatar: 'https://avatars1.githubusercontent.com/u/1693164?v=4',
            homepage: 'una.im'
          },
          alex: {
            name: 'Alex',
            avatar: 'https://avatars3.githubusercontent.com/u/97331?v=4',
            homepage: 'infrequently.org'
          }
        }[id]
      }
    }
  }
</script>

<style>
  body {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: DarkSlateGray;
    background: whitesmoke;
  }

  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    max-width: 300px;
  }

  li {
    background: white;
    padding: 0.5em;
    margin: 0.25em 0;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.25);
    border-radius: 3px;
    font-size: 0.28rem;
  }

  h1 {
    font-size: 0.28rem;
  }

  li img {
    float: left;
    margin-right: 0.5em;
    border-radius: 50%;
    width: 80px;
    height: 80px;
  }

  li::after {
    content: "";
    display: block;
    clear: both;
  }
</style>
