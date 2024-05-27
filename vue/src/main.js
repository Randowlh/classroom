import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import moment from 'moment/moment'
import './utils/axios'

Vue.filter('dataFormat',(dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') => {
  return moment(dataStr).format(pattern)
})

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueRouter)

const vue = new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

export default vue
