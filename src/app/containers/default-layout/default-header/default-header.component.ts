import { Component, Input} from '@angular/core';
import { SwalService } from '../../../_services/swal-service';
import { ClassToggleService, HeaderComponent } from '@coreui/angular';
import { Users } from '../../../_services/user.service';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent {

  @Input() sidebarId: string = "sidebar";

  public newMessages = new Array(4)
  public newTasks = new Array(5)
  public newNotifications = new Array(5)
  public user_data: any = [];
  user_fullName = '';
  user_role: number = 0;

  constructor(private classToggler: ClassToggleService, public swalService: SwalService, public user: Users) {
    super();
    this.user_fullName = this.user.getUserFullName();
    this.user_role = this.user.getUserRole();
  }
  
  logOut() {
    this.swalService.centeredConfirm(
      this.routeOut, 
      "Logout Confirmation",
      "Are you sure to Logout?",
      "warning", false, false, true,
      "Yes, I want to logout", "No, I want to stay!"
    );
  }

  routeOut() {
    localStorage.removeItem('userData');
    localStorage.removeItem("jwt");
    location.replace('/login');
  }
}
