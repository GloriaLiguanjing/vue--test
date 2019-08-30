<template>
   <video ref="h5video" controls></video>
</template>
<script>
import axios from 'axios'
export default {
    mounted(){
        // this.getFileRequest('/articles/getblobvideo').then(resp=>{
        //     console.log(resp);
        //     let res = resp.data;
        //     let blob = new Blob([res], {type: 'video/mpeg4'});
        //     this.$refs.h5video.srcObject=window.URL.createObjectURL(blob);
        // })
            //创建XMLHttpRequest对象
            var xhr = new XMLHttpRequest();
            //配置请求方式、请求地址以及是否同步
            xhr.open('POST', 'http://192.168.124.7:8088/articles/getblobvideo', true);
            //设置请求结果类型为blob
            xhr.responseType = 'arraybuffer';
            //请求成功回调函数
            xhr.onload = function(e) {
                if (this.status == 200) {//请求成功
                    //获取blob对象
                    var blob = this.response;
                    //获取blob对象地址，并把值赋给容器
                   this.$refs.h5video.srcObject=window.URL.createObjectURL(blob);
                }
            };
            xhr.send();

    }
}
</script>