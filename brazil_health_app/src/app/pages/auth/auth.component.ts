import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Login } from 'src/app/actions/auth.actions';
import { Store } from '@ngrx/store';
import { NavController } from '@ionic/angular';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';

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
    private store: Store,
    private navCtrl: NavController,
    private nativePageTransitions: NativePageTransitions) { }

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

  register() {
    let options: NativeTransitionOptions = {
      direction : 'left',
      duration : 400,
      slowdownfactor : -1,
      androiddelay: 50
    };

    this.nativePageTransitions.slide(options);
    this.navCtrl.navigateForward(`/register/${this.role}`);
  }

  login(values) {
    this.loading = true;
    this.service.login(values)
      .subscribe((res : any) => {
        this.loading = false
        this.store.dispatch(new Login({ token: res.token }));
        let options : NativeTransitionOptions = {
          direction: 'up',
          duration: 600
        };
        this.nativePageTransitions.flip(options);        
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
