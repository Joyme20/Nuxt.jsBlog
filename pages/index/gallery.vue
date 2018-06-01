<template>
  <div class="vue-images">

    <!--这是缩略图-->
    <gallery :images="images"
             :index="index"
             @changeIndex="changeImg($event)"/>
    <!--changeImg 改变isShow的值-->

    <!--这是点击缩略图后弹出的-->
    <!--click isShow显示fancybox-->
    <div ref="lightbox" class="lightbox" v-show="isShow" @click="isShow=!modalclose">
      <fancybox
        ref="fancybox"
        :images="images"
        :index="index"
        :reset="!isShow"


        @addIndex="nextImg"
        @decIndex="prevImg"
        :showclosebutton="showclosebutton"
        :showcaption="showcaption"
        :imagecountseparator="imagecountseparator"
        :showimagecount="showimagecount"/>
    </div>
    <div style="height: 1000px"></div>
    <!--@play="playImg"-->
    <!--@pause="pauseImg"-->
    <!--@close="closeImg"-->
  </div>
</template>

<script>
  import Gallery from "./common/gallery";
  import Fancybox from "./common/fancybox";

  export default {
    components: {
      "fancybox":Fancybox,
      Gallery
    },
    name: "lightbox",
    props: {
      // imgs: Array,
      // modalclose: Boolean,
      keyinput: Boolean,
      // mousescroll: Boolean,
      showclosebutton: Boolean,
      showcaption: Boolean,
      imagecountseparator: String,
      showimagecount: Boolean,
      showthumbnails: Boolean
    },
    computed: {
      images () {
        let retArr = []
        let idx = 0

        // Filter to remove undefined items
        this.imgs.forEach((item) => {
          if (item) {
            item['index'] = ++idx
            item['isActive'] = false
            item['caption'] = item.caption ? item.caption : ''
            retArr.push(item)
          }
        })

        for (let i = 0, len = retArr.length; i < len; i++) {
          retArr[i]['total'] = len
        }

        return retArr
      }
    },
    data(){
      return{
        isShow: false,
        modalclose: true,
        mousescroll: true,

        index: 0,
        playTimer: null,
        touchPoint: {
          prev: 0,
          now: 0
        },
        imgs:[
          {//以gallery.vue支持的路径为标准../../../static/img/
            imageUrl:"/img/1.jpg",
            name:"11"

          },
          {
            imageUrl:"/img/2.jpg",
            name:"22"

          },
          {
            imageUrl:"/img/3.jpg",
            name:"33"

          },
          {
            imageUrl:"/img/4.jpg",
            name:"44"

          },
          {
            imageUrl:"/img/5.jpg",
            name:"55"

          },
          {
            imageUrl:"/img/6.jpg",
            name:"66"

          },

        ]
      }
    },
    created () {
      if (this.isShow) {
        window.addEventListener('keydown', this.keyFun)
        window.addEventListener('mousewheel', this.wheelFun)
        this.$refs.lightbox.addEventListener('touchstart', this.touchFun)
      }
    },
    methods: {
      openImg () {
        this.isShow = true
      },
      changeImg (event) {
        this.isShow = true;
        this.$refs.fancybox.next = (this.index > event); //$refs获取组件fancybox  然后改变里面的next的值
        this.index = event;
      },

      //  还未分析的
      pauseImg () {
        window.clearInterval(this.playTimer)
      },
      closeImg () {
        this.isShow = false
      },
      nextImg () {
        if (this.index < this.images.length - 1) {
          this.index++
        } else {
          this.index = 0
        }
      },
      prevImg () {
        if (this.index > 0) {
          this.index--
        }
      },
      // changeImg (event) {
      //   this.isShow = true
      //   this.$refs.fancybox.next = this.index > event
      //   this.index = event
      // },
      keyFun (event) {
        event.preventDefault()
        if (this.keyinput) {
          switch (event.keyCode) {
            case 27:
              this.closeImg()
              break
            case 37:
              if (this.index > 0) {
                if (this.timeout) {
                  clearTimeout(this.timeout)
                } else {
                  this.$refs.fancybox.next = true
                  this.$refs.fancybox.animation = true
                  this.prevImg()
                }

                this.timeout = setTimeout(() => {
                  this.timeout = null
                }, 375)
              }
              break
            case 39:
              if (this.index < this.images[this.index].total - 1) {
                if (this.timeout) {
                  clearTimeout(this.timeout)
                } else {
                  this.$refs.fancybox.next = false
                  this.$refs.fancybox.animation = true
                  this.nextImg()
                }

                this.timeout = setTimeout(() => {
                  this.timeout = null
                }, 375)
              }
              break
            default:
              return
          }
        } else {
          return
        }
      },
      wheelFun (event) {
        if (this.mousescroll) {
          event.stopPropagation()
          if (event.deltaY > 0) {
            if (this.index < this.images[this.index].total - 1) {
              if (this.timeout) {
                clearTimeout(this.timeout)
              } else {
                this.$refs.fancybox.next = false
                this.$refs.fancybox.animation = true
                this.nextImg()
              }

              this.timeout = setTimeout(() => {
                this.timeout = null
              }, 375)
            }
          } else {
            if (this.index > 0) {
              if (this.timeout) {
                clearTimeout(this.timeout)
              } else {
                this.$refs.fancybox.next = true
                this.$refs.fancybox.animation = true
                this.prevImg()
              }

              this.timeout = setTimeout(() => {
                this.timeout = null
              }, 375)
            }
          }
        } else {
          return
        }
      },
      touchFun (event) {
        event.stopPropagation()
        this.touchPoint.prev = event.touches[0].clientX
      },
      endFun (event) {
        event.stopPropagation()
        this.touchPoint.now = event.changedTouches[0].clientX
        var that = this
        if (this.touchPoint.prev > this.touchPoint.now + 50) {
          if (this.index < this.images[this.index].total - 1) {
            window.setTimeout(() => {
              that.$refs.fancybox.next = false
              that.$refs.fancybox.animation = true
              that.nextImg()
            }, 375)
          }
        } else if (this.touchPoint.now > this.touchPoint.prev + 50) {
          if (this.index > 0) {
            window.setTimeout(() => {
              that.$refs.fancybox.next = true
              that.$refs.fancybox.animation = true
              that.prevImg()
            }, 375)
          }
        }
      }
      //还未分析的结尾
    },
    watch: {
      isShow () {
        if (this.isShow) {
          document.body.style.position = 'fixed'
          window.addEventListener('keydown', this.keyFun)
          this.$refs.lightbox.addEventListener('mousewheel', this.wheelFun)
          this.$refs.lightbox.addEventListener('touchstart', this.touchFun)
          this.$refs.lightbox.addEventListener('touchend', this.endFun)
        } else {
          this.pauseImg();
          document.body.style.position = 'static'
          window.removeEventListener('keydown', this.keyFun)
          this.$refs.lightbox.removeEventListener('mousewheel', this.wheelFun)
          this.$refs.lightbox.removeEventListener('touchstart', this.touchFun)
          this.$refs.lightbox.removeEventListener('touchend', this.endFun)
        }
      }
    },
  }
</script>

<style scoped>
  .vue-images{
    margin: 40px auto;

  }
  /*弹出的半透明层样式*/
  /*gallery{*/
  /*display: flex;*/
  /*margin: 0 auto;*/
  /*}*/
  .lightbox{
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
    width: 100%;
    height: 100%;
    /*padding: 2px;*/
    background: rgba(0, 0, 0, 0.8);
    /*box-sizing: border-box;*/
    font-size: 0;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  }



</style>
