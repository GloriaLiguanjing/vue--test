<template>
    <div>
        <ul class="breadcrumb-ul">
            <transition-group name="el-fade-in-linear" mode="in-out">
                <li v-for="(item,index) in levelList" class="breadcrumb-li" :key="item.path">
                    <span v-if="item.path">/</span>&nbsp;&nbsp;&nbsp;
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
    padding-top:20px;
    background-color:transparent;
    padding-left:20px;
}

.breadcrumb-li {
    float: left;

}

.breadcrumb-li a {
    color: #97a8be;
    padding: 0 20px;
}

.breadcrumb-li:hover a {
    color: #43BC60;;
}

.breadcrumb-li-span {
    color: #303133;
    padding-top:20px;
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