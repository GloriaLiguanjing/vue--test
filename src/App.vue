<template>
  <div id="app">

    <!-- <span class="iconfont icon-tupianshangchuan"></span> -->
    <router-view/>
  </div>
</template>

<style lang="scss">
html,
body,
#app{
	width: 100%;
	height: 100%;
}
body,ul,ol,li,p,h1,h2,h3,h4,h5,h6,form,fieldset,table,td,img,div,dl,dt,dd,input{

margin: 0;

padding: 0;

}aaa

body{font-size:12px;}

img{border:none;}

li{list-style:none;}

input,select,textarea{outline:none;}

a{text-decoration:none;}

/* 清除浮动 */

.clearfix:after{content:"";display:block;clear:both;}

.clearfix{zoom:1;}
body{
  background-color: #F0F2F5 !important;
}
</style>
