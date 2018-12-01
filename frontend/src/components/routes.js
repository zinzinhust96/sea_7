import React from 'react';

const HomePage = React.lazy(() => import('../containers/Homepage'));
const Accounts = React.lazy(() => import('../containers/ListAccount'));
const createAccount = React.lazy(() => import('../containers/CreateAccount'));
const routes = [
  {
    path: '/', exact: true, name: 'Homepage', component: HomePage,
  },
  {
    path: '/accounts', exact: true, name: 'ListAccount', component: Accounts,
  },

  {
    path: '/accounts/create', exact: true, name: 'Create account', component: createAccount,
  },
];

export default routes;
