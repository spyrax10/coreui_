import { Component } from '@angular/core';
import { Users } from 'src/app/_services/user.service';

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


  public canUseModule(mod_name: any): any {
    return this.user.canAccessModule(mod_name);
  }
  
  constructor(private user: Users) {
    this.role_access = this.user.getRoleAccess();
    // this.navItem.forEach((value, index) => {
    //   if (!this.user.canAccessModule(value.role)) {
    //     this.navItem.splice(index, 1 + 1);
    //     console.log(value.role + " || " + index + " || " + this.user.canAccessModule(value.role));
    //   }
    // });
  }
}
