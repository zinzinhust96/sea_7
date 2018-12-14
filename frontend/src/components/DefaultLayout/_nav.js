export default {
  items: [
    {
      name: 'HomePage',
      url: '/',
      icon: 'fa fa-home',
      badge: {
        variant: 'info',
      },
    },
    {
      name: 'Accounts',
      icon: 'fa fa-credit-card',
      children: [
        {
          name: 'List all accounts',
          url: '/accounts',
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
          name: 'Create transaction',
          url: '/transactions/create',
        },
      ],
    },
  ],
};
