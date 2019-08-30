
<template>
   <div class="article">
	   <span style="font-size:18px;">增加新文章</span><br><br>
		<el-steps :active="active" finish-status="success" simple style="margin-top: 20px">
			<el-step title="填写信息" ></el-step>
			<el-step title="完成" ></el-step>
		</el-steps><br><br>
		<!--
			文章：
			文章标题 title
			栏目 categoryId
			资源 source
			资源URL sourceUrl
			摘要 abstract
			类型 type
			作者 author
			正文 body
			是否头条 featured
			是否推荐 promoted
			是否置顶 sticky
			内部机构码 orgCode
		-->
		<div class="step1" v-show="this.active == 0" style="padding-top:10px;">
			<el-form :model="articleForm" :rules="rules" ref="articleForm" label-width="100px" class="demo-articleForm">
				<el-row>
                <el-col :span="12">
				<el-form-item  label="文章名称" prop="title">
					<el-input class="mimInput" v-model="articleForm.title"></el-input>
				</el-form-item></el-col>
				<el-col :span="12">
				<el-form-item label="栏目" prop="categoryId">
					    <el-cascader :options="categorys" clearable v-model="articleForm.categoryId" filterable  :props="{ multiple: false,value:'id',emitPath:false,label:'name' }"></el-cascader>			
				</el-form-item>
                </el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="作者" prop="author">
							<el-input class="mimInput" v-model="articleForm.author"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="文章类型" prop="type">
							<el-select v-model="articleForm.type" placeholder="请选择文章类型">
							<el-option label="图片型文章" value="pictureText"></el-option>
							<el-option label="视频型文章" value="videoText"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24">
						  <el-form-item label="Tag标签" prop="tagIds">
							<el-checkbox-group v-model="articleForm.tagIds" @change="handleCheckedTagIdsChange">
								<el-checkbox v-for="tag in tags" :label="tag.name" :key="tag.id"></el-checkbox>
							</el-checkbox-group>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="资源" prop="source">
							<el-input class="mimInput" v-model="articleForm.source"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
							<el-form-item label="是否推荐" prop="promoted">
								<el-switch active-value="1" inactive-value="0" v-model="articleForm.promoted"></el-switch>
							</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="是否置顶" prop="sticky">
							<el-switch active-value="1" inactive-value="0" v-model="articleForm.sticky"></el-switch>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="资源地址" prop="sourceUrl">
								<el-input class="mimInput" v-model="articleForm.sourceUrl"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="是否头条" prop="featured">
							<el-switch active-value="1" inactive-value="0" v-model="articleForm.featured"></el-switch>
						</el-form-item>
					</el-col>
					
				</el-row>								
	            <el-row>
					<el-col :span="12">
						<el-form-item label="组织机构" prop="orgId">	  
					        <el-cascader :options="orgs" clearable v-model="articleForm.orgId" filterable  :props="{ multiple: false,value:'id',emitPath:false,label:'name' }"></el-cascader>				
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="内部机构码" prop="orgCode">
							<el-input class="mimInput" v-model="articleForm.orgCode"></el-input>
						</el-form-item>
					</el-col>
				</el-row>						
				<el-form-item label="摘要" prop="abstraction">
				  <el-input
					type="textarea"
					:rows="3"
					placeholder="请输入内容"
					v-model="articleForm.abstraction">
					</el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary"  @click="submitForm('articleForm')">下一步</el-button>
					<el-button type="primary"  @click="next">xia下一步</el-button>
					<el-button @click="resetForm('articleForm')">重置</el-button>
				</el-form-item>
				</el-form>
		</div>
        <div class="step2" v-show="this.active == 1">
            <div id="editor"></div>
		</div>
		<div class="step3" v-show="this.active==2">
            <img src="../assets/img/addArticleSuccess.png"/>
		</div>
	   <el-button v-if="this.active == 1" style="margin-top: 12px;" @click="Predept()">上一步</el-button>
	   <el-button v-if="this.active == 1" style="margin-top: 12px;" @click="request()">下一步</el-button>
 	   <el-button v-if="this.active == 2" style="margin-top: 12px; margin-left:800px;" @click="next">返回文章</el-button>
   </div>
 

