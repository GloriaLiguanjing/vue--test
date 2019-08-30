<template>
     <div class="course">
             <el-row class="row">
                <el-col class="col" :span="12" v-for="(o, index) in 1" :key="index" >
                    <el-card class="card" :body-style="{ padding: '0px' }" style="margin-left:0">
                      <div class="tagpicture">
                        <div class="tag" >
                      <el-tag   :key="tag" v-for="tag in dynamicTags" >{{tag}}</el-tag>
                        </div>
                        <div class="picture">
                    <img src="http://18132019501.test.edusoho.cn/assets/img/default/courseSet.png" width="160px" height="90px" :modal-append-to-body="true">
                        </div>
                      </div>
                    <div class="content" style="padding: 14px;margin-left:10px">
                        <div class="bottom clearfix">
                          <div class="course1" :key="course" v-for="course in courseinfo" >{{course}}</div>
                          <div class="courseinfo2">
                              <span class="courseindex">
                                <span >课程计划</span>
                                 <!-- <div>1</div> -->
                              </span>
                              <span style="border-right:1px solid #EBEBEB;margin-right:32px;line-height:36px;"></span>
                              <span>
                                  <span>课程学员</span>
                                  <!-- <div>0</div> -->
                              </span><br>
                               <span class="courseindex">
                                <span class="coursetitle">1</span>
                                 <!-- <div>1</div> -->
                              </span>
                              <span style="border-right:1px solid #EBEBEB;margin-right:32px;line-height:36px;"></span>
                              <span>
                                  <span class="coursetitle">0</span>
                                  <!-- <div>0</div> -->
                              </span>
                          </div>
                          <div class="cardbutton">
                          <el-button  style="border:1px solid #43BC60;color:#43BC60">{{operation1}}</el-button>
                          <el-button >{{operation2}}</el-button>
                          </div>
                        </div>
                    </div>
                    </el-card>
                </el-col>
            </el-row>
        </div>
</template>
<script>
export default {
  data () {
    return {
      courseinfo: ['数据结构'],
      dynamicTags: ['未发布'],
      operation1: '管理课程',
      operation2: '预览课程'
    }
  }
}
</script>
<style scoped>
.tagpicture{position:relative}
.tag{
    position:absolute;
    z-index: 10;

  }
.picture{
    position: absolute;
    z-index: 0;
  }
.cardbutton{
    float:right;
  }
.course{
    margin:0 auto;
    padding-top:20px;
}
.content{
    width:86%;
    float: right;
}
.row{
  width:100%;
  margin:0 auto;
}
.col{
    width:100%;
    display: block;
    margin: 0 auto;
    padding:20px;
}
.el-tag {
    color:#ffffff;
    background-color: #707070;
    padding:3px;
    border: none;
    margin-left:-10px;
    margin-top:-10px;
    width:74px;
    height: 32px;
    text-align: center;
}
.card{
    height: 120px;
    padding:16px;
    padding-right: 32px;
}
.bottom {
    margin-top: 13px;
    line-height: 12px;
  }
  .course1{
  font-weight: 500;
  font-size: 16px;
  line-height: 1;
  color: black;
  position: absolute;
  z-index:10;
}
.courseinfo2{
    margin-left:50%;
    width:200px;
    height:60px;
    float: left;
    margin-top: -15px;
}
.courseindex{
    margin-right:32px;
}
.coursetitle{
  margin-left:48px;
}
.clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
    clear: both
  }

  .clearfix {
      position: relative;
  }
</style>
