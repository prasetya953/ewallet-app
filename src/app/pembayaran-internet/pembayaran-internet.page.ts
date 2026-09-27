import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, IonButton,
  IonIcon, IonInput, IonSelect, 
  IonSelectOption, IonCard, IonCardContent, IonCardHeader, 
  IonCardTitle, AlertController, NavController, LoadingController, IonButtons
} from '@ionic/angular/standalone';
import { 
  arrowBackOutline, 
  wifiOutline, 
  chevronBackOutline,
  helpCircleOutline,
  documentTextOutline,
  personCircleOutline,
  cardOutline,
  refreshOutline,
  flashOutline,
  shieldCheckmarkOutline,
  headsetOutline,
  checkmarkCircle,
  alertCircle,
  tvOutline,
  speedometerOutline,
  playCircleOutline,
  globeOutline,
  chevronDownOutline
} from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { TransaksiService } from '../services/transaksi.service';

@Component({
  selector: 'app-pembayaran-internet',
  templateUrl: './pembayaran-internet.page.html',
  styleUrls: ['./pembayaran-internet.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule, IonHeader, IonToolbar, IonTitle, 
    IonContent, IonButton, IonIcon, IonInput,
    IonSelect, IonSelectOption, IonCard, IonCardContent, 
    IonCardHeader, IonCardTitle, IonButtons
  ]
})
export class PembayaranInternetPage {
  private transaksiService = inject(TransaksiService);
  private alertController = inject(AlertController);
  private navController = inject(NavController);
  private loadingController = inject(LoadingController);

  provider: string = '';
  nomorPelanggan: string = '';
  paket: string = '';
  jumlah: number = 0;

  recentTransactions = [
    { provider: 'Indihome', date: '15 Nov 2024', amount: 250000 },
    { provider: 'Biznet', date: '10 Nov 2024', amount: 350000 },
    { provider: 'First Media', date: '5 Nov 2024', amount: 500000 }
  ];

  constructor() {
    addIcons({ 
      arrowBackOutline, 
      wifiOutline, 
      chevronBackOutline,
      helpCircleOutline,
      documentTextOutline,
      personCircleOutline,
      cardOutline,
      refreshOutline,
      flashOutline,
      shieldCheckmarkOutline,
      headsetOutline,
      checkmarkCircle,
      alertCircle,
      tvOutline,
      speedometerOutline,
      playCircleOutline,
      globeOutline,
      chevronDownOutline
    });
  }

  selectProvider(provider: string) {
    this.provider = provider;
    this.hitungTagihan();
  }

  selectPackage(paket: string) {
    this.paket = paket;
    this.hitungTagihan();
  }

  validateCustomerNumber() {
    // Validation logic will be handled in the template
  }

  async prosesPembayaran() {
    if (!this.provider || !this.nomorPelanggan || !this.paket) {
      await this.showAlert('Data Tidak Lengkap', 'Harap lengkapi semua data sebelum melakukan pembayaran.');
      return;
    }

    if (!this.isValidCustomerNumber(this.nomorPelanggan)) {
      await this.showAlert('Nomor Pelanggan Tidak Valid', 'Format nomor pelanggan tidak sesuai. Pastikan nomor sesuai dengan format provider.');
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Memproses pembayaran...',
      spinner: 'crescent',
      duration: 3000
    });
    
    await loading.present();

    // Simulate payment processing
    setTimeout(async () => {
      await loading.dismiss();
      
      const success = await this.transaksiService.prosesPembayaran('internet', this.jumlah + 2500, {
        provider: this.provider,
        nomor: this.nomorPelanggan,
        paket: this.getPaketName(),
        bulan: this.getCurrentMonth()
      });

      if (success) {
        await this.showSuccessAlert();
      } else {
        await this.showAlert('Pembayaran Gagal', 'Terjadi kesalahan saat memproses pembayaran. Silakan coba lagi.');
      }
    }, 3000);
  }

  hitungTagihan() {
    const paketAmounts: {[key: string]: number} = {
      '10mbps': 250000,
      '20mbps': 350000,
      '50mbps': 500000,
      '100mbps': 750000,
      '200mbps': 1200000
    };
    
    if (this.paket && paketAmounts[this.paket]) {
      this.jumlah = paketAmounts[this.paket];
    } else {
      this.jumlah = 0;
    }
  }

  getProviderName(): string {
    const providerMap: {[key: string]: string} = {
      'indihome': 'Indihome',
      'biznet': 'Biznet',
      'firstmedia': 'First Media',
      'myrepublic': 'MyRepublic',
      'mega': 'Mega'
    };
    return providerMap[this.provider] || 'Provider Internet';
  }

  getPaketName(): string {
    const paketMap: {[key: string]: string} = {
      '10mbps': '10 Mbps',
      '20mbps': '20 Mbps',
      '50mbps': '50 Mbps',
      '100mbps': '100 Mbps',
      '200mbps': '200 Mbps'
    };
    return paketMap[this.paket] || 'Paket Internet';
  }

  getCurrentMonth(): string {
    const months = [
      'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];
    const now = new Date();
    return months[now.getMonth()];
  }

  isValidCustomerNumber(nomor: string): boolean {
    // Simple validation: at least 5 characters
    return nomor.length >= 5;
  }

  resetForm() {
    this.provider = '';
    this.nomorPelanggan = '';
    this.paket = '';
    this.jumlah = 0;
  }

private async showSuccessAlert() {
  const alert = await this.alertController.create({
    header: '✅ Pembayaran Berhasil!',
    message: `
Provider: ${this.getProviderName()}
Nomor Pelanggan: ${this.nomorPelanggan}
Paket: ${this.getPaketName()}
Bulan: ${this.getCurrentMonth()} 2024
Total: Rp${this.formatCurrency(this.jumlah + 2500)}

Layanan internet akan aktif dalam 1-2 jam. Bukti pembayaran telah dikirim via email.
    `,
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

  goBack() {
    this.navController.back();
  }
}