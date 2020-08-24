import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false
// 国际化
import VueI18n from 'vue-i18n'
Vue.use(VueI18n);
const local = localStorage.getItem('worktime:local-lang')
const i18n = new VueI18n({
  locale: local ? local : 'zh-CN',    // 语言标识
  messages: {
    'zh-CN': require('./lang/zh-CN'),   // 中文语言包
    'en-US': require('./lang/en-US')    // 英文语言包
  }
})

// ui库,按需加载
import {
  Button,
  Tabbar,
  TabbarItem,
  ActionSheet,
  Calendar,
  Cell, Icon,
  NumberKeyboard,
  Field,
  Dialog,
  Form,
  Toast,
  Grid,
  GridItem,
  Search,
  Checkbox,
  CheckboxGroup,
  Tab,
  Tabs,
  Collapse,
  CollapseItem,
  PullRefresh,
  List
} from 'vant';
import '@vant/touch-emulator';

import 'vant/lib/index.css';
import 'vant/lib/icon/local.css'

Vue.use(Button)
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(ActionSheet);
Vue.use(Calendar);
Vue.use(Cell);
Vue.use(Icon);
Vue.use(NumberKeyboard)
Vue.use(Field);
Vue.use(Dialog);
Vue.prototype.$Dialog = Dialog
Vue.use(Form);
Vue.use(Toast);
Vue.prototype.$Toast = Toast
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(Search);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(PullRefresh);
Vue.use(List);
// http请求
import axios from "./utils/http.js"
Vue.prototype.$axios = axios

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
