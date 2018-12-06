import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private fb: FormBuilder,
    private auth: AuthProvider,
    private contactApi: ContactProvider,
  ) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: [''],
      mobilePhone: [''],
      homePhone: [''],
      obs: ['']
    });
  }

  ionViewCanEnter() {
    if (this.auth.isLoggedIn())
      return true;
    else
      this.navCtrl.setRoot(LoginPage);
  }

  sendContact() {
    this.contactApi.create(this.contactForm.value).subscribe(
      data => {
        console.log(data);
      },
      err => {
        console.error(err);
      }
    );
  }
}
