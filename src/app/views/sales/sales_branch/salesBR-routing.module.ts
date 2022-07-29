import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SalesBRComponent } from './salesBR.component';

const routes: Routes = [
  {
    path: '',
    component: SalesBRComponent,
    data: {
      title: $localize`Daily Sales Per Branch`
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesBRRoutingModule {
}
