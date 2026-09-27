import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, 
  IonButtons, IonBackButton,
  IonButton, IonIcon
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  arrowBack, checkmarkDone, notificationsOffOutline,
  cardOutline, swapHorizontalOutline, pricetagOutline,
  notificationsOutline, shieldCheckmarkOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    IonHeader, IonToolbar, IonTitle, IonContent, 
    IonButtons, IonBackButton,IonButton, IonIcon
  ]
})
export class NotificationsPage {
  
  constructor() {
    addIcons({
      arrowBack, checkmarkDone, notificationsOffOutline,
      cardOutline, swapHorizontalOutline, pricetagOutline,
      notificationsOutline, shieldCheckmarkOutline
    });
  }

  notifications = [
    { 
      id: 1, 
      title: 'Top Up Berhasil', 
      message: 'Top up saldo sebesar Rp 500.000 berhasil diproses', 
      time: '2 menit lalu', 
      read: false,
      type: 'payment'
    },
    { 
      id: 2, 
      title: 'Transfer Masuk', 
      message: 'Anda menerima transfer Rp 1.200.000 dari Budi Santoso', 
      time: '1 jam lalu', 
      read: false,
      type: 'transfer'
    },
    { 
      id: 3, 
      title: 'Promo Spesial!', 
      message: 'Diskon 90% untuk GoRide. Berlaku hingga 30 November', 
      time: '3 jam lalu', 
      read: true,
      type: 'promo'
    },
    { 
      id: 4, 
      title: 'Pembayaran Listrik', 
      message: 'Pembayaran tagihan listrik Rp 350.000 berhasil', 
      time: '5 jam lalu', 
      read: true,
      type: 'payment'
    },
    { 
      id: 5, 
      title: 'Transfer Keluar', 
      message: 'Transfer ke Siti Rahayu sebesar Rp 750.000 berhasil', 
      time: 'Kemarin', 
      read: true,
      type: 'transfer'
    },
    { 
      id: 6, 
      title: 'Keamanan Akun', 
      message: 'Perangkat baru terdeteksi. Periksa aktivitas login', 
      time: 'Kemarin', 
      read: true,
      type: 'security'
    },
    { 
      id: 7, 
      title: 'Pembelian Pulsa', 
      message: 'Pulsa Rp 100.000 untuk 08123456789 berhasil', 
      time: '2 hari lalu', 
      read: true,
      type: 'payment'
    },
    { 
      id: 8, 
      title: 'Update Aplikasi', 
      message: 'Versi terbaru aplikasi tersedia. Update sekarang?', 
      time: '3 hari lalu', 
      read: true,
      type: 'system'
    },
    { 
      id: 9, 
      title: 'Cashback GoFood', 
      message: 'Dapatkan cashback 20% untuk pesanan GoFood pertama', 
      time: '1 minggu lalu', 
      read: true,
      type: 'promo'
    },
    { 
      id: 10, 
      title: 'Pembayaran BPJS', 
      message: 'Pembayaran iuran BPJS Rp 150.000 berhasil diproses', 
      time: '1 minggu lalu', 
      read: true,
      type: 'payment'
    }
  ];

  markAsRead(notification: any) {
    notification.read = true;
  }

  markAllAsRead() {
    this.notifications.forEach(notif => notif.read = true);
  }

  getNotificationIcon(type: string): string {
    const iconMap: { [key: string]: string } = {
      'payment': 'payment',
      'transfer': 'transfer',
      'promo': 'promo',
      'system': 'system',
      'security': 'security'
    };
    return iconMap[type] || 'system';
  }

  getNotificationIconName(type: string): string {
    const iconNameMap: { [key: string]: string } = {
      'payment': 'card-outline',
      'transfer': 'swap-horizontal-outline',
      'promo': 'pricetag-outline',
      'system': 'notifications-outline',
      'security': 'shield-checkmark-outline'
    };
    return iconNameMap[type] || 'notifications-outline';
  }

  get unreadCount(): number {
    return this.notifications.filter(notif => !notif.read).length;
  }
}