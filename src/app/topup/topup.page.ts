import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton,
  AlertController, NavController, ToastController
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-topup',
  templateUrl: './topup.page.html',
  styleUrls: ['./topup.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule, IonHeader, IonToolbar, IonTitle,
    IonContent, IonButtons, IonBackButton
  ]
})
export class TopupPage {
  private alertController = inject(AlertController);
  private navController = inject(NavController);
  private toastController = inject(ToastController);

  topupAmount: number = 0;
  paymentMethod: string = 'gopay';

  quickAmounts = [
    { amount: 50000, label: '50K' },
    { amount: 100000, label: '100K' },
    { amount: 200000, label: '200K' },
    { amount: 500000, label: '500K' },
    { amount: 1000000, label: '1JT' },
    { amount: 2000000, label: '2JT' }
  ];

  selectAmount(amount: number) {
    this.topupAmount = amount;
  }

  async processTopup() {
    if (!this.topupAmount || this.topupAmount <= 0) {
      const alert = await this.alertController.create({
        header: 'Data Tidak Lengkap',
        message: 'Harap isi jumlah top up',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    const alert = await this.alertController.create({
      header: 'Konfirmasi Top Up',
      message: `Top up Rp ${this.topupAmount.toLocaleString('id-ID')} dengan ${this.paymentMethod}?`,
      buttons: [
        { text: 'Batal', role: 'cancel' },
        { text: 'Top Up', handler: () => this.completeTopup() }
      ]
    });
    await alert.present();
  }

  async completeTopup() {
    const transaction = {
      id: 'TOPUP' + Date.now(),
      description: 'Top Up Saldo',
      amount: this.topupAmount,
      type: 'income' as const,
      category: 'topup',
      date: new Date(),
      status: 'completed' as const
    };

    // Save to localStorage
    const savedTransactions = localStorage.getItem('recentTransactions');
    let transactions = savedTransactions ? JSON.parse(savedTransactions) : [];
    transactions.unshift(transaction);
    localStorage.setItem('recentTransactions', JSON.stringify(transactions));

    // Update balance
    const currentBalance = parseInt(localStorage.getItem('currentBalance') || '29570');
    const newBalance = currentBalance + this.topupAmount;
    localStorage.setItem('currentBalance', JSON.stringify(newBalance));

    const toast = await this.toastController.create({
      message: 'Top up berhasil!',
      duration: 2000,
      color: 'success',
      position: 'bottom'
    });
    await toast.present();

    this.navController.navigateBack('/beranda');
  }
  // Tambahkan method ini di class TopupPage
getCurrentBalance(): number {
  const savedBalance = localStorage.getItem('currentBalance');
  return savedBalance ? parseInt(savedBalance) : 2957000; // Default balance
}

onAmountChange() {
  // Optional: Add any validation or formatting logic here
  console.log('Amount changed:', this.topupAmount);
}

selectPaymentMethod(method: string) {
  this.paymentMethod = method;
}
}