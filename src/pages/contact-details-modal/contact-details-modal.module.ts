import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContactDetailsModalPage } from './contact-details-modal';

@NgModule({
  declarations: [
    ContactDetailsModalPage,
  ],
  imports: [
    IonicPageModule.forChild(ContactDetailsModalPage),
  ],
})
export class ContactDetailsModalPageModule {}
