import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton, IonIcon,
  AlertController, NavController, ToastController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { callOutline, chatbubbleOutline, sendOutline, arrowForward } from 'ionicons/icons';

@Component({
  selector: 'app-request-money',
  templateUrl: './request-money.page.html',
  styleUrls: ['./request-money.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule, IonHeader, IonToolbar, IonTitle,
    IonContent, IonIcon,
    IonButtons, IonBackButton
  ]
})
export class RequestMoneyPage {
  private alertController = inject(AlertController);
  private navController = inject(NavController);
  private toastController = inject(ToastController);

  requestAmount: number = 0;
  recipientNumber: string = '';
  notes: string = '';

  quickAmounts = [50000, 100000, 250000, 500000, 1000000];

  recentContacts = [
    { name: 'Om Martin', number: '081234567890', avatar: 'OM' },
    { name: 'Vidy COD Velg', number: '081298765432', avatar: 'VV' },
    { name: 'Bahlil', number: '081255566677', avatar: 'BL' },
    { name: 'Megawati', number: '081255966677', avatar: 'MI' }
  ];
  constructor() {
    addIcons({ 
      callOutline, 
      chatbubbleOutline, 
      sendOutline,
      arrowForward
    });
  }

  setQuickAmount(amount: number) {
    this.requestAmount = amount;
  }

  selectContact(contact: any) {
    this.recipientNumber = contact.number;
    // Optional: Auto-fill name if you want
    // this.recipientName = contact.name;
  }

  onAmountChange() {
    // Optional: Add any validation or formatting logic here
    console.log('Amount changed:', this.requestAmount);
  }

  async processRequest() {
    if (!this.recipientNumber || !this.requestAmount || this.requestAmount <= 0) {
      const alert = await this.alertController.create({
        header: 'Data Tidak Lengkap',
        message: 'Harap isi nomor tujuan dan jumlah permintaan',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    const alert = await this.alertController.create({
      header: 'Konfirmasi Permintaan',
      message: `Minta Rp ${this.requestAmount.toLocaleString('id-ID')} dari ${this.recipientNumber}?`,
      buttons: [
        { text: 'Batal', role: 'cancel' },
        { text: 'Minta', handler: () => this.completeRequest() }
      ]
    });
    await alert.present();
  }

  async completeRequest() {
    const toast = await this.toastController.create({
      message: 'Permintaan uang berhasil dikirim!',
      duration: 2000,
      color: 'success',
      position: 'bottom'
    });
    await toast.present();

    this.navController.navigateBack('/beranda');
  }
}