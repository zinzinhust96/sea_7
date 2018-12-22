export default {
  items: [
    {
      name: 'Accounts',
      icon: 'fa fa-credit-card',
      children: [
        {
          name: 'List all accounts',
          url: '/accounts/list',
        },
        {
          name: 'Create new account',
          url: '/accounts/create',
        },
      ],
    },
    {
      name: 'Transactions',
      icon: 'fa fa-exchange',
      children: [
        {
          name: 'Transactions history',
          url: '/transactions/history',
        },
        {
          name: 'Create transaction',
          url: '/transactions/create',
        },
      ],
    },
    {
      name: 'Saving account',
      icon: 'fa fa-save',
      children: [
        {
          name: 'List saving account',
          url: '/saving_accounts/list',
        },
        {
          name: 'Create saving account',
          url: '/saving_accounts/create',
        },
      ],
    },
  ],
};
