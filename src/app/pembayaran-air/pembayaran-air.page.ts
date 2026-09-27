import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, IonIcon,
  IonButtons, IonBackButton, AlertController, NavController, LoadingController
} from '@ionic/angular/standalone';
import { 
  arrowBackOutline, waterOutline, businessOutline, 
  cardOutline, calendarOutline, informationCircleOutline, checkmarkCircleOutline
} from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { TransaksiService } from '../services/transaksi.service';

@Component({
  selector: 'app-pembayaran-air',
  templateUrl: './pembayaran-air.page.html',
  styleUrls: ['./pembayaran-air.page.scss'],
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
export class PembayaranAirPage {
  private transaksiService = inject(TransaksiService);
  private alertController = inject(AlertController);
  private navController = inject(NavController);
  private loadingController = inject(LoadingController);

  provider: string = '';
  nomorPelanggan: string = '';
  bulan: string = '';
  jumlah: number = 0;

  constructor() {
    addIcons({ 
      arrowBackOutline, 
      waterOutline, 
      businessOutline,
      cardOutline,
      calendarOutline,
      informationCircleOutline,
      checkmarkCircleOutline
    });
  }

  async prosesPembayaran() {
    if (!this.provider || !this.nomorPelanggan || !this.bulan) {
      await this.showAlert('Data Tidak Lengkap', 'Harap lengkapi semua data sebelum melakukan pembayaran.');
      return;
    }

    // Validasi nomor pelanggan
    if (!this.isValidCustomerNumber(this.nomorPelanggan)) {
      await this.showAlert('Nomor Pelanggan Tidak Valid', 'Format nomor pelanggan tidak sesuai. Pastikan nomor terdiri dari 8-12 digit.');
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Memproses pembayaran...',
      spinner: 'crescent',
      duration: 3000
    });
    
    await loading.present();

    // Simulasi proses pembayaran
    setTimeout(async () => {
      await loading.dismiss();
      
      const success = await this.transaksiService.prosesPembayaran('air', this.jumlah, {
        provider: this.provider,
        nomor: this.nomorPelanggan,
        bulan: this.bulan,
        periode: this.getPeriodeText()
      });

      if (success) {
        await this.showSuccessAlert();
      }
    }, 3000);
  }

  hitungTagihan() {
    const baseAmount = 50000; // Tagihan dasar per bulan
    const adminFee = 2500; // Biaya administrasi
    const bulanMap: {[key: string]: number} = {
      '1': 1,
      '2': 2,
      '3': 3,
      '6': 6
    };
    
    if (this.bulan && bulanMap[this.bulan]) {
      this.jumlah = (baseAmount * bulanMap[this.bulan]) + adminFee;
    } else {
      this.jumlah = 0;
    }
  }

  getProviderName(): string {
    const providerMap: {[key: string]: string} = {
      'pdam': 'PDAM',
      'pdam_jaya': 'PDAM Jaya',
      'pam_lyon': 'PAM Lyon',
      'tirta': 'Tirta'
    };
    return providerMap[this.provider] || 'Provider Air';
  }

  private isValidCustomerNumber(nomor: string): boolean {
    // Validasi sederhana: 8-12 digit angka
    const customerRegex = /^\d{8,12}$/;
    return customerRegex.test(nomor);
  }

  private getPeriodeText(): string {
    const periodeMap: {[key: string]: string} = {
      '1': '1 Bulan',
      '2': '2 Bulan', 
      '3': '3 Bulan',
      '6': '6 Bulan'
    };
    return periodeMap[this.bulan] || '';
  }

  private async showSuccessAlert() {
    const alert = await this.alertController.create({
      header: 'Pembayaran Berhasil',
      subHeader: '💧 Pembayaran tagihan air berhasil',
      message: `
Provider: ${this.getProviderName()}
Nomor Pelanggan: ${this.nomorPelanggan}
Periode: ${this.getPeriodeText()}
Total: Rp${this.formatCurrency(this.jumlah)}

Bukti pembayaran telah dikirim via email. Tagihan air Anda telah lunas.
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