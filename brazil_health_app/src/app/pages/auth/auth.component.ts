import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Login } from 'src/app/actions/auth.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {

  role: string;
  form: FormGroup;
  submitted: boolean;
  loading: boolean;
  error: any;
  
  constructor(
    private fb: FormBuilder,
    private service: AuthService,
    private store: Store) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group(
      {
        email: [null, Validators.required],
        password: [null, Validators.required]
      }
    )
  }

  get f() { return this.form.controls }

  onSubmit() {
    this.submitted = true;
    const controls = this.form.controls
    if (this.form.invalid) {
      return;
    }

    const values = this.prepare(controls);
    this.login(values);
  }

  prepare(controls) {
    return {
      email: controls['email'].value,
      password: controls['password'].value,
      role: this.role
    }
  }

  login(values) {
    this.loading = true;
    this.service.login(values)
      .subscribe((res : any) => {
        this.loading = false
        this.store.dispatch(new Login({ token: res.token }));
        location.href = '/';
      }, err => {
        this.loading = false
        this.error = err.error;
      }
    )
  }
  chooseRole(choosed: string) {
    this.role = choosed;    
  }
}
