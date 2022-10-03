import { Component, Input} from '@angular/core';
import { SwalService } from '../../../_services/swal-service';
import { HeaderComponent } from '@coreui/angular';
import { Users } from '../../../_services/user.service';
import { AuthService } from '@auth0/auth0-angular';
import { TokenModel } from '../../../_interfaces/token.model';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent {

  @Input() sidebarId: string = "sidebar";

  user_fullName = '';
  user_role: number = 0;

  constructor(public swalService: SwalService, public user: Users, private authService: AuthService,
    public new_token: TokenModel) {
    super();
    this.user_fullName = this.user.getUserFullName();
    this.user_role = this.user.getUserRole();
    
    console.log(this.new_token.get_accessToken());

    if (this.authService.isAuthenticated$) {
      console.log("Authorized");
    }
    else {
      console.log("Get Out");
    }
  }
  
  logOut() {
    this.swalService.centeredConfirm(
      true, '', 
      "Logout Confirmation",
      "Are you sure to Logout?",
      "warning", false, false, true,
      "Yes, I want to logout", "No, I want to stay!"
    );
  }
}
