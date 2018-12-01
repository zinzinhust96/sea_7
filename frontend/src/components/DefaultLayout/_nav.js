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
      url: '/accounts',
      icon: 'fa fa-money',
      children: [
        {
          name: 'Create account',
          url: '/accounts/create',
          icon: 'fa fa-plus-square',
        },
      ],
    },

  ],
};
