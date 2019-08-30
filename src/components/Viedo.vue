<template>
    <div class="test_two_box">
        <el-select v-model="value" @change="submit(value)" placeholder="请选择要播放的视频">
            <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.filename"
            :value="item.id">
            </el-option>
        </el-select>
        <video
        id="myVideo"
        class="video-js vjs-big-play-centered"
        type = "video/mp4"
        >
        <!-- <source
            id = "video"
            src = "http://localhost:8088/video/f07e5c7b-8cce-409e-88f4-9720fbbe47bb.mp4"
            type = "video/mp4"
        > -->
         <track label="中文字幕" kind="subtitles" chapters metadata srclang="zh" :src="requestSrc" default>
        </video>
        <div class="box" v-show='isShow'>
            <h4>选择题</h4>
             <p>第{{this.titlecurrent+1}}题.{{titlecontent[this.titlecurrent].thetitle}}</p> 
             <el-radio-group v-model="radio">
                <el-radio  v-for="(items,index) in titlecontent[this.titlecurrent].title" :key=index :label=items value=index @change="determine(items)">{{items}}</el-radio>
             </el-radio-group> 
       </div>
    </div>
</template>
 
<script>
export default {
    name: "TestTwo",
    data() {
        return {
            options: [],
            value: '',
            myPlayer: "",
            resquestSrc:'',
            //是否弹题
            isShow:false,
            //题目内容
            titlecontent:[
                {
                    time:'',
                    thetitle:'',
                    correct:'',
                    title:[],
                }
            ],
            //题目总数
            total:'',
            //题目索引
            titlecurrent:0
        };
    },
    mounted() { 
        this.initVideo();
    },
    methods: {
         //是否显示题目
            showtitle()
            {
                this.isShow = true;
            },
            //答案是否正确
           determine(answer){
            if(answer === this.titlecontent[this.titlecurrent].correct)
            {      
                if(this.fullscreen)
               { 
                   this.player.requestFullscreen()    
               }
                this.player.play()
                this.isShow = false
                if(this.titlecurrent<this.total-1)
                {
                 this.titlecurrent = this.titlecurrent+1
                }
                else{
                    this.titlecurrent = 0
                }
            }
            else{
                alert("答案错误")
            }
 
         },
        initVideo() {
        //初始化视频方法
        this.myPlayer = this.$video(myVideo, {
            //确定播放器是否具有用户可以与之交互的控件。没有控件，启动视频播放的唯一方法是使用autoplay属性或通过Player API。
            controls: true,
            //自动播放属性,muted:静音播放
            autoplay: "false",
            // //建议浏览器是否应在<video>加载元素后立即开始下载视频数据。
            preload: "auto",
            //设置视频播放器的显示宽度（以像素为单位）
            width: "800px",
            //设置视频播放器的显示高度（以像素为单位）
            height: "400px"
         });
         this.player = this.$video('myVideo',options)       
            //弹题和禁止快进
            var sym;
            this.player.setInterval(()=>{
                var nowtime=this.player.currentTime()
                if(Math.floor(nowtime) === this.titlecontent[this.titlecurrent].time)
                {
                     if(this.player.isFullscreen())
                    {
                        this.fullscreen = true
                    }
                    this.player.pause()
                    this.player.exitFullscreen()     
                    this.showtitle()
                }       
                if(nowtime-sym>1){
                   this.player.currentTime(sym)
                    }
                sym=this.player.currentTime()
             },250);
        },
        init(){
              this.$http.gettitle().then(res=>{
                console.log(res);
                this.titlecontent = res.data;   
                this.total = res.total;
            })
            .catch(err=>{
                console.log(err); 
            })
        },
        getProfile() {
         this.$axios({
            method: 'get',
            url:'http://localhost:8088/videos'        
            }).then((res)=>{
                console.log(res)
                this.options = res.data;
            })
        },
        submit(id){
             console.log(id)
             this.$axios({
                        method: 'post',
                        url:'http://localhost:8088/videos',
                        params: {
                            id
                        },
                        headers:{
                             'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                        }
                        }).then((res)=>{
                            console.log(res)
                            //暂停视频
                            this.myPlayer.pause();
                            var player = this.$video('myVideo');
                            player.src(res.data); 
                            player.play();
                        }
                    )
            this.postRequest
        }
    },
    created() {
       this.getProfile();
         //获取题目信息
    this.init();  
    }
    
}
</script>
 
 <style scoped>
.video-js{
    top: 20px;
}
.test_two_box .box{
    position: absolute;
    width: 500px;
    background-color:burlywood;
    height: 200px;
    margin-left: 153px;
    margin-top: -300px;
}
</style>