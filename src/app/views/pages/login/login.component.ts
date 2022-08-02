import { Component } from '@angular/core';
import { ValidationFormsService } from '../../../_services/validation-forms.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [ValidationFormsService]
})
export class LoginComponent {

  simpleForm!: FormGroup;
  submitted = false;
  formErrors: any;
  constructor(private fb: FormBuilder, public vf: ValidationFormsService) {
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
            Validators.required,
            Validators.minLength(this.vf.formRules.passwordMin),
            Validators.pattern(this.vf.formRules.passwordPattern),
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
      location.replace('/dashboard');
    }
  }
}
