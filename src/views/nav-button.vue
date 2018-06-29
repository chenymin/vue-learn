<template>
  <div id="app">
    <div class="btn-container" :style="{'backgroundColor': selectedBgColor}">
      <div v-for="(button, index) in buttons" 
          :key="index" :ref="`button_${index}`"
          @click="selectButton(index)"
          class="btn">
        <i :class="['fas', `fa-${button.icon}`]"></i>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        buttons: [
          {icon: 'comment', bgColor: '#DE9B00', color: '#EDB205'},
          {icon: 'user', bgColor: '#3EAF6F', color: '#4BD389'},
          {icon: 'map-marker', bgColor: '#BE0031', color: '#E61753'},
          {icon: 'cog', bgColor: '#8E00AC', color: '#B32DD2'}
        ],
        selectedBgColor: '#DE9B00',
        selectedId: 0
      }
    },
    mounted () {
      // initialize widget
      this.selectButton(0)
    },
    methods: {
      selectButton (id) {
        const previousButton = this.$refs[`button_${this.selectedId}`]
        const nextButton = this.$refs[`button_${id}`]
        
        this.selectedId = id
        this.animateBgColor()
        
        this.animateOut(previousButton)
        this.animateIn(nextButton)
      },
      animateBgColor () {
        TweenMax.to(this, 0.2, {
          selectedBgColor: this.selectedButton.bgColor
        })
      },
      animateIn (btn) {      
        // animate icon color
        TweenMax.to(btn, 0.3, {
          backgroundColor: this.selectedButton.color,
          color: 'white'
        })
                    
        // animate button width
        TweenMax.to(btn, 0.7, {
          width: 100,
          ease: Elastic.easeOut.config(1, 0.5)
        })
      },
      animateOut (btn) {
        // animate icon color
        TweenMax.to(btn, 0.3, {
          backgroundColor: 'white',
          color: 'gray'
        })
        
        // animate button width
        TweenMax.to(btn, 0.7, {
          width: 50,
          ease: Elastic.easeOut.config(1, 0.5)
        })
      }
    },
    computed: {
      selectedButton () {
        return this.buttons[this.selectedId]
      }
    }
  }
</script>


<style lang="scss" scoped>
.btn-container {
  display: flex;
  background-color: black;

  /* center vertically */
  padding-top: 150px;
  padding-bottom: 150px;
  /* center horizontally */
  justify-content: center;
}

.btn {
  display: inline-block;
  cursor: pointer;
  width: 50px;
  height: 50px;
  margin: 5px;
  font-size: 25px;
  color: gray;

  /*  Circles  */
  border-radius: 25px;
  background-color: white;

  /* center icons */
  text-align: center;
  line-height: 50px;

  /* remove touch blue highlight on mobile */
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
</style>
