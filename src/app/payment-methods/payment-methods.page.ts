import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar, 
  IonButtons, 
  IonBackButton,
  IonItem, 
  IonLabel, 
  IonIcon,
  IonButton,
  IonCard,
  IonChip,
  IonToggle, // Tambahkan IonToggle di sini
  AlertController,
  ActionSheetController,
  NavController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  card,
  add,
  wallet,
  qrCode,
  phonePortrait,
  business,
  trash,
  pencil,
  checkmarkCircle,
  ellipsisHorizontal,
  logoApple,
  logoGoogle,
  logoPaypal,
  logoAmazon,
  shieldCheckmark
} from 'ionicons/icons';

@Component({
  selector: 'app-payment-methods',
  templateUrl: './payment-methods.page.html',
  styleUrls: ['./payment-methods.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonItem,
    IonLabel,
    IonIcon,
    IonButton,
    IonCard,
    IonChip,
    IonToggle // Tambahkan di imports juga
  ]
})
export class PaymentMethodsPage {
  paymentMethods = [
    {
      id: 1,
      type: 'bank',
      name: 'BCA Virtual Account',
      number: '8880 1234 5678 9012',
      balance: 2500000,
      isDefault: true,
      icon: 'business',
      color: '#1e40af'
    },
    {
      id: 2,
      type: 'card',
      name: 'Kartu Kredit BCA',
      number: '**** 1234',
      expiry: '12/25',
      isDefault: false,
      icon: 'card',
      color: '#dc2626'
    },
    {
      id: 3,
      type: 'ewallet',
      name: 'Gopay',
      number: '0812 3456 7890',
      balance: 500000,
      isDefault: false,
      icon: 'phonePortrait',
      color: '#00aa13'
    },
    {
      id: 4,
      type: 'ewallet',
      name: 'OVO',
      number: '0812 3456 7890',
      balance: 750000,
      isDefault: false,
      icon: 'qrCode',
      color: '#4f46e5'
    }
  ];

  digitalWallets = [
    {
      id: 1,
      name: 'Apple Pay',
      icon: 'logoApple',
      color: '#000000',
      connected: true
    },
    {
      id: 2,
      name: 'Google Pay',
      icon: 'logoGoogle',
      color: '#4285f4',
      connected: false
    },
    {
      id: 3,
      name: 'PayPal',
      icon: 'logoPaypal',
      color: '#0070ba',
      connected: true
    },
    {
      id: 4,
      name: 'Amazon Pay',
      icon: 'logoAmazon',
      color: '#ff9900',
      connected: false
    }
  ];

  otherMethods = [
    {
      id: 1,
      name: 'QRIS',
      description: 'Bayar dengan scan QR code',
      enabled: true,
      icon: 'qrCode'
    },
    {
      id: 2,
      name: 'Transfer Bank',
      description: 'Transfer manual ke rekening bank',
      enabled: true,
      icon: 'business'
    },
    {
      id: 3,
      name: 'PayLater',
      description: 'Bayar nanti dengan cicilan',
      enabled: false,
      icon: 'card'
    }
  ];

  constructor(
    private alertController: AlertController,
    private actionSheetController: ActionSheetController,
    private navCtrl: NavController
  ) {
    addIcons({ 
      card,
      add,
      wallet,
      qrCode,
      phonePortrait,
      business,
      trash,
      pencil,
      checkmarkCircle,
      ellipsisHorizontal,
      logoApple,
      logoGoogle,
      logoPaypal,
      logoAmazon,
      shieldCheckmark
    });
  }

