<template>
    <div class="CourseInfo">
       <span style="font-size:18px;color:#707070">课程信息</span>
       <hr>
       <div class="form">
           <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="课程标题" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="课程副标题" prop="desc">
                    <el-input type="textarea" v-model="ruleForm.desc"></el-input>
                </el-form-item>
                <el-form-item label="标签" prop="region">
                    <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="分类" prop="region">
                    <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="连载状态" prop="resource">
                    <el-radio-group v-model="ruleForm.resource">
                    <el-radio label="非连载"></el-radio>
                    <el-radio label="更新中"></el-radio>
                    <el-radio label="已完结"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <span class="picture">封面图片</span>
                <CropperIndex :id="id"></CropperIndex>
                <span style="color:#ADADAD;margin-left:11%">请上传jpg, gif, png格式的图片,建议图片大小不超过1MB。</span><br><br>
                <span class="picture">课程简介</span>
                <WangEditor class="editor"></WangEditor>
                <el-form-item style="margin-left:35%">
                    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
       </div>
    </div>
</template>
<script>
import CropperIndex from './CropperIndex'
import WangEditor from './WangEditor.vue'
export default {
    components:{
        CropperIndex,
        WangEditor
    },
    data(){
        return{
        ruleForm: {
            name: '',
            region: '',
            date2: '',
            delivery: false,
            type: [],
            resource: '',
            desc: ''
            },
            rules: {
            name: [
                { required: true, message: '请输入活动名称', trigger: 'blur' },
                { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
            ],
            region: [
                { message: '请选择活动区域', trigger: 'change' }
            ],
            date2: [
                { type: 'date', message: '请选择时间', trigger: 'change' }
            ],
            type: [
                { type: 'array',  message: '请至少选择一个活动性质', trigger: 'change' }
            ],
            resource: [
                { message: '请选择活动资源', trigger: 'change' }
            ],
            desc: [
                { message: '请填写活动形式', trigger: 'blur' }
            ]
            }
        }
    },
    methods:{
         submitForm(formName) {
            this.$refs[formName].validate((valid) => {
            if (valid) {
                alert('submit!');
            } else {
                console.log('error submit!!');
                return false;
            }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    }
}
</script>
<style scoped>
.el-form-item__label{
    color:#707070;
    font-size: 14px;
}
.CourseInfo{
    padding:32px;
    margin:0 20px;
    background-color: #ffffff;
}
.form{
    width:70%;
    margin:0 auto;
}
.picture{
    margin: 15px 0;
    margin-left:4%;
    color:#707070;
}
.cropper{
    margin-left:10%;
}
.editor{
    padding:20px 0;
    width:88%;
    margin-left: 12%;
}
</style>