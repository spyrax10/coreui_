import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PurchasesComponent } from './purchases.component';

const routes: Routes = [
  {
    path: '',
    component: PurchasesComponent,
    data: {
      title: $localize`Purchases Dashboard`
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchasesRoutingModule {
}
