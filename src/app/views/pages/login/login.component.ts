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

  user_arr: any = [];
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

  checkUser() {
    this.user_arr = this.user.getUser(this.simpleForm.value.username, this.simpleForm.value.password);
  }

  onSubmit() {
    if (this.onValidate()) {
      this.checkUser();
      console.log(this.user_arr);
      
      
      //location.replace('/dashboard');
      // if (this.user.user_arr.length === 1) {
      //   this.swalService.commonSwalCentered('Correct Credentials', 'success');
      // }
      // else {
      //   this.swalService.commonSwalCentered('Incorrect Credentials', 'error'); 
      // }
    }
  }
}
