import { Component, Input} from '@angular/core';
import { SwalService } from '../../../_services/swal-service';
import { HeaderComponent } from '@coreui/angular';
import { Users } from '../../../_services/user.service';
import { AuthService } from '@auth0/auth0-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as $ from 'jquery';

interface IRole {role_id: number; role_name: string;}

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
    username: ['', [Validators.required, Validators.minLength(6)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    userLevel: ['1', [Validators.required]]
  });

  @Input() sidebarId: string = "sidebar";

  user_fullName = '';
  user_role: number = 0;
  public selected_row: number = 1;

  constructor(public swalService: SwalService, public user: Users, private authService: AuthService, 
    private fb: FormBuilder) {
    super();
    this.user_fullName = this.user.getUserFullName();
    this.user_role = this.user.getUserRole();
    
    console.log(this.user.getCurrentUser());
  }

  public role_type: IRole[] = [
    {
      role_id: 1, role_name :"Administrator"
    },
    {
      role_id: 2, role_name :"User"
    },
    {
      role_id: 3, role_name :"Sales"
    }
  ]

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
  get username(): any {
    return this.registerForm.get('username');
  }

  get password(): any {
    return this.registerForm.get('password');
  }

  get userLevel(): any {
    return this.selected_row ;
  }

  public showModal() {
    $("#loginModal").toggle("slow");
  }
  public closeModal() {
    this.registerForm.reset();
    $('#id_userLevel').val("1");
    $("#loginModal").hide("slow");
  }

  onRoleChange($event: any) : void {
    this.registerForm.reset();
    this.selected_row = $event.target.value;
    this.registerForm.patchValue({
      userLevel: this.selected_row
    });
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
