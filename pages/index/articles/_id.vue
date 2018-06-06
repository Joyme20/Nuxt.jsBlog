<template>
  <div class="article_1">
    <!--<nuxt-link to="/child">lightbox</nuxt-link>-->
    <!--<h1>aaa</h1>-->
    <!--<button @click="request">aaa</button>-->
    <!--<h2>CSS编码规范</h2>-->
    <div class="content" :htmlContent="htmlContent" v-html="htmlContent"></div>


  </div>
</template>

<script>
  import * as axios from "axios";
  import Marked from "marked";

  import qs from 'qs';

  export default {
    name: "article_1",
    // template: "<h1>articles</h1>",
    props:{
      // keyNum:Number,

    },
    data(){
      return{
        htmlContent: "",
        keyNum: 1,
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
        let _id = this.$route.params.id;  //获取传过来的参数index

        // let keyNum = String(this.keyNum);
        console.log(_id);
        axios.get('/api/articles/'+ _id)
          .then(response =>
            // console.log(response);
            // this.$set(this.htmlContent,response);
            (
              // text = response.data,
                // _this.articles = text,
              _this.htmlContent =
              _this.htmlContent
              + Marked(response.data),
            console.log(_this.htmlContent)

            // return this.htmlContent;
          ))
          .catch(error => (
              console.log(error)
            )
          );
      }
    },
    mounted(){
      this.request();
    }
  }
</script>


<style scoped>
  .article_1{
    width: 660px;
    margin: 40px auto;

  }
  /*.content{*/
    /*!*top: 40px;*!*/
    /*width: 660px;*/
    /*margin: 40px auto;*/
  /*}*/
</style>
