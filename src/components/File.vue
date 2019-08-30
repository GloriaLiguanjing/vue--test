<template>
    <div class="file">
        <el-upload
            v-model="attachment"
            ref="upload"
            class="upload-demo"
            multiple
            :limit="limitFileNum"
            :action="serSrc"
            :file-list="fileList"
            :before-upload="beforeUpload"
            :before-remove="beforeRemove"
            :on-exceed="handleExceed"
            :on-success="uploadSuccess"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
        >
            <el-button  size="small" type="primary" v-if="!hideButton">点击上传</el-button>
            <div slot="tip" class="el-upload__tip" style="display: inline-block; margin-left: 10px" v-if="!hideButton">
            仅支持上传{{this.limitFileNum}}个文件！
            </div>
        </el-upload>
    </div>      
</template>
<script>
  export default {
    name: 'uploadFile',
    props: {
      inputValue: {
        default: ''
      },
      hideButton: {
        default: false
      }
    },
    data() {
      return {
        attachment: this.inputValue,
        fileList: this.attachment,
        suffixName: 'DOC,DOCX,XLS,XLSX,PPT,PDF,TXT,JPG,JPEG,PNG,BMP,GIF,VTT',
        limitFileNum: 5,
        limitFileSize: 20,
        server_config:this.global.server_config,
        serSrc:''
      }
    },
    mounted() {
      window.addEventListener('onscroll', this.handleScroll);
      this.serSrc=this.server_config.url+'/articles/uploadFile'
    },
    watch: {
      inputValue: {
        immediate: true,
        handler: function() {
          // 去掉字符中末尾的逗号
          if (this.inputValue && this.inputValue.length > 0) {
            while (this.inputValue[this.inputValue.length - 1] === ',') {
              this.inputValue = this.inputValue.substr(0, this.inputValue.length - 1)
            }
          }
          this.attachment = this.inputValue;
          this.fileList = [];
          if (this.attachment) {
            let list = this.inputValue.split(',');
            let object;
            for (let i = 0; i < list.length; i++) {
              object = {};
              object.name = list[i].substring(list[i].lastIndexOf('/') + 1);
              object.url = list[i];
              this.fileList.push(object);
            }
          }
        }
      }
    },
    methods: {
      handleRemove(file, fileList) {
        // console.log('需要-删除文件', file);
        // console.log('需要-删除文件', file.name);
        // console.log('需要-删除文件', file.url);
        // console.log('删除文件前', this.attachment);
        // 多文件上传问题：上传文件后立即删除-文件地址路径位于file.response.data，而不在file.url。
        // 如果是回显文件列表再进行删除，则文件地址位于file.url，而不在file.response.data
        // 此处采用多重判断条件
        if (undefined !== file.response) {
          this.attachment = this.attachment.replace(file.response.data, '');
        } else {
          let a = this.attachment.split(',');
          // 过滤掉数据的空值
          a = a.filter(item => item);
          // 过滤掉要删的值
          a = a.filter(item => item !== file.url);
          // 字符串用逗号拼接字符串
          this.attachment = a.join(',');
          // this.attachment = this.attachment.replace(file.url + ',', '');
        }
        // this.$emit('childByValue', this.attachment);
        // console.log('删除文件后', this.attachment);
        // console.log(file, fileList);
      },
      handlePreview(file) {
        this.$confirm('您确定要将文件下载？, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // console.log('file:' + file.url.substring(0, 4))
          if (file.url.substring(0, 5) === 'blob:') {
            this.$confirm('请保存信息后再下载！', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            })
            return false;
          } else {
            document.location.href = process.env.BASE_API + '/api/photoUpload/imgDownload?filePath=' + file.url + '&fileName=' + file.name;
          }
        });
      },
      handleExceed(files, fileList) {
        this.$message.warning('当前限制选择' + this.limitFileNum + '个文件，本次选择了' + files.length + '个文件，共选择了' + (files.length + fileList.length) + '个文件');
      },
      beforeUpload(file) {
        const fileName = file.name;
        const suffix = fileName.substring(fileName.lastIndexOf('.') + 1).toUpperCase();
        const isSuffix = this.suffixName.indexOf(suffix) !== -1;
        const isLtM = file.size / 1024 / 1024 < this.limitFileSize;
        if (!isSuffix) {
          this.$message.error('上传文件类型必须是' + this.suffixName + '格式!');
        }
        if (!isLtM) {
          this.$message.error('上传文件大小不能超过' + this.limitFileSize + 'MB!');
        }
        return isSuffix && isLtM;
      },
      beforeRemove(file, fileList) {
        // this.form.declarationAttachment = this.form.declarationAttachment.replace(file.url + ',', '');
        // console.log('删除文件前', this.form.declarationAttachment);
        // return this.$confirm(`确定移除 ${file.name}？`);
      },
      uploadSuccess(response, file, fileList) {
        // console.log('上传文件', response.data);
        console.log(response);
        if (this.attachment === undefined) {
          this.attachment = ''
        }
        // 去掉字符中的逗号
        if (response.data && response.data.length > 0) {
          while (response.data[response.data.length - 1] === ',') {
            response.data = response.data.substr(0, response.data.length - 1)
          }
        }
        if (!this.attachment) {
          this.attachment = response.data;
        } else {
          this.attachment += ',' + response.data;
        }
        // this.$emit('childByValue', this.attachment);
      }

    }
  }
</script>
<style scoped>
    .file{
        width:80%;
        margin:0 auto;
        background-color: #ffffff;
        padding:5%;
    }
</style>