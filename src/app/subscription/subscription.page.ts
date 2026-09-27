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
  IonCard,
  IonButton,
  IonIcon,
  IonLabel,
  IonItem,
  IonBadge,
  AlertController,
  NavController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  diamond,
  star,
  rocket,
  checkmark,
  close,
  flash,
  shieldCheckmark,
  speedometer,
  people,
  business,
  gift,
  card,
  calendar,
  download,
  shareSocial,
  trophy, ellipsisHorizontal } from 'ionicons/icons';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.page.html',
  styleUrls: ['./subscription.page.scss'],
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
    IonCard,
    IonButton,
    IonIcon,
    IonLabel,
    IonItem,
    IonBadge,
  ]
})
export class SubscriptionPage {
  currentPlan = {
    name: 'Premium',
    price: 49900,
    period: 'bulan',
    expires: '2024-12-31',
    features: [
      'Transfer gratis unlimited',
      'Cashback 5% semua transaksi',
      'Limit harian Rp 50 juta',
      'Support priority 24/7',
      'Kartu virtual premium'
    ]
  };

  subscriptionPlans = [
    {
      id: 1,
      name: 'Basic',
      price: 0,
      period: 'bulan',
      popular: false,
      recommended: false,
      features: [
        { name: 'Transfer gratis 10x/bulan', included: true },
        { name: 'Cashback 1%', included: true },
        { name: 'Limit harian Rp 5 juta', included: true },
        { name: 'Support standar', included: true },
        { name: 'Kartu virtual basic', included: true },
        { name: 'Analytics lengkap', included: false },
        { name: 'Export data', included: false },
        { name: 'Multi-user access', included: false }
      ],
      icon: 'star',
      color: '#6b7280'
    },
    {
      id: 2,
      name: 'Premium',
      price: 49900,
      period: 'bulan',
      popular: true,
      recommended: true,
      features: [
        { name: 'Transfer gratis unlimited', included: true },
        { name: 'Cashback 5% semua transaksi', included: true },
        { name: 'Limit harian Rp 50 juta', included: true },
        { name: 'Support priority 24/7', included: true },
        { name: 'Kartu virtual premium', included: true },
        { name: 'Analytics lengkap', included: true },
        { name: 'Export data', included: true },
        { name: 'Multi-user access', included: false }
      ],
      icon: 'diamond',
      color: '#f59e0b'
    },
    {
      id: 3,
      name: 'Business',
      price: 149900,
      period: 'bulan',
      popular: false,
      recommended: false,
      features: [
        { name: 'Transfer gratis unlimited', included: true },
        { name: 'Cashback 7% semua transaksi', included: true },
        { name: 'Limit harian Rp 500 juta', included: true },
        { name: 'Dedicated account manager', included: true },
        { name: 'Kartu physical premium', included: true },
        { name: 'Analytics lengkap', included: true },
        { name: 'Export data', included: true },
        { name: 'Multi-user access', included: true }
      ],
      icon: 'business',
      color: '#ef4444'
    }
  ];

  billingHistory = [
    {
      id: 1,
      date: '2024-11-15',
      plan: 'Premium',
      amount: 49900,
      status: 'success',
      invoice: 'INV-2024-11-001'
    },
    {
      id: 2,
      date: '2024-10-15',
      plan: 'Premium',
      amount: 49900,
      status: 'success',
      invoice: 'INV-2024-10-001'
    },
    {
      id: 3,
      date: '2024-09-15',
      plan: 'Premium',
      amount: 49900,
      status: 'success',
      invoice: 'INV-2024-09-001'
    }
  ];

  benefits = [
    {
      icon: 'flash',
      title: 'Transfer Instan',
      description: 'Proses transfer lebih cepat tanpa antrian'
    },
    {
      icon: 'shieldCheckmark',
      title: 'Keamanan Extra',
      description: 'Proteksi tambahan untuk semua transaksi'
    },
    {
      icon: 'speedometer',
      title: 'Limit Tinggi',
      description: 'Batas transaksi harian lebih besar'
    },
    {
      icon: 'people',
      title: 'Support Priority',
      description: 'Layanan pelanggan prioritas 24/7'
    }
  ];

  constructor(
    private alertController: AlertController,
    private navCtrl: NavController
  ) {
    addIcons({diamond,ellipsisHorizontal,checkmark,trophy,download,shareSocial,star,rocket,close,flash,shieldCheckmark,speedometer,people,business,gift,card,calendar});
  }

