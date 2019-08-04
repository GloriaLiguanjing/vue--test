<template>
    <el-row class="menu_page">
        <el-col>
            <el-menu mode="vertical" background-color="#324057" text-color="#fff" active-text-color="#409eff" class="el-menu-vertical-demo" :router="true" :collapse="isCollapse">
                <el-menu-item index="/">
                    <i class="iconfont icon-shouye">&nbsp;&nbsp;</i>
                    <span slot="title">首页</span>
                </el-menu-item>
                <template v-for="item in items">
                    <el-submenu v-if="item.children" :index="item.path" :key="item.path">
                        <template slot="title">
                            <i :class="item.icon">&nbsp;&nbsp;</i>
                            <span slot="title">{{item.name}}</span>
                        </template>
                        <el-menu-item :index='citem.path' v-bind:key="cindex" v-for="(citem,cindex) in item.children">
                            <span slot="title">{{citem.name}}</span>
                        </el-menu-item>
                    </el-submenu>
                </template>
            </el-menu>
        </el-col>
    </el-row>
</template>
<script>
import axios from 'axios'

export default {
    name: "leftmenu",
    data() {
        return {
            items: [],
            isCollapse: ''
        };
    },
    methods: {
        initDate() {
            axios({
                url: 'http://192.168.124.12:3000/items',
                method: 'get'
            }).then((response) => {
                // console.log(response.data);
                this.items = response.data;
                console.log(this.items)
            })
        }
    },
    mounted: function() {
        this.initDate();
        this.isCollapse = false;
        this.bus.$on('menuState', res => {
            this.isCollapse = res
            console.log(res)
        })
    }
};
</script>
<style scoped>
.menu_page {
    float: left;
    min-height: 100%;
    background-color: #324057;
    z-index: 99;
}

.el-menu {
    border: none;
}

.fa-margin {
    margin-right: 5px;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 180px;
    min-height: 400px;
}

.el-menu-vertical-demo {}

.el-submenu .el-menu-item {
    min-width: 180px;
}

.hiddenDropdown,
.hiddenDropname {
    display: none;
}
.el-menu i{
    font-size: 20px;
}

a {
    text-decoration: none;
}
</style>