import Vue from 'vue'
import Router from 'vue-router'
import Org from './components/Org.vue'
import Index from './views/Index.vue'
import Like from './components/Like.vue'
import Article from './components/Article.vue'
import Category from './components/Category.vue'
import Charts from './components/Charts.vue'
import VueCropper from './views/CropperIndex.vue'
import FlexPaper from './components/FlexPaper.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: '首页',
      redirect:'/charts',
      component:Index,
      children:[
        {
          path:'/charts',
          name:'图表',
          component:Charts,
        },
        {
          path:'/org',
          name:'组织机构',
          component:Org,
        },
        {
          path:'/category',
          name:'栏目',
          component:Category,
        },
        {
          path:'/like',
          name:'点赞',
          component:Like,
        },
        {
          path:'/article',
          name:'文章',
          component:Article,
        },
        {
          path:'/cropper',
          name:'截图',
          component:VueCropper,
        },
        {
          path:'/flexpaper',
          name:'pdf播放',
          component:FlexPaper
        }
      ]
    },
    {
      path: '/about',
      name: 'about',
      alwaysShow: true,
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
      meta:{
        title:'关于',
        icon:'lock',
        breadcrumb:true
      }
    }
  ]
})
