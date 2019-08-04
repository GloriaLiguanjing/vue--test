<template>
  <div class="org">
    <div class="container">
      <div class="row tree-top">
        <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2">
          <div class="tree-button">
            <el-button type="success" size="small" @click="addNode()">添加</el-button>
          </div>
        </div>
        <div class="col-lg-2 col-xs-2 col-sm-2 col-md-2 col-md-offset-8 col-xs-offset-8">
          <div class="tree-serch">
            <el-input placeholder="输入关键字进行过滤" v-model="filterText" size="small"></el-input>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-12 col-xs-12 col-sm-12 col-md-12">
          <div class="tree-data">
            <el-tree
              class="filter-tree"
              :data="data"
              node-key="id"
              :props="defaultProps"
              :default-expand-all="false"
              :filter-node-method="filterNode"
              :expand-on-click-node="false"
              ref="tree"
            >
              <span style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;" class="custom-tree-node" slot-scope="{ node, data }">
                <span>
                  <span>{{data.name}}</span>
                </span>
                <span>
                  <span></span>
                </span>
                <span>
                  <el-button
                    style="font-size: 12px;"
                    type="primary"
                    round
                    size="mini"
                    @click="append(node, data)"
                  >
                    增加
                  </el-button>
                  <el-button
                    style="font-size: 12px;"
                    type="warning"
                    round
                    size="mini"
                    v-show="data.name!='root'"
                    @click="edit(node,data)"
                  >
                    编辑
                  </el-button>
                  <el-button
                    style="font-size: 12px;"
                    type="danger"
                    round
                    size="mini"
                    v-show="data.name!='root'"
                    @click="() => this.remove(node, data)"
                  >
                    删除
                  </el-button>
                </span>
              </span>
            </el-tree>
          </div>
        </div>
      </div>
    </div>
    <el-dialog title="新增机构" :visible.sync="addOrgForm" >
      <!--左上添加按钮-->
      <el-form :model="addForm" :rules="rules" ref="addForm">
        <el-form-item label="上级部门" :label-width="formLabelWidth">
          <el-cascader
            :options="options"
            clearable
            v-model="addForm.parentId"
            filterable
            :props="{ multiple: false,value:'id',emitPath:false,label:'name' }"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="部门名称" :label-width="formLabelWidth" prop="name">
          <el-input v-model="addForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="负责人" :label-width="formLabelWidth" prop="leader">
          <el-input v-model="addForm.leader" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" :label-width="formLabelWidth" prop="phone">
          <el-input v-model="addForm.phone" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
          <el-input v-model="addForm.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="索引" :label-width="formLabelWidth" prop="seq">
          <el-input v-model="addForm.seq" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="机构编码" :label-width="formLabelWidth" prop="code">
          <el-input v-model="addForm.code" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="内部编码" :label-width="formLabelWidth" prop="orgCode">
          <el-input v-model="addForm.orgCode" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="部门状态" :label-width="formLabelWidth" prop="status">
          <el-radio-group v-model="addForm.status">
            <el-radio :label=1>正常</el-radio>
            <el-radio :label=0>停用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addOrgFormCancelSubmit()">取 消</el-button>
        <el-button type="primary" @click="addOrgFormAddSubmit()">确 定</el-button>
      </div>
    </el-dialog>
    <!--右侧增加按钮-->
    <el-dialog title="新增机构" :visible.sync="addNodeOrgForm">
      <el-form :model="addForm" :rules="rules" ref="addForm">
        <el-form-item label="上级部门" :label-width="formLabelWidth">
          <el-input v-model="addForm.parentName" auto-complete="off" :disabled="true" size="small"></el-input>
        </el-form-item>
        <el-form-item label="部门名称" :label-width="formLabelWidth" prop="name">
          <el-input v-model="addForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="负责人" :label-width="formLabelWidth" prop="leader">
          <el-input v-model="addForm.leader" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" :label-width="formLabelWidth" prop="phone">
          <el-input v-model="addForm.phone" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
          <el-input v-model="addForm.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="索引" :label-width="formLabelWidth" prop="seq">
          <el-input v-model="addForm.seq" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="机构编码" :label-width="formLabelWidth" prop="code">
          <el-input v-model="addForm.code" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="内部编码" :label-width="formLabelWidth" prop="orgCode">
          <el-input v-model="addForm.orgCode" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="部门状态" :label-width="formLabelWidth" prop="status">
          <el-radio-group v-model="addForm.status">
            <el-radio :label=1>正常</el-radio>
            <el-radio :label=0>停用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addNodeOrgFormCancelSubmit()">取 消</el-button>
        <el-button type="primary" @click="addNodeOrgFormAddSubmit()">确 定</el-button>
      </div>
    </el-dialog>
    <!--编辑机构-->
    <el-dialog title="编辑机构" :visible.sync="editOrgForm">
      <el-form :model="editForm" :rules="rules" ref="editForm">
        <el-form-item label="上级部门" :label-width="formLabelWidth">
           <el-cascader 
           :options="options" 
           value="editForm.parentId"
           :show-all-levels="false" 
           clearable 
           v-model="editForm.parentId" 
           filterable 
           :props="{ multiple: false,value:'id',emitPath:false,label:'name',checkStrictly: true
 }"></el-cascader>
        </el-form-item>
        <el-form-item label="部门名称" :label-width="formLabelWidth" prop="name">
          <el-input v-model="editForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="负责人" :label-width="formLabelWidth" prop="leader">
          <el-input v-model="editForm.leader" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" :label-width="formLabelWidth" prop="phone">
          <el-input v-model="editForm.phone" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
          <el-input v-model="editForm.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="索引" :label-width="formLabelWidth" prop="seq">
          <el-input v-model="editForm.seq" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="机构编码" :label-width="formLabelWidth" prop="code">
          <el-input v-model="editForm.code" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="内部编码" :label-width="formLabelWidth" prop="orgCode">
          <el-input v-model="editForm.orgCode" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="部门状态" :label-width="formLabelWidth" prop="status"> 
          <el-radio-group v-model="editForm.status">
            <el-radio :label=1>正常</el-radio>
            <el-radio :label=0>停用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editOrgFormCancelSubmit()">取 消</el-button>
        <el-button type="primary" @click="editOrgFormAddSubmit()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
