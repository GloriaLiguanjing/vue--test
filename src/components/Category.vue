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
            <el-tree class="filter-tree" :data="data" node-key="id" :props="defaultProps" :default-expand-all="false" :filter-node-method="filterNode" :expand-on-click-node="false" :render-content="renderContent" ref="tree">
            </el-tree>
          </div>
        </div>
      </div>
    </div>
    <el-dialog title="新增栏目" :visible.sync="addCategoryForm">
      <!-- 添加的 -->
      <el-form :model="addForm" :rules="rules" ref="addForm"> 
        <el-form-item label="上级栏目" :label-width="formLabelWidth">
          <el-input v-model="addFormParentName" auto-complete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="栏目名称" :label-width="formLabelWidth" prop="name">
          <el-input v-model="addForm.name" auto-complete="off"></el-input>
        </el-form-item prop="seoTitle">
        <el-form-item label="栏目标题" :label-width="formLabelWidth">
          <el-input v-model="addForm.seoTitle" auto-complete="off"></el-input>
        </el-form-item prop="seoKeyword">
        <el-form-item label="SEO关键字" :label-width="formLabelWidth">
          <el-input v-model="addForm.seoKeyword" auto-complete="off"></el-input>
        </el-form-item prop="seoDesc">
        <el-form-item label="栏目表述" :label-width="formLabelWidth">
          <el-input v-model="addForm.seoDesc" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否停用" :label-width="formLabelWidth" prop="published">
          <el-radio-group v-model="addForm.published">
            <el-radio :label=1>启用</el-radio>
            <el-radio :label=0>停用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否允许发布文章" :label-width="formLabelWidth" prop="publishArticle">
          <el-radio-group v-model="addForm.publishArticle">
            <el-radio :label=1>允许</el-radio>
            <el-radio :label=0>停用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addCategoryFormCancelSubmit">取 消</el-button>
        <el-button type="primary" @click="addCategoryFormAddSubmit()">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="编辑栏目" :visible.sync="editCategoryForm">
      <!-- 编辑的 -->
      <el-form :model="editForm" :rules="rules" ref="editForm">
        <el-form-item label="上级栏目" :label-width="formLabelWidth">
          <el-input v-model="editForm.parentName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="栏目名称" :label-width="formLabelWidth">
          <el-input v-model="editForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="栏目标题" :label-width="formLabelWidth">
          <el-input v-model="editForm.seoTitle" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="SEO关键字" :label-width="formLabelWidth">
          <el-input v-model="editForm.seoKeyword" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="栏目表述" :label-width="formLabelWidth">
          <el-input v-model="editForm.seoDesc" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否停用" :label-width="formLabelWidth">
          <el-radio-group v-model="editForm.published">
            <el-radio :label=1>启用</el-radio>
            <el-radio :label=0>停用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否允许发布文章" :label-width="formLabelWidth">
          <el-radio-group v-model="editForm.publishArticle">
            <el-radio :label=1>允许</el-radio>
            <el-radio :label=0>停用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editCategoryFormCancelSubmit()">取 消</el-button>
        <el-button type="primary" @click="editCategoryFormAddSubmit()">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="新增栏目" :visible.sync="addNodeCategoryForm">
      <!-- 添加的 -->
      <el-form :model="addForm" :rules="rules" ref="addForm"> 
        <el-form-item label="上级栏目" prop="parentId" :label-width="formLabelWidth">
          <el-cascader :options="options" clearable v-model="addForm.parentId" filterable :props="{ multiple: false,value:'id',emitPath:false,label:'name' }"></el-cascader>
        </el-form-item>
        <el-form-item label="栏目名称" :label-width="formLabelWidth" prop="name">
          <el-input v-model="addForm.name" auto-complete="off"></el-input>
        </el-form-item prop="seoTitle">
        <el-form-item label="栏目标题" :label-width="formLabelWidth">
          <el-input v-model="addForm.seoTitle" auto-complete="off"></el-input>
        </el-form-item prop="seoKeyword">
        <el-form-item label="SEO关键字" :label-width="formLabelWidth">
          <el-input v-model="addForm.seoKeyword" auto-complete="off"></el-input>
        </el-form-item prop="seoDesc">
        <el-form-item label="栏目表述" :label-width="formLabelWidth">
          <el-input v-model="addForm.seoDesc" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否停用" :label-width="formLabelWidth" prop="published">
          <el-radio-group v-model="addForm.published">
            <el-radio :label=1>启用</el-radio>
            <el-radio :label=0>停用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否允许发布文章" :label-width="formLabelWidth" prop="publishArticle">
          <el-radio-group v-model="addForm.publishArticle">
            <el-radio :label=1>允许</el-radio>
            <el-radio :label=0>停用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addCategoryNodeFormCancelSubmit()">取 消</el-button>
        <el-button type="primary" @click="addCategoryNodeFormAddSubmit()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
