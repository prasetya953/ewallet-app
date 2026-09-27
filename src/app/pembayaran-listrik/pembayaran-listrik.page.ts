import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, IonIcon,
  IonButtons, IonBackButton, AlertController, NavController, LoadingController
} from '@ionic/angular/standalone';
import { 
  arrowBackOutline, flashOutline, cardOutline, 
  speedometerOutline, informationCircleOutline, checkmarkCircleOutline
} from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { TransaksiService } from '../services/transaksi.service';

@Component({
  selector: 'app-pembayaran-listrik',
  templateUrl: './pembayaran-listrik.page.html',
  styleUrls: ['./pembayaran-listrik.page.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent, 
    IonIcon,
    IonButtons, 
    IonBackButton
  ]
})
export class PembayaranListrikPage {
  private transaksiService = inject(TransaksiService);
  private alertController = inject(AlertController);
  private navController = inject(NavController);
  private loadingController = inject(LoadingController);

  nomorMeter: string = '';
  daya: string = '';
  jumlah: number = 0;

  constructor() {
    addIcons({ 
      arrowBackOutline, 
      flashOutline, 
      cardOutline,
      speedometerOutline,
      informationCircleOutline,
      checkmarkCircleOutline
    });
  }

  async prosesPembayaran() {
    if (!this.nomorMeter || !this.daya) {
      await this.showAlert('Data Tidak Lengkap', 'Harap lengkapi nomor meter dan pilih daya.');
      return;
    }

    // Validasi nomor meter
    if (!this.isValidMeterNumber(this.nomorMeter)) {
      await this.showAlert('Nomor Meter Tidak Valid', 'Format nomor meter tidak sesuai. Pastikan nomor terdiri dari 11 digit.');
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Memproses pembelian token...',
      spinner: 'crescent',
      duration: 3000
    });
    
    await loading.present();

    // Simulasi proses pembelian token
    setTimeout(async () => {
      await loading.dismiss();
      
      const success = await this.transaksiService.prosesPembayaran('listrik', this.jumlah, {
        nomor: this.nomorMeter,
        daya: this.getDayaText(),
        amount: this.jumlah
      });

      if (success) {
        await this.showSuccessAlert();
      }
    }, 3000);
  }

  hitungToken() {
    const baseAmounts: {[key: string]: number} = {
      '450': 20000,
      '900': 50000,
      '1300': 100000,
      '2200': 200000,
      '3500': 500000,
      '5500': 1000000
    };
    
    if (this.daya && baseAmounts[this.daya]) {
      this.jumlah = baseAmounts[this.daya];
    } else {
      this.jumlah = 0;
    }
  }

  private isValidMeterNumber(nomor: string): boolean {
    // Validasi sederhana: 11 digit angka
    const meterRegex = /^\d{11}$/;
    return meterRegex.test(nomor);
  }

  private getDayaText(): string {
    const dayaMap: {[key: string]: string} = {
      '450': '450 VA',
      '900': '900 VA', 
      '1300': '1300 VA',
      '2200': '2200 VA',
      '3500': '3500 VA',
      '5500': '5500 VA'
    };
    return dayaMap[this.daya] || '';
  }

  private generateToken(): string {
    // Generate token 20 digit untuk simulasi
    let token = '';
    for (let i = 0; i < 20; i++) {
      token += Math.floor(Math.random() * 10);
      if ((i + 1) % 4 === 0 && i < 19) {
        token += ' ';
      }
    }
    return token;
  }

  private async showSuccessAlert() {
    const token = this.generateToken();
    
    const alert = await this.alertController.create({
      header: 'Token Berhasil!',
      subHeader: '⚡ Pembelian token listrik berhasil',
      message: `
Nomor Meter: ${this.nomorMeter}
Daya: ${this.getDayaText()}
Total: Rp${this.formatCurrency(this.jumlah)}

TOKEN LISTRIK:
${token}

Token telah dikirim via SMS. Input token di meteran listrik Anda.
      `.trim(),
      buttons: [
        {
          text: 'Kembali ke Beranda',
          handler: () => {
            this.navController.navigateRoot('/tabs/beranda');
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
}