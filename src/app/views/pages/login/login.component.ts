import { Component } from '@angular/core';
import { ValidationFormsService } from '../../../_services/validation-forms.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SwalService } from '../../../_services/swal-service';
import { Users } from '../../../_services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [ValidationFormsService]
})
export class LoginComponent {

  real_user = 'spyrax10';
  real_pass = '$Abcde123$';
  simpleForm!: FormGroup;
  submitted = false;
  formErrors: any;
  constructor(private fb: FormBuilder, public vf: ValidationFormsService, public swalService: SwalService, public user: Users) {
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

  checkLogin() {
    if (this.real_user == this.simpleForm.value.username && this.real_pass == this.simpleForm.value.password) {
      return true;
    }
    return false;
  }

  onSubmit() {
    if (this.onValidate() && this.user.checkUser(this.simpleForm.value.username, this.simpleForm.value.password)) {
      //location.replace('/dashboard');
      this.swalService.commonSwalCentered('Correct Credentials', 'success');
    }
    else {
      this.swalService.commonSwalCentered('Incorrect Credentials', 'error');
    }
  }
}
