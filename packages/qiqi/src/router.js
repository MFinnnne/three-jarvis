import {createRouter, createWebHistory, createWebHashHistory} from 'vue-router';
import HomeView from './view/HomeView.vue';
import BathView from './view/BathView.vue';

const routerHistory = createWebHistory();
const router = createRouter({
	history: routerHistory,
	routes: [
		{
			path: '/',
			name: 'home',
			component: HomeView,
		},
		{
			path: '/bath',
			name: 'bath',
			component: BathView,
		},
	],
});

export default router;
