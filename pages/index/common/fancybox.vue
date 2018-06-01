<template>
  <div class="fancybox">
    <!--<h1>aaaaaaaaaaaaaaaaa</h1>-->
    <div class="image-wrapper">
      <!--很多参数是通过props传进来的-->
      <transition-group name="el-fade-in-linear"
        style="white-space:nowrap"
                        :mode="transition.mode"
                        :enter-active-class="'animated ' + transition.enterClass"
                        :leave-active-class="'animated ' + transition.leaveClass">

        <img ref="images"
             class="image lazyload"
             v-for="item in images" :key="item.index"
             :src="item.imageUrl"
             v-show="item.index === index+1 && !reset"
             @click.stop="addIndex">


        <!--click.stop阻止单击事件继续传播-->

        <!--v-for="item in images" :key="item.index"-->
      </transition-group>
    </div>

    <div v-if="index > 0" class="arrow left" @click.stop="decIndex">
      <!--<i class="el-icon-arrow-left"></i>-->
      <img src="../../../static/icon/左.png" height="40" width="40"/>
    </div>

    <!--<img src="../../../static/icon/右.png" height="200" width="200"/>-->
    <div v-if="index < images[index].total-1" class="arrow right" @click.stop="addIndex">
      <!--<i class="el-icon-arrow-right"></i>-->
      <img src="../../../static/icon/右.png" height="40" width="40"/></div>

  </div>

</template>

<script>
    export default {
        name: "fancybox",
      props: {
        index: Number,
        images: Array,
        reset: Boolean,
        animate: {
          type: Boolean,
          default: false
        },
        showclosebutton: Boolean,
        showcaption: Boolean,
        imagecountseparator: String,
        showimagecount: Boolean
      },
      data () {
        return {
          next: true,
          animation: false,
          // isFullScreen: document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen,
          // isPlay: false
        }
      },
      computed: {
        transition () {
          return {
            mode: '',
            enterClass: this.next ? 'slideInLeft' : 'slideInRight',
            leaveClass: this.next ? 'slideOutRight' : 'slideOutLeft'
          }
        }
      },
      methods:{
        decIndex () {
          if (this.timeout) {
            clearTimeout(this.timeout)
          } else {
            this.$emit('decIndex')
            this.next = true
            this.animation = true
          }
        },
        addIndex () {
          if (this.index < this.images[this.index].total - 1) {
            if (this.timeout) {
              clearTimeout(this.timeout)
            } else {
              this.$emit('addIndex')
              this.next = false
              this.animation = true
            }

            this.timeout = setTimeout(() => {
              this.timeout = null
            }, 350)
          }
        },
      }
    }
</script>

<style scoped>
  .fancybox{
    position: relative;
    display: flex;
    height: calc(100% - 80px);
    text-align: center;
    align-items: center;
    /*background: #42b983;*/
  }
  .image-wrapper{
    display: inline-block;
    position: relative;
    margin: 0 auto;
  }
  .image{
    vertical-align: middle;
    max-height: calc(100vh - 180px);
    min-height: 200px;
    /*@media screen and (min-width:720px){}*/
      /*max-width: calc(85vw);*/
    /*@media screen and (max-width:720px);*/
      /*max-width: calc(98vw);*/
    margin: 0 auto;
    cursor: pointer;
    user-select: none;
    border: white 3px solid;
    border-radius: 5px;

  }
  .arrow {
    display: inline-block;
    position: absolute;
    cursor: pointer;
    /*background-color: #3a8ee6;*/
    z-index: 10;
    /*&.left*/
    /*left: 0*/
    /*&.right*/
    /*right: 0*/
  }
  @media screen and (min-width:720px){
    .arrow{
      height: 40px;
      width: 80px;
      top: calc(50% - 8px);
    }
  }

  @media screen and (max-width:720px){
    .arrow{
      height: 20px;
      width: 40px;
      top: calc(50% + 12px);
    }
  }

  .left{
    left: 0;
  }
  .right{
    right: 0;
  }
  .el-icon-arrow-left{
    height: 40px;
    width: 40px;
    color: white;
    z-index: 11;

  }
  .el-icon-arrow-right{
    height: 40px;
    width: 40px;
    z-index: 11;

  }



  /*下面是动画切换*/
  .animated {
    -webkit-animation-duration: 1s;
    animation-duration: 1s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    transition: 1s;
  }

  @-webkit-keyframes slideInLeft {
    from {
      -webkit-transform: translate3d(-100%, 0, 0);
      transform: translate3d(-100%, 0, 0);
      visibility: visible;

    }

    to {
      -webkit-transform: translate3d(50%, 0, 0);
      transform: translate3d(50%, 0, 0);
    }
  }

  @keyframes slideInLeft {
    from {
      -webkit-transform: translate3d(-100%, 0, 0);
      transform: translate3d(-100%, 0, 0);
      visibility: visible;
    }

    to {
      -webkit-transform: translate3d(50%, 0, 0);
      transform: translate3d(50%, 0, 0);
    }
  }

  .slideInLeft {
    -webkit-animation-name: slideInLeft;
    animation-name: slideInLeft;
  }

  @-webkit-keyframes slideInRight {
    from {
      -webkit-transform: translate3d(50%, 0, 0);
      transform: translate3d(50%, 0, 0);
      visibility: visible;
    }

    to {
      -webkit-transform: translate3d(-50%, 0, 0);
      transform: translate3d(-50%, 0, 0);
    }
  }

  @keyframes slideInRight {
    from {
      -webkit-transform: translate3d(50%, 0, 0);
      transform: translate3d(50%, 0, 0);
      visibility: visible;
    }

    to {
      -webkit-transform: translate3d(-50%, 0, 0);
      transform: translate3d(-50%, 0, 0);
    }
  }

  .slideInRight {
    -webkit-animation-name: slideInRight;
    animation-name: slideInRight;
  }

  @-webkit-keyframes slideOutLeft {
    from {
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
    }

    to {
      visibility: hidden;
      -webkit-transform: translate3d(-150%, 0, 0);
      transform: translate3d(-150%, 0, 0);
    }
  }

  @keyframes slideOutLeft {
    from {
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
    }

    to {
      visibility: hidden;
      -webkit-transform: translate3d(-150%, 0, 0);
      transform: translate3d(-150%, 0, 0);
    }
  }

  .slideOutLeft {
    -webkit-animation-name: slideOutLeft;
    animation-name: slideOutLeft;
  }

  @-webkit-keyframes slideOutRight {
    from {
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
    }

    to {
      visibility: hidden;
      -webkit-transform: translate3d(150%, 0, 0);
      transform: translate3d(150%, 0, 0);
    }
  }

  @keyframes slideOutRight {
    from {
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
    }

    to {
      visibility: hidden;
      -webkit-transform: translate3d(150%, 0, 0);
      transform: translate3d(150%, 0, 0);
    }
  }

  .slideOutRight {
    -webkit-animation-name: slideOutRight;
    animation-name: slideOutRight;
  }





</style>
