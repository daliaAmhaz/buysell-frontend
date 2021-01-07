import React from 'react';
import {Switch} from 'react-router-dom';
import Route from './Route';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Categories from '../pages/dashboards/Categories';
import Clients from '../pages/dashboards/Clients';
import Products from '../pages/dashboards/Products';
import ManageAdmins from '../pages/dashboards/Admins';
import UnauthorizedPage from '../pages/UnauthorizedPage';
import NotFoundPage from '../pages/NotFoundPage';
import Profile from '../pages/Profile';
import Register from '../pages/Register';

const routesConfiguration = [
	{
		path: '/',
		exact: true,
		component: Home,
		isPrivate: true,
		isAdminRoute: false,
	},{
		path: '/profile',
		exact: true,
		component: Profile,
		isPrivate: true,
		isAdminRoute: false,
	},
	{
		path: '/login',
		exact: true,
		component: Login,
		isPrivate: false,
		isAdminRoute: false,
	},
	{
		path: '/register',
		exact: true,
		component: Register,
		isPrivate: false,
		isAdminRoute: false,
	},
	{
		path: '/dashboard-categories',
		exact: true,
		component: Categories,
		isPrivate: true,
		isAdminRoute: true,
	},
	{
		path: '/dashboard-clients',
		exact: true,
		component: Clients,
		isPrivate: true,
		isAdminRoute: true,
	},
	{
		path: '/dashboard-products',
		exact: true,
		component: Products,
		isPrivate: true,
		isAdminRoute: false,
	},
	{
		path: '/dashboard-admins',
		exact: true,
		component: ManageAdmins,
		isPrivate: true,
		isAdminRoute: true,
	},
	{
		path: '/unauthorized',
		exact: true,
		component: UnauthorizedPage,
		isPrivate: false,
		isAdminRoute: false,
	},
];
export default function Routes() {
	return (
		<Switch>
			{routesConfiguration.map((route, index) => (
				<Route
					path={route.path}
					exact={route.exact}
					component={route.component}
					isPrivate={route.isPrivate}
					isAdminRoute={route.isAdminRoute}
					key={index}
				/>
			))}
			<Route
				component={NotFoundPage}
				isPrivate={false}
				isAdminRoute={false}
			/>
		</Switch>
	);
}
