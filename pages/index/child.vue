<template>
  <div id="child">
    <!--<h1>aaaaaaaaaaaaa</h1>-->
    <button @click="test">aaa</button>
  </div>

</template>

<script>
    export default {
        name: "child",
      template: "<div><h1>aaaaaaaaaa</h1></div>",
      data(){
          return{
            row:[
              {
                name: "111",
                test: "aaa"
              }
            ]
          }
      },
      methods:{
        render(row){
          return `<i-button>${row.name}</i-button>`

        },
        test(){
          const template = this.render(this.row);    // 通过上面的render函数得到字符串
          const div = document.createElement('div');
          div.innerHTML = template;
          this.$emit.compile(div);    // 在父级上下文编译组件
          this.$el.appendChild(cell);    // 将编译后的html插入当前组件
        }

      }
    }
</script>

<style scoped>

</style>
