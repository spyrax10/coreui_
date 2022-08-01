import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SalesComponent } from './sales_dashboard/sales.component';
import { SalesBRComponent } from './sales_branch/salesBR.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Sales'
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'sales_dashboard'
      },
      {
        path: 'sales_dashboard',
        component: SalesComponent,
        data: {
          title: 'Sales Dashboard'
        }
      },
      {
        path: 'sales_branch',
        component: SalesBRComponent,
        data: {
          title: 'Daily Sales Per Branch'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesRoutingModule {
}
