import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/font-awesome.css'
import highlight from 'highlight.js';
Vue.config.productionTip = false

Vue.use(highlight);
Vue.use(ElementUI);

Vue.directive('highlight', (el) => {
    let blocks = el.querySelectorAll('pre code')
    blocks.forEach((block) => {
        highlight.highlightBlock(block)
    })
})

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

