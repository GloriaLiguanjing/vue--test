import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/font_1328824_th55v3e8sd8/iconfont.css'
import {getRequest} from './api/api'
import {postRequest} from './api/api'
import {deleteRequest} from './api/api'
import {putRequest} from './api/api'
import {getListRequest} from './api/api'
import {uploadFileRequest} from './api/api'
import {getFileRequest} from './api/api'
import './assets/css/bootstrap.css'
import echarts from 'echarts'
import VueCropper from 'vue-cropper'
import UploadCropper from 'vue-upload-cropper'
import '../node_modules/timescale/css/timescale.css'
import '../node_modules/timescale/js/konva.min.js'
import '../node_modules/timescale/timescale.js'
import * as FormatTime from './utils/format-time'
import Video from 'video.js'
import 'video.js/dist/video-js.css'
import global from './Global'
Vue.prototype.getRequest = getRequest;
Vue.prototype.postRequest = postRequest;
Vue.prototype.deleteRequest = deleteRequest;
Vue.prototype.putRequest = putRequest;
Vue.prototype.getListRequest = getListRequest;
Vue.prototype.uploadFileRequest = uploadFileRequest;
Vue.prototype.getFileRequest = getFileRequest;
Vue.prototype.bus = new Vue()
Vue.prototype.$echarts = echarts
Vue.prototype.global = global;
Vue.prototype.$video = Video
Vue.prototype.$FormatTime = FormatTime
Vue.use(element)
Vue.use(VueCropper)
Vue.use(UploadCropper)

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
