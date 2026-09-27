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
  cellularOutline, 
  callOutline,
  checkmarkCircleOutline
} from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { TransaksiService } from '../services/transaksi.service';

interface PulsaOption {
  amount: number;
  bonus?: string;
}

interface DataPackage {
  name: string;
  detail: string;
  amount: number;
  validity: string;
}

@Component({
  selector: 'app-pulsa-data',
  templateUrl: './pulsa-data.page.html',
  styleUrls: ['./pulsa-data.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule, IonHeader, IonToolbar, IonTitle, 
    IonContent, IonButton, IonIcon, IonItem, IonLabel, IonInput,
    IonCard, IonCardContent, IonCardHeader, IonCardTitle,IonButtons
  ]
})
export class PulsaDataPage {
  private transaksiService = inject(TransaksiService);
  private alertController = inject(AlertController);
  private navController = inject(NavController);
  private loadingController = inject(LoadingController);

  nomorHP: string = '';
  operator: string = '';
  operatorIcon: string = 'cellular-outline';
  selectedPulsa: number = 0;
  selectedPaket: number = 0;

  pulsaOptions: PulsaOption[] = [
    { amount: 5000, bonus: 'Bonus 0 MB' },
    { amount: 10000, bonus: 'Bonus 50 MB' },
    { amount: 25000, bonus: 'Bonus 200 MB' },
    { amount: 50000, bonus: 'Bonus 500 MB' },
    { amount: 100000, bonus: 'Bonus 1 GB' },
    { amount: 200000, bonus: 'Bonus 3 GB' }
  ];

  dataPackages: DataPackage[] = [
    { 
      name: 'Paket 1GB', 
      detail: '1GB All Network', 
      amount: 15000, 
      validity: '1 Hari' 
    },
    { 
      name: 'Paket 3GB', 
      detail: '3GB All Network', 
      amount: 25000, 
      validity: '3 Hari' 
    },
    { 
      name: 'Paket 7GB', 
      detail: '7GB + 2GB Apps', 
      amount: 50000, 
      validity: '7 Hari' 
    },
    { 
      name: 'Paket 15GB', 
      detail: '15GB + 5GB Apps', 
      amount: 90000, 
      validity: '30 Hari' 
    },
    { 
      name: 'Paket 25GB', 
      detail: '25GB + 10GB Apps', 
      amount: 120000, 
      validity: '30 Hari' 
    },
    { 
      name: 'Paket 50GB', 
      detail: '50GB + 20GB Apps', 
      amount: 150000, 
      validity: '30 Hari' 
    }
  ];

  constructor() {
    addIcons({ 
      arrowBackOutline, 
      cellularOutline, 
      callOutline,
      checkmarkCircleOutline
    });
  }

  detectOperator() {
    if (this.nomorHP.length >= 4) {
      const prefix = this.nomorHP.substring(0, 4);
      
      if (prefix.startsWith('0811') || prefix.startsWith('0812') || prefix.startsWith('0813') || 
          prefix.startsWith('0821') || prefix.startsWith('0822') || prefix.startsWith('0823')) {
        this.operator = 'Telkomsel';
        this.operatorIcon = 'call-outline';
      } else if (prefix.startsWith('0814') || prefix.startsWith('0815') || prefix.startsWith('0816') || 
                 prefix.startsWith('0855') || prefix.startsWith('0856') || prefix.startsWith('0857') || 
                 prefix.startsWith('0858')) {
        this.operator = 'Indosat';
        this.operatorIcon = 'cellular-outline';
      } else if (prefix.startsWith('0817') || prefix.startsWith('0818') || prefix.startsWith('0819') || 
                 prefix.startsWith('0859') || prefix.startsWith('0877') || prefix.startsWith('0878')) {
        this.operator = 'XL';
        this.operatorIcon = 'wifi-outline';
      } else if (prefix.startsWith('0895') || prefix.startsWith('0896') || prefix.startsWith('0897') || 
                 prefix.startsWith('0898') || prefix.startsWith('0899')) {
        this.operator = 'Three';
        this.operatorIcon = 'triangle-outline';
      } else if (prefix.startsWith('0881') || prefix.startsWith('0882') || prefix.startsWith('0883') || 
                 prefix.startsWith('0884') || prefix.startsWith('0885') || prefix.startsWith('0886') || 
                 prefix.startsWith('0887') || prefix.startsWith('0888')) {
        this.operator = 'Smartfren';
        this.operatorIcon = 'flash-outline';
      } else {
        this.operator = '';
        this.operatorIcon = 'cellular-outline';
      }
    } else {
      this.operator = '';
      this.operatorIcon = 'cellular-outline';
    }
  }

