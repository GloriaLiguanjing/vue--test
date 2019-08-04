<template>
    <div class="navbar breadcrumb">
        <ul class="breadcrumb-ul">
            <li class="menu-switch breadcrumb-li">
                <a @click="changeMunu()" style="cursor: pointer;"><svg t="1564654006142" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1756" width="16" height="16"><path d="M916.6 210.2H107.4c-17.7 0-32-14.3-32-32s14.3-32 32-32h809.2c17.7 0 32 14.3 32 32s-14.3 32-32 32zM714.3 544H107.4c-17.7 0-32-14.3-32-32s14.3-32 32-32h606.9c17.7 0 32 14.3 32 32s-14.3 32-32 32zM916.6 877.8H107.4c-17.7 0-32-14.3-32-32s14.3-32 32-32h809.2c17.7 0 32 14.3 32 32s-14.3 32-32 32z" p-id="1757"></path></svg></a>
            </li>
            <transition-group name="el-fade-in-linear" mode="in-out">
                <li v-for="(item,index) in levelList" class="breadcrumb-li" :key="item.path">
                    <span v-if="item.path">></span>
                    <router-link :to="item.path" v-if="index!=levelListLength-1">{{ item.name }}</router-link>
                    <span class="breadcrumb-li-span" v-if="index==levelListLength-1">{{ item.name }}</span>
                </li>
            </transition-group>
        </ul>
    </div>
</template>
<script>
import store from '@/store'
export default {
    name: 'breadcrumb',
    data() {
        return {
            levelList: [],
            levelListLength: '',
            changeMenuState:false
        }
    },
    watch: {
        $route() {
            this.getBreadcrumb()
        }
    },
    created() {
        this.getBreadcrumb()
    },
    methods: {
        getBreadcrumb() {

            let matched = this.$route.matched.filter(item => item.name)

            // const first = matched[0];
            // if (first && first.name.trim().toLocaleLowerCase() !== 'Dashboard'.toLocaleLowerCase()) {
            //     matched = [{ path: '/dashboard', meta: { title: 'dashboard' }}].concat(matched)
            // }
            this.levelList = matched
            this.levelListLength = matched.length
            console.log(this.levelList)
        },
        changeMunu(){
            this.changeMenuState = !this.changeMenuState
            this.bus.$emit('menuState', this.changeMenuState)
        }
    }
}
</script>
<style lang="scss" scoped>
.breadcrumb-ul {
    overflow: hidden;
    padding: 20px 0;
    background-color: #fff;
    box-shadow: 0 1px 4px rgba(0, 21, 41, .08);
    padding-left:20px;
}

.breadcrumb-li {
    float: left;

}

.breadcrumb-li a {
    color: #303133;
    padding: 0 20px;
}

.breadcrumb-li:hover a {
    color: #1890ff;
}

.breadcrumb-li-span {
    color: #97a8be;
    padding: 0 20px;
}

.app-breadcrumb.el-breadcrumb {
    display: inline-block;
    font-size: 14px;
    line-height: 50px;
    margin-left: 8px;

    .no-redirect {
        color: #97a8be;
        cursor: text;
    }
}

.el-fade-in-linear-enter-active {
    transition: opacity 1s;
}

.el-fade-in-linear-leave-active {
    transition: opacity .0s;
}
</style>