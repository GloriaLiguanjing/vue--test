<template>
  <div class="test_two_box">     
           <video
           style="width:800px;height:400px"
            id="myVideo"
            class="video-js vjs-big-play-centered"
            >
            <source
                id="1"
                src="../assets/frag_bunny.mp4"
                type="video/mp4"
            >
            <track label="中文字幕" kind="subtitles" chapters metadata srclang="zh" :src="requestSrc" default>
            </video>
        <div id ="timescale" style="height:200px"> </div>
            <!-- <div class="cut">
                剪切出来一段视频<br>
                起始时间：<el-input v-model="starttime" placeholder="请输入起始时间" style="width:200px"></el-input>
                <el-button @click="isStart" type="primary">确定</el-button><br> 
                结束时间：
                <el-input v-model="endtime" placeholder="请输入结束时间" style="width:270px;margin-top:20px"></el-input><br>
                <el-button @click="cut" type="primary" style="width:270px;margin-top:20px">剪切测试</el-button>
            </div>
            <div class="merge">  
                剪走一段视频 将剩下的两端合并<br>
                起始时间：<el-input v-model="starttime" placeholder="请输入起始时间" style="width:200px"></el-input>
                <el-button @click="isStart" type="primary">确定</el-button><br> 
                结束时间：
                <el-input v-model="endtime" placeholder="请输入结束时间" style="width:270px;margin-top:20px"></el-input><br>
                <el-button @click="merge" type="primary" style="width:270px;margin-top:20px">剪切测试</el-button>
            </div>
            <div class="delstartorend">  
                掐头或去尾<br>
                起始时间：<el-input v-model="starttime" placeholder="请输入起始时间" style="width:200px"></el-input>
                <el-button @click="isStart" type="primary">确定</el-button><br> 
                结束时间：
                <el-input v-model="endtime" placeholder="请输入结束时间" style="width:270px;margin-top:20px"></el-input><br>
                <el-button @click="delstartorend" type="primary" style="width:270px;margin-top:20px">剪切测试</el-button>
            </div>
            <div class="videotomore">  
                将视频分段<br>
                起始时间：<el-input v-model="starttime" placeholder="请输入起始时间" style="width:200px"></el-input>
                <el-button @click="isStart" type="primary">确定</el-button><br> 
                结束时间：
                <el-input v-model="endtime" placeholder="请输入结束时间" style="width:270px;margin-top:20px"></el-input><br>
                <el-button @click="videotomore" type="primary" style="width:270px;margin-top:20px">剪切测试</el-button>
            </div> -->
    </div>
     

</template>

<script>
import { log } from 'util';