  async prosesPembelian() {
    if (!this.nomorHP) {
      await this.showAlert('Data Tidak Lengkap', 'Harap masukkan nomor handphone terlebih dahulu.');
      return;
    }

    if (!this.selectedPulsa && !this.selectedPaket) {
      await this.showAlert('Pilihan Kosong', 'Harap pilih pulsa atau paket data yang ingin dibeli.');
      return;
    }

    // Validasi nomor HP
    if (!this.isValidPhoneNumber(this.nomorHP)) {
      await this.showAlert('Nomor HP Tidak Valid', 'Format nomor handphone tidak sesuai. Pastikan nomor diawali dengan 08 dan terdiri dari 10-13 digit.');
      return;
    }

    const totalAmount = (this.selectedPulsa || 0) + (this.selectedPaket || 0);
    const loading = await this.loadingController.create({
      message: 'Memproses pembelian...',
      spinner: 'crescent',
      duration: 3000
    });
    
    await loading.present();

    // Simulasi proses pembelian
    setTimeout(async () => {
      await loading.dismiss();
      
      const jenis = this.selectedPaket ? 'data' : 'pulsa';
      const success = await this.transaksiService.prosesPembayaran(jenis, totalAmount, {
        nomor: this.nomorHP,
        operator: this.operator,
        pulsa: this.selectedPulsa,
        paket: this.selectedPaket,
        total: totalAmount
      });

      if (success) {
        await this.showSuccessAlert(totalAmount);
      }
    }, 3000);
  }

  selectPulsa(amount: number) {
    this.selectedPulsa = this.selectedPulsa === amount ? 0 : amount;
  }

  selectPaket(amount: number) {
    this.selectedPaket = this.selectedPaket === amount ? 0 : amount;
  }

  private isValidPhoneNumber(nomor: string): boolean {
    // Validasi nomor HP Indonesia
    const phoneRegex = /^08[1-9][0-9]{7,10}$/;
    return phoneRegex.test(nomor);
  }

  private getPackageName(): string {
    if (this.selectedPaket) {
      const paket = this.dataPackages.find(p => p.amount === this.selectedPaket);
      return paket?.name || 'Paket Data';
    }
    return 'Pulsa Reguler';
  }

  private async showSuccessAlert(totalAmount: number) {
    const alert = await this.alertController.create({
      header: '✅ Pembelian Berhasil!',
      message: `
        <div style="text-align: center;">
          <p style="font-weight: 600; margin-bottom: 15px;">Pembelian ${this.getPackageName()} berhasil</p>
          <div style="background: #f8f9fa; padding: 15px; border-radius: 10px; margin: 10px 0;">
            <p style="margin: 5px 0;"><strong>Nomor HP:</strong> ${this.nomorHP}</p>
            <p style="margin: 5px 0;"><strong>Operator:</strong> ${this.operator}</p>
            <p style="margin: 5px 0;"><strong>Jenis:</strong> ${this.getPackageName()}</p>
            <p style="margin: 5px 0;"><strong>Total:</strong> Rp${this.formatCurrency(totalAmount)}</p>
          </div>
          <p style="font-size: 14px; color: #666; margin-top: 10px;">
            ${this.selectedPulsa ? 'Pulsa' : 'Paket data'} akan aktif dalam 1-3 menit
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