let id = 1000;
import axios from 'axios'
export default {
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
    getCheckedKeys() { this.$refs.tree.getCheckedKeys() },
  },
  data() {
    return {
      filterText: '',
      data: [],
      defaultProps: {
        children: "children",
        label: "label"
      },
      addCategoryForm: false,
      editCategoryForm: false,
      addNodeCategoryForm: false,
      form: {
        parentId: "",
        name: "",
        seoTitle: "",
        seoKeyword: "",
        seoDesc: "",
        published: "", //(1启用，0停用)
        publishArticle: "" //(1启用，0停用)
      },
      addFormParentName: '',
      addForm: {
        parentId: "",
        name: "",
        seoTitle: "",
        seoKeyword: "",
        seoDesc: "",
        published: "", //(1启用，0停用)
        publishArticle: "", //(1启用，0停用)
      },
      editForm: {
        parentId: "",
        name: "",
        seoTitle: "",
        seoKeyword: "",
        seoDesc: "",
        published: "", //(1启用，0停用)
        publishArticle: "" //(1启用，0停用)
      },
      formLabelWidth: "140px",
      rowLabel: '',
      options: [],
      rules: {
        parentId: [
          { required: true, message: '请选择父级目录', trigger: 'blur' },
        ],
        name: [
          { required: true, message: '请输入栏目名称', trigger: 'blur' }
        ],
        seoTitle: [
          { type: 'date', required: false, message: '', trigger: 'blur' }
        ],
        seoKeyword: [
          { type: 'date', required: false, message: '', trigger: 'blur' }
        ],
        seoDesc: [
          { type: 'data', required: false, message: '', trigger: 'blur' }
        ],
        published: [
          { required: true, message: '请选择是否启用', trigger: 'blur' }
        ],
        publishArticle: [
          { required: true, message: '请选择是否选择发布文章', trigger: 'blur' }
        ]
      }
    };
  },
  mounted: function() {
    this.initDate();
  },
  methods: {
    onSubmit() {
      console.log('submit!');
    },
    initDate() {
      this.getListRequest('/article-categorys/tree').then(resp => {
        this.data = resp.data;
        console.log("获取到的数据")
        console.log(this.data)
      })
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    append(node, data, store) {
      this.addCategoryForm = !this.addCategoryForm;
      this.addForm.parentId = node.data.id
      this.addFormParentName = node.data.name
    },
    remove(node, data) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.id === data.id);
      children.splice(index, 1);
      console.log("删除的id")
      console.log(data.id)
    },
    addCategoryFormAddSubmit() {
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          console.log("添加的addForm")
          console.log(this.addForm)
          // this.postRequest('/article-categorys',this.addForm).then(resp => {
          //   console.log(resp.data)
          // }).catch(err => {console.log(err)})
          alert('submit!');
          this.addNodeCategoryForm = !this.addNodeCategoryForm; //关闭弹窗
          this.addForm = this.form   //清空表单
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    addCategoryFormCancelSubmit() {
      this.addCategoryForm = !this.addCategoryForm;
      this.addForm = this.form
    },
    editCategoryFormAddSubmit() {
      this.editCategoryForm = !this.editCategoryForm;
      console.log(this.editForm)
      this.editForm = this.form
    },
    editCategoryFormCancelSubmit() {
      this.editCategoryForm = !this.editCategoryForm;
      this.editForm = this.form
    },
    addCategoryNodeFormCancelSubmit() {
      this.addNodeCategoryForm = !this.addNodeCategoryForm;
      this.addForm = this.form
    },
    addCategoryNodeFormAddSubmit() {
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          console.log("添加的数据")
          console.log(this.addForm)
          // this.postRequest('/article-categorys',this.addForm).then(resp => {
          //   console.log(resp.data)
          // }).catch(err => {console.log(err)})
          alert('submit!');
          this.addNodeCategoryForm = !this.addNodeCategoryForm; //关闭弹窗
          this.addForm = this.form   //清空表单
        } else {
          console.log('error submit!!');
          return false;
        }
      });
      // this.$refs[formName].validate((valid) => {
      //       if (valid) {
      //         this.addNodeCategoryForm = !this.addNodeCategoryForm;
      //         console.log(this.addForm)
      //         this.postRequest('/article-categorys', this.addForm).then(resp => {
      //             console.log(resp.data)
      //           }
      //         else {
      //             console.log('error submit!!');
      //             return false;
      //           }
      //         };

      //       })
    },
    edit(node, data, store) {
      this.editCategoryForm = !this.editCategoryForm;
      this.editForm = data
      console.log("edit:")
      console.log(data)
    },
    addNode() {
      this.addNodeCategoryForm = !this.addNodeCategoryForm;
      this.options = this.data
    },

    renderContent(h, { node, data, store }) {
      return (
        <span style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
          <span>
            <span>{data.name}</span>
          </span>
          <span>
            <span>
              
            </span>
          </span>
          <span>
            <el-button style="font-size: 12px;" type="primary" round size="mini" on-click={() => {this.append(node,data,store)}}>增加</el-button>
            <el-button style="font-size: 12px;" type="warning" round size="mini" on-click={() => {this.edit(node,data,store)}}>编辑</el-button>
            <el-button
              style="font-size: 12px;"
              type="danger" round
              size="mini"
              on-click={() => this.remove(node, data)}
            >
              删除
            </el-button>
          </span>
        </span>
      );
    }
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
