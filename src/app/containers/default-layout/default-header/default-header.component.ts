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
interface ILevel {level_id: number; level_name: string;}

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent {
  @Input() sidebarId: string = "sidebar";
  searchText: string;
  searchApprover: string;
  user_fullName = '';
  user_role: number = 0;
  user_name: string = '';
  selected_row: number = 1;
  user_list: any;
  approver_list: any[];
  page: number = 1;
  selected_user: number = 0;
  selected_approver: number = 0;
  approver_level: number = 0;
  registerForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    userLevel: ['1', [Validators.required]],
    firstName: ['', [Validators.required]],
    middlename: ['', [Validators.required, Validators.minLength(1)]],
    lastName: ['', [Validators.required]],
    username: ['', [Validators.required, Validators.minLength(6)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

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

  public level_type: ILevel[] = [
    {
      level_id: 0, level_name :"Select Level:"
    },
    {
      level_id: 1, level_name :"Level 1"
    },
    {
      level_id: 2, level_name :"Level 2"
    },
    {
      level_id: 3, level_name :"Level 3"
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

  public showModal(type: string = "", userID: any = "") {

    if (type === 'reg') {
      if (userID !== "") {
        this.selected_user = userID;
        this.fetchUsers(userID);
      }

      $("#regModal").toggle("slow");
    }
    else if (type === 'user') {
      this.fetchUsers();
      $("#userModal").toggle("slow");
    }
    else if (type === 'approver') {
      this.fetchApprovers();
      $("#approverModal").toggle("slow");
    }
  }
  public closeModal(type: string = "") {

    if (type === 'reg') {
      $("#regModal").hide("slow");
    }
    else if (type === 'user') {
      $("#userModal").hide("slow");
    }
    else if (type === 'approver') {
      $("#approverModal").hide("slow");
    }
    this.resetModal(type);
  }

  public resetModal(type: string = "") {

    if (type === 'reg') {
      this.registerForm.reset();
      $('#id_userLevel').val("1");
      this.selected_user = 0;
    }
    else if (type === 'user') {
      this.searchText = "";
    }
    else if (type === 'approver') {
      $('#id_approverName').val("0");
      $('#id_approverLevel').val("0");
      this.selected_approver = 0;
      this.approver_level = 0;
    }
  }
  onRoleChange($event: any) : void {
    if (this.selected_user === 0) {
      this.registerForm.reset();
    }
    this.selected_row = $event.target.value;
    this.registerForm.patchValue({
      userLevel: this.selected_row
    });
  }

  onUserChange($event: any) : void {
    this.selected_approver = $event.target.value;
  }

  onLevelChange($event: any) : void {
    this.approver_level = $event.target.value;
  }

  onValidate() {
    return this.registerForm.status === 'VALID';
  }

  canAddApprover() {
    return this.selected_approver > 0 && this.approver_level > 0 ? false : true;
  }

  fetchUsers(userID: any = "") {
    let params = userID !== "" ? new HttpParams().set('userID', userID) : "";
    this.http.getData(this.user.api_get_alluser(), params).subscribe(data => {
      if (userID !== "") {
        data.map((key: any) => {
          this.registerForm.setValue({
            email: key[2],
            userLevel: key[5],
            firstName: key[6],
            middlename: key[7],
            lastName: key[8],
            username: key[3],
            password: key[9]             
          });
          $('#id_userLevel').val(key[5]);
        });
      }
      else {
        this.user_list = data;
      }
    }, ((error: HttpErrorResponse) => {
      this.swal.commonSwalCentered("Internal Server Error!", 'error');
    }));
  }

  fetchApprovers() {
    this.http.getData(this.user.api_get_approver(), "").subscribe(data => {
      this.approver_list = data;
    }, ((error: HttpErrorResponse) => {
      this.swal.commonSwalCentered("Internal Server Error!", 'error');
    }));
  }

  newApprover() {
    let params = new HttpParams()
    .set('user_id', this.selected_approver)
    .set('level', this.approver_level);

    this.swal.swalLoading("Adding New Approver... Please Wait...");
    this.http.getData(this.user.api_new_approver(), params).subscribe(result => {
      this.swal.closeSwal();
      this.fetchApprovers();
      this.resetModal('approver');
      this.swal.commonSwalCentered("New Approver Addedd...", 'success');
    }, ((error: HttpErrorResponse) => {
      this.swal.commonSwalCentered(error.error, 'error');
    }));
  }

  deleteUser(value: any, type: any = "user") {
    let params = new HttpParams().set('userID', value);
    let delete_link = type === "user" ? this.user.api_delete_user() : this.user.api_delete_approver();

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

        this.swal.swalLoading(type === "user" ? 
          "Deleting User... Please Wait..." : 
          "Deleting Approver... Please Wait..."
        );

        this.http.deleteData(delete_link, params).subscribe(result => {
          this.swal.commonSwalCentered(type === "user" ? 
            "User Sucessfully Deleted..." : 
            "Approver Sucessfully Deleted...", 'success'
          );

          if (type === "user") {
            this.fetchUsers();
          }
          else {
            this.fetchApprovers();
          }   
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
        .set('password', this.registerForm.value.password)
        .set('userID', this.selected_user);

      let email_params = new HttpParams()
        .set('email', this.registerForm.value.email)
        .set('subject', "Welcome Greetings...")
        .set('body_title', "Registration Notice")
        .set('text', "Welcome to brotherhood, " + this.registerForm.value.username + "!")
        .set('username', this.user.getUserFullName())
      
      this.swal.swalLoading(
        this.selected_user > 0 ? "Updating User... Please Wait..." : 
          "Adding New User... Please Wait..."
      );

      this.http.getData(this.user.api_new_user(), params).subscribe(result => {
        this.swal.commonSwalCentered(
          this.selected_user > 0 ? 'User Updated' : 'New User Registered...', 
          'success'
        ); 
        this.fetchUsers(); 
        this.closeModal('reg');
      }, ((error: HttpErrorResponse) => {
        this.swal.commonSwalCentered(error.error, 'error');  
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
