<template>
  <div class="configure-component">
    <header class="configure-component__header">
      <span class="configure-component__header__title" @click="dispatchEvent()">{{configure.title || ''}}</span>
      <span class="configure-component__header__downArrow" v-if="configure.isExtension"></span>
    </header>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        info: {
          'my': {
            title: '退出登录',
            isExtension: false
          },
          'noApply': {
            title: '四联化工',
            isExtension: false
          },
          'homeCenter': {
            title: '四联化工',
            isExtension: false
          },
          'status': {
            title: '四联化工',
            isExtension: false
          }
        },
        configure: {}
      }
    },
    props: {
      emitName: {
        type: String,
        default: 'switchPlat'
      }
    },
    methods: {
      dispatchEvent () {
        this.$emit(this.emitName)
      },
      showConfigure () {
        this.configure = this.info[this.$router.currentRoute.name] || {}
      }
    },
    watch: {
      $route () {
        this.showConfigure()
      }
    },
    mounted () {
      this.showConfigure()
    }
  }
</script>

<style lang="scss" scoped>
  .configure-component {
    &__header {
    	display: flex;
    	flex-direction: row;
    	justify-content: space-between;
    	align-items: center;
	    width: 1.8rem;
	    position: fixed;
	    right: 0.1rem;
	    top: 0.3rem;
	    z-index: 10000;
      &__title {
      	flex:3;
      	font-size:0.3rem;
				font-family:PingFangSC-Regular;
				font-weight:400;
				color:rgba(255,255,255,1);
				text-align: right;
        padding-right: 0.3rem;
      }
      &__downArrow {
      	flex: 1;
		    display: block;
		    height: 0.3rem;
		    position: relative;
		    top: 0.1rem;
		    right: 0.08rem;
		    overflow: hidden;
      	&:after {
      		content: '';
      		display: block;
      		width:0.18rem;
      		height:0.18rem;
      		border:1px solid #ffffff;
      		transform: rotateZ(45deg) translateY(-.12rem);
      	}
      }
    }
  }
</style>

