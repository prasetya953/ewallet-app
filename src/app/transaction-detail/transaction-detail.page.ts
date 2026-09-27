import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, 
  IonButtons, IonBackButton, IonLabel,
  IonText, IonChip, IonIcon, IonButton
} from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { addIcons } from 'ionicons';
import { 
  checkmarkCircleOutline, timeOutline, closeCircleOutline, 
  helpCircleOutline, informationCircleOutline, calendarOutline, 
  swapHorizontalOutline, pricetagsOutline, personOutline, 
  checkmarkOutline, shareOutline, warningOutline,
  fastFoodOutline, addCircleOutline, flashOutline,
  waterOutline, wifiOutline, tvOutline, schoolOutline,
  gameControllerOutline, cardOutline, callOutline,
  cellularOutline, receiptOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transaction-detail.page.html',
  styleUrls: ['./transaction-detail.page.scss'],
  standalone: true,
  imports: [
    CommonModule, IonHeader, IonToolbar, IonTitle,
    IonContent, IonButtons, IonBackButton,
    IonLabel, IonText, IonChip, IonIcon, IonButton
  ]
})
export class TransactionDetailPage implements OnInit {
  private activatedRoute = inject(ActivatedRoute);

  transaction: any = null;
  transactionId: string = '';

  constructor() {
    addIcons({
      informationCircleOutline,
      calendarOutline,
      swapHorizontalOutline,
      pricetagsOutline,
      personOutline,
      timeOutline,
      checkmarkOutline,
      shareOutline,
      warningOutline,
      checkmarkCircleOutline,
      closeCircleOutline,
      helpCircleOutline,
      fastFoodOutline,
      addCircleOutline,
      flashOutline,
      waterOutline,
      wifiOutline,
      tvOutline,
      schoolOutline,
      gameControllerOutline,
      cardOutline,
      callOutline,
      cellularOutline,
      receiptOutline
    });
  }

  ngOnInit() {
    this.transactionId = this.activatedRoute.snapshot.paramMap.get('id') || '';
    this.loadTransaction();
  }

  loadTransaction() {
    const savedTransactions = localStorage.getItem('recentTransactions');
    if (savedTransactions) {
      const transactions: any[] = JSON.parse(savedTransactions);
      this.transaction = transactions.find(t => t.id === this.transactionId) || null;
      
      if (this.transaction) {
        this.transaction.date = new Date(this.transaction.date);
      }
    }
  }

  getStatusIcon(status: string): string {
    switch (status) {
      case 'completed': return 'checkmark-circle-outline';
      case 'pending': return 'time-outline';
      case 'failed': return 'close-circle-outline';
      default: return 'help-circle-outline';
    }
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'completed': return 'success';
      case 'pending': return 'warning';
      case 'failed': return 'danger';
      default: return 'medium';
    }
  }

  getStatusText(status: string): string {
    const statusMap: { [key: string]: string } = {
      'completed': 'Berhasil',
      'pending': 'Diproses',
      'failed': 'Gagal'
    };
    return statusMap[status] || status;
  }

  getCategoryText(category: string): string {
    const categoryMap: { [key: string]: string } = {
      'transfer': 'Transfer',
      'food': 'Makanan',
      'topup': 'Top Up',
      'listrik': 'Listrik',
      'air': 'Air',
      'internet': 'Internet',
      'tv': 'TV Kabel',
      'spp': 'SPP',
      'game': 'Game',
      'ewallet': 'E-Wallet',
      'pulsa': 'Pulsa',
      'data': 'Data'
    };
    return categoryMap[category] || category;
  }

  getCompletionTime(date: Date): string {
    const completionDate = new Date(date);
    completionDate.setMinutes(completionDate.getMinutes() + 2); // Tambah 2 menit untuk waktu selesai
    return completionDate.toLocaleTimeString('id-ID', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  }

  getTransactionIcon(category: string): string {
    const icons: { [key: string]: string } = {
      'transfer': 'swap-horizontal-outline',
      'food': 'fast-food-outline',
      'topup': 'add-circle-outline',
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
    return icons[category] || 'receipt-outline';
  }

  formatCurrency(amount: number): string {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }
}