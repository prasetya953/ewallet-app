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
  IonToggle,
  AlertController,
  NavController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  shieldCheckmark, 
  lockClosed, 
  fingerPrint, 
  desktop, 
  notifications,
  eyeOff,
  download,
  trash,
  key,
  warning,
  logOut,
  logIn,
  card,
  chevronForward,
  mail,
  phonePortrait,
  globe, time } from 'ionicons/icons';

@Component({
  selector: 'app-security',
  templateUrl: './security.page.html',
  styleUrls: ['./security.page.scss'],
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
    IonToggle
  ]
})
export class SecurityPage {
  // Security Settings
  is2FAEnabled: boolean = true;
  isBiometricEnabled: boolean = true;
  isLoginNotificationsEnabled: boolean = true;
  isTransactionNotificationsEnabled: boolean = true;
  isSecurityAlertsEnabled: boolean = true;
  isEmailNotificationsEnabled: boolean = true;
  isSMSNotificationsEnabled: boolean = true;
  isAppTrackingEnabled: boolean = false;
  
  // Session Management
  activeSessions: number = 3;
  lastLogin: string = '2 jam yang lalu';
  currentDevice: string = 'iPhone 13 Pro';

  constructor(
    private alertController: AlertController,
    private navCtrl: NavController
  ) {
    addIcons({shieldCheckmark,lockClosed,key,chevronForward,fingerPrint,notifications,logIn,card,mail,phonePortrait,desktop,time,globe,warning,logOut,trash,eyeOff,download});
  }

  // Authentication Methods
  async changePassword() {
    const alert = await this.alertController.create({
      header: 'Ubah Kata Sandi',
      message: 'Kami akan mengirimkan email untuk mengubah kata sandi Anda.',
      buttons: [
        {
          text: 'Batal',
          role: 'cancel'
        },
        {
          text: 'Kirim Email',
          handler: () => {
            this.showSuccessAlert('Email verifikasi telah dikirim!');
          }
        }
      ]
    });
    await alert.present();
  }

  toggle2FA() {
    this.is2FAEnabled = !this.is2FAEnabled;
    const message = this.is2FAEnabled ? 
      'Autentikasi 2 faktor telah diaktifkan' : 
      'Autentikasi 2 faktor telah dinonaktifkan';
    this.showSuccessAlert(message);
  }

  toggleBiometric() {
    this.isBiometricEnabled = !this.isBiometricEnabled;
    const message = this.isBiometricEnabled ? 
      'Login biometrik telah diaktifkan' : 
      'Login biometrik telah dinonaktifkan';
    this.showSuccessAlert(message);
  }

  // Notification Methods
  toggleLoginNotifications() {
    this.isLoginNotificationsEnabled = !this.isLoginNotificationsEnabled;
  }

  toggleTransactionNotifications() {
    this.isTransactionNotificationsEnabled = !this.isTransactionNotificationsEnabled;
  }

  toggleSecurityAlerts() {
    this.isSecurityAlertsEnabled = !this.isSecurityAlertsEnabled;
  }

  toggleEmailNotifications() {
    this.isEmailNotificationsEnabled = !this.isEmailNotificationsEnabled;
  }

  toggleSMSNotifications() {
    this.isSMSNotificationsEnabled = !this.isSMSNotificationsEnabled;
  }

  toggleAppTracking() {
    this.isAppTrackingEnabled = !this.isAppTrackingEnabled;
  }

  // Session Management
  async manageSessions() {
    const alert = await this.alertController.create({
      header: 'Sesi Aktif',
      message: `
        <div style="text-align: left;">
          <p><strong>Perangkat Saat Ini:</strong> ${this.currentDevice}</p>
          <p><strong>Login Terakhir:</strong> ${this.lastLogin}</p>
          <p><strong>Total Sesi Aktif:</strong> ${this.activeSessions} perangkat</p>
        </div>
      `,
      buttons: [
        {
          text: 'Tutup',
          role: 'cancel'
        },
        {
          text: 'Keluar Semua',
          handler: () => {
            this.logoutAllDevices();
          }
        }
      ]
    });
    await alert.present();
  }

  async viewSecurityHistory() {
    const alert = await this.alertController.create({
      header: 'Riwayat Keamanan',
      message: 'Menampilkan riwayat aktivitas keamanan akun Anda.',
      buttons: ['OK']
    });
    await alert.present();
  }

  // Data & Privacy
  async exportData() {
    const alert = await this.alertController.create({
      header: 'Ekspor Data',
      message: 'Data keamanan dan aktivitas Anda akan diekspor dalam format PDF.',
      buttons: [
        {
          text: 'Batal',
          role: 'cancel'
        },
        {
          text: 'Ekspor',
          handler: () => {
            this.showSuccessAlert('Data sedang diproses dan akan dikirim ke email Anda.');
          }
        }
      ]
    });
    await alert.present();
  }

  async clearHistory() {
    const alert = await this.alertController.create({
      header: 'Hapus Riwayat',
      message: 'Riwayat aktivitas dan log keamanan akan dihapus permanen.',
      buttons: [
        {
          text: 'Batal',
          role: 'cancel'
        },
        {
          text: 'Hapus',
          role: 'destructive',
          handler: () => {
            this.showSuccessAlert('Riwayat berhasil dihapus.');
          }
        }
      ]
    });
    await alert.present();
  }

  async managePermissions() {
    const alert = await this.alertController.create({
      header: 'Izin Aplikasi',
      message: 'Kelola izin akses yang diberikan kepada aplikasi e-wallet.',
      buttons: ['OK']
    });
    await alert.present();
  }

  // Emergency Actions
  async logoutAllDevices() {
    const alert = await this.alertController.create({
      header: 'Keluar dari Semua Perangkat',
      message: 'Anda akan keluar dari semua perangkat yang terhubung. Anda perlu login kembali di perangkat ini.',
      buttons: [
        {
          text: 'Batal',
          role: 'cancel'
        },
        {
          text: 'Keluar',
          role: 'destructive',
          handler: () => {
            this.showSuccessAlert('Berhasil keluar dari semua perangkat.');
            this.activeSessions = 1;
          }
        }
      ]
    });
    await alert.present();
  }

  async deleteAccount() {
    const alert = await this.alertController.create({
      header: 'Hapus Akun',
      message: 'Tindakan ini tidak dapat dibatalkan. Semua data, riwayat transaksi, dan informasi akun akan dihapus permanen.',
      inputs: [
        {
          name: 'confirmation',
          type: 'text',
          placeholder: 'Ketik "HAPUS" untuk konfirmasi'
        }
      ],
      buttons: [
        {
          text: 'Batal',
          role: 'cancel'
        },
        {
          text: 'Hapus',
          role: 'destructive',
          handler: (data) => {
            if (data.confirmation === 'HAPUS') {
              this.showSuccessAlert('Akun berhasil dihapus.');
              this.navCtrl.navigateRoot('/login');
            } else {
              this.showErrorAlert('Konfirmasi tidak valid. Silakan ketik "HAPUS".');
            }
          }
        }
      ]
    });
    await alert.present();
  }

  // Helper Methods
  private async showSuccessAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Berhasil',
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

  private async showErrorAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }
}