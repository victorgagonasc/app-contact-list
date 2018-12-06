import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-contact-details-modal',
  templateUrl: 'contact-details-modal.html',
})
export class ContactDetailsModalPage {
  contact;

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController) {
  }

  ionViewWillEnter() {
    this.contact = this.navParams.data;
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
