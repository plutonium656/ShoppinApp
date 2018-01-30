import Vue from 'vue'
import App from './App.vue'
import VueResource from "vue-resource";
//import lodash from 'lodash'; 
Vue.use(VueResource);
   
//Object.defineProperty(Vue.prototype, '$lodash', { value: lodash });

new Vue({
  el: '#app',
  render: h => h(App)
})
