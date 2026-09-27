import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, 
  IonButtons, IonBackButton, IonButton, IonItem,
  IonInput, AlertController, NavController, ToastController
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-free-transfer',
  templateUrl: './free-transfer.page.html',
  styleUrls: ['./free-transfer.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule, IonHeader, IonToolbar, IonTitle,
    IonContent, IonButtons, IonBackButton, IonButton, IonItem, IonInput
  ]
})
export class FreeTransferPage {
  private alertController = inject(AlertController);
  private navController = inject(NavController);
  private toastController = inject(ToastController);

  transferAmount: number = 0;
  bankName: string = '';
  accountNumber: string = '';
  accountName: string = '';
  selectedBank: string = '';

  banks = [
    { code: 'BCA', name: 'BCA' },
    { code: 'BRI', name: 'BRI' },
    { code: 'BNI', name: 'BNI' },
    { code: 'MDR', name: 'Mandiri' },
    { code: 'CIM', name: 'CIMB' },
    { code: 'BTN', name: 'BTN' },
    { code: 'DBS', name: 'DBS' },
    { code: 'BTP', name: 'BTPN' }
  ];

  selectBank(bankCode: string) {
    this.selectedBank = bankCode;
    const selectedBank = this.banks.find(bank => bank.code === bankCode);
    if (selectedBank) {
      this.bankName = selectedBank.name;
    }
  }

  async processTransfer() {
    if (!this.bankName || !this.accountNumber || !this.transferAmount) {
      const alert = await this.alertController.create({
        header: 'Data Tidak Lengkap',
        message: 'Harap isi semua data transfer',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    const alert = await this.alertController.create({
      header: 'Konfirmasi Transfer Bank',
      message: `Transfer Rp ${this.transferAmount.toLocaleString('id-ID')} ke ${this.bankName} - ${this.accountName || this.accountNumber}?`,
      buttons: [
        { text: 'Batal', role: 'cancel' },
        { text: 'Transfer', handler: () => this.completeTransfer() }
      ]
    });
    await alert.present();
  }

  async completeTransfer() {
    const toast = await this.toastController.create({
      message: 'Transfer bank berhasil! Biaya transfer gratis.',
      duration: 2000,
      color: 'success',
      position: 'bottom'
    });
    await toast.present();

    this.navController.navigateBack('/beranda');
  }
}