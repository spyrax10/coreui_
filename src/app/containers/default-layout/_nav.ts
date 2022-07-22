import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Main Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
    // badge: {
    //   color: 'info',
    //   text: 'NEW'
    // }
  },
  {
    title: true,
    name: 'Transaction Menu'
  },
  {
    name: 'Sales',
    url: '/icons/coreui-icons',
    iconComponent: { name: 'cil-chart-line' }
  },
  {
    name: 'Purchases',
    url: '/icons/flags',
    iconComponent: { name: 'cil-basket' }
  },

  {
    name: 'Inventory',
    url: '/icons/brands',
    iconComponent: { name: 'cil-chart' }
  },

  //Reports Section
  {
    title: true,
    name: 'Reports'
  },
  {
    name: 'Sales',
    url: '/base',
    iconComponent: { name: 'cil-chart-line' },
    children : [
      {
        name: 'Daily Sales Report'
      },
      {
        name: 'Daily Sales Summary Report'
      },
      {
        name: 'Grab Foods'
      },
      {
        name: 'GCASH'
      },
      {
        name: 'CC Transactions'
      },
      {
        name: 'Guide For Difference'
      },
      {
        name: 'Sales Report'
      },
      {
        name: 'Sales Analysis'
      },
      {
        name: 'Sales vs Inventory Usage'
      },
      {
        name: 'Consolidated Sales Summary Report'
      }
    ]

  },

  {
    name: 'Purchases',
    iconComponent: { name: 'cil-basket' }
  },
  {
    name: 'Inventory',
    iconComponent: { name: 'cil-chart' }
  },

];
