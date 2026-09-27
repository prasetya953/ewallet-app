import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

interface Transaction {
  id: string;
  type: 'income' | 'expense' | 'transfer';
  amount: number;
  description: string;
  category: string;
  date: string;
  status: 'success' | 'failed' | 'pending';
  recipient?: string;
  sender?: string;
  transactionId?: string;
}

@Component({
  selector: 'app-detail-transaksi',
  templateUrl: './detail-transaksi.page.html',
  styleUrls: ['./detail-transaksi.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule] // Import yang diperlukan
})
export class DetailTransaksiPage implements OnInit {
  transaction: Transaction | null = null;
  relatedTransactions: Transaction[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadTransactionData();
    this.loadRelatedTransactions();
  }

  loadTransactionData() {
    const transactionId = this.route.snapshot.paramMap.get('id');
    
    this.transaction = {
      id: transactionId || '1',
      type: 'expense',
      amount: 250000,
      description: 'Pembayaran GrabCar',
      category: 'Transportasi',
      date: new Date().toISOString(),
      status: 'success',
      recipient: 'PT Grab Teknologi Indonesia',
      transactionId: 'GOMOBISTIQ' + Math.random().toString(36).substr(2, 9).toUpperCase()
    };
  }

  loadRelatedTransactions() {
    this.relatedTransactions = [
      {
        id: '2',
        type: 'expense',
        amount: 150000,
        description: 'Pembayaran GoFood',
        category: 'Makanan & Minuman',
        date: new Date(Date.now() - 86400000).toISOString(),
        status: 'success'
      },
      {
        id: '3',
        type: 'income',
        amount: 500000,
        description: 'Transfer dari Andi',
        category: 'Transfer Masuk',
        date: new Date(Date.now() - 172800000).toISOString(),
        status: 'success'
      }
    ];
  }

  getStatusClass(): string {
    return this.transaction?.status || 'success';
  }

  getStatusIcon(): string {
    switch (this.transaction?.status) {
      case 'success': return 'checkmark-circle';
      case 'failed': return 'close-circle';
      case 'pending': return 'time';
      default: return 'checkmark-circle';
    }
  }

  getStatusColor(): string {
    switch (this.transaction?.status) {
      case 'success': return 'success';
      case 'failed': return 'danger';
      case 'pending': return 'warning';
      default: return 'success';
    }
  }

  getStatusText(): string {
    switch (this.transaction?.status) {
      case 'success': return 'Berhasil';
      case 'failed': return 'Gagal';
      case 'pending': return 'Menunggu';
      default: return 'Berhasil';
    }
  }

  getStatusBadgeClass(): string {
    return this.transaction?.status || 'success';
  }

  getTransactionTypeText(): string {
    switch (this.transaction?.type) {
      case 'income': return 'Pemasukan';
      case 'expense': return 'Pengeluaran';
      case 'transfer': return 'Transfer';
      default: return 'Transaksi';
    }
  }

  getTransactionAvatarClass(transaction: Transaction): string {
    return transaction.type;
  }

  getTransactionIcon(type: string): string {
    switch (type) {
      case 'income': return 'arrow-down';
      case 'expense': return 'arrow-up';
      case 'transfer': return 'swap-horizontal';
      default: return 'card';
    }
  }

  getTransactionColor(type: string): string {
    switch (type) {
      case 'income': return 'success';
      case 'expense': return 'danger';
      case 'transfer': return 'primary';
      default: return 'medium';
    }
  }

  formatCurrency(amount: number | undefined): string {
    return amount?.toLocaleString('id-ID') || '0';
  }

  shareReceipt() {
    console.log('Sharing receipt for transaction:', this.transaction?.id);
  }

  downloadReceipt() {
    console.log('Downloading receipt for transaction:', this.transaction?.id);
  }

  reportProblem() {
    console.log('Reporting problem for transaction:', this.transaction?.id);
  }

  viewRelatedTransaction(transactionId: string) {
    this.router.navigate(['/detail-transaksi', transactionId]);
  }
}