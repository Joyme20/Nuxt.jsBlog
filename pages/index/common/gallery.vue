<template>

  <div class="gallery">
    <!--<h1>aaaaaaaaaaaa</h1>-->
      <div class="pic"
           v-for="(item, index) in images"
           :key="index"
           @mouseover="overShow(index)"
           @mouseout="outShow()">
        <!--{{item.imageUrl}}-->
        <img :src="item.imageUrl"
             class="lazyload"
             @click="setActive(index)">
        <span class="word" v-show="index2===index" :index2="index">{{item.name}}</span>
        <!--<img src="../../../static/img/2.jpg"/>-->
        <!--<button @click="click">aaaaaa</button>-->
      </div>
    <!--<img src="../../../static/img/1.jpg"/>-->

      <!--<img src="/src/assets/img/4.jpg"/>-->

    </div>

</template>

<script>


  export default {
    component:{

    },
      name: "gallery",
      props:{
          // images:[]
          images:Array
      },
    data(){
        return{
          isShow2: false,
          modalclose: true,
          index2:-1

        }

    },
    methods: {

      click() {
        alert(this.images)
      },
      setActive(idx) {
        this.$emit('changeIndex', idx)
      },
      overShow(idx) {
        // if (idx === this.index2) {
        //   return true;
        // }
        this.index2=idx;
      },
      outShow() {
        this.index2 = -1;
      },
    }
  }
</script>

<style lang="css" scoped>
  .gallery{
    /*display: flex;*/
    /*align-items: center;*/
    /*justify-content: center;*/
    transition: 0.5s;
    max-width: 660px;
    margin: 0 auto;
  }
  .pic {
    display: inline-block;
    max-width: 200px;
    max-height: 200px;
    min-width: 150px;
    min-height: 150px;
    overflow: hidden;
    margin: 10px;
    transition: 0.5s;
    position: relative;

  }
  .pic:hover{
    /*background: rgba(0, 0, 0, 0.5);*/
  }
  .pic img {
    max-width: 200px;
    transition: 1s;


  }
  .pic img:hover{
    max-width: 220px;
    filter: brightness(50%);

  }

  .word{
    position:absolute;
    color: white;
    top: 40%;
    left: 45%;
    transition: 1s;
    font: 20px bold;
  }


</style>
