import Vue from 'vue'
import App from './App.vue'

import Antd from 'ant-design-vue'
import './components/style'

Vue.use(Antd)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
