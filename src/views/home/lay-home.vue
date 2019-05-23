<template>
  <Layout name="LayoutHome">
    <div class="home-wrap">
      <section class="home-wrap__section">
        <img class="home-wrap__section__img" src="../assets/logo.jpeg" alt="">
        <span class="home-wrap__section__name">{{userInfo.shopName}}</span>
      </section>
      <ul class="home-wrap__list">
        <li class="home-wrap__list__item"
            v-for="(item, index) in meanList"
            :key="index"
            @click.stop="jumpPage(index, item.jumpUrl)">
          <i class="home-wrap__list__item__icon iconfont icon-renminbi" :class="iconClass(item.iconName)"></i>
          <span class="home-wrap__list__item__text">{{item.title}}</span>
        </li>
      </ul>
    </div>
  </Layout>
</template>

<script>
  import Layout from '../layouts/Layout'
  import {setStore} from '../utils/storage'
  import {mapGetters} from 'vuex'

  export default {
    data () {
      return {
        meanList: [
          {
            title: '申请调价',
            iconName: 'icon-renminbi',
            jumpUrl: 'adjustPrice'
          },
          {
            title: '申请物料',
            iconName: 'icon-wuliaoxianxing',
            jumpUrl: ''
          },
          {
            title: '申请添加商品',
            iconName: 'icon-jiahao',
            jumpUrl: ''
          },
          {
            title: '调价申请记录',
            iconName: 'icon-bianji',
            jumpUrl: 'adjustPriceRecord'
          },
          {
            title: '饿百结算记录',
            iconName: 'icon-daishu',
            jumpUrl: 'settleRecordList'
          }
        ]
      }
    },
    computed: {
      ...mapGetters([
        'userInfo'
      ])
    },
    methods: {
      iconClass (name) {
        return {
          [name]: true
        }
      },
      jumpPage (index, url) {
        if (index === 1 || index === 2) return
        this.$router.push({name: url})
      }
    },
    mounted () {
      const accessToken = this.$route.query.accessToken
      setStore('token', accessToken)
      !Object.keys(this.userInfo).length && this.$store.dispatch('getUserInfo')
    },
    components: {
      Layout
    }
  }
</script>

<style lang="scss" scoped>
  .home-wrap {
    &__section {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: relative;
      height: 4rem;
      background: #aa5103;
      text-align: center;
    }
    &__section__img {
       border-radius: 50%;
       width: 1.8rem;
       height: 1.8rem;
    }
    &__section__name {
      margin-top: .3rem;
      font-size: .28rem;
      line-height: .32rem;
      padding-right: 0;
      color: #fff;
    }
    &__list {
      display: flex;
      flex-wrap: nowrap;
      background-color: #fff;
      flex-direction: row;
      flex-flow: wrap;
    }
    &__list__item {
      width: 2.5rem;
      border-bottom: 1px solid #ddd;
      border-right: 1px solid #ddd;
      display: flex;
      height: 2rem;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    &__list__item__icon {
      font-size: .6rem;
      color: #666;
    }
    &__list__item__text {
      line-height: .36rem;
      font-size: .26rem;
      padding-right: 0;
      position: relative;
      height: auto;
      color: #777;
      margin-top: .1rem;
    }
  }
</style>


