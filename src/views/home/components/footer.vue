<template>
  <div class="footer-component">
    <footer class='footer-component__fotter'>
      <ul class='footer-component__list'>
        <li class='footer-component__list__item'
            v-for="(item, index) in menuList"
            :class="{'footer-component__list__item-active': index === currentIndex}"
            :key="index"
            @click.stop="switchMenu(index, item.jumpUrl)">
          <i class='footer-component__icon__outer'>
            <img class='footer-component__list__item__icon' :src="getImgUrl(index, item)" alt="">
          </i>
          <span class='footer-component__list__item__text'>{{item.title}}</span>
        </li>
      </ul>
    </footer>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    data () {
      return {
        currentIndex: 0
      }
    },
    props: {
      menuList: {
        type: Array,
        default () {
          return []
        }
      }
    },
    computed: {
      ...mapGetters([
        'currentRouterInfo'
      ])
    },
    watch: {
      $route () {
        if (['homeCenter', 'noApply', 'status'].includes(this.$router.currentRoute.name)) {
          this.currentIndex = 0
          return
        }
        this.byRouterGetIndex()
      }
    },
    methods: {
      getImgUrl (index = 0, {iconNameActive, iconName}) {
        const imgName = this.currentIndex === index ? iconNameActive : iconName
        return require(`../components/images/${imgName}.png`)
      },
      switchMenu (index, url) {
        // 多次点击同一个item
        if (this.currentIndex === index) {
          return
        }
        this.currentIndex = index
        this.$router.push({name: url})
      },
      isHomePage () {
        return this.menuList.filter((item) => item.jumpUrl === this.$router.currentRoute.name).length >= 1
      },
      byRouterGetIndex () {
        this.menuList.forEach(({jumpUrl}, index) => {
          if (this.$router.currentRoute.name === jumpUrl) {
            this.currentIndex = index
            return false
          }
        })
      }
    },
    mounted () {
      this.byRouterGetIndex()
    }
  }
</script>

<style lang='scss'>
.footer-component {
  &__fotter {
     position: fixed;
     width: 100%;
     bottom: 0;
     background-color: #fff;
     box-shadow:0px 0px 4px 1px rgba(245,245,245,1);
   }
  &__list{
     display: flex;
     color: #999;
     font-size: .24rem;
   }
  &__list__item {
     display: flex;
     flex-direction: column;
     justify-content: center;
     align-items: center;
     flex: 1;
     padding: 0.2rem 0;
   }
  &__icon__outer {
    position: relative;
    display: flex;
  }
  &__list__item__icon {
     width: .44rem;
     height: 0.5rem;
   }
  &__fotter__list__item__text {
     height: 1rem;
     color: #999;
   }
  &__list__item-active {
    .iconfont {
      color: #aa5103;
    }
    .footer-component__list__item__text {
      color: #A88E6F;
    }
  }
  }
</style>>
