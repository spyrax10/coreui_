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
import { AuthService } from '@auth0/auth0-angular';
import { async, first, iif } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [ValidationFormsService]
})
export class LoginComponent {

  simpleForm!: FormGroup;
  user_cre: any = [];
  invalidLogin: boolean = true;
  submitted = false;
  formErrors: any;
  user2: any;
  constructor(private fb: FormBuilder, public vf: ValidationFormsService, public swal: SwalService, public user: Users, 
    public http: ApiHttpService, private authService: AuthService) {
    this.siteKey = environment.siteKey;
    this.formErrors = this.vf.errorMessages;
    this.createForm();
    this.user2 = {};
  }

  reCAPTCHAToken: string = "";
  siteKey: string = "";
  accessToken: any;
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

  onSubmit() {
    const usePopup = true;
    const ignoreCache = true;

    if (this.onValidate()) {
      var username = this.simpleForm.value.username;
      var password = this.simpleForm.value.password;

      // if (this.reCAPTCHAToken !== '') {
        iif(() => usePopup, this.authService.getAccessTokenWithPopup(),
          this.authService.getAccessTokenSilently({ ignoreCache })).pipe(first()).subscribe((token) => {
          if (token && this.authService.isAuthenticated$) {
            this.http.getData(this.user.user_api_link(username, password, false), token).subscribe(result => {
              Object.keys(result).forEach(key => {
                this.invalidLogin = false; 
                localStorage.setItem("userData", JSON.stringify(result[key]));
                this.swal.commonSwalCentered('Sign In Sucessfully!!!', 'success');
                location.replace('/dashboard');
              });
            }, error => {
              this.invalidLogin = true; 
              this.swal.commonSwalCentered('Cannot validated YOU this time!', 'error');  
              this.reCAPTCHAToken = '';
              grecaptcha.reset();
            });
          }
          else {
            this.invalidLogin = true; 
            this.swal.commonSwalCentered('You Are Not Authorized!', 'error');  
            this.reCAPTCHAToken = '';
            grecaptcha.reset();
          }
        });
      //}
      // else {
      //   this.swal.commonSwalCentered('Please Resolved Recaptcha!!!', 'warning');
      // }
    }
  }
}
