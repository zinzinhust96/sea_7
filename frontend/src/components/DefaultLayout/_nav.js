export default {
  items: [
    {
      name: 'HomePage',
      url: '/',
      icon: 'icon-speedometer',
      badge: {
        variant: 'info',
      },
    },
    {
      name: 'Accounts',
      icon: 'fa fa-money',
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

  ],
};
