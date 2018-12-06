import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ContactsFormPage } from '../contacts-form/contacts-form';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';
import { ContactProvider } from '../../providers/contact/contact';
import { UserProvider } from '../../providers/user/user';

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private auth: AuthProvider,
    private userApi: UserProvider,
    private contactApi: ContactProvider
  ) {

  }

  ionViewWillEnter() {
    let userId = this.userApi.getUser().id;
    this.contactApi.getAll().subscribe(
      res => console.log(res),
      err => console.log(err)
    );
  }

  ionViewCanEnter() {
    if (this.auth.isLoggedIn())
      return true;
    else
      this.navCtrl.setRoot(HomePage);
  }

  goToContactsForm() {
    this.navCtrl.push(ContactsFormPage)
  }
}
