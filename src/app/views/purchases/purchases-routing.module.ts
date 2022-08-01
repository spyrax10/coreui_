import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PurchComponent } from './purch_dashboard/purch.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Purchases'
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'purch_dashboard'
      },
      {
        path: 'purch_dashboard',
        component: PurchComponent,
        data: {
          title: 'Purchases Dashboard'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchRoutingModule {
}