</template>
 
<script>
import E from 'wangeditor'
import axios from 'axios'
import { constants } from 'crypto';
	export default {
		data() {
		  return {
			server_config:this.global.server_config,
			editor: "",
			active: 0,
			categorys: [],
			articleForm: {
				title: '',
				categoryId: 0,
				orgId:0,
				source: '',
				sourceUrl: '',
				abstraction: '',
				tagIds: [],
				type: '',
				author:'',
				body:'',
				featured:false,
				sticky:false,
				promoted:false
				},
				tags:[],
				isIndeterminate: true,
				rules: {
				title: [
					{ required: true, message: '请输入文章名称', trigger: 'blur' },
					{ min: 1, message: '长度大于1个字符', trigger: 'blur' }
				],
				categoryId: [
					{ required: true, message: '请选择栏目', trigger: 'blur' }
				],
				author: [
					{ required: true, message: '请输入作者', trigger: 'blur' }
				],
				type: [
					{ required: true, message: '请选择文章类型', trigger: 'blur' }
				],
				source: [
					{ required: true, message: '请选择文章资源', trigger: 'blur' }
				],
				sourceUrl: [
					{ required: true, message: '请选择文章地址', trigger: 'blur' }
				],
				orgId: [
					{ required: true, message: '请选择组织机构', trigger: 'blur' }
				],
				orgCode: [
					{ required: true, message: '请组织机构码', trigger: 'blur' }
				]
				},
				orgs:[],
				categorys:[],
				fixOrg:[],
		  }
		},
		methods: {
		  init() {
			const _this = this;
			this.editor = new E('#editor');	
			this.setMenus();//设置菜单
			this.editor.create();//创建编辑器
			 $('#editor').attr('style','height:auto;');
			this.editor.change = function() { // 这里是change 不是官方文档中的 onchange
			  console.log(this.txt.html());// 编辑区域内容变化时，实时打印出当前内容
			  _this.$emit('changeHtml', this.txt.html());
			}
		  }, 
		initDate(){
			this.getListRequest('/orgs').then(resp=>{
				console.log(resp.data);
				this.orgs=resp.data;
			}),
			this.getListRequest('/article-categorys/tree').then(resp=>{
				console.log(resp.data);
				this.categorys=resp.data;
			}),
		   axios({
				url:'http://localhost:3000/tags',
				methods:'get'
			}).then((response)=>{
				console.log(response.data);		
				   this.tags=response.data;
				this.$router.push('/article');
			})
		},
		handleCheckedTagIdsChange(value) {
			let checkedCount = value.length;
			this.isIndeterminate = checkedCount > 0 && checkedCount < this.tags.length;
		},
		resetForm(formName) {
				this.$refs[formName].resetFields();
			},
		next() {
			 if (++this.active > 2) this.active = 0;
			//	this.active = 0;
			},
		Predept(){
			this.active=0;
		},
		Return(){
			this.$router.push('/article');
		},
	  handleChange(fixOrg) {
        console.log(fixOrg);
      },
		setMenus() {
			this.editor.customConfig.menus = [
			'head',  // 标题
			'bold',  // 粗体
			'fontSize',  // 字号
			'fontName',  // 字体
			'italic',  // 斜体
			'underline',  // 下划线
			'strikeThrough',  // 删除线
			'foreColor',  // 文字颜色
			'backColor',  // 背景颜色
			'link',  // 插入链接
			'list',  // 列表
			'justify',  // 对齐方式
			'quote',  // 引用
			'emoticon',  // 表情
			'image',  // 插入图片
			'table',  // 表格
			'video',  // 插入视频
			'code',  // 插入代码
			'undo',  // 撤销
			'redo'  // 重复
		]
			 // 下面两个配置，使用其中一个即可显示“上传图片”的tab。但是两者不要同时使用！！！
            // editor.customConfig.uploadImgShowBase64 = true;  // 使用 base64 保存图片
            this.editor.customConfig.uploadImgServer = '/upload';  // 上传图片到服务器
            // 显示“网络图片”tab
            this.editor.customConfig.showLinkImg = true;
            // 配置服务器端地址
            this.editor.customConfig.uploadImgServer = this.server_config.url+'articles/uploadFile';  //改为实际服务器url

            this.editor.customConfig.uploadFileName = 'photo';
            // 将图片大小限制为 3M  默认5M
            this.editor.customConfig.uploadImgMaxSize = 3 * 1024 * 1024
            // 限制一次最多上传 5 张图片  默认10000（即不限制）
            this.editor.customConfig.uploadImgMaxLength = 5;

            this.editor.customConfig.uploadImgTimeout = 50000;
            this.editor.customConfig.uploadImgHooks = {
                before: function (xhr, editor, files) {
                    // 图片上传之前触发
                    // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，files 是选择的图片文件
            
                    // 如果返回的结果是 {prevent: true, msg: 'xxxx'} 则表示用户放弃上传
                    // return {
                    //     prevent: true,
                    //     msg: '放弃上传'
                    // }
                },
                success: function (xhr, editor, result) {
                    // 图片上传并返回结果，图片插入成功之后触发
                    // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
                },
                fail: function (xhr, editor, result) {
                    // 图片上传并返回结果，但图片插入错误时触发
                    // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
                },
                error: function (xhr, editor) {
                    // 图片上传出错时触发
                    // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
                },
                timeout: function (xhr, editor) {
                    // 图片上传超时时触发
                    // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
                },
            
                // 如果服务器端返回的不是 {errno:0, data: [...]} 这种格式，可使用该配置
                // （但是，服务器端返回的必须是一个 JSON 格式字符串！！！否则会报错）
                customInsert: function (insertImg, result, editor) {
                    // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
                    // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果
                    console.log(result)
                    // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
                    var url = result.data
                    insertImg(url)
            
                    // result 必须是一个 JSON 格式字符串！！！否则报错
				}
			}
		  },
		getHtml() {
			this.articleForm.body=this.editor.txt.html();
			console.log(this.articleForm.body);
		    return this.articleForm.body;
		  },
		setHtml(txt) {
		    this.editor.txt.html(txt);
		  },
		 request(){

			   if (++this.active > 2) this.active = 0;
			   this.getHtml();
               this.postRequest('/articles',{
				  title: this.articleForm.title,
				  categoryId: this.articleForm.categoryId,
				  orgId:this.articleForm.orgId,
				  source:this.articleForm.source,
				  sourceUrl: this.articleForm.sourceUrl,
				  abstraction: this.articleForm.abstraction,
				  tagIds: this.articleForm.tagIds,
				  type: this.articleForm.type,
				  author:this.articleForm.author,
				  featured:this.articleForm.featured,
				  sticky:this.articleForm.sticky,
				  promoted:this.articleForm.promoted,
                  body:this.articleForm.body
				}).then((resp)=>{
                   console.log(resp);
				   if(resp.data.status==200){
				   this.$message({
					   message:'添加成功',
					   type:'success'
				   })
				
				
				}
				else{
                     this.$message({
					   message:'添加失败',
					   type:'error'
				   })
				}
				})
		 },
		 submitForm(formName) {
			this.$refs[formName].validate((valid) => {
			if (valid) {
				if (++this.active > 2) this.active = 0;
				
				console.log(this.articleForm);
				if(this.articleForm.featured==false){
					this.articleForm.featured=0
				}else{
					this.articleForm.featured=1
				}
				if(this.articleForm.sticky==false){
					this.articleForm.sticky=0
				}else{
					this.articleForm.sticky=1
				}
				if(this.articleForm.promoted==false){
					this.articleForm.promoted=0
				}else{
					this.articleForm.featured=1
				}
				
			} else {
				console.log('error submit');
				return false;
			}
        });
      },
		},

		mounted() {
		  this.initDate();
		  this.$nextTick(function() {
		     this.init();
		  });
		}
	}
</script>
<style>
.article{
	width:981px;
	background-color: white;
	margin: 0 auto;
	padding: 24px 32px;
}
.step3{
	text-align: center;
}
</style>
