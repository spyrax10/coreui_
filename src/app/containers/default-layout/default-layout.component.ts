import { Component } from '@angular/core';
import { navItems } from './_nav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
})
export class DefaultLayoutComponent {

  role_access?: any;
  public navItem = navItems;

  public perfectScrollbarConfig = {
    suppressScrollX: true,
  };

  constructor() {
  }
}
