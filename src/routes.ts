import { lazy } from 'solid-js';
import type { RouteDefinition } from 'solid-app-router';

import Home from './pages/home';

export const routes: RouteDefinition[] = [
	{
		path: '/',
		component: Home,
	},
	{
		path: '/login',
		component: lazy(() => import('./pages/login')),
	},
	{
		path: '/register',
		component: lazy(() => import('./pages/register')),
	},
	{
		path: '/upload',
		component: lazy(() => import('./pages/upload')),
	},
	{
		path: '/post/:id',
		component: lazy(() => import('./pages/post')),
	},
	{
		path: '**',
		component: lazy(() => import('./errors/404')),
	},
];
