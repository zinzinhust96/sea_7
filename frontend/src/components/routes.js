import React from 'react';

const HomePage = React.lazy(() => import('../containers/Homepage'));
const Accounts = React.lazy(() => import('../containers/ListAccount'));
const CreateAccount = React.lazy(() => import('../containers/CreateAccount'));
const CreateTransaction = React.lazy(() => import('../containers/CreateTransaction'));
const TransactionHistory = React.lazy(() => import('../containers/TransactionHistory'));


const routes = [
  {
    path: '/', exact: true, name: 'Homepage', component: HomePage,
  },
  {
    path: '/accounts', exact: true, name: 'List all accounts', component: Accounts,
  },

  {
    path: '/accounts/create', exact: true, name: 'Create new account', component: CreateAccount,
  },
  {
    path: '/transactions', exact: true, name: 'Transaction history', component: TransactionHistory,
  },
  {
    path: '/transactions/create', exact: true, name: 'Create transaction', component: CreateTransaction,
  },
];

export default routes;
