import { createApp } from 'vue'
import App from './App.vue'

// 样式引入
import 'theme-chalk/src/index.scss'
import MUI from 'm-ui'

// 全局引入组件
createApp(App).use(MUI).mount('#app')

// 按需引入

// import { Button, Form } from 'm-ui'
// const app = createApp()
// app.use(Button).use(Form)
// app.mount('#app')





// import 'element-plus/dist/index.css'
// import { ElRow, ElCol } from 'element-plus'
// const app = createApp(App).use(ElRow).use(ElCol)
// app.use(MUI)
// app.mount('#app')


