import { Component } from '@angular/core';
import { ValidationFormsService } from '../../../_services/validation-forms.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SwalService } from '../../../_services/swal-service';
import { Users } from '../../../_services/user.service';
import { ApiHttpService } from 'src/app/_services/api-http.service';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http'; 
import { AuthenticatedResponse, LoginModel } from '../../../_interfaces/login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [ValidationFormsService]
})
export class LoginComponent {

  simpleForm!: FormGroup;
  user_cre: any = [];
  invalidLogin: boolean = false;
  submitted = false;
  formErrors: any;
  constructor(private fb: FormBuilder, public vf: ValidationFormsService, public swal: SwalService, public user: Users, 
    public http: HttpClient, public http2: ApiHttpService) {
    this.formErrors = this.vf.errorMessages;
    this.createForm();
  }

  credentials: LoginModel = {
    username:'', password:''
  };
  
  createForm() {
    this.simpleForm = this.fb.group(
      {
        username: [
          '',
          [
            Validators.required,
            Validators.minLength(this.vf.formRules.usernameMin),
            Validators.pattern(this.vf.formRules.nonEmpty),
          ]
        ],
        password: ['', 
          [
            Validators.required
            // Validators.minLength(this.vf.formRules.passwordMin),
            // Validators.pattern(this.vf.formRules.passwordPattern),
          ]
        ]
      }
    );
  }

  get f() {
    return this.simpleForm.controls;
  }

  onValidate() {
    this.submitted = true;
    return this.simpleForm.status === 'VALID';
  }

  onSubmit() {
    if (this.onValidate()) {
    
      this.credentials.username = this.simpleForm.value.username;
      this.credentials.password = this.simpleForm.value.password

      this.http2.getData(this.user.user_api_link(this.simpleForm.value.username, this.simpleForm.value.password, true))
      .subscribe({
        next: (response: AuthenticatedResponse) => {
          const token = response.token;
          localStorage.setItem("jwt", token); 
          this.invalidLogin = false; 
          console.log(token);
        },
        error: (err: HttpErrorResponse) => this.invalidLogin = true
      });

      // this.http.getData(this.user.user_api_link(this.simpleForm.value.username, this.simpleForm.value.password)).subscribe(result => { 
      //   Object.keys(result).forEach(key => {
      //       if (result[key]['userName'] === this.simpleForm.value.username && result[key]['password'] === this.simpleForm.value.password) {
      //         localStorage.setItem("userData", JSON.stringify(result[key]));
      //         this.swal.commonSwalCentered('Sign In Sucessfully!!!', 'success');
      //         location.replace('/dashboard');
      //       }
      //   });
      // }, error => {
      //   this.swal.commonSwalCentered('Cannot Connect to Server!!!', 'error');
      // })

      // if (this.user.isLoggedIn() === false) {
      //   this.swal.commonSwalCentered('Incorrect Credentials!!!', 'error');  
      // }
      
    }
  }
}
