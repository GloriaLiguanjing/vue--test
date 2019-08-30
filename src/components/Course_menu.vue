<template>
    <div class="menu">
        <el-row class="tac">
        `<el-col :span="4">
            <el-menu
            default-active="2"
            class="el-menu-demo"
            >
            <el-menu-item index="1">              
                <span slot="title">我的课程</span>
            </el-menu-item>
            <el-menu-item index="2">      
                <span slot="title">我的班级</span>
            </el-menu-item>
            <el-menu-item index="3" >
                <span slot="title">我的问答</span>
            </el-menu-item>
            <el-menu-item index="4">
                <span slot="title">我的话题</span>
            </el-menu-item>
            <el-menu-item index="5">
                <span slot="title">我的笔记</span>
            </el-menu-item>
            <el-menu-item index="6">
                <span slot="title">我的作业</span>
            </el-menu-item>
            <el-menu-item index="7">
                <span slot="title">我的考试</span>
            </el-menu-item>
            <el-menu-item index="8">
                <span slot="title">我的小组</span>
            </el-menu-item>
            </el-menu>
        </el-col>
        </el-row>
    </div>
    
</template>
<script>
export default {
     data() {
      return {
        activeIndex: '1',
        activeIndex2: '1'
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
}
</script>
<style scoped>
.menu{
    width:80%;
    margin:0 auto;
}
.el-menu{
    margin:0 auto;
}
.el-menu-item{
    font-size: 16px;
    margin-left:20px;
}
</style>