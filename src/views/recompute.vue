<template>
  <div class="flex">
    <input ref="element" @input="value = $event.target.value">
    <div>Uppercased is: {{ uppercase }}</div>
  </div>
</template>

<script>
  import { recompute, recomputable } from '@/utils/recompute'

  export default {
    data: () => ({
      value: ''
    }),
    computed: {
      uppercase: recomputable(function uppercase () {
        if (!this.$refs.element) {
          return 'I will get recomputed :('
        }

        return this.value.toUpperCase()
      })
    },
    mounted () {
      recompute(this, 'uppercase')
    }
  }
</script>

<style>
  .flex {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .flex > * {
    margin-top: 1rem;
  }

  button {
    display: block;
    width: 20%;
  }
</style>
