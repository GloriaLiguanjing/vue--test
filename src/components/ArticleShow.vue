<template>
    <div>
        <transition name="fade">
            <loading v-if="isLoading"></loading>
        </transition>
        <el-row class="articleShow" :gutter="40">
            <div class="container-fulid" >
                <el-col :lg="6" :xs="12" :sm="8" :md="8" :xl="4" v-for="(item, index) in articles" :key="index">
                    <el-card :body-style="{ padding: '5px' }" shadow="hover">
                        <div class="article-item">
                            <div class="content">
                                <div class="article-item-status">
                                    <el-badge value="精" class="item" type="primary" v-if="item.promoted"></el-badge>
                                    <el-badge value="热" class="item" type="danger" v-if="item.featured"></el-badge>
                                    <el-badge value="顶" class="item" type="warning" v-if="item.sticky"></el-badge>
                                </div>
                                <div class="article-item-img">
                                    <div class="article-item-img-a">
                                        <img :src="item.picture" class="image" alt="图片丢了">
                                    </div>
                                </div>
                                <div class="article-item-content">
                                    <span class="article-item-content-title">{{item.title}}</span><br>
                                    <span class="article-item-content-abstraction">{{item.abstraction}}</span>
                                    <div class="bottom clearfix">
                                        <el-badge :value="item.upsNum" class="item" type="info">
                                          <svg t="1564908796453" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3692" width="25" height="25"><path d="M922.942 423.352c-22.409-28.266-55.958-44.474-92.034-44.474l-220.63 0.913c11.213-31.273 17.396-61.253 23.159-93.74 6.065-34.188 6.303-100.85-12.683-135.648-23.349-42.804-59.815-70.553-111.688-78.261-23.503-3.489-43.712 1.023-60.081 13.422-33.081 25.062-39.15 72.756-46.185 127.977-5.62 44.146-11.991 94.182-33.402 130.048-14.286 23.937-42.101 55.755-118.346 55.755l-79.567 0c-52.985 0-96.092 43.091-96.092 96.057l0 363.154c0 52.964 43.107 96.056 96.092 96.056l579.67 0c26.391 0 52.303-9.027 72.977-25.417 20.681-16.394 35.374-39.568 41.386-65.254l79.753-340.933C953.481 487.917 945.344 451.589 922.942 423.352zM243.623 910.415l-73.786 0c-19.311 0-35.019-15.696-35.019-34.982L134.818 478.526c0-19.285 15.708-34.98 35.019-34.98l73.786 0L243.623 910.415zM898.101 508.191l-83.941 358.848c-5.971 25.535-28.479 43.376-54.728 43.376L287.775 910.415 287.775 455.913c56.953-10.874 99.794-39.876 127.721-86.658 29.75-49.833 37.398-109.915 44.151-162.919 3.051-23.952 5.927-46.577 10.504-63.934 4.908-18.615 9.986-24.067 11.942-25.551 2.237-1.696 6.484-2.09 12.611-1.181 33.821 5.022 57.293 20.36 71.755 46.877 29.68 54.399 16.57 146.214-11.72 208.793-6.774 14.992-5.514 32.164 3.382 45.941 8.879 13.766 23.991 21.979 40.413 21.979l244.838 0c17.272 0 33.324 7.754 44.051 21.28C898.136 474.043 902.027 491.416 898.101 508.191z" p-id="3693"></path><path d="M680.103 510.818" p-id="3694"></path></svg>
                                        </el-badge> 
                                        <el-button type="primary" class="button" size="mini" @click="show(item)">查看</el-button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </el-card>
                </el-col>
            </div>
        </el-row>
        <el-dialog :title="showArticle.title" :visible.sync="articleShowCode" width="50%">
            <div class="article-publishedTime">
                
            </div>
            <div class="article-data">
                <el-tag size="mini">{{showArticle.tagIds}}</el-tag>
                &nbsp;&nbsp;&nbsp;
                <span>发布机构：{{ showArticle.author }}</span>
            </div>
            <span v-html="showArticle.body"></span>
            <span slot="footer" class="dialog-footer">
                <div class="article-time">
                    <span class="article-time-createdTime">创建时间：{{showArticle.createdTime}}</span>
                    &nbsp;&nbsp;&nbsp;
                    <span class="article-time-updateTime">最后更新时间：{{showArticle.updateTime}}</span>
                </div>
                <el-button @click="articleShowCode = false">取 消</el-button>
                <el-button type="primary" @click="articleShowCode = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<style>
.time {
    font-size: 13px;
    color: #999;
}
.item {
  margin-right: 17px;
}
.bottom {
    margin-top: 13px;
    line-height: 12px;
}
.article-data{
    padding-bottom: 10px;
}
.el-badge__content--info{
    background-color: #ccc !important;
}
.el-card {
    margin-bottom: 30px;
    color: #7D7D7D !important;
}
.article-item-status{
    position: absolute;
    z-index: 10;
    top: 5px;
}
.article-item {
    position: relative;
    width: 100%;
    padding-bottom: 170%;
    overflow: hidden;
    height: 0;
}

.article-item .content {
    position: absolute;
    top: 0;
    left: 0;
    overflow: hidden;
    width: 100%;
    height: 100%;
}

.article-data {
    padding-top: 20px;
}

.article-item-content-title {
    font-size: 16px;
    display: -webkit-box;
    margin: 5px 0;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    color: #333;
    overflow: hidden;
}

.article-item-content-abstraction {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    text-indent: 28px;
    overflow: hidden;
}

.button {
    padding: 0;
    float: right;
}

.image {
    width: inherit;
    display: block;
    height: inherit;
}

.article-item-img-a {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
}

.article-item-img {
    width: 100%;
    overflow: hidden;
    position: absolute;
    padding-bottom: 90%;
    height: 0;
}

.article-item-content {
    padding: 14px;
    padding-top: 95%;
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}

.clearfix:after {
    clear: both
}

/* .articleShow{
      width:90%;
      margin:0 auto;
      background-color: #ffffff;
      padding:20px;
      padding-left:84px;
  } */

</style>
<script>
import Loading from './loading.vue'
export default {
    data() {
        return {
            articles: [],
            isLoading: true,
            showArticle:{},
            articleShowCode:false
        };
    },
    components: { Loading },
    methods: {
        initDate() {
            this.getListRequest('/articles').then(resp => {
                console.log(resp.data);
                this.articles = resp.data;
                this.isLoading = false
            })
        },
        show(item){
            this.showArticle = item
            this.articleShowCode = !this.articleShowCode
        }
    },
    mounted() {
        this.initDate();
    }
}

</script>
