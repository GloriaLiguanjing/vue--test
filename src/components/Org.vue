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
              draggable
              :data="data"
              node-key="id"
              :props="defaultProps"
              :default-expand-all="false"
              :filter-node-method="filterNode"
              :expand-on-click-node="false"
              :render-content="renderContent"
              ref="tree"
            ></el-tree>
          </div>
        </div>
      </div>
    </div>
    <el-dialog title="新增机构" :visible.sync="addOrgForm">
      <!--左上添加按钮-->
      <el-form :model="addForm">
        <el-form-item label="上级部门" :label-width="formLabelWidth">
          <el-cascader
            :options="options"
            clearable
            v-model="addForm.parentId"
            filterable
            :props="{ multiple: false,value:'id',emitPath:false,label:'name' }"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="部门名称" :label-width="formLabelWidth">
          <el-input v-model="addForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="负责人" :label-width="formLabelWidth">
          <el-input v-model="addForm.leader" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" :label-width="formLabelWidth">
          <el-input v-model="addForm.phone" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="addForm.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="索引" :label-width="formLabelWidth">
          <el-input v-model="addForm.seq" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="机构编码" :label-width="formLabelWidth">
          <el-input v-model="addForm.code" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="内部编码" :label-width="formLabelWidth">
          <el-input v-model="addForm.orgCode" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="部门状态" :label-width="formLabelWidth">
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
      <el-form :model="addForm">
        <el-form-item label="上级部门" :label-width="formLabelWidth">
          <el-input v-model="addForm.parentName" auto-complete="off" :disabled="true" size="small"></el-input>
        </el-form-item>
        <el-form-item label="部门名称" :label-width="formLabelWidth">
          <el-input v-model="addForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="负责人" :label-width="formLabelWidth">
          <el-input v-model="addForm.leader" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" :label-width="formLabelWidth">
          <el-input v-model="addForm.phone" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="addForm.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="索引" :label-width="formLabelWidth">
          <el-input v-model="addForm.seq" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="机构编码" :label-width="formLabelWidth">
          <el-input v-model="addForm.code" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="内部编码" :label-width="formLabelWidth">
          <el-input v-model="addForm.orgCode" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="部门状态" :label-width="formLabelWidth">
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
      <el-form :model="editForm">
        <el-form-item label="上级部门" :label-width="formLabelWidth">
          <el-cascader
            :options="options"
            clearable
            v-model="editForm.parentId"
            filterable
            :props="{ multiple: false,value:'id',emitPath:false,label:'name' }"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="部门名称" :label-width="formLabelWidth">
          <el-input v-model="editForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="负责人" :label-width="formLabelWidth">
          <el-input v-model="editForm.leader" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" :label-width="formLabelWidth">
          <el-input v-model="editForm.phone" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="editForm.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="索引" :label-width="formLabelWidth">
          <el-input v-model="editForm.seq" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="机构编码" :label-width="formLabelWidth">
          <el-input v-model="editForm.code" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="内部编码" :label-width="formLabelWidth">
          <el-input v-model="editForm.orgCode" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="部门状态" :label-width="formLabelWidth">
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
        parentId: "",
        name: "",
        leader: "",
        phone: "",
        email: "",
        seq: "",
        code: "",
        orgCode: "",
        status: ""
      },
      addForm: {
        parentName: "",
        parentId: "",
        name: "",
        leader: "",
        phone: "",
        email: "",
        seq: "",
        code: "",
        orgCode: "",
        status: ""
      },
      editForm: {
        parentName: "",
        parentId: "",
        name: "",
        leader: "",
        phone: "",
        email: "",
        seq: "",
        code: "",
        orgCode: "",
        status: ""
      },
      formLabelWidth: "120px",
      rowLabel: "",
      options: []
    };
  },
  mounted: function() {
    this.initDate();
  },
  methods: {
    onSubmit() {
      console.log("submit!");
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
    append(node, data, store) {
      this.addNodeOrgForm = !this.addNodeOrgForm;
      console.log(node)
      this.addForm.parentId = node.data.id;
      this.addForm.parentName = node.data.name;
      this.options=this.data
    },
    edit(node, data, store) {
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
      this.addOrgForm = !this.addOrgForm;
      this.addForm = this.form;
    },
    addOrgFormCancelSubmit() {
      this.addOrgForm = !this.addOrgForm;
      this.addForm = this.form;
    },
    addNodeOrgFormAddSubmit() {
      this.addNodeOrgForm = !this.addNodeOrgForm;
      console.log(this.editform)
      this.addForm = this.form;
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
      console.log(this.editForm)
      this.editForm = this.form;
    },

    renderContent(h, { node, data, store }) {
      return (
        <span style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
          <span>
            <span>{data.name}</span>
          </span>
          <span>
            <span>{}</span>
          </span>
          <span>
            <el-button
              style="font-size: 12px;"
              type="primary"
              round
              size="mini"
              on-click={() => {
                this.append(node, data, store);
              }}
            >
              增加
            </el-button>
            <el-button
              style="font-size: 12px;"
              type="warning"
              round
              size="mini"
              on-click={() => this.edit(node,data,store)}
            >
              编辑
            </el-button>
            <el-button
              style="font-size: 12px;"
              type="danger"
              round
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
