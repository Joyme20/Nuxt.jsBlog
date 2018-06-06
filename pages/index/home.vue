<template>
    <div class="home">
      <div class="line"><span><b>CODING</b></span></div>
      <br/>
      <div v-for="(article,index) in articles" :key="index">
        <div class="title">
          <u><nuxt-link class="link" :to="/articles/+article[0]">[ {{article[1]}} ]</nuxt-link></u>
          <div>&emsp;({{article[2]}})</div>
        </div>

      </div>
      <br/>
      <div class="line"><span><b>MY LIFT</b></span></div>
      <!--<nuxt-child/>-->
      <div style="height: 1000px"></div>
    </div>
</template>

<script>
    import * as axios from "axios";
    import qs from 'qs';
    // import article_1 from "article/article_1";

    export default {
        name: "articles",
      data(){
        return{
          htmlContent: "",
          keyNum: 0,
          articles:[],
          id:[]
        }
      },
      methods:{
        request(){
          // axios.create({
          //   baseURL: 'http://127.0.0.1:5000',
          //   timeout: 1000,
          //   headers: {'X-Custom-Header': 'foobar'},
          //   // `withCredentials` 表示跨域请求时是否需要使用凭证
          //   withCredentials: true, // 默认的
          // });
          // axios.defaults.baseURL = 'http://193.112.14.234';
          axios.create();
          // `withCredentials` 表示跨域请求时是否需要使用凭证
          // axios.defaults.withCredentials = true; // 默认的
          let _this = this;
          // let _id = this.$route.params.id;  //获取传过来的参数

          // let keyNum = String(this.keyNum);
          // console.log(_id);
          //   /api = http://193.112.14.234
          axios.get('/api/title')
            .then(response => (
                _this.id = response.id,
                _this.articles = response.data,
                console.log(_this.articles)
        ))
            .catch(error => (
                console.log(error)
              )
            );
        }
      },
      mounted(){
        this.request();
      },


    }
</script>


<style scoped>
  .home{
    width: 560px;
    margin: 40px auto;
  }
  .title{
    display: inline-block;
  }
  .title div{
    float: right;
    bottom: 0;
  }
  .link{
   font-size: 16px;
    color: #2B3F52;
    line-height: 30px; /*行距*/
  }
  .line span {
    display: block;      /*设置为块级元素会独占一行形成上下居中的效果*/
    position: relative;  /*定位横线（当横线的父元素）*/

    color: #175ca4;      /*居中文字的颜色*/
    text-align: center;
  }
  .line span:before, .line span:after {
    content: '';
    position: absolute;   /*定位背景横线的位置*/
    top: 50%;
    background: #d5d5d5;   /*背景横线颜色*/
    width: 40%;            /*单侧横线的长度*/
    height: 2px;
  }
  .line span:before {
    left: 0%;              /*调整背景横线的左右距离*/
  }

  .line span:after {
    right: 0%;
  }

</style>
