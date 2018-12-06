import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, ViewController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';
import { RegisterPage } from '../register/register';
import { DashboardPage } from '../dashboard/dashboard';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loginForm;
  isLogging = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private fb: FormBuilder,
    private auth: AuthProvider,
    private viewCtrl: ViewController,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {
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

  showToast(message, status) {
    const toast = this.toastCtrl.create({
      message: message,
      position: 'bottom',
      duration: 3000
    });

    if (status == 'success') {
      toast.onDidDismiss(() => {
        this.isLogging = false;
        this.navCtrl.setRoot(DashboardPage);
      });
    }

    toast.present();
  }

  login() {
    this.isLogging = true;

    let loading = this.loadingCtrl.create({
      content: 'Realizando login'
    });

    loading.present().then(() => {
      this.auth.login(this.loginForm.value).subscribe(
        data => {
          this.showToast('Login realizado com sucesso. Você será redirecionado...', 'success');
          loading.dismiss();
        },
        err => {
          loading.dismiss()
          this.showToast(err.error.message, err.error.status);
          this.isLogging = false;
        }
      );
    });
  }

  goToRegister() {
    this.navCtrl.push(RegisterPage).then(() => {
      this.navCtrl.remove(this.viewCtrl.index, 1);
    });
  }
}
