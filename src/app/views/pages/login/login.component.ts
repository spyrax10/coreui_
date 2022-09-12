import { Component } from '@angular/core';
import { ValidationFormsService } from '../../../_services/validation-forms.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SwalService } from '../../../_services/swal-service';
import { Users } from '../../../_services/user.service';
import { ApiHttpService } from 'src/app/_services/api-http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [ValidationFormsService]
})
export class LoginComponent {

  user_found: boolean = false;
  user_arr: any = [];
  simpleForm!: FormGroup;
  submitted = false;
  formErrors: any;
  constructor(private fb: FormBuilder, public vf: ValidationFormsService, public swal: SwalService, public user: Users, 
    public http: ApiHttpService) {
    this.formErrors = this.vf.errorMessages;
    this.createForm();
  }
  

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
      this.http.getData(this.user.user_api_link(this.simpleForm.value.username, this.simpleForm.value.password)).subscribe(result => { 
        Object.keys(result).forEach(key => {
            if (result[key]['userName'] === this.simpleForm.value.username && result[key]['password'] === this.simpleForm.value.password) {
              this.user_found === true;
              this.swal.commonSwalCentered('Sign In Sucessfully!!!', 'success');
              localStorage.setItem("userID", result[key]['userID']);
              localStorage.setItem("userData", JSON.stringify(result[key]));
              location.replace('/dashboard');
            }
            else {
              this.user_found === false;
              this.swal.commonSwalCentered('Incorrect Credentials!!!', 'error'); 
            }
        });
      }, error => {
        this.swal.commonSwalCentered('Cannot Connect to Server!!!', 'error');
      })

      if (this.user_found === false) {
        this.swal.commonSwalCentered('Incorrect Credentials!!!', 'error'); 
      }

    }
  }
}
