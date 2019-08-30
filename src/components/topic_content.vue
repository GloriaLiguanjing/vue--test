<template>
    <div class="topic-man-index">
      <div class="fourselect">
        <span>选择器</span>
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      <el-select
        v-model="input"
        multiple
        filterable
        remote
        reserve-keyword
        placeholder="请输入关键词"
        :remote-method="remoteMethod"
        :loading="loading">
        <el-option
          v-for="item in options4"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      </div>
      <div class="kcgl_kcgl-index">
        <div class="subject-category">
          <el-radio-group v-model="subjectCategory" size="mini">
            <el-radio-button label="普通课程"></el-radio-button>
            <el-radio-button label="班级课程"></el-radio-button>
            <el-radio-button label="会员课程"></el-radio-button>
          </el-radio-group>
        </div>
        <div class="subject-list">
          <el-table ref="filterTable" :data="tableData" style="width: 100%">
            <el-table-column prop="subjectId" label="课程编号" sortable width="180" column-key="subjectId">
            </el-table-column>
            <el-table-column label="名称" width="180">
              <template slot-scope="scope">
                <div>{{ scope.row.name }}</div>
                <span style="font-size:10px">分类：{{ scope.row.classification }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="prise" label="价格">
            </el-table-column>
            <el-table-column prop="annualTarget" label="计划数" width="100">
            </el-table-column>
            <el-table-column prop="tag" label="标签" width="100">
            </el-table-column>
            <el-table-column prop="subjectNum" label="学员数" width="100">
            </el-table-column>
            <el-table-column label="创建者/时间" width="120">
              <template slot-scope="scope">
                <div><a href="#">{{ scope.row.creator }}</a></div>
                <span style="font-size:10px">{{ scope.row.time }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="subjectStatus" label="课程状态" width="100">
            </el-table-column>
            <el-table-column prop="operation" label="操作" width="100">
              <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">管理</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>

</template>

<script type="text/ecmascript-6">
  export default {
    name: 'topic_content',
    data() {
      return {
        subjectCategory: '普通课程',
        tableData: [{
          subjectId: '52',
          name: '数据结构',
          classification: '默认分类',
          prise: '0.00',
          annualTarget: '1',
          tag: '网校',
          subjectNum: '0',
          creator: '体验管理员',
          time: '2019-8-24 16:00',
          subjectStatus: '未发布'
        }, {
          subjectId: '55',
          name: '王小虎',
          prise: '0.00',
          annualTarget: '1',
          tag: '网校',
          subjectNum: '0',
          creator: '体验管理员',
          time: '2019-8-24 16:00',
          subjectStatus: '未发布 非连载课程'
        }, {
          subjectId: '54',
          name: '王小虎',
          prise: '0.00',
          annualTarget: '1',
          tag: '网校',
          subjectNum: '0',
          creator: '体验管理员',
          time: '2019-8-24 16:00',
          subjectStatus: '未发布 非连载课程'
        }, {
          subjectId: '50',
          name: '王小虎',
          prise: '0.00',
          annualTarget: '1',
          tag: '网校',
          subjectNum: '0',
          creator: '体验管理员',
          time: '2019-8-24 16:00',
          subjectStatus: '未发布 非连载课程'
        }],
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: '',
        options4: [],
        input: [],
        list: [],
        loading: false,
        states: ["Alabama", "California", "Colorado",
          "Connecticut", "Delaware", "Florida",
          "Georgia", "Hawaii", "Illinois",
          "Indiana", "Iowa", "Kansas", "Kentucky",
          "Louisiana", "Maine", "Maryland",
          "Massachusetts", "Michigan", "Minnesota",
          "Mississippi", "Missouri", "Montana",
          "Nebraska", "Nevada", "New Hampshire",
          "New Jersey", "New Mexico", "New York",
          "North Carolina", "North Dakota", "Ohio",
          "Oklahoma", "Oregon", "Pennsylvania",
          "Rhode Island", "South Carolina",
          "South Dakota", "Tennessee", "Texas",
          "Utah", "Vermont", "Virginia",
          "Washington", "West Virginia", "Wisconsin",
          "Wyoming"]
      }
    },
    mounted() {
      this.list = this.states.map(item => {
        return { value: item, label: item };
      });
    },
    methods: {
      remoteMethod(query) {
        if (query !== '') {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            this.options4 = this.list.filter(item => {
              return item.label.toLowerCase()
                .indexOf(query.toLowerCase()) > -1;
            });
          }, 200);
        } else {
          this.options4 = [];
        }
      }
    }
  }
</script>

<style>
  .subject-category{
    float: left;
  }
  a{
    text-decoration: none;
    color: #428BCA;
  }
</style>
