import React from 'react';
import DefaultLayout from './DefaultLayout/index';

const HomePage = React.lazy(() => import('../containers/Homepage'));
const Accounts = React.lazy(() => import('../containers/ListAccount'));
const routes = [
  {
    path: '/', exact: true, name: 'Home', component: DefaultLayout,
  },
  { path: '/homepage', name: 'Homepage', component: HomePage },
  {
    path: '/accounts', exact: true, name: 'ListAccount', component: Accounts,
  },
];

export default routes;
