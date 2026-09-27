import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  date: Date;
  status: 'completed' | 'pending' | 'failed';
  icon: string;
}

@Injectable({
  providedIn: 'root'
})
export class SaldoService {
  private saldoSubject = new BehaviorSubject<number>(92027570);
  public saldo$ = this.saldoSubject.asObservable();

  private transactionsSubject = new BehaviorSubject<Transaction[]>([]);
  public transactions$ = this.transactionsSubject.asObservable();

  constructor() {
    this.loadInitialData();
  }

  private loadInitialData() {
    const savedSaldo = localStorage.getItem('currentBalance');
    const savedTransactions = localStorage.getItem('recentTransactions');
    
    if (savedSaldo) {
      this.saldoSubject.next(JSON.parse(savedSaldo));
    } else {
      this.saldoSubject.next(92027570);
    }
    
    if (savedTransactions) {
      this.transactionsSubject.next(JSON.parse(savedTransactions));
    } else {
      // Data transaksi default
      const defaultTransactions: Transaction[] = [
        {
          id: '1',
          description: 'Transfer dari John',
          amount: 500000,
          type: 'income',
          category: 'transfer',
          date: new Date('2024-03-15T10:30:00'),
          status: 'completed',
          icon: 'paper-plane-outline'
        },
        {
          id: '2',
          description: 'GoFood - Resto Enak',
          amount: 75000,
          type: 'expense',
          category: 'food',
          date: new Date('2024-03-14T19:15:00'),
          status: 'completed',
          icon: 'fast-food-outline'
        },
        {
          id: '3',
          description: 'Top Up Saldo',
          amount: 1000000,
          type: 'income',
          category: 'topup',
          date: new Date('2024-03-14T08:45:00'),
          status: 'completed',
          icon: 'add-circle-outline'
        }
      ];
      this.transactionsSubject.next(defaultTransactions);
    }
  }

  updateSaldo(newSaldo: number) {
    this.saldoSubject.next(newSaldo);
    localStorage.setItem('currentBalance', JSON.stringify(newSaldo));
  }

  getCurrentSaldo(): number {
    return this.saldoSubject.value;
  }

  addTransaction(transaction: Transaction) {
    const currentTransactions = this.transactionsSubject.value;
    const updatedTransactions = [transaction, ...currentTransactions].slice(0, 50);
    this.transactionsSubject.next(updatedTransactions);
    localStorage.setItem('recentTransactions', JSON.stringify(updatedTransactions));
  }

  getRecentTransactions(limit: number = 5): Transaction[] {
    return this.transactionsSubject.value.slice(0, limit);
  }

  getAllTransactions(): Transaction[] {
    return this.transactionsSubject.value;
  }

  kurangiSaldo(jumlah: number): boolean {
    const saldoSekarang = this.getCurrentSaldo();
    if (saldoSekarang >= jumlah) {
      this.updateSaldo(saldoSekarang - jumlah);
      return true;
    }
    return false;
  }

  tambahSaldo(jumlah: number) {
    const saldoSekarang = this.getCurrentSaldo();
    this.updateSaldo(saldoSekarang + jumlah);
  }
}