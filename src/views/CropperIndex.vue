<template>
  <div class="app">
    <upload-cropper
      :limit="3"
      :limitSize="1024"
      :on-change="handleOnChange"
      :http-request="handleHttpRequest"
      :on-success="handleSuccess"
      :on-error="handleError"
      :on-remove="handleRemove"
      :fileList="fileList1"
      :cropper="{
        height: 300,
        autoCrop: true,
        autoCropWidth: 300,
        autoCropHeight: 200,
        fixed: false
      }"></upload-cropper>

    <!-- 确认上传 -->
    <el-button @click="" style="margin-top:10px;">取 消</el-button>
    <el-button type="primary" @click="postForm()" style="margin-top:10px;">上传</el-button>
  </div>
</template>

<script>
import { fips } from 'crypto';
  // import axios from 'axios'

  export default {
    name: 'exampleUploadCropper',
    data() {
      return {
        // 初始化数据
        fileList1: [],
        fileListMap: {} // 键值对，用来存储上传图片后的 uid:url
      }
    },
    methods: {
      handleOnChange(file, fileList) {
        console.log('onChange', file, fileList)
        console.log('onChange:fileList1', this.fileList1)
        this.fileList1 = fileList
      },
      handleRemove(file, fileList) {
        console.log('onRemove', file, fileList)
        console.log('onRemove:fileList1', this.fileList1)
        this.fileList1 = fileList
      },
      handleHttpRequest(options, ajax) {
        // --------------
        // 此处可用此方法动态修改请求 options，默认使用 ajax 发送请求，但只限于 form-data 形式表单 post|put 提交
        // options.action = '1231231'
        // options.headers = {
        //   'Accept': 'application/json',
        //   'X-Requested-With': 'XMLHttpRequest'
        // }
        // ajax(options)
        // --------------

        // ---------------
        // 若要自定义发送请求，此处一定要是 Promise 类的异步函数，才会执行 onSuccess 等回调
        // 此处以 axios 发送请求举例
        return new Promise((resolve, reject) => {
          // ---------
          // 自定义请求的进度条
          // this.fileList1.forEach((item, index) => {
          //   if (item.uid === options.file.uid) {
          //     axios.post('https://a76a9787-346f-4247-83df-3c735332f3a2.mock.pstmn.io/create', {}, {
          //       onUploadProgress: progressEvent => {
          //         var complete = (progressEvent.loaded / progressEvent.total * 100 | 0) + '%'
          //         item.status = 'uploading'
          //         item.percentage = complete || 0
          //         console.log('上传进度：', complete)
          //       }
          //     }).then(() => {
          //       console.log('上传成功')
          //       resolve()
          //     })
          //   }
          // })
          // ---------
          resolve()
        })
        // ----------------
      },
      // 处理 ELUpload 上传后的数据，用于表单提交。
      processUploadData(data) {
        // --------------
        // 结果输出[url1, url1, url3]
        // const result = []
        // data.forEach(item => {
        //   if (item.uid && item.status && item.status === 'success') {
        //     result.push(this.fileListMap[item.uid] || item.url)
        //   } else if (!item.status && item.url) {
        //     result.push(item.url)
        //   }
        // })
        // return result
        // ---------------
      },
      handleSuccess(res, file, fileList) {
        console.log('onSuccess', res, file, fileList)
        console.log('onSuccess:fileList1', this.fileList1)
        this.fileList1 = fileList // 上传成功后赋值
        // 替换 url
        // this.fileList1.forEach(item => {
        //   if (item.uid === file.uid) {
        //     item.url = this.fileListMap[file.uid] || item.url
        //   }
        // })
      },
      handleError(res, file, fileList) {
        console.log('onError', res, file, fileList)
        console.log('onError:fileList1', this.fileList1)
        this.fileList1 = fileList
      },
      postForm() {
        if(this.fileList1.length==0){
            this.$message({
            showClose: true,
            message: '未添加图片',
            type: 'error'
          });
        }else{
          var formData = new FormData();
          this.fileList1.forEach((item,index)=>{
            let raw = item;
            console.log(item.raw);
            formData.append('photo',item.raw);
          });
          this.uploadFileRequest('articles/uploadimg',formData).then(resp=>{
            console.log(resp.data.status);
            if(resp.data.status){
              this.$message({
                message:'上传成功',
                type:'success'
              });
                //清图片
              var _this=this;
              this.fileList1.forEach((item,index)=>{
                  this.fileList1.splice(index);
              });
            }
          })
        }
        
      }
    }
  }
</script>

<style>
.app {
  margin-left: 20px;
  margin-top: 60px;
}
</style>
