import { Component, OnInit, inject, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, IonButton,
  IonIcon, IonText, IonItem, IonLabel, IonAvatar, IonButtons,
  AlertController, NavController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  notificationsOutline, scanOutline, eyeOutline, eyeOffOutline,
  paperPlaneOutline, downloadOutline, addCircleOutline, qrCodeOutline,
  appsOutline, receiptOutline, giftOutline, micOutline, arrowDownOutline,
  arrowUpOutline, swapHorizontalOutline, fastFoodOutline, carOutline,
  cardOutline, medkitOutline, flashOutline, waterOutline, wifiOutline,
  tvOutline, schoolOutline, gameControllerOutline, callOutline, cellularOutline
} from 'ionicons/icons';
import { SaldoService, Transaction } from '../services/saldo.service';
import { AnimasiService } from '../services/animasi.service';
import { TransaksiService } from '../services/transaksi.service';

interface Promo {
  id: string;
  title: string;
  description: string;
  discount: number;
  validUntil: Date;
  active: boolean;
  image: string; // Tambahkan properti image
}

@Component({
  selector: 'app-beranda',
  templateUrl: './beranda.page.html',
  styleUrls: ['./beranda.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule, IonHeader, IonToolbar, IonTitle, 
    IonContent, IonButton, IonIcon, IonText, IonItem, IonLabel, 
    IonAvatar, IonButtons
  ]
})
export class BerandaPage implements OnInit {
  @ViewChild('balanceAmount', { read: ElementRef }) balanceAmountEl!: ElementRef;
  @ViewChild('saldoCard', { read: ElementRef }) saldoCardEl!: ElementRef;

  private saldoService = inject(SaldoService);
  private animasiService = inject(AnimasiService);
  private transaksiService = inject(TransaksiService);
  private alertController = inject(AlertController);
  public navController = inject(NavController);

  currentBalance = 0;
  userCoins = 0;
  showBalance = true;
  monthlySpending = 257399;
  currentMonth = 'Maret';

  // Update promos dengan properti image
  promos: Promo[] = [
    {
      id: '1',
      title: 'Promo Besar Besaran 80%',
      description: 'Promo terbatas khusus untuk kamu',
      discount: 80,
      validUntil: new Date('2025-11-30'),
      active: true,
      image: 'assets/gambar/promo1.jpg' // Path gambar promo
    },
    {
      id: '2',
      title: 'Cashback Gede Setiap Hari',
      description: 'Setiap pembelian makanan favoritmu',
      discount: 20,
      validUntil: new Date('2025-11-30'),
      active: false,
      image: 'assets/gambar/promo2.jpg' // Path gambar promo
    },
    {
      id: '3',
      title: 'Diskon Akhir Tahun',
      description: 'Semua Transaksi',
      discount: 100,
      validUntil: new Date('2024-04-15'),
      active: false,
      image: 'assets/gambar/promo3.png' // Path gambar promo
    },
    {
      id: '4',
      title: 'FUN & KEKINIAN',
      description: 'Cashback untuk transaksi game dan hiburan',
      discount: 50,
      validUntil: new Date('2024-04-20'),
      active: true,
      image: 'assets/gambar/promo4.jpg' // Path gambar promo
    },
    {
      id: '5',
      title: 'Special Promo Tahun baru',
      description: 'Diskon besar untuk semua transaksi',
      discount: 50,
      validUntil: new Date('2024-04-20'),
      active: true,
      image: 'assets/gambar/promo5.jpg' // Path gambar promo
    }
  ];

  recentTransactions: Transaction[] = [];

  constructor() {
    addIcons({
      notificationsOutline, scanOutline, eyeOutline, eyeOffOutline,
      paperPlaneOutline, downloadOutline, addCircleOutline, qrCodeOutline,
      appsOutline, receiptOutline, giftOutline, micOutline, arrowDownOutline,
      arrowUpOutline, swapHorizontalOutline, fastFoodOutline, carOutline,
      cardOutline, medkitOutline, flashOutline, waterOutline, wifiOutline,
      tvOutline, schoolOutline, gameControllerOutline, callOutline, cellularOutline
    });
  }

  ngOnInit() {
    this.loadUserData();
    
    this.saldoService.saldo$.subscribe(saldo => {
      this.currentBalance = saldo;
      if (this.balanceAmountEl) {
        this.animasiService.animasiSaldoBerkurang(this.balanceAmountEl.nativeElement);
      }
    });

    this.saldoService.transactions$.subscribe(transactions => {
      this.recentTransactions = this.saldoService.getRecentTransactions(5);
    });
  }

  ngAfterViewInit() {
    if (this.saldoCardEl) {
      this.animasiService.animasiTransaksiSukses(this.saldoCardEl.nativeElement);
    }
  }

  loadUserData() {
    this.currentBalance = this.saldoService.getCurrentSaldo();
    this.recentTransactions = this.saldoService.getRecentTransactions(5);
  }

