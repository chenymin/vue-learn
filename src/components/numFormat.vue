<template>
    <div>
        <p :class="bigFontSize">{{ getInteger }}.<span :class="smallFontSize">{{ getDecimal }}</span></p>
        
    </div>
</template>

<script>
export default {
  props: {
    num: {
      type: String,
      default () {
        return ''
      }
    },
    bigFontSize: {
      type: String,
      default: 'integernum'
    },
    smallFontSize: {
      type: String,
      default: 'decimalnum'
    }
  },
  computed: {
    getInteger () {
      return this.num && this.num.split('.')[0]
    },
    getDecimal () {
      return this.num && this.num.split('.')[1]
    }
  }
}
</script>

<style lang="scss" scoped>
    .integernum{
      color: white;
      text-align: center;
      font-size: .72rem;
    }
    .decimalnum{
       color: white;
       text-align: center;
       font-size: .48rem
    }

</style>