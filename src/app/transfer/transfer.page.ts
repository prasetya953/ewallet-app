import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, IonButton,
  IonIcon, IonButtons, IonBackButton, AlertController,
  NavController, ToastController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { qrCodeOutline, paperPlaneOutline, callOutline, personOutline, documentTextOutline, arrowForward } from 'ionicons/icons';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.page.html',
  styleUrls: ['./transfer.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule, IonHeader, IonToolbar, IonTitle,
    IonContent, IonButton, IonIcon, IonButtons, IonBackButton
  ]
})
export class TransferPage {
  private navController = inject(NavController);
  private alertController = inject(AlertController);
  private toastController = inject(ToastController);

  transferAmount: number = 0;
  recipientName: string = '';
  recipientNumber: string = '';
  notes: string = '';

  // Tambahkan properti yang hilang
  quickAmounts = [50000, 100000, 250000, 500000, 1000000];

  recentContacts = [
    { name: 'Om Martin', number: '081234567890', avatar: 'OM' },
    { name: 'Vidy COD Velg', number: '081298765432', avatar: 'VV' },
    { name: 'Bahlil', number: '081255566677', avatar: 'BL' },
    { name: 'Megawati', number: '081255966677', avatar: 'MI' }
  ];

  constructor() {
    addIcons({qrCodeOutline,callOutline,personOutline,documentTextOutline,arrowForward,paperPlaneOutline});
  }

  // Tambahkan method yang hilang
  setQuickAmount(amount: number) {
    this.transferAmount = amount;
  }

  selectContact(contact: any) {
    this.recipientName = contact.name;
    this.recipientNumber = contact.number;
  }

  async processTransfer() {
    if (!this.recipientNumber || !this.transferAmount || this.transferAmount <= 0) {
      const alert = await this.alertController.create({
        header: 'Data Tidak Lengkap',
        message: 'Harap isi nomor tujuan dan jumlah transfer',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    const alert = await this.alertController.create({
      header: 'Konfirmasi Transfer',
      message: `Transfer Rp ${this.transferAmount.toLocaleString('id-ID')} ke ${this.recipientName} (${this.recipientNumber})?`,
      buttons: [
        { text: 'Batal', role: 'cancel' },
        { text: 'Transfer', handler: () => this.completeTransfer() }
      ]
    });
    await alert.present();
  }

  async completeTransfer() {
    const transaction = {
      id: 'TRX' + Date.now(),
      description: `Transfer ke ${this.recipientName}`,
      amount: this.transferAmount,
      type: 'expense' as const,
      category: 'transfer',
      date: new Date(),
      status: 'completed' as const,
      recipient: this.recipientName
    };

    // Save to localStorage
    const savedTransactions = localStorage.getItem('recentTransactions');
    let transactions = savedTransactions ? JSON.parse(savedTransactions) : [];
    transactions.unshift(transaction);
    localStorage.setItem('recentTransactions', JSON.stringify(transactions));

    // Update balance
    const currentBalance = parseInt(localStorage.getItem('currentBalance') || '29570');
    const newBalance = currentBalance - this.transferAmount;
    localStorage.setItem('currentBalance', JSON.stringify(newBalance));

    const toast = await this.toastController.create({
      message: 'Transfer berhasil!',
      duration: 2000,
      color: 'success',
      position: 'bottom'
    });
    await toast.present();

    this.navController.navigateBack('/beranda');
  }

  scanQR() {
    this.navController.navigateForward('/scan');
  }
// Tambahkan method ini di class TransferPage
getCurrentBalance(): number {
  const savedBalance = localStorage.getItem('currentBalance');
  return savedBalance ? parseInt(savedBalance) : 2957000; // Default balance
}

onAmountChange() {
  // Optional: Add any validation or formatting logic here
  console.log('Amount changed:', this.transferAmount);
}
}