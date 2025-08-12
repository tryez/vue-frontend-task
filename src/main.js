// import { createApp } from 'vue'
// import './style.css'
// import App from './App.vue'
// import router from './router';

// createApp(App).mount('#app')



import { createApp } from 'vue';
import './style.css'
import App from './App.vue';
import router from './router'; // your router file

const app = createApp(App);

app.use(router);
app.mount('#app');