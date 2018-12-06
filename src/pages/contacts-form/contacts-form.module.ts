import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContactsFormPage } from './contacts-form';

@NgModule({
  declarations: [
    ContactsFormPage,
  ],
  imports: [
    IonicPageModule.forChild(ContactsFormPage),
  ],
})
export class ContactsFormPageModule {}
