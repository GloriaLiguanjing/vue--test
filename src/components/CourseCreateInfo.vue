<template>
    <div class="courseCreateInfo">
        <BreadCrumb></BreadCrumb>
        <CourseList></CourseList>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-menu-item index="1" >课程信息</el-menu-item>
          <el-menu-item index="2" >默认计划设置</el-menu-item>
          <el-menu-item index="3" >全部计划</el-menu-item>
        </el-menu>
        <router-view></router-view>
    </div>
</template>
<script>
import BreadCrumb from './CourseBreadCrumb'
import CourseList from './CourseList'
export default {
    components:{
        BreadCrumb,
        CourseList
    },
    data(){
        return{
         activeIndex: '1',
        }
    },
    methods:{
        handleSelect (key, keyPath) {
            console.log(key, keyPath);
            if(key==1){
                this.$router.push('/courseInfo');
            }
        },
    },
    mounted(){
        this.$router.push('/courseInfo');
    }
}
</script>
<style scoped>
.courseCreateInfo{
    width:90%;
    margin:0 auto;
}
.course{
    padding-top:-20px;
}
.el-menu-demo{
    background-color: transparent;
    margin:0 20px;
}
.el-menu-item {
    background-color: transparent;
    margin-left: 30px;
    font-size: 18px;
}

.el-menu--horizontal>.el-menu-item:not(.is-disabled):focus, .el-menu--horizontal>.el-menu-item:not(.is-disabled):hover{
    background-color: transparent;
}
.el-menu--horizontal>.el-menu-item.is-active{
    border-bottom: 2px solid #43BC60;
    background-color: transparent;
}
</style>