import { Injectable, inject } from '@angular/core';
import { SaldoService, Transaction } from './saldo.service';
import { AnimasiService } from './animasi.service';
import { AlertController, NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class TransaksiService {
  private saldoService = inject(SaldoService);
  private animasiService = inject(AnimasiService);
  private alertController = inject(AlertController);
  private navController = inject(NavController);

  private kategoriIcons: { [key: string]: string } = {
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

  async prosesPembayaran(jenis: string, jumlah: number, detail: any): Promise<boolean> {
    // Cek saldo cukup
    if (!this.saldoService.kurangiSaldo(jumlah)) {
      await this.showAlert('Saldo Tidak Cukup', 'Saldo Anda tidak mencukupi untuk melakukan transaksi ini.');
      return false;
    }

    // Buat transaksi
    const transaksi: Transaction = {
      id: Date.now().toString(),
      description: `Pembayaran ${jenis} - ${detail.nomor || detail.nama || ''}`,
      amount: jumlah,
      type: 'expense',
      category: jenis,
      date: new Date(),
      status: 'completed',
      icon: this.kategoriIcons[jenis] || 'card-outline'
    };

    // Tambahkan transaksi
    this.saldoService.addTransaction(transaksi);

    return true;
  }

  async prosesTopUp(jenis: string, jumlah: number, detail: any): Promise<boolean> {
    // Cek saldo cukup untuk top up
    if (!this.saldoService.kurangiSaldo(jumlah)) {
      await this.showAlert('Saldo Tidak Cukup', 'Saldo Anda tidak mencukupi untuk top up ini.');
      return false;
    }

    // Buat transaksi untuk top up
    const transaksi: Transaction = {
      id: Date.now().toString(),
      description: `Top Up ${detail.game || jenis} - ${detail.gameId || ''}`,
      amount: jumlah,
      type: 'expense',
      category: jenis,
      date: new Date(),
      status: 'completed',
      icon: this.kategoriIcons[jenis] || 'card-outline'
    };

    this.saldoService.addTransaction(transaksi);
    return true;
  }

  private async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    
    await alert.present();
  }

  private formatCurrency(amount: number): string {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }
}