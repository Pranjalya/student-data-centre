export const navigationRoutes = {
  root: {
    name: '/',
    displayName: 'navigationRoutes.home',
  },
  routes: [
    {
      name: 'dashboard',
      displayName: 'menu.dashboard',
      meta: {
        iconClass: 'vuestic-iconset-dashboard',
      },
    },
    {
      name: 'addstudent',
      displayName: 'menu.addstudent',
      meta: {
        iconClass: 'vuestic-iconset-forms',
      },
    },
    {
      name: 'updatestudent',
      displayName: 'menu.updatestudent',
      meta: {
        iconClass: 'vuestic-iconset-settings',
      },
    },
  ],
}
