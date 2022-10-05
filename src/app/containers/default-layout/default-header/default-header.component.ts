import { Component, Input} from '@angular/core';
import { SwalService } from '../../../_services/swal-service';
import { HeaderComponent } from '@coreui/angular';
import { Users } from '../../../_services/user.service';
import { AuthService } from '@auth0/auth0-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as $ from 'jquery';


@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent {

  registerForm: FormGroup = this.fb.group({
    firstName: ['', [Validators.required]],
    middlename: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    //username: ['', [Validators.required, Validators.minLength(6)]],
    userLevel: ['']
  });

  @Input() sidebarId: string = "sidebar";

  user_fullName = '';
  user_role: number = 0;

  constructor(public swalService: SwalService, public user: Users, private authService: AuthService, 
    private fb: FormBuilder) {
    super();
    this.user_fullName = this.user.getUserFullName();
    this.user_role = this.user.getUserRole();
    
    if (this.authService.isAuthenticated$) {
      console.log("Authorized");
    }
    else {
      console.log("Get Out");
    }
  }

  get firstName(): any {
    return this.registerForm.get('firstName');
  }

  get middlename(): any {
    return this.registerForm.get('middlename');
  }
  get lastName(): any {
    return this.registerForm.get('lastName');
  }
  get email(): any {
    return this.registerForm.get('email');
  }
  // get username(): any {
  //   return this.registerForm.get('username');
  // }

  get userLevel(): any {
    return this.registerForm.get('userLevel');
  }

  public showModal() {
    $("#loginModal").toggle("slow");
  }
  public closeModal() {
    this.registerForm.reset();
    $("#loginModal").hide("slow");
  }

  onRoleChange($event: any = '') {
    console.log(this.registerForm.value.email);
    this.registerForm.value.userLevel = $event.value;
  }

  registerFormSubmit(): void {
    const formData = this.registerForm.value;
    console.log(formData);
    // Api Request Here
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