  // Tambah metode pembayaran baru
  async addPaymentMethod() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Tambah Metode Pembayaran',
      buttons: [
        {
          text: 'Kartu Bank',
          icon: 'card',
          handler: () => {
            this.addBankCard();
          }
        },
        {
          text: 'E-Wallet',
          icon: 'phonePortrait',
          handler: () => {
            this.addEWallet();
          }
        },
        {
          text: 'Virtual Account',
          icon: 'business',
          handler: () => {
            this.addVirtualAccount();
          }
        },
        {
          text: 'Batal',
          icon: 'close',
          role: 'cancel'
        }
      ]
    });
    await actionSheet.present();
  }

  async addBankCard() {
    const alert = await this.alertController.create({
      header: 'Tambah Kartu Bank',
      inputs: [
        {
          name: 'cardNumber',
          type: 'text',
          placeholder: 'Nomor Kartu',
          attributes: {
            maxlength: 16
          }
        },
        {
          name: 'cardName',
          type: 'text',
          placeholder: 'Nama di Kartu'
        },
        {
          name: 'expiry',
          type: 'text',
          placeholder: 'MM/YY'
        },
        {
          name: 'cvv',
          type: 'text',
          placeholder: 'CVV',
          attributes: {
            maxlength: 3
          }
        }
      ],
      buttons: [
        {
          text: 'Batal',
          role: 'cancel'
        },
        {
          text: 'Simpan',
          handler: (data) => {
            if (data.cardNumber && data.cardName && data.expiry && data.cvv) {
              this.showSuccess('Kartu bank berhasil ditambahkan');
            }
          }
        }
      ]
    });
    await alert.present();
  }

  async addEWallet() {
    const alert = await this.alertController.create({
      header: 'Tambah E-Wallet',
      inputs: [
        {
          name: 'walletType',
          type: 'text',
          placeholder: 'Jenis E-Wallet (Gopay, OVO, dll)'
        },
        {
          name: 'phoneNumber',
          type: 'tel',
          placeholder: 'Nomor Telepon'
        }
      ],
      buttons: [
        {
          text: 'Batal',
          role: 'cancel'
        },
        {
          text: 'Simpan',
          handler: (data) => {
            if (data.walletType && data.phoneNumber) {
              this.showSuccess('E-Wallet berhasil ditambahkan');
            }
          }
        }
      ]
    });
    await alert.present();
  }

  async addVirtualAccount() {
    const alert = await this.alertController.create({
      header: 'Buat Virtual Account',
      message: 'Virtual Account akan dibuat otomatis untuk pembayaran yang lebih aman.',
      buttons: [
        {
          text: 'Batal',
          role: 'cancel'
        },
        {
          text: 'Buat',
          handler: () => {
            this.showSuccess('Virtual Account berhasil dibuat');
          }
        }
      ]
    });
    await alert.present();
  }

  // Kelola metode pembayaran
  async managePaymentMethod(method: any) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Kelola Pembayaran',
      buttons: [
        {
          text: 'Jadikan Default',
          icon: 'checkmarkCircle',
          handler: () => {
            this.setAsDefault(method);
          }
        },
        {
          text: 'Edit',
          icon: 'pencil',
          handler: () => {
            this.editPaymentMethod(method);
          }
        },
        {
          text: 'Hapus',
          icon: 'trash',
          role: 'destructive',
          handler: () => {
            this.deletePaymentMethod(method);
          }
        },
        {
          text: 'Batal',
          icon: 'close',
          role: 'cancel'
        }
      ]
    });
    await actionSheet.present();
  }

  setAsDefault(method: any) {
    this.paymentMethods.forEach(m => m.isDefault = false);
    method.isDefault = true;
    this.showSuccess(`${method.name} sekarang menjadi metode default`);
  }

  async editPaymentMethod(method: any) {
    const alert = await this.alertController.create({
      header: 'Edit Metode Pembayaran',
      message: `Edit ${method.name}`,
      buttons: ['OK']
    });
    await alert.present();
  }

  async deletePaymentMethod(method: any) {
    const alert = await this.alertController.create({
      header: 'Hapus Metode Pembayaran',
      message: `Apakah Anda yakin ingin menghapus ${method.name}?`,
      buttons: [
        {
          text: 'Batal',
          role: 'cancel'
        },
        {
          text: 'Hapus',
          role: 'destructive',
          handler: () => {
            this.paymentMethods = this.paymentMethods.filter(m => m.id !== method.id);
            this.showSuccess('Metode pembayaran berhasil dihapus');
          }
        }
      ]
    });
    await alert.present();
  }

  // Kelola digital wallet
  async toggleDigitalWallet(wallet: any) {
    wallet.connected = !wallet.connected;
    const status = wallet.connected ? 'terhubung' : 'terputus';
    this.showSuccess(`${wallet.name} berhasil ${status}`);
  }

  // Toggle other methods
  toggleOtherMethod(method: any) {
    method.enabled = !method.enabled;
    const status = method.enabled ? 'diaktifkan' : 'dinonaktifkan';
    this.showSuccess(`${method.name} berhasil ${status}`);
  }

  // Helper methods
  private async showSuccess(message: string) {
    const alert = await this.alertController.create({
      header: 'Berhasil',
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

  formatBalance(balance: number): string {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(balance);
  }

  getPaymentMethodType(type: string): string {
    const types: { [key: string]: string } = {
      'bank': 'Bank',
      'card': 'Kartu',
      'ewallet': 'E-Wallet'
    };
    return types[type] || type;
  }
}