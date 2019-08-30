<template>
    <div class="topic-index">
      <div class="topic-title">
        <div class="topic-title-header">
          <div class="topic-man">
          <span>话题管理</span>
          </div>
        </div>
      </div>

  <div class="topic-menu">
    <el-tabs v-model="activateName">
      <el-tab-pane label="话题管理" name="first">
      </el-tab-pane>
      <el-tab-pane label="班级话题" name="second">
      </el-tab-pane>
    </el-tabs>
  </div>
    </div>
</template>

<script type="text/ecmascript-6">
  import topic_content  from './topic_content.vue';
export default {
  name: 'topic',
  components : {topic_content },
  data(){
    return{
      activateName:'first'
    }
  }
}
</script>

<style>
.topic-man{
  border-bottom : 2px solid #eee;
  overflow : hidden;
}
  .topic-man>span{
    font-size: 20px;
    color: #aaa;
  }
</style>
