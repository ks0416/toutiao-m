import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 加载vant组件库
import Vant from 'vant'
// 加载vant样式
import 'vant/lib/index.css'
// 加载全局样式
import './style/index.less'

// 动态设置rem基准值
import 'amfe-flexible'
// 事件过滤器
import './utils/dayjs'
// 注册vant并使用组件库
Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
