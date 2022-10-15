import { Component, Input} from '@angular/core';
import { SwalService } from '../../../_services/swal-service';
import { HeaderComponent } from '@coreui/angular';
import { Users } from '../../../_services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as $ from 'jquery';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { ApiHttpService } from 'src/app/_services/api-http.service';
import Swal from 'sweetalert2';

interface IRole {role_id: number; role_name: string;}

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent {
  @Input() sidebarId: string = "sidebar";
  searchText: string;
  registerForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    userLevel: ['1', [Validators.required]],
    firstName: ['', [Validators.required]],
    middlename: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    username: ['', [Validators.required, Validators.minLength(6)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  user_fullName = '';
  user_role: number = 0;
  user_name: string = '';
  public selected_row: number = 1;
  public user_list: any;

  constructor(private user: Users, private fb: FormBuilder,  public http: ApiHttpService, public swal: SwalService) {
    super();
    this.user_fullName = this.user.getUserFullName();
    this.user_role = this.user.getUserRole();
    this.user_name = this.user.getUserName();
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

  public showModal(type: string = "") {

    if (type === 'reg') {
      $("#regModal").toggle("slow");
    }
    else if (type === 'user') {
      this.fetchUsers();
      $("#userModal").toggle("slow");
    }
  }
  public closeModal(type: string = "") {

    if (type === 'reg') {
      this.resetModal();
      $("#regModal").hide("slow");
    }
    else if (type === 'user') {
      $("#userModal").hide("slow");
    }
  }

  public resetModal() {
    this.registerForm.reset();
    $('#id_userLevel').val("1");
  }

  onRoleChange($event: any) : void {
    this.registerForm.reset();
    this.selected_row = $event.target.value;
    this.registerForm.patchValue({
      userLevel: this.selected_row
    });
  }

  onValidate() {
    return this.registerForm.status === 'VALID';
  }

  fetchUsers() {
    this.http.getData(this.user.api_get_alluser(), "").subscribe(data => {
      this.user_list = data;
    }, ((error: HttpErrorResponse) => {
      console.log("Error: " + error.message);
    }));
  }

  deleteUser(value: any) {
    let params = new HttpParams().set('userID', value);

    Swal.fire({
      title: "Delete Confirmation",
      text: "Are you sure to delete Selected User?",
      icon: "warning",
      allowEscapeKey: false,
      allowOutsideClick: false,
      showCancelButton: true,
      confirmButtonText: "Yes, Delete Selected User",
      cancelButtonText: "No, Return To the List"
    }).then((response) => {
      if (response.isConfirmed) {

        this.swal.swalLoading("Deleting User... Please Wait...");
        this.http.getData(this.user.api_delete_user(), params).subscribe(result => {
          this.swal.commonSwalCentered("User Sucessfully Deleted...", 'success');
          this.fetchUsers();
        }, ((error: HttpErrorResponse) => {
          this.swal.commonSwalCentered(error.message, 'error');
        }));
      }
      else if (response.dismiss === Swal.DismissReason.cancel) {
        return;
      }
    });
  }

  registerFormSubmit(): void {
    const formData = this.registerForm.value;
    
    if (this.onValidate()) {
      let params = new HttpParams()
        .set('email', this.registerForm.value.email)
        .set('secLevel', this.registerForm.value.userLevel)
        .set('first', this.registerForm.value.firstName)
        .set('middle', this.registerForm.value.middlename)
        .set('lastName', this.registerForm.value.lastName)
        .set('username', this.registerForm.value.username)
        .set('password', this.registerForm.value.password);

      let email_params = new HttpParams()
        .set('email', this.registerForm.value.email)
        .set('subject', "Welcome Greetings...")
        .set('body_title', "Registration Notice")
        .set('text', "Welcome to brotherhood, " + this.registerForm.value.username + "!")
        .set('username', this.user.getUserFullName())
      
      this.swal.swalLoading("Adding New User... Please Wait...");

      this.http.getData(this.user.api_new_user(), params).subscribe(result => {
      }, ((error: HttpErrorResponse) => {
        if (error.status === 200) {
          // this.http.getData(this.user.api_send_email(), email_params).subscribe(emailRes => {
          // }, (error2: HttpErrorResponse) => {
          //   if (error2.status != 200) {
          //     this.swal.commonSwalCentered("Email Notification has been Rejected...", 'error');  
          //   }
          // });
          this.swal.commonSwalCentered('New User Registered...', 'success'); 
          this.fetchUsers(); 
          this.resetModal();
        }
        else {
          this.swal.commonSwalCentered(error.error, 'error');  
        }
      }));
    }
  }

  logOut() {
    this.swal.centeredConfirm(
      'logout', '', 
      "Logout Confirmation",
      "Are you sure to Logout?",
      "warning", false, false, true,
      "Yes, I want to logout", "No, I want to stay!"
    );
  }
}
