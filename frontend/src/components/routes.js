import React from 'react';
import DefaultLayout from './DefaultLayout/index';

const HomePage = React.lazy(() => import('../containers/Homepage'));
// import HomePage from '../containers/Homepage';
const Users = React.lazy(() => import('./Users/Users'));
const User = React.lazy(() => import('./Users/User'));

const routes = [
  {
    path: '/', exact: true, name: 'Home', component: DefaultLayout,
  },
  { path: '/homepage', name: 'Homepage', component: HomePage },
  {
    path: '/users', exact: true, name: 'Users', component: Users,
  },
  {
    path: '/users/:id', exact: true, name: 'User Details', component: User,
  },
];

export default routes;
