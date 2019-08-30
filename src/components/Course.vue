<template>
    <div>
          <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <span style="color:black;font-size:20px;padding-left:0" class="el-menu-item">我的教学</span>
          <el-menu-item index="1" >在教课程</el-menu-item>
          <el-menu-item index="2" >教学课表</el-menu-item>
          <el-menu-item index="3" >在教班级</el-menu-item>
          <el-menu-item index="4" >学员问答</el-menu-item>
          <el-menu-item index="5" >学院话题</el-menu-item>
          <el-menu-item index="6" >试卷批阅</el-menu-item>
          <el-menu-item index="7" >作业批阅</el-menu-item>
          <el-menu-item index="8" >教学资料库</el-menu-item>
          </el-menu>
      <div class="coursetype">
        <el-group>
              <el-button class="menubutton"  autofocus="true" >普通课程</el-button>
              <el-button class="menubutton">直播课程</el-button>
              <el-button class="menubutton">录播公开课</el-button>
              <el-button class="menubutton">直播公开课</el-button>
          </el-group>
        <el-button style="color:#ffffff;background-color:#43BC60"  @click="open" class="createcourse">创建课程</el-button>

      </div>
      <div style="width:90%;margin:0 auto;">
        <CourseList></CourseList>
      </div>
    </div>

</template>
<script>
import CourseList from './CourseList'
export default {
  components: {
    CourseList
  },
  data () {
    return {
      subjectCategory: '普通课程',
      courses: [],
      currentDate: new Date(),
      activeIndex: '1',
      activeIndex2: '1'

    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },
    open () {
      this.$router.push('/courseCreate')
    }
  }
}
</script>
<style scoped>

 .menubutton{
   background-color: transparent;
   border: none;
   color: #616161;
 }
 .menubutton:hover{
   background-color: #E6E6E6;
   color: #616161;
 }
 .el-menu--horizontal>.el-menu-item.is-active {
   border-bottom:2px solid #43BC60;
 }
 .menubutton:focus{
    background-color: #43BC60;
   color: #ffffff;
 }

  .coursetype{
    margin-top:20px;
    margin-left:95px;
  }
  .createcourse{
    float:right;
    margin-right:160px
  }

.el-menu{
    padding:0 7%;
}
.el-menu--horizontal>.el-menu-item{
  margin-right: 20px;
}
.el-menu-item{
    line-height: 1.5em;
    font-size: 16px;
    margin-right: 60px;
}
  .button {
    padding: 0;
    float: right;
  }

</style>
