import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InventoryComponent } from '../inventory/invty_dashboard/inventory.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Inventory'
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'invty_dashboard'
      },
      {
        path: 'invty_dashboard',
        component: InventoryComponent,
        data: {
          title: 'Inventory Dashboard'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryRoutingModule {
}
