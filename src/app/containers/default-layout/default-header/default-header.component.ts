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

  constructor(private classToggler: ClassToggleService, public swalService: SwalService) {
    super();
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
    location.replace('/login');
  }
}
