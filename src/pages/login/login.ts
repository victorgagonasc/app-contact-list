import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loginForm;

  constructor(public navCtrl: NavController, public navParams: NavParams, private fb: FormBuilder, private auth: AuthProvider) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ionViewCanEnter() {
    if (this.auth.isLoggedOut())
      return true;
    else 
      this.navCtrl.setRoot(HomePage);
  }

  login() {
    this.auth.login(this.loginForm.value).subscribe(
      data => {
        console.log(data);
      },
      err => {
        console.error(err);
      }
    );
  }

}
