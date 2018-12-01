import React from 'react';

const HomePage = React.lazy(() => import('../containers/Homepage'));
const Accounts = React.lazy(() => import('../containers/ListAccount'));
const routes = [
  {
    path: '/', exact: true, name: 'Homepage', component: HomePage,
  },
  {
    path: '/accounts', exact: true, name: 'ListAccount', component: Accounts,
  },
];

export default routes;
