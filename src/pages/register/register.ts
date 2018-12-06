import { LoginPage } from './../login/login';
import { AuthProvider } from './../../providers/auth/auth';
import { FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController, LoadingController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  registerForm;
  isRecording = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private fb: FormBuilder,
    private auth: AuthProvider,
    private userApi: UserProvider,
    private viewCtrl: ViewController,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {
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

  showToast(message, status) {
    const toast = this.toastCtrl.create({
      message: message,
      position: 'bottom',
      duration: 3000
    });

    if (status == 'success') {
      toast.onDidDismiss(() => {
        this.isRecording = false;
        this.goToLogin();
      });
    }

    toast.present();
  }

  register() {
    this.isRecording = true;

    let loading = this.loadingCtrl.create({
      content: 'Realizando login'
    });

    loading.present().then(() => {
      this.userApi.register(this.registerForm.value).subscribe(
        data => {
          this.showToast('Cadastro efetuado com sucesso. Você será direcionado para a tela de login', 'success');
          loading.dismiss();
        },
        err => {
          loading.dismiss()
          this.showToast(err.error.message, err.error.status);
          this.isRecording = false;
        }
      );
    });
  }

  goToLogin() {
    this.navCtrl.push(LoginPage).then(() => {
      this.navCtrl.remove(this.viewCtrl.index, 1);
    });
  }
}
