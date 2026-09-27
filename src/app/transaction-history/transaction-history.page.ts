import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, 
  IonButtons, IonBackButton, IonItem, IonLabel,
  IonAvatar, IonIcon, IonChip, NavController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowDownOutline, arrowUpOutline, appsOutline, trendingUpOutline, trendingDownOutline, swapHorizontalOutline, calendarOutline, timeOutline, chevronForwardOutline, receiptOutline, homeOutline } from 'ionicons/icons';

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.page.html',
  styleUrls: ['./transaction-history.page.scss'],
  standalone: true,
  imports: [
    CommonModule, IonHeader, IonToolbar, IonTitle,
    IonContent, IonButtons, IonBackButton, IonItem,
    IonLabel, IonAvatar, IonIcon, IonChip
  ]
})
export class TransactionHistoryPage implements OnInit {
  private navController = inject(NavController);

  allTransactions: any[] = [];
  filteredTransactions: any[] = [];
  activeFilter: string = 'all';

  constructor() {
    addIcons({appsOutline,trendingUpOutline,trendingDownOutline,swapHorizontalOutline,calendarOutline,timeOutline,chevronForwardOutline,receiptOutline,homeOutline,arrowDownOutline,arrowUpOutline});
  }

  ngOnInit() {
    this.loadTransactions();
    this.setFilter('all');
  }

  loadTransactions() {
    const savedTransactions = localStorage.getItem('recentTransactions');
    this.allTransactions = savedTransactions ? JSON.parse(savedTransactions) : [
      {
        id: '1',
        description: 'Transfer dari John',
        amount: 500000,
        type: 'income',
        category: 'transfer',
        date: new Date('2024-03-15T10:30:00'),
        status: 'completed'
      },
      {
        id: '2',
        description: 'GoFood - Resto Enak',
        amount: 75000,
        type: 'expense',
        category: 'food',
        date: new Date('2024-03-14T19:15:00'),
        status: 'completed'
      },
      {
        id: '3',
        description: 'Top Up Saldo',
        amount: 1000000,
        type: 'income',
        category: 'topup',
        date: new Date('2024-03-14T08:45:00'),
        status: 'completed'
      }
    ];
  }

  setFilter(filter: string) {
    this.activeFilter = filter;
    
    if (filter === 'all') {
      this.filteredTransactions = this.allTransactions;
    } else if (filter === 'income') {
      this.filteredTransactions = this.allTransactions.filter(t => t.type === 'income');
    } else if (filter === 'expense') {
      this.filteredTransactions = this.allTransactions.filter(t => t.type === 'expense');
    } else if (filter === 'transfer') {
      this.filteredTransactions = this.allTransactions.filter(t => t.category === 'transfer');
    }
  }

  viewTransactionDetail(transactionId: string) {
    this.navController.navigateForward(`/transaction-detail/${transactionId}`);
  }

  formatCurrency(amount: number): string {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  getTransactionIcon(type: string): string {
    return type === 'income' ? 'arrow-down-outline' : 'arrow-up-outline';
  }

  getTransactionColor(type: string): string {
    return type === 'income' ? 'success' : 'danger';
  }
}