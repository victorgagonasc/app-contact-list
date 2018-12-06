import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, ActionSheetController, AlertController, ModalController } from 'ionic-angular';
import { ContactsFormPage } from '../contacts-form/contacts-form';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';
import { ContactProvider } from '../../providers/contact/contact';
import { ContactDetailsModalPage } from '../contact-details-modal/contact-details-modal';

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {
  contacts;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private auth: AuthProvider,
    private contactApi: ContactProvider,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private actionSheetCtrl: ActionSheetController,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController
  ) {

  }

  presentActionSheet(contact) {
    const actionSheet = this.actionSheetCtrl.create({
      title: `Contato selecionado: ${contact.name}`,
      buttons: [
        {
          text: 'Visualizar',
          handler: () => this.showContactDetailsModal(contact)
        },
        {
          text: 'Editar',
          handler: () => this.goToContactsForm(contact)
        },
        {
          text: 'Deletar',
          role: 'destructive',
          handler: () => this.showDeleteConfirmAlert(contact)
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => { }
        }
      ]
    });

    actionSheet.present();
  }

  showContactDetailsModal(contact) {
    const modal = this.modalCtrl.create(ContactDetailsModalPage, contact);
    modal.present();
  }

  showDeleteConfirmAlert(contact) {
    const confirm = this.alertCtrl.create({
      title: 'Remover contato',
      message: `Tem certeza de que deseja remover o contato ${contact.name}?`,
      buttons: [
        {
          text: 'Cancelar',
          handler: () => { }
        },
        {
          text: 'Confirmar',
          handler: () => this.deleteContact(contact)
        }
      ]
    });
    confirm.present();
  }

  showToast(message, status) {
    const toast = this.toastCtrl.create({
      message: message,
      position: 'bottom',
      duration: 3000
    });

    toast.present();
  }

  loadContacts() {
    let loading = this.loadingCtrl.create({
      content: 'Carregando contatos'
    });

    loading.present().then(() => {
      this.contactApi.getAll().subscribe(
        res => {
          this.contacts = res.data.contacts;
          loading.dismiss();
        },
        err => {
          loading.dismiss()
          this.showToast(err.error.message, err.error.status);
        }
      );
    });
  }

  deleteContact(contact) {
    let loading = this.loadingCtrl.create({
      content: 'Removendo contato'
    });

    loading.present().then(() => {
      this.contactApi.delete(contact._id).subscribe(
        res => {
          loading.dismiss();
          this.loadContacts();
          this.showToast('Contato removido com sucesso', 'success');
        },
        err => {
          loading.dismiss()
          this.showToast(err.error.message, err.error.status);
        }
      );
    });
  }

  ionViewWillEnter() {
    this.loadContacts();
  }

  ionViewCanEnter() {
    if (this.auth.isLoggedIn())
      return true;
    else
      this.navCtrl.setRoot(HomePage);
  }

  goToContactsForm(contact) {
    this.navCtrl.push(ContactsFormPage, { 'contact' : contact})
  }
}
