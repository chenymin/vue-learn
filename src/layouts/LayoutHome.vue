<template>
  <div class='layout-home-wrap'>
    <my-head :title="currentRouterInfo.title" :is-middle="true" :is-arrow="!isHomePage()"></my-head>
    <main class='layout-home-wrap__main'>
      <slot/>
    </main>
    <footer class='layout-home-wrap__fotter'>
      <ul class='layout-home-wrap__fotter__list'>
        <li class='layout-home-wrap__fotter__list__item'
            v-for="(item, index) in menuList"
            :class="{'layout-home-wrap__fotter__list__item-active': currentRouterInfo.along === item.jumpUrl}"
            :key="index"
            @click.stop="switchMenu(index, item.jumpUrl)">
          <i class='layout-home-wrap__fotter__list__item__icon iconfont' :class="listClass(item.iconName)"></i>
          <span class='layout-home-wrap__fotter__list__item__text'>{{item.title}}</span>
        </li>
      </ul>
    </footer>
  </div>
</template>

<script>
import MyHead from '../components/header'
import {mapGetters} from 'vuex'
import {getStore} from '../utils/storage'

export default {
  name: `LayoutHome`,
  data () {
    return {
      menuList: [
        {
          title: '首页',
          iconName: 'icon-home',
          jumpUrl: 'home'
        },
        {
          title: '发现',
          iconName: 'icon-faxian',
          jumpUrl: ''
        },
        {
          title: '我的',
          iconName: 'icon-profile',
          jumpUrl: 'my'
        }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'currentRouterInfo'
    ])
  },
  methods: {
    listClass (name) {
      return {
        [name]: true
      }
    },
    switchMenu (index, url) {
      if (index === 1) return
      if (url === 'home') {
        this.$router.push({
          name: url,
          params: {
            accessToken: getStore('token')
          }
        })
        return
      }
      this.$router.push({name: url})
    },
    isHomePage () {
      return this.menuList.filter((item) => item.jumpUrl === this.$router.currentRoute.name).length >= 1
    }
  },
  mounted () {
    // console.log(this.$router.currentRoute)
  },
  destroyed () {
  },
  components: {
    MyHead
  }
}
</script>
<style lang='scss'>
.layout-home-wrap {
  &__main {
    height: calc(100vh - 2.08rem);
    background-color: #fff;
  }
  &__fotter {
    position: fixed;
    width: 100%;
    bottom: 0;
  }
  &__fotter__list{
    display: flex;
     height: 1.08rem;
    line-height: 1.08rem;
    color: #666;
    background-color: #f3f2f2;
    font-size: .24rem;
  }
  &__fotter__list__item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;
  }
  &__fotter__list__item__icon {
    /*width: 0.6rem;*/
    height: 0.45rem;
  }
  &__fotter__list__item__text {
    height: 1rem;
  }
  &__fotter__list__item-active {
     .iconfont {
       color: #aa5103;
     }
     .home-wrap__fotter__list__item__text {
      color: #aa5103;
     }
  }
}
</style>
