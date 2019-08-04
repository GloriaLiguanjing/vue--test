<template>
    <div>
        <transition name="fade">
            <loading v-if="isLoading"></loading>
        </transition>
        <el-row class="articleShow" :gutter="40">
            <div class="container-fulid">
                <el-col :lg="6" :xs="12" :sm="8" :md="8" :xl="4" v-for="(item, index) in articles" :key="index">
                    <el-card :body-style="{ padding: '5px' }">
                        <div class="article-item">
                            <div class="content">
                                <div class="article-item-img">
                                    <div class="article-item-img-a">
                                        <img :src="item.picture" class="image" alt="图片丢了">
                                    </div>
                                </div>
                                <div class="article-item-content">
                                    <span class="article-item-content-title">{{item.title}}</span><br>
                                    <span class="article-item-content-abstraction">{{item.abstraction}}</span>
                                    <div class="bottom clearfix">
                                        <el-button type="primary" class="button" size="mini">操作按钮</el-button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </el-card>
                </el-col>
            </div>
        </el-row>
    </div>
</template>
<style>
.time {
    font-size: 13px;
    color: #999;
}

.bottom {
    margin-top: 13px;
    line-height: 12px;
}

.el-card {
    margin-bottom: 30px;
    color: #7D7D7D !important;
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
.article-data{
    padding-top: 20px;
}
.article-item-content-title {
    font-size: 16px;
    display: block;
    margin: 5px 0;
    color: #333;
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
        }
    },
    mounted() {
        this.initDate();
    }
}

</script>
