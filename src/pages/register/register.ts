import { LoginPage } from './../login/login';
import { AuthProvider } from './../../providers/auth/auth';
import { FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  registerForm;

  constructor(public navCtrl: NavController, public navParams: NavParams, private fb: FormBuilder, private auth: AuthProvider, private userApi: UserProvider) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ionViewCanEnter() {
    if (this.auth.isLoggedOut())
      return true;
    else
      this.navCtrl.setRoot(LoginPage);
  }

  register() {
    this.userApi.register(this.registerForm.value).subscribe(
      data => {
        console.log(data);
      },
      err => {
        console.error(err);
      }
    );
  }

}