  formatCurrency(amount: number): string {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  toggleBalance() {
    this.showBalance = !this.showBalance;
    if (this.saldoCardEl) {
      this.animasiService.animasiTransaksiSukses(this.saldoCardEl.nativeElement);
    }
  }

  // Navigation Methods
  navigateToBPJS() {
    this.navController.navigateForward('/pembayaran-bpjs');
  }

  navigateToListrik() {
    this.navController.navigateForward('/pembayaran-listrik');
  }

  navigateToAir() {
    this.navController.navigateForward('/pembayaran-air');
  }

  navigateToInternet() {
    this.navController.navigateForward('/pembayaran-internet');
  }

  navigateToTV() {
    this.navController.navigateForward('/pembayaran-tv');
  }

  navigateToSPP() {
    this.navController.navigateForward('/pembayaran-spp');
  }

  navigateToGame() {
    this.navController.navigateForward('/topup-game');
  }

  navigateToEWallet() {
    this.navController.navigateForward('/topup-ewallet');
  }

  navigateToPulsaData() {
    this.navController.navigateForward('/pulsa-data');
  }

  sendMoney() {
    this.navController.navigateForward('/transfer');
  }

  requestMoney() {
    this.navController.navigateForward('/request-money');
  }

  topUp() {
    this.navController.navigateForward('/topup');
  }

  // Method untuk tombol Bayar (QR Code)
  openScanPay() {
    this.navController.navigateForward('/scan-pay');
  }

  openNotifications() {
    this.navController.navigateForward('/notifications');
  }

  openScan() {
    this.navController.navigateForward('/scan');
  }

  async openMoreActions() {
    const alert = await this.alertController.create({
      header: 'Fitur Lainnya',
      message: 'Pilih fitur yang ingin digunakan',
      buttons: [
        {
          text: 'Bayar BPJS',
          handler: () => this.navigateToBPJS()
        },
        {
          text: 'Bayar Listrik',
          handler: () => this.navigateToListrik()
        },
        {
          text: 'Bayar Air',
          handler: () => this.navigateToAir()
        },
        {
          text: 'Bayar Internet',
          handler: () => this.navigateToInternet()
        },
        {
          text: 'Bayar TV Kabel',
          handler: () => this.navigateToTV()
        },
        {
          text: 'Bayar SPP',
          handler: () => this.navigateToSPP()
        },
        {
          text: 'Top Up Game',
          handler: () => this.navigateToGame()
        },
        {
          text: 'Top Up E-Wallet',
          handler: () => this.navigateToEWallet()
        },
        {
          text: 'Pulsa & Data',
          handler: () => this.navigateToPulsaData()
        },
        {
          text: 'Batal',
          role: 'cancel'
        }
      ]
    });
    await alert.present();
  }

  async claimPromo(promo: Promo) {
    const alert = await this.alertController.create({
      header: 'Klaim Promo',
      message: `Anda akan mengklaim promo: ${promo.title}`,
      buttons: [
        {
          text: 'Batal',
          role: 'cancel'
        },
        {
          text: 'Klaim',
          handler: () => {
            this.showSuccessAlert('Promo berhasil diklaim!');
            // Tambahkan logika untuk menonaktifkan promo setelah diklaim
            promo.active = false;
          }
        }
      ]
    });
    await alert.present();
  }

  viewAllTransactions() {
    this.navController.navigateForward('/transaction-history');
  }

  // Method untuk tombol "Coba Sekarang!" di feature card
  tryTransfer() {
    this.navController.navigateForward('/free-transfer');
  }

  splitBill() {
    this.navController.navigateForward('/split-bill');
  }

  sendGift() {
    this.navController.navigateForward('/send-gift');
  }

  voiceMessage() {
    this.navController.navigateForward('/voice-message');
  }

  viewTransactionDetail(transactionId: string) {
    this.navController.navigateForward(`/transaction-detail/${transactionId}`);
  }

  getTransactionIcon(type: string): string {
    const icons: { [key: string]: string } = {
      'income': 'arrow-down-outline',
      'expense': 'arrow-up-outline',
      'transfer': 'swap-horizontal-outline',
      'food': 'fast-food-outline',
      'transport': 'car-outline',
      'topup': 'add-circle-outline',
      'bpjs': 'medkit-outline',
      'listrik': 'flash-outline',
      'air': 'water-outline',
      'internet': 'wifi-outline',
      'tv': 'tv-outline',
      'spp': 'school-outline',
      'game': 'game-controller-outline',
      'ewallet': 'card-outline',
      'pulsa': 'call-outline',
      'data': 'cellular-outline'
    };
    return icons[type] || 'card-outline';
  }

  getTransactionColor(type: string): string {
    return type === 'income' ? 'success' : 'danger';
  }

  getTransactionAvatarClass(transaction: Transaction): string {
    return transaction.type === 'income' ? 'income-avatar' : 'expense-avatar';
  }

  getSpendingPercentage(): number {
    const maxSpending = 1000000;
    return Math.min((this.monthlySpending / maxSpending) * 100, 100);
  }

  // Method untuk mendapatkan status promo
  isPromoActive(promo: Promo): boolean {
    return promo.active && new Date() <= promo.validUntil;
  }

  // Method untuk format tanggal promo
  formatPromoDate(date: Date): string {
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }

  private async showSuccessAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Sukses',
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

  ionViewWillEnter() {
    this.loadUserData();
  }
  // Tambahkan method ini di BerandaPage class
async viewPromoDetail(promo: Promo) {
  const alert = await this.alertController.create({
    header: promo.title,
    message: promo.description,
    buttons: ['OK']
  });
  await alert.present();
}
}