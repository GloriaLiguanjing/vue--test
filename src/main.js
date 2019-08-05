import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/font_1307480_scvcamidpse/iconfont.css'
import {getRequest} from './api/api'
import {postRequest} from './api/api'
import {deleteRequest} from './api/api'
import {putRequest} from './api/api'
import {getListRequest} from './api/api'
import {uploadFileRequest} from './api/api'
import './assets/css/bootstrap.css'
import echarts from 'echarts'
Vue.prototype.getRequest = getRequest;
Vue.prototype.postRequest = postRequest;
Vue.prototype.deleteRequest = deleteRequest;
Vue.prototype.putRequest = putRequest;
Vue.prototype.getListRequest = getListRequest;
Vue.prototype.uploadFileRequest = uploadFileRequest;
Vue.use(element)
Vue.prototype.bus = new Vue()
Vue.prototype.$echarts = echarts
// router.beforeEach((to,from,next)=>{
//   if(to.name == 'Login'){
//     next();
//     return;
//   }
//   var name = store.state.user.name;
//   if(name == '未登录'){ 
//       if(to.meta.requireAuth||to.name == null)
//         next({path:'/',query:{redirect:to.path}})
//       } else{
//         next();
//       } 
//   }else{
//         initMenu(router,store);
//         next();
//   } 
// })
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