/* eslint-disable */
    export default {
    name: "MyVideo",
    data() {
        return {
            //字幕地址
            requestSrc,
            //将一段视频分成几段存放时间的数组
            videotimeArry:[],
            //时间轴对象
            timeLine:'',
            //视频总长度
            duration:'',
            //判断是不是开始时间
            isstart:true,
            //剪切的开始时间
            starttime:'',
            //剪切的结束时间
            endtime:'',

            //播放器对象
            player:'',
        };
    },
    mounted() { 
        this.initVideo();
        this.delayinitTimescale();
    },
    methods: {
           //判断是不是开始时间
            isStart()
            {
                this.isstart = false
            },
         //执行剪切方法
         cut()
         { 
             let params= {
                 starttime : this.starttime,
                 endtime : this.endtime,
                 id:1,
               //  videotimeArry:this.videotimeArry
             }
             console.log(params);   

            this.$http.cut(params).then(res=>{
                console.log(res);      
            })
            .catch(err=>{
                console.log(err);       
            })    
           
            this.starttime=''
            this.endtime=''
            this.isstart = true
         },
         merge()
         {
            let params= {
                 starttime : this.starttime,
                 endtime : this.endtime,
                 id:1,
                // videotimeArry:this.videotimeArry
             }

             this.$http.merge(params).then(res=>{
                console.log(res);      
            })
            .catch(err=>{
                console.log(err);       
            })
            
            this.starttime=''
            this.endtime=''
            this.isstart = true
         },
         delstartorend()
         {
             let params= {
                 starttime : this.starttime,
                 endtime : this.endtime,
                 id:1,
                // videotimeArry:this.videotimeArry
             }
             
            this.$http.delstartorend(params).then(res=>{
                console.log(res);      
            })
            .catch(err=>{
                console.log(err);       
            })

            this.starttime=''
            this.endtime=''
            this.isstart = true
         },
         videotomore()
         {
             let params= {
                 starttime : this.starttime,
                 endtime : this.endtime,
                 id:1,
                 videotimeArry:this.videotimeArry
             }
              this.$http.videotomore(params).then(res=>{
              console.log(res);      
            })
            .catch(err=>{
              console.log(err);       
            })

             this.starttime=''
            this.endtime=''
            this.isstart = true

         },
         //进度条跟踪
         barProgress()
         {
                var time = this.player.currentTime()
                this.timeLine.seekTo(1,time*1000)
         },
         //延迟加载时间轴
         delayinitTimescale()
         {
             this.player.setTimeout(()=>{
                 this.duration = (this.player.duration()*1000)
                 this.initTimescale()
             },200);    
         },
         //初始化播放器
        initVideo() {
        //初始化视频方法
        let options = {
            
             //确定播放器是否具有用户可以与之交互的控件。没有控件，启动视频播放的唯一方法是使用autoplay属性或通过Player API。
            controls: true,
            //自动播放属性,muted:静音播放
            autoplay:false,
            //建议浏览器是否应在<video>加载元素后立即开始下载视频数据。
            preload:"auto",
            //设置视频播放器的显示宽度（以像素为单位）
            width: "800px",
            //设置视频播放器的显示高度（以像素为单位）
            height: "400px"
            
        }
            this.player = this.$video('myVideo',options)
            this.player.on('play',()=>{
                this.timeLine.play()
            })
            this.player.on('pause',()=>{
                this.timeLine.pause()
            })
            
         },
         //初始化时间轴
         initTimescale()
         {
              var sectionArr = [{
                id:1, //视频id,唯一标识
               // duration:10277731, //当前视频的时长
                duration:60000,
                status: true //表示该视频是否存在
                }];
                // var clipsArr = [{
                //     startTime: this.starttime,  //剪辑片段的开始时间
                //     endTime: 500  //剪辑片段的结束时间
                // }];
                this.timeLine = timescale.render({
                ele: 'timescale', //插件要渲染的元素的id
                sectionArr: sectionArr, //视频片段信息
                //clipsArr: clipsArr, //视频剪辑片段信息
                //showSectionStatus: true, //是否显示视频的状态
                 indexEnable: true, //是否开启索引功能
                // clipEnable: true, //是否开启剪辑功能
                // backgroundColor: '#a0a0a0', //插件背景颜色（可选）
                // fontColor: '#333', //插件字体颜色（可选）
                // iconColor: '#333', //插件图标颜色和刻度颜色（可选）
                // cursorColor: '#FF6600' //插件游标的颜色（可选）
                });
                console.log(this.timeLine);
                
                this.player.on('timeupdate',()=>{
                   this.barProgress()
                   })   
                this.timeLine.on('play',()=>{
                   this.player.play()
                });
                this.timeLine.on('pause',()=>{
                   this.player.pause();
                });
                this.timeLine.on('seekTo',(time)=>{
                    // console.log(time); //游标移动之后的时间
                    this.timeLine.pause()
                    this.player.pause()
                    this.player.currentTime((time.time)/1000)
                    var time  = ((time.time)/1000)
                    this.isstart ?  this.starttime = this.$FormatTime.formatTime(time,time) : this.endtime =  this.$FormatTime.formatTime(time,time);                              
                    /*
                    time: {
                        id: 1, //视频的唯一标志
                        time: 1000, //相对于当前视频的时间点
                        absTime: 2000 //相对于所有视频的时间点
                    }
                    */
                });
                this.timeLine.on('createIndex', (time)=> {
                    console.log(time.time);
                    var playertime =  this.$FormatTime.formatTime((time.time/1000),(time.time/1000))
                    console.log(playertime);
                   this.videotimeArry.push(playertime)
                    console.log(this.videotimeArry);
                    console.log("将此处设为分段时间点"); // 所创建的索引信息
                }) 
         }
        },
    };
      
</script>

<style>
.test_two_box .box{
    position: absolute;
    width: 500px;
    background-color:burlywood;
    height: 200px;
    margin-left: 153px;
    margin-top: -466px;
}
.cut{
    width:500px;
    margin-top:20px;
    position:absolute;
    margin-left:-57px;
}
.merge{
    width:500px;
    margin-top:20px;
    position:absolute;
    margin-left:321px;
}
.delstartorend{
    width:500px;
    margin-top:20px;
    position:absolute;
    margin-left:696px;
}
.videotomore{
    width:500px;
    margin-top:20px;
    position:absolute;
    margin-left:1064px;
}
</style>