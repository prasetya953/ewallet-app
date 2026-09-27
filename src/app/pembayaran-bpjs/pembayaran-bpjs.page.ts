import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, IonIcon,
  IonButtons, IonBackButton, AlertController, NavController, LoadingController
} from '@ionic/angular/standalone';
import { 
  arrowBackOutline, medkitOutline, cardOutline, checkmarkCircleOutline,
  personOutline, calendarOutline, informationCircleOutline 
} from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { TransaksiService } from '../services/transaksi.service';
import { AnimasiService } from '../services/animasi.service';

@Component({
  selector: 'app-pembayaran-bpjs',
  templateUrl: './pembayaran-bpjs.page.html',
  styleUrls: ['./pembayaran-bpjs.page.scss'],
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
export class PembayaranBpjsPage {
  private transaksiService = inject(TransaksiService);
  private animasiService = inject(AnimasiService);
  private alertController = inject(AlertController);
  private navController = inject(NavController);
  private loadingController = inject(LoadingController);

  nomorBPJS: string = '';
  nama: string = '';
  bulan: string = '';
  jumlah: number = 0;

  constructor() {
    addIcons({ 
      arrowBackOutline, 
      medkitOutline, 
      cardOutline, 
      checkmarkCircleOutline,
      personOutline,
      calendarOutline,
      informationCircleOutline
    });
  }

  async prosesPembayaran() {
    if (!this.nomorBPJS || !this.nama || !this.bulan) {
      await this.showAlert('Data Tidak Lengkap', 'Harap lengkapi semua data sebelum melanjutkan pembayaran.');
      return;
    }

    // Validasi nomor BPJS
    if (!this.isValidBPJSNumber(this.nomorBPJS)) {
      await this.showAlert('Nomor BPJS Tidak Valid', 'Format nomor BPJS tidak sesuai. Pastikan nomor terdiri dari 13 digit.');
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Memproses pembayaran BPJS...',
      spinner: 'crescent',
      duration: 3000
    });
    
    await loading.present();

    // Simulasi proses pembayaran
    setTimeout(async () => {
      await loading.dismiss();
      
      const success = await this.transaksiService.prosesPembayaran('bpjs', this.jumlah, {
        nomor: this.nomorBPJS,
        nama: this.nama,
        bulan: this.bulan,
        periode: this.getPeriodeText()
      });

      if (success) {
        await this.showSuccessAlert();
      }
    }, 3000);
  }

  hitungJumlah() {
    const baseAmount = 50000; // Premi dasar per bulan
    const adminFee = 2500; // Biaya administrasi
    const bulanMap: {[key: string]: number} = {
      '1': 1,
      '3': 3,
      '6': 6,
      '12': 12
    };
    
    if (this.bulan && bulanMap[this.bulan]) {
      this.jumlah = (baseAmount * bulanMap[this.bulan]) + adminFee;
    } else {
      this.jumlah = 0;
    }
  }

  private isValidBPJSNumber(nomor: string): boolean {
    // Validasi sederhana: 13 digit angka
    const bpjsRegex = /^\d{13}$/;
    return bpjsRegex.test(nomor);
  }

  private getPeriodeText(): string {
    const periodeMap: {[key: string]: string} = {
      '1': '1 Bulan',
      '3': '3 Bulan', 
      '6': '6 Bulan',
      '12': '1 Tahun'
    };
    return periodeMap[this.bulan] || '';
  }

private async showSuccessAlert() {
  const alert = await this.alertController.create({
    header: '✅ Pembayaran Berhasil!',
    message: `
Pembayaran BPJS berhasil diproses

Nomor BPJS: ${this.nomorBPJS}
Nama: ${this.nama}
Periode: ${this.getPeriodeText()}
Total: Rp${this.formatCurrency(this.jumlah)}
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