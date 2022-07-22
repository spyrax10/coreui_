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
    url: '/theme/colors',
    iconComponent: { name: 'cil-drop' }
  },
  {
    name: 'Purchases',
    url: '/theme/typography',
    linkProps: { fragment: 'someAnchor' },
    iconComponent: { name: 'cil-pencil' }
  },
  {
    name: 'Inventory',
    url: '/theme/typography',
    linkProps: { fragment: 'someAnchor' },
    iconComponent: { name: 'cil-pencil' }
  },
  {
    title: true,
    name: 'Reports'
  },

  {
    name: 'Sales',
    url: '/base',
    iconComponent: { name: 'cil-puzzle' },
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
    iconComponent: { name: 'cil-puzzle' }
  },
  {
    name: 'Inventory',
    iconComponent: { name: 'cil-cursor' }
  }


];
