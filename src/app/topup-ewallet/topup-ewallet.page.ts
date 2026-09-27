import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, IonButton,
  IonIcon, IonItem, IonLabel, IonInput, IonCard, IonCardContent, 
  IonCardHeader, IonCardTitle, AlertController, NavController, 
  LoadingController,IonButtons
} from '@ionic/angular/standalone';
import { 
  arrowBackOutline, 
  cardOutline,
  logoWhatsapp,
  logoGoogle,
  walletOutline,
  phonePortraitOutline,
  checkmarkCircleOutline
} from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { TransaksiService } from '../services/transaksi.service';

interface EWallet {
  id: string;
  name: string;
  icon: string;
  placeholder: string;
}

@Component({
  selector: 'app-topup-ewallet',
  templateUrl: './topup-ewallet.page.html',
  styleUrls: ['./topup-ewallet.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule, IonHeader, IonToolbar, IonTitle, 
    IonContent, IonButton, IonIcon, IonItem, IonLabel, IonInput,
    IonCard, IonCardContent, IonCardHeader, IonCardTitle,IonButtons
  ]
})
export class TopupEwalletPage {
  private transaksiService = inject(TransaksiService);
  private alertController = inject(AlertController);
  private navController = inject(NavController);
  private loadingController = inject(LoadingController);

  selectedWallet: string = '';
  accountNumber: string = '';
  accountName: string = '';
  selectedAmount: number = 0;
  customAmount: number = 0;

  eWallets: EWallet[] = [
    {
      id: 'gopay',
      name: 'GoPay',
      icon: 'logo-google',
      placeholder: 'Masukkan nomor HP GoPay'
    },
    {
      id: 'ovo',
      name: 'OVO',
      icon: 'wallet-outline',
      placeholder: 'Masukkan nomor HP OVO'
    },
    {
      id: 'dana',
      name: 'DANA',
      icon: 'phone-portrait-outline',
      placeholder: 'Masukkan nomor HP DANA'
    },
    {
      id: 'shopeepay',
      name: 'ShopeePay',
      icon: 'card-outline',
      placeholder: 'Masukkan nomor HP ShopeePay'
    },
    {
      id: 'linkaja',
      name: 'LinkAja',
      icon: 'card-outline',
      placeholder: 'Masukkan nomor HP LinkAja'
    },
    {
      id: 'jenius',
      name: 'Jenius',
      icon: 'card-outline',
      placeholder: 'Masukkan email Jenius'
    }
  ];

  amountOptions: number[] = [
    10000, 25000, 50000, 100000, 
    200000, 500000, 1000000, 2000000
  ];

  constructor() {
    addIcons({ 
      arrowBackOutline, 
      cardOutline,
      logoWhatsapp,
      logoGoogle,
      walletOutline,
      phonePortraitOutline,
      checkmarkCircleOutline
    });
  }

  async prosesTopUp() {
    if (!this.selectedWallet || !this.accountNumber || !this.accountName || (!this.selectedAmount && !this.customAmount)) {
      await this.showAlert('Data Tidak Lengkap', 'Harap lengkapi semua data sebelum melakukan top up.');
      return;
    }

    const amount = this.customAmount || this.selectedAmount;
    
    // Validasi minimal amount
    if (amount < 10000) {
      await this.showAlert('Nominal Tidak Valid', 'Minimal top up e-wallet adalah Rp10.000.');
      return;
    }

    // Validasi maksimal amount
    if (amount > 5000000) {
      await this.showAlert('Nominal Terlalu Besar', 'Maksimal top up e-wallet adalah Rp5.000.000.');
      return;
    }

    const wallet = this.getSelectedWallet();

    const loading = await this.loadingController.create({
      message: 'Memproses top up...',
      spinner: 'crescent',
      duration: 3000
    });
    
    await loading.present();

    // Simulasi proses top up
    setTimeout(async () => {
      await loading.dismiss();
      
      const success = await this.transaksiService.prosesTopUp('ewallet', amount, {
        wallet: wallet?.name,
        accountNumber: this.accountNumber,
        accountName: this.accountName,
        amount: amount
      });

      if (success) {
        await this.showSuccessAlert(wallet?.name || '', amount);
      }
    }, 3000);
  }

  selectAmount(amount: number) {
    this.selectedAmount = this.selectedAmount === amount ? 0 : amount;
    this.customAmount = 0;
  }

  onCustomAmountChange() {
    if (this.customAmount > 0) {
      this.selectedAmount = 0;
    }
  }

  getSelectedWallet(): EWallet | undefined {
    return this.eWallets.find(wallet => wallet.id === this.selectedWallet);
  }

  getPlaceholderText(): string {
    const wallet = this.getSelectedWallet();
    return wallet?.placeholder || 'Masukkan nomor HP atau email';
  }

  private async showSuccessAlert(walletName: string, amount: number) {
    const alert = await this.alertController.create({
      header: '💳 Top Up Berhasil!',
      message: `
        <div style="text-align: center;">
          <p style="font-weight: 600; margin-bottom: 15px;">Top up ${walletName} berhasil!</p>
          <div style="background: #f8f9fa; padding: 15px; border-radius: 10px; margin: 10px 0;">
            <p style="margin: 5px 0;"><strong>E-Wallet:</strong> ${walletName}</p>
            <p style="margin: 5px 0;"><strong>Akun:</strong> ${this.accountNumber}</p>
            <p style="margin: 5px 0;"><strong>Nama:</strong> ${this.accountName}</p>
            <p style="margin: 5px 0;"><strong>Nominal:</strong> Rp${this.formatCurrency(amount)}</p>
          </div>
          <p style="font-size: 14px; color: #666; margin-top: 10px;">
            Saldo akan masuk ke akun ${walletName} dalam 1-5 menit
          </p>
        </div>
      `,
      buttons: [
        {
          text: 'Kembali ke Beranda',
          handler: () => {
            this.navController.navigateRoot('/beranda');
          }
        }
      ]
    });
    
    await alert.present();
  }

  private async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    
    await alert.present();
  }

  formatCurrency(amount: number): string {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  goBack() {
    this.navController.back();
  }
}