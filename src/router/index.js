import {createRouter, createWebHashHistory} from 'vue-router';

import Dashboard from '../components/pages/Dashboard.vue';
import About from '../components/pages/About.vue';


const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {path: '/', component: Dashboard},
        {path: '/about', component: About},
    ]
})


export default router;