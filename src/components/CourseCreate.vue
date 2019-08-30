<template>
   <div class="courseCreate">
       <span style="font-size:18px;">创建课程</span>
       <hr>
       <div style="width:100%;height:80%">
           <div class="course" @click="changeStyle(1)">
            <div class="index">
                <div style="width:100%;">
                    <i class="iconfont icon-gangbi"></i><br>
                    <span class="title">普通课程</span>
                </div>
                <hr>
                <div>支持视频、图文、PPT等各种形式，支持作业、笔记等多个学习工具的课程</div>
            </div>
        </div>
        <div class="course" @click="changeStyle(2)">
            <div class="index">
                <div style="width:100%;">
                    <i class="iconfont icon-zhibo"></i><br>
                    <span class="title">直播课程</span>
                </div>
                <hr style="color:#E1E1E1">
                <div>以直播为教学形式的，支持多个学习工具的课程</div>
            </div>
        </div>
        <div class="course" @click="changeStyle(3)">
            <div class="index">
                <div style="width:100%;">
                    <i class="iconfont icon-shipin"></i><br>
                    <span class="title">录播公开课</span>
                </div>
                <hr>
                <div>免费、无门槛观看的视频课程，主要用于营销推广</div>
            </div>
        </div>
        <div class="course" @click="changeStyle(4)">
            <div class="index">
                <div style="width:100%;">
                    <i class="iconfont icon-icon"></i><br>
                    <span class="title">直播公开课</span>
                </div>
                <hr>
                <div>免费、无门槛参与的直播课程，主要用于营销推广</div>
            </div>
        </div>
       </div>
           
        <div style="margin-top:350px;height:50px">
            <span style="font-size:18px;">课程标题</span>
            <el-input style="width:90%;margin-left:20px;" v-model="input" placeholder="请输入内容"></el-input>
        </div>
      <div class="text-center">
                              <span class="mrm">
              <a>如何创建课程？</a>
            </span>
                <el-button type="primary" style="background-color:#43BC60;border:1px solid #43BC60;margin:0 30px;">创建</el-button>
                <router-link to="/course">取消</router-link>
     </div>
        
   </div>
</template>
<script>

export default {
   data(){
      return{
          input:[],

      }
   }
}
</script>
<style scoped>
.courseCreate{
    padding: 50px;
    background-color: #ffffff;
    margin: 30px auto;
    min-height: 500px;
    width:85%;
}
.iconfont{
    font-size: 75px;
    text-align: center;
    margin-left: 28%;
}
.course{
    width:25%;
    float:left;   
    color: #6B6C6D;
    padding:0 12px;
}
.index.is-active{
    background-color: #43BC60;
    color:#ffffff;
}
.index{
    background-color: #F4F6F8;
    padding:10%;
    margin:5px;
    border-radius: 10px;
    height: 294px;
}
.text-center{
    color:#6B6C6D;
    margin-left: 35%;
}
.title{
   font-size: 18px;
   text-align: center;
   margin-left: 28%;
}

</style>