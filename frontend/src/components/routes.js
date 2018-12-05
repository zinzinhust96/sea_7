import React from 'react';

const HomePage = React.lazy(() => import('../containers/Homepage'));
const Accounts = React.lazy(() => import('../containers/ListAccount'));
const CreateAccount = React.lazy(() => import('../containers/CreateAccount'));
const TransactionsHistory = React.lazy(() => import('../containers/TransactionsHistory'));
const CreateTransaction = React.lazy(() => import('../containers/CreateTransaction'));


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
    path: '/transactions', exact: true, name: 'Transactions History', component: TransactionsHistory,
  },
  {
    path: '/transactions/create', exact: true, name: 'Create transaction', component: CreateTransaction,
  },
];

export default routes;