  // Pilih plan langganan
  async selectPlan(plan: any) {
    if (plan.price === 0) {
      // Plan gratis
      const alert = await this.alertController.create({
        header: 'Pindah ke Basic',
        message: 'Anda akan beralih ke paket Basic. Fitur premium akan dinonaktifkan.',
        buttons: [
          {
            text: 'Batal',
            role: 'cancel'
          },
          {
            text: 'Konfirmasi',
            handler: () => {
              this.switchToPlan(plan);
            }
          }
        ]
      });
      await alert.present();
    } else {
      // Plan berbayar
      const alert = await this.alertController.create({
        header: `Upgrade ke ${plan.name}`,
        message: `Anda akan berlangganan ${plan.name} seharga Rp ${plan.price.toLocaleString('id-ID')}/${plan.period}.`,
        buttons: [
          {
            text: 'Batal',
            role: 'cancel'
          },
          {
            text: 'Lanjutkan Pembayaran',
            handler: () => {
              this.processPayment(plan);
            }
          }
        ]
      });
      await alert.present();
    }
  }

  // Proses pembayaran
  async processPayment(plan: any) {
    const alert = await this.alertController.create({
      header: 'Pembayaran',
      message: `Pilih metode pembayaran untuk ${plan.name}:`,
      inputs: [
        {
          name: 'payment',
          type: 'radio',
          label: 'Kartu Kredit',
          value: 'credit',
          checked: true
        },
        {
          name: 'payment',
          type: 'radio',
          label: 'Transfer Bank',
          value: 'bank'
        },
        {
          name: 'payment',
          type: 'radio',
          label: 'E-Wallet',
          value: 'ewallet'
        }
      ],
      buttons: [
        {
          text: 'Batal',
          role: 'cancel'
        },
        {
          text: 'Bayar',
          handler: (data) => {
            this.completePayment(plan, data);
          }
        }
      ]
    });
    await alert.present();
  }

  async completePayment(plan: any, paymentMethod: string) {
    // Simulasi proses pembayaran
    const loadingAlert = await this.alertController.create({
      header: 'Memproses Pembayaran',
      message: 'Sedang memverifikasi pembayaran Anda...',
      backdropDismiss: false
    });
    
    await loadingAlert.present();

    // Simulasi delay pembayaran
    setTimeout(async () => {
      await loadingAlert.dismiss();
      
      const successAlert = await this.alertController.create({
        header: 'Berhasil!',
        message: `Langganan ${plan.name} berhasil diaktifkan.`,
        buttons: ['OK']
      });
      
      await successAlert.present();
      this.switchToPlan(plan);
    }, 2000);
  }

  switchToPlan(plan: any) {
    this.currentPlan = {
      name: plan.name,
      price: plan.price,
      period: plan.period,
      expires: this.calculateExpiryDate(),
      features: plan.features.filter((f: any) => f.included).map((f: any) => f.name)
    };
    
    console.log('Berhasil beralih ke plan:', plan.name);
  }

  // Kelola langganan
  async manageSubscription() {
    const actionSheet = await this.alertController.create({
      header: 'Kelola Langganan',
      message: 'Pilih aksi untuk langganan Anda:',
      buttons: [
        {
          text: 'Lihat Detail Faktur',
          handler: () => {
            this.viewInvoiceDetails();
          }
        },
        {
          text: 'Unduh Faktur',
          handler: () => {
            this.downloadInvoice();
          }
        },
        {
          text: 'Berbagi Langganan',
          handler: () => {
            this.shareSubscription();
          }
        },
        {
          text: 'Batalkan Langganan',
          role: 'destructive',
          handler: () => {
            this.cancelSubscription();
          }
        },
        {
          text: 'Batal',
          role: 'cancel'
        }
      ]
    });
    await actionSheet.present();
  }

  async viewInvoiceDetails() {
    const alert = await this.alertController.create({
      header: 'Detail Faktur',
      message: 'Menampilkan detail faktur langganan.',
      buttons: ['OK']
    });
    await alert.present();
  }

  async downloadInvoice() {
    const alert = await this.alertController.create({
      header: 'Unduh Faktur',
      message: 'Faktur akan diunduh dalam format PDF.',
      buttons: ['OK']
    });
    await alert.present();
  }

  async shareSubscription() {
    const alert = await this.alertController.create({
      header: 'Berbagi Langganan',
      message: 'Bagikan manfaat langganan dengan teman Anda.',
      buttons: ['OK']
    });
    await alert.present();
  }

  async cancelSubscription() {
    const alert = await this.alertController.create({
      header: 'Batalkan Langganan',
      message: 'Apakah Anda yakin ingin membatalkan langganan? Fitur premium akan berakhir pada tanggal expire.',
      buttons: [
        {
          text: 'Batal',
          role: 'cancel'
        },
        {
          text: 'Ya, Batalkan',
          role: 'destructive',
          handler: () => {
            this.switchToPlan(this.subscriptionPlans[0]); // Switch to Basic
          }
        }
      ]
    });
    await alert.present();
  }

  // Helper methods
  private calculateExpiryDate(): string {
    const date = new Date();
    date.setMonth(date.getMonth() + 1);
    return date.toISOString().split('T')[0];
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }

  getStatusBadgeColor(status: string): string {
    const colors: { [key: string]: string } = {
      'success': 'success',
      'pending': 'warning',
      'failed': 'danger'
    };
    return colors[status] || 'medium';
  }
}