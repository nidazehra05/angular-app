import { Routes } from '@angular/router';
import { Login } from '../components/login/login';
import { Dashboard } from '../components/dashboard/dashboard';
import { MyTasks } from '../components/my-tasks/my-tasks';

export const routes: Routes = [
	{ path: '', component: Login },
	{
		path: 'dashboard',
		component: Dashboard,
		children: [
			{ path: 'tasks', component: MyTasks },
			// default child route can be added here if needed
		],
	},
];
