import { Component, Input} from '@angular/core';
import { SwalService } from '../../../_services/swal-service';
import { ClassToggleService, HeaderComponent } from '@coreui/angular';

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

  constructor(private classToggler: ClassToggleService, public swalService: SwalService) {
    super();
    this.user_data = JSON.parse(localStorage.getItem('userData'));
    this.get_userFullName();
  }
  
  get_userFullName() {
    var last_name = ''; var first_name = ''; var initial = '';
    Object.keys(this.user_data).forEach((data: any) => {
      if (data === 'lastName') {
        last_name = this.user_data[data];
      }
      else if (data === 'firstName') {
        first_name = this.user_data[data];
      }
      else if (data === 'middleInitial') {
        initial = this.user_data[data];
      }
    });

    this.user_fullName = last_name + ", " + first_name + " " + initial;
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
    localStorage.clear();
    location.replace('/login');
  }
}
