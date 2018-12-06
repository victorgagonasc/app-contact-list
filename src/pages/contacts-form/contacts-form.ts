import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { LoginPage } from '../login/login';
import { ContactProvider } from '../../providers/contact/contact';

@IonicPage()
@Component({
  selector: 'page-contacts-form',
  templateUrl: 'contacts-form.html',
})
export class ContactsFormPage {
  contactForm;
  contact;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private fb: FormBuilder,
    private auth: AuthProvider,
    private contactApi: ContactProvider,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: [''],
      mobilePhone: [''],
      homePhone: [''],
      obs: ['']
    });
  }

  ionViewWillEnter() {
    this.contact = this.navParams.get('contact');

    if (this.contact) {
      this.contactForm.controls['name'].setValue(this.contact.name);
      this.contactForm.controls['email'].setValue(this.contact.email);
      this.contactForm.controls['mobilePhone'].setValue(this.contact.mobilePhone);
      this.contactForm.controls['homePhone'].setValue(this.contact.homePhone);
      this.contactForm.controls['obs'].setValue(this.contact.obs);
    }
  }

  ionViewCanEnter() {
    if (this.auth.isLoggedIn())
      return true;
    else
      this.navCtrl.setRoot(LoginPage);
  }

  showToast(message, status) {
    const toast = this.toastCtrl.create({
      message: message,
      position: 'bottom',
      duration: 2000
    });

    if (status == 'success') {
      toast.onDidDismiss(() => {
        this.navCtrl.pop();
      });
    }

    toast.present();
  }

  sendContact() {
    let loading = this.loadingCtrl.create({
      content: `${this.contact ? 'Atualizando' : 'Cadastrando'} contato`
    });

    loading.present().then(() => {
      if (this.contact) {
        Object.keys(this.contactForm.value).forEach((key) => {
          this.contact[key] = this.contactForm.value[key];
        });
        this.contactApi.update(this.contact).subscribe(
          data => {
            this.showToast('Contato atualizado com sucesso', 'success');
            loading.dismiss();
          },
          err => {
            this.showToast(err.error.message, err.error.status);
          }
        );
      } else {
        this.contactApi.create(this.contactForm.value).subscribe(
          data => {
            this.showToast('Contato cadastrado com sucesso', 'success');
            loading.dismiss();
          },
          err => {
            this.showToast(err.error.message, err.error.status);
          }
        );
      }
    });
  }
}
