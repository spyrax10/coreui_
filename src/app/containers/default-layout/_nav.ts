import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [

  { name: 'Dashboard', url: '/dashboard', iconComponent: { name: 'cil-align-left' } },
  { title: true, name: 'Transaction Menu' },

  { name: 'Sales', url: '/sales', iconComponent: { name: 'cil-chart-line' },
    children : [
      { name: 'Sales Dashboard', url: 'sales/sales_dashboard' },
      { name: 'Daily Sales Per Branch', url: 'sales/sales_branch' }
    ],
    role: 'Sales'
  },
  { name: 'Purchases', url: '/purchases', iconComponent: { name: 'cil-basket' },
    children : [
      { name: 'Purchases Dashboard', url: 'purchases/purch_dashboard'}
    ],
    role: 'Purchases'
  },
  { name: 'Inventory', url: '/inventory', iconComponent: { name: 'cil-chart' },
    children : [
      { name: 'Inventory Dashboard', url: 'inventory/invty_dashboard'}
    ],
    role: 'Inventory'
    //attributes: { hidden: canUseModule("Inventory") }
  },

  //Reports Section
  // {
  //   title: true,
  //   name: 'Reports'
  // },
  // {
  //   name: 'Sales',
  //   url: '/sales/reports',
  //   iconComponent: { name: 'cil-chart-line' },
  //   children : [
  //     {
  //       name: 'Daily Sales Report'
  //     },
  //     {
  //       name: 'Daily Sales Summary Report'
  //     },
  //     {
  //       name: 'Grab Foods'
  //     },
  //     {
  //       name: 'GCASH'
  //     },
  //     {
  //       name: 'CC Transactions'
  //     },
  //     {
  //       name: 'Guide For Difference'
  //     },
  //     {
  //       name: 'Sales Report'
  //     },
  //     {
  //       name: 'Sales Analysis'
  //     },
  //     {
  //       name: 'Sales vs Inventory Usage'
  //     },
  //     {
  //       name: 'Consolidated Sales Summary Report'
  //     }
  //   ]

  // },

  // {
  //   name: 'Purchases',
  //   url: '/purchases',
  //   iconComponent: { name: 'cil-basket' },
  //   children : [
  //     {
  //       name: 'WOF (Weekly Order Form)'
  //     },
  //     {
  //       name: 'Consolidated  Delivery Summary Report'
  //     },
  //     {
  //       name: 'Consolidated Purchase Summary Report'
  //     },
  //     {
  //       name: 'Invoice Document'
  //     },
  //     {
  //       name: 'Consolidated Finish Goods Summary Report'
  //     },
  //   ]
  // },
  // {
  //   name: 'Inventory',
  //   url: '/inventory',
  //   iconComponent: { name: 'cil-chart' },
  //   children : [
  //     {
  //       name: 'Daily Inventory Movement Per Branch'
  //     },
  //     {
  //       name: 'Inventory Count Per Day'
  //     },
  //     {
  //       name: 'Consolidated Purchase Summary Report'
  //     },
  //     {
  //       name: 'Inventory Variance Report Per Branch'
  //     },
  //     {
  //       name: 'Consolidated Inventory Summary Report'
  //     },
  //   ]
  // }

];
