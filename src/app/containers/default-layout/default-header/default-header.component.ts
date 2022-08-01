import { Component, Input, NgModule } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
// import { ModalModule } from '../../../../app/views/notifications/modals/modals.component';
import Swal from 'sweetalert2';

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

  constructor(private classToggler: ClassToggleService) {
    super();
  }

  sweetAlert() {
    Swal.fire({
      title: 'Logout Confirmation',
      text: 'Are you sure you want to logout?',
      icon: 'warning',
      allowEscapeKey: false,
      allowOutsideClick: false,
      showCancelButton: true,
      confirmButtonText: 'Yes, log me out!',
      cancelButtonText: 'No, I want to stay!'
    }).then((response: any) => {
      if (response.value) {
        this.logOut();
      } 
    })
  }

  logOut() {
    location.replace('/login');
  }
}
