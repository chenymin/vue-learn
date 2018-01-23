<template>
  <div class="pull-commpent-wrap">
    <div class="pull-commpent-anim-up-wrap"></div>
    <div class="pull-commpent-scroll-wrap" :id='pullScrollId'>
      <slot name="pull-commpent-slot">
      </slot>
    </div>
    <div class="pull-commpent-anim-bottom-wrap"></div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        pullNode: '',
        startTime: 0,
        endTime: 0,
        startScrollTop: '',
        isTouchStart: false,
        dragDirection: '',
        target: {
          startX: 0,
          startY: 0,
          lastY: 0,
          moveDistanceY: 0
        }
      }
    },
    props: {
      pullScrollId: {
        type: String,
        default: 'pullScrollId'
      },
      pullDistanceDownY: {
        type: Number,
        default: 100
      },
      pullDistanceUpY: {
        type: Number,
        default: 100
      }
    },
    methods: {
      getPoint (b) {
        return {
          x: b.touches ? b.touches[0].pageX : b.clientX,
          y: b.touches ? b.touches[0].pageY : b.clientY
        }
      },
      updateUi () {
        if (this.isTouchStart) {
          const element = this.pullNode
          element.style.transform = 'translateY(' + this.target.moveDistanceY + 'px)'
          element.style.webkitTransform = 'translateY(' + this.target.moveDistanceY + 'px)'
          requestAnimationFrame(this.updateUi)
        }
      },
      onTouchStart (event) {
        console.log('onTouchStart-----')
        this.startTime = new Date().getTime()
        this.target.startY = this.getPoint(event).y
        this.target.lastY = this.target.startY
        this.isTouchStart = true

        this.dragDirection = ''
        this.startScrollTop = this.pullNode.scrollTop
        console.log(this.target.startY)
      },
      onTouchMove (event) {
        if (!this.isTouchStart) {
          return
        }
        this.target.lastY = this.getPoint(event).y
        this.target.moveDistanceY = this.target.lastY - this.target.startY
        this.dragDirection = this.target.moveDistanceY > 0 ? 'down' : 'up'
        if (this.dragDirection === 'down') {
          requestAnimationFrame(this.updateUi)
        }
        if (this.startScrollTop === 0 && this.direction === 'down') {
          event.preventDefault()
          event.stopPropagation()
        }
        console.log('----onTouchMove----' + this.dragDirection)
      },
      onTouchEnd (event) {
        if (!this.isTouchStart) {
          return
        }
        this.endTime = new Date().getTime()
        this.isTouchStart = false
        this.target.moveDistanceY = 0
        this.pullNode.style.transform = 'translateY(' + this.target.moveDistanceY + 'px)'
        if (this.dragDirection === 'down') {
          if (this.target.moveDistanceY >= this.pullDistanceDownY) {
          }
        }
      },
      onScrollHand (event) {
      },
      initEvents () {
        this.pullNode = document.getElementById(`${this.pullScrollId}`)

        this.pullNode.addEventListener('touchstart', this.onTouchStart)
        this.pullNode.addEventListener('touchmove', this.onTouchMove)
        this.pullNode.addEventListener('touchend', this.onTouchEnd)

        this.pullNode.addEventListener('scroll', this.onScrollHand, true) // 绑定到要滚动的元素才生效
      },
      destroyedEvents () {
        this.pullNode.removeEventListener('touchstart', this.onTouchStart)
        this.pullNode.removeEventListener('touchmove', this.onTouchMove)
        this.pullNode.removeEventListener('touchend', this.onTouchEnd)

        this.pullNode.removeEventListener('scroll', this.onScrollHand, true)
      }
    },
    mounted () {
      this.initEvents()
    },
    destroyed () {
      this.destroyedEvents()
    }
  }
</script>

<style lang="scss" scoped>
  .pull-commpent-wrap {
    display: flex;
    flex-direction: column;
    height: 100%;
    background-color: #fff;
    .pull-commpent-scroll-wrap {
      flex: 1;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      transition: all 130ms ease-in;
    }
  }
</style>

