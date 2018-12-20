import React from 'react';

const HomePage = React.lazy(() => import('../containers/Homepage'));
const Accounts = React.lazy(() => import('../containers/ListAccount'));
const CreateAccount = React.lazy(() => import('../containers/CreateAccount'));
const CreateTransaction = React.lazy(() => import('../containers/CreateTransaction'));
const TransactionHistory = React.lazy(() => import('../containers/TransactionHistory'));
const CreateSavingAccount = React.lazy(() => import('../containers/CreateSavingAccount'));
const SavingAccount = React.lazy(() => import('../containers/ListSavingAccount'));


const routes = [
  {
    path: '/', exact: true, name: 'Homepage', component: HomePage,
  },
  {
    path: '/accounts/list', exact: true, name: 'List all accounts', component: Accounts,
  },
  {
    path: '/accounts/create', exact: true, name: 'Create new account', component: CreateAccount,
  },
  {
    path: '/transactions/history', exact: true, name: 'Transaction history', component: TransactionHistory,
  },
  {
    path: '/transactions/create', exact: true, name: 'Create transaction', component: CreateTransaction,
  },
  {
    path: '/saving_account/create', exact: true, name: 'Saving account', component: CreateSavingAccount,
  },
  {
    path: '/saving_account/list', exact: true, name: 'Saving account', component: SavingAccount,
  },
];

export default routes;