let id = 1000;
//import {validatePhoneTwo,validateEMail} from '../utils/validator';
export default {


  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
    getCheckedKeys() {
      this.$refs.tree.getCheckedKeys();
    }
  },
  data() {

/* 是否手机号码或者固话*/
function validatePhoneTwo(rule, value, callback) {
   const reg = /^((0\d{2,3}-\d{7,8})|(1[34578]\d{9}))$/;;
  if (value == '' || value == undefined || value == null) {
    callback();
  } else {
    if ((!reg.test(value)) && value != '') {
      callback(new Error('请输入正确的电话号码或者固话号码'));
    } else {
      callback();
    }
  }
}

/* 是否邮箱*/
function validateEMail(rule, value,callback) {
  const reg =/^([a-zA-Z0-9]+[-_\.]?)+@[a-zA-Z0-9]+\.[a-z]+$/;
  if(value==''||value==undefined||value==null){
    callback();
  }else{
    if (!reg.test(value)){
      callback(new Error('请输入正确的邮箱地址'));
    } else {
      callback();
    }
  }
}

    return {
      filterText: "",
      data: [],
      defaultProps: {
        children: "children",
        label: "label"
      },
      addOrgForm: false,
      addNodeOrgForm: false,
      editOrgForm: false,
      form: {
        parentName: "",
        parentId: 0,
        name: "",
        leader: "",
        phone: "",
        email: "",
        seq: 0,
        code: "",
        orgCode: "",
        status: ""
      },
      addForm: [],
      editForm: [],
      formLabelWidth: "120px",
      rowLabel: "",
      options: [],
      rules: {
        parentId: [
          { required: true, message: '请选择父级目录', trigger: 'blur' },
        ],
        name: [
          { required: true, message: '请输入栏目名称', trigger: 'blur' }
        ],
        leader: [
          {  required: true, message: '请输入负责人', trigger: 'blur' }
        ],
        phone: [
          {required: true, message: '请输入联系电话', trigger: 'blur'},{validator:validatePhoneTwo, trigger: 'blur' }
        ],
        email: [
          {required: true, message: '请输入邮箱', trigger: 'blur'},{validator:validateEMail,trigger: 'blur' }
        ],
        seq: [
          {required: true, message: '请输入索引', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入机构编码', trigger: 'blur' }
        ],
        orgCode: [
          { required: true, message: '请输入内部编码', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '请选择机构状态', trigger: 'blur' }
        ]
      }
    };
  },
  mounted: function() {
    this.initDate();
  },
  methods: {
    onSubmit() {
     
    },
    initDate() {
      this.getListRequest("/orgs").then(resp => {
        this.data = resp.data;
      });
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    append(node, data) {
      this.addNodeOrgForm = !this.addNodeOrgForm;
      console.log(node)
      this.addForm.parentId = node.data.id;
      this.addForm.parentName = node.data.name;
      this.options=this.data
    },
    edit(node, data) {
      this.editOrgForm = !this.editOrgForm;
      this.editForm=data
      console.log(this.editForm)
      this.options=this.data
      // this.editForm.parentId = node.data.id;
      // this.editForm.parentName = node.data.label;
    },
    addNode(){
      this.addOrgForm=!this.addOrgForm
      this.options=this.data
    },
    remove(node, data) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.id === data.id);
      children.splice(index, 1);
    },
    addOrgFormAddSubmit() {
       this.$refs.addForm.validate((valid) => {
        if (valid) {
          console.log("添加的addForm")
          console.log(this.addForm)
           alert('submit!');
      this.addOrgForm = !this.addOrgForm;
      this.addForm = this.form;}else{
         console.log('error submit!!');
          return false;
      }})
    },
    addOrgFormCancelSubmit() {
      this.addOrgForm = !this.addOrgForm;
      this.addForm = this.form;
    },
    addNodeOrgFormAddSubmit() {
       this.$refs.addForm.validate((valid) => {
        if (valid) {
          console.log("添加的addForm")
          console.log(this.addForm)
           this.postRequest('/orgs',{
          parentName: this.addForm.parentName,
          parentId: this.addForm.parentId,
          name: this.addForm.name,
          leader: this.addForm.leader,
          phone: this.addForm.phone,
          email: this.addForm.email,
          seq: this.addForm.seq,
          code: this.addForm.code,
          orgCode: this.addForm.orgCode,
          status: this.addForm.status
     }).then(resp=>{
       console.log(resp);
       if(resp.status == 200){
         this.$message({
           message:'添加成功',
           type:'success'
         })
       }else{
         this.$message({
           message:'添加失败',
           type:'error'
         })
       }
     });
      this.addNodeOrgForm = !this.addNodeOrgForm;
      this.addForm = this.form;}else{
         console.log('error submit!!');
          return false;
      }})
    },
    addNodeOrgFormCancelSubmit() {
      this.addNodeOrgForm = !this.addNodeOrgForm;
      this.addForm = this.form;
    },
    editOrgFormCancelSubmit() {
      this.editOrgForm = !this.editOrgForm;
      this.editform = this.form;
    },
    editOrgFormAddSubmit() {
      this.editOrgForm = !this.editOrgForm;
      console.log("xxxx");
      console.log(this.editForm.id);
      this.putRequest('/orgs',{
          parentId: this.editForm.parentId,
          name: this.editForm.name,
          leader: this.editForm.leader,
          phone: this.editForm.phone,
          email: this.editForm.email,
          seq: this.editForm.seq,
          code: this.editForm.code,
          orgCode: this.editForm.orgCode,
          status: this.editForm.status,
          id:this.editForm.id
      }).then(resp=>{
            
          if(resp.status == 200){
            this.$message({
              message:resp.data
            })
          }else{
            this.$message({
              message:'修改失败',
              type:'error'
            })
          }
          this.initDate();
      })
      this.editForm = this.form;
    },
  }
};
</script>

<style>
.tree-data {
  margin-top: 20px;
  font-size: 20px;
}
.tree-button {
  padding-left: 20px;
}
.tree-serch {
  padding-right: 10px;
}
.el-tree {
  border-radius: 7px;
  padding-top: 20px;
  padding-bottom: 20px;
}
.el-tree span {
  font-size: 16px !important;
}

.el-tree-node__content {
  padding: 30px;
  border-bottom: 1px solid #eee;
  margin-left: 20px;
  margin-right: 20px;
}
</style>
