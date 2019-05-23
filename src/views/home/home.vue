<template>
  <div class="home-page">
    <my-header v-bind="myHeaderInfo" :class="[myHeaderInfo.classNameBg, myHeaderInfo.classNameTextColor]" v-if="false">
      <div class="header-right-slot" slot="right-slot">
        <p class="header-right-slot__no-apply" v-if="needChangeUrl.indexOf($router.currentRoute.name) > -1">
          <span class="header-right-slot__no-apply__text" :class="{'header-right-slot__no-apply__text_black': blackTextColorList.includes($router.currentRoute.name)}">{{myHeaderInfo.rightText}}</span>
          <span class="arrow-bottom arrow-bottom_rigth-30 arrow-bg-white" :class="{'arrow-bg_black': blackTextColorList.includes($router.currentRoute.name)}"></span>
        </p>
        <p class="header-right-slot__no-apply" v-if="$router.currentRoute.name === 'my'" @click.prevent.stop="loginOut">
          <span class="header-right-slot__no-apply__login-out">退出登录</span>
        </p>
      </div>
    </my-header>
    <Configure :emit-name="emitName" @loginOut="loginOut" @switchPlat="switchPlat"></Configure>
    <router-view></router-view>
    <my-footer :menu-list="menuList"></my-footer>
    <ConfirmDialogue :text="isExit" @confirm-ok='confirm'></ConfirmDialogue>
  </div>
</template>

<script>
  import MyHeader from '@/components/header'
  import MyFooter from './components/footer'
  import Configure from './components/configure'
  import ConfirmDialogue from '@/components/confirmdialogue'
  import { removeStore } from '../../utils/storage'

  export default {
    provide () {
      return {
        homeRouter: this
      }
    },
    beforeRouteEnter (to, from, next) {
      next()
    },
    data () {
      return {
        // 配置显示退出登录或切换平台
        // 需要更改额度中心url的item
        emitName: 'switchPlat',
        isExit: '确定退出登录么？',
        isShowDialogue: false,
        needChangeUrl: [
          'status',
          'noApply',
          'homeCenter'
        ],
        // 右边区域黑色字体
        blackTextColorList: [
          'status',
          'homeCenter'
        ],
        myHeaderInfo: {
          isSlot: false,
          title: '',
          isMiddle: true,
          isArrow: false,
          classNameBg: '',
          classNameTextColor: ''
        },
        menuList: [
          {
            title: '额度中心',
            iconName: 'icon-center',
            iconNameActive: 'icon-center-active',
            jumpUrl: 'noApply'
          },
          {
            title: '融资',
            iconName: 'icon-borrow',
            iconNameActive: 'icon-borrow-active',
            jumpUrl: 'borrowHome'
          },
          {
            title: '还款',
            iconName: 'icon-repayment',
            iconNameActive: 'icon-repayment-active',
            jumpUrl: 'repaymentList'
          },
          {
            title: '我的',
            iconName: 'icon-my',
            iconNameActive: 'icon-my-active',
            jumpUrl: 'my'
          }
        ]
      }
    },
    methods: {
      getCurrentRoutes () {
        if (this.$router.currentRoute.name === 'my') {
          this.emitName = 'loginOut'
        } else if (this.$router.currentRoute.name === 'noApply' || this.$router.currentRoute.name === 'homeCenter' || this.$router.currentRoute.name === 'status') {
          this.emitName = 'switchPlat'
        }
      },
      confirm () {
        this.$store.dispatch('entLogout').then(res => {
          if (res.respCode === '000000') {
            removeStore('token')
            this.$router.replace({name: 'login'})
          }
        })
      },
      loginOut () {
        this.eventBus.$emit('confirm/show')
      },
      switchPlat () {
        console.log('切换平台')
      }
    },
    components: {
      MyHeader,
      MyFooter,
      ConfirmDialogue,
      Configure
    },
    watch: {
      $route () {
        this.getCurrentRoutes()
      }
    },
    mounted () {
      this.getCurrentRoutes()
    }
  }
</script>

<style lang="scss">
  .header-component__yellow-bg .header{
    background:#B29668!important;
    border-bottom: none!important;
  }

  .header-component__white-text .header{
    .title {
      color: #fff!important;
    }
  }
  .header-right-slot__no-apply__text {
    display: flex;
    align-items: center;
    font-size: .24rem;
    color: #fff;
    margin-right: .8rem;
  }
  .header-right-slot__no-apply__login-out {
    @extend .header-right-slot__no-apply__text;
    margin-right: .3rem;
  }
  .header-right-slot__no-apply__text_black {
    color: #666;
  }
  .header-right-slot__no-apply {
    position: absolute;
    height: 100%;
    top: 0;
    right: 0;
    display: flex;
    align-items: center;
    .arrow-bg-white {
      top: 50%;
      margin-top: -10px;
    }
  }
</style>
