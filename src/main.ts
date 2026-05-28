import { createApp } from 'vue'
import App from './App.vue'

import router from './routes'
import vuetify from './plugins/vuetify'

// styles
import 'unfonts.css'

const app = createApp(App)

app.use(router)
app.use(vuetify)

app.mount('#app')