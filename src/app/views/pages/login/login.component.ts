import { Component } from '@angular/core';
import { ValidationFormsService } from '../../../_services/validation-forms.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SwalService } from '../../../_services/swal-service';
import { Users } from '../../../_services/user.service';
import { ApiHttpService } from 'src/app/_services/api-http.service';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { AuthenticatedResponse, LoginModel } from '../../../_interfaces/login.model';
import { RecaptchaErrorParameters} from 'ng-recaptcha';
import { environment } from 'src/environments/environment';

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
    public http: ApiHttpService) {
    this.siteKey = environment.siteKey;
    this.formErrors = this.vf.errorMessages;
    this.createForm();
  }

  reCAPTCHAToken: string = "";
  siteKey: string = "";
  tokenVisible: boolean = false;
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

  public resolved(captchaResponse: string) {
    this.reCAPTCHAToken = captchaResponse;
  }

  public onError(errorDetails: RecaptchaErrorParameters): void {
    console.log(`reCAPTCHA error encountered; details:`, errorDetails);
  }

  generateUserData(username: any = '', password: any = '', user_token: any = '') {
    this.http.getData(this.user.user_api_link(username, password, false)).subscribe(result => { 
      Object.keys(result).forEach(key => {
        if (result[key]['lastRowHash'] == user_token && result[key]['refreshTokenActive'] === 1) {
          localStorage.setItem("userData", JSON.stringify(result[key]));
          this.invalidLogin = false; 
          this.swal.commonSwalCentered('Sign In Sucessfully!!!', 'success');
          location.replace('/dashboard');
        }
        else {
          this.invalidLogin = true; 
        }
      });
    })
  }

  onSubmit() {
    if (this.onValidate()) {

      //if (this.reCAPTCHAToken !== '') {
        var username = this.simpleForm.value.username;
        var password = this.simpleForm.value.password;
  
        this.http.getData(this.user.user_api_link(username, password, true))
        .subscribe({
          next: (response: AuthenticatedResponse) => {
            this.invalidLogin = false; 
            const token = response.token;
            localStorage.setItem("jwt", token); 
            if (token) {
              this.invalidLogin = false; 
              this.generateUserData(username, password, token);
            }
            else {
              this.swal.commonSwalCentered('Bad Request Has Been Made!!!', 'warning');
            }
          },
          error: (err: HttpErrorResponse) => {
            this.invalidLogin = true
            if (err.status == 401) {
              this.swal.commonSwalCentered('Incorrect Credentials!!!', 'error');  
              this.reCAPTCHAToken = '';
              grecaptcha.reset();
            }
            else {
              this.swal.commonSwalCentered('Cannot Connect to Server!!!', 'warning');
              this.reCAPTCHAToken = '';
              grecaptcha.reset();
            }
          }   
        });
  
        if (this.invalidLogin) {
          this.swal.commonSwalCentered('Cannot Validated your Login Credentials!!!', 'warning');
          this.reCAPTCHAToken = '';
          grecaptcha.reset();
        }
      // } 
      // else {
      //   this.swal.commonSwalCentered('Please Resolved Recaptcha!!!', 'warning');
      // }
    }
  }
}
