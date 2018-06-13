<template>
  <div id="app" style="">

    <div class="v-header">
      <el-menu :default-active="'1'" class="el-menu-demo" mode="horizontal" >
        <!--@select="handleSelect"-->
        <el-menu-item index="1">
          <nuxt-link to="/">HOME</nuxt-link>
        </el-menu-item>
        <!--<el-submenu index="2">-->
        <!--<template slot="title">TOOLBOX</template>-->
        <!--<el-menu-item index="2-1">选项1</el-menu-item>-->
        <!--<el-menu-item index="2-2">选项2</el-menu-item>-->
        <!--<el-menu-item index="2-3">选项3</el-menu-item>-->
        <!--<el-submenu index="2-4">-->
        <!--<template slot="title">选项4</template>-->
        <!--<el-menu-item index="2-4-1">选项1</el-menu-item>-->
        <!--<el-menu-item index="2-4-2">选项2</el-menu-item>-->
        <!--<el-menu-item index="2-4-3">选项3</el-menu-item>-->
        <!--</el-submenu>-->
        <!--</el-submenu>-->
        <el-menu-item index="2">
          <!--<nuxt-link to="/lightbox/lightbox">GALLERY</nuxt-link>-->
          <nuxt-link to="/gallery">GALLERY</nuxt-link>
        </el-menu-item>
        <!--<el-menu-item index="3" disabled>消息中心</el-menu-item>-->
        <el-menu-item index="3">CODING</el-menu-item>
        <el-menu-item index="4">ABOUT</el-menu-item>
      </el-menu>
    </div>
    <!--<div class="nav">-->
      <!--<li><nuxt-link to="/">HOME</nuxt-link></li>-->
      <!--<li><nuxt-link to="/gallery">GALLERY</nuxt-link></li>-->
      <!--<li><nuxt-link to="/gallery">GALLERY</nuxt-link></li>-->
      <!--<li><nuxt-link to="/gallery">GALLERY</nuxt-link></li>-->
    <!--</div>-->

    <div>
      <!--<home></home>-->
      <nuxt-child></nuxt-child>

    </div>


  </div>
</template>

<script>
import AppLogo from '~/components/AppLogo.vue'
import Home from './index/home.vue'

export default {
  components: {
    AppLogo,
    Home
  }
}
</script>

<style>

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /*text-align: center;*/
    /*color: #500b0b;*/
    /*margin-top: 60px;*/
    /*position: relative;*/
    margin: 0 auto;
    max-width: 660px;
    /*background: url(../src/assets/微信图片_20180513182044.png) center center;*/

  }
  .v-header{
    display: flex;
    text-align: center;
    justify-content: center;
  }

  a {
    text-decoration: none;

  }
  /*.nav{*/
    /*margin: 0 auto;*/
    /*!*max-width: 660px;*!*/
  /*}*/
  /*.nav li{*/
    /*display: inline;*/
    /*margin: 0 20px;*/
  /*}*/
</style>
