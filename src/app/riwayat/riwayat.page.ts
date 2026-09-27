// import { Component } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { IonicModule } from '@ionic/angular';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-riwayat',
//   templateUrl: 'riwayat.page.html',
//   styleUrls: ['riwayat.page.scss'],
//   standalone: true,
//   imports: [IonicModule, CommonModule]
// })
// export class RiwayatPage {
//   transaksiId: number | null = null;
//   transaksiDetail: any = null;
  
//   // Data dummy lengkap
//   transaksiDatabase = [
//     { id: 101, deskripsi: 'Transfer ke Rekening Bank', jumlah: -500000, tanggal: '2025-10-10', tipe: 'keluar', status: 'Selesai' },
//     { id: 102, deskripsi: 'Pembayaran Listrik', jumlah: -150000, tanggal: '2025-10-05', tipe: 'keluar', status: 'Selesai' },
//     { id: 103, deskripsi: 'Pemasukan Gaji', jumlah: 5000000, tanggal: '2025-10-01', tipe: 'masuk', status: 'Selesai' },
//   ];

//   constructor(private route: ActivatedRoute) {
//     this.route.params.subscribe(params => {
//       this.transaksiId = +params['id']; // Ambil ID dari URL
//       this.loadDetail();
//     });
//   }

//   loadDetail() {
//     this.transaksiDetail = this.transaksiDatabase.find(t => t.id === this.transaksiId);
//   }
// }
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
// Mengimpor NgFor dan CurrencyPipe karena digunakan di template
import { CommonModule, NgFor, CurrencyPipe } from '@angular/common'; 
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
// Mengimpor ikon yang diperlukan
import { arrowDownCircleOutline, arrowUpCircleOutline, cafeOutline, pulseOutline, carOutline, walletOutline, listCircleOutline, filterOutline } from 'ionicons/icons';

interface Transaksi {
  id: number;
  deskripsi: string;
  tipe: 'masuk' | 'keluar';
  jumlah: number;
  kategori: 'makan' | 'transportasi' | 'gaji' | 'investasi' | 'tagihan';
  tanggal: string;
}

@Component({
  selector: 'app-riwayat',
  templateUrl: 'riwayat.page.html',
  // Anggap file SCSS juga ada
  styleUrls: ['riwayat.page.scss'], 
  standalone: true,
  // Memastikan semua impor yang digunakan di HTML dimasukkan
  imports: [IonicModule, CommonModule, NgFor, CurrencyPipe], 
})
export class RiwayatPage implements OnInit {
  
  // Nilai awal filter segment
  segmentValue: 'semua' | 'masuk' | 'keluar' = 'semua';
  
  // Data mock lengkap (Data ini yang akan dicari)
  allTransactions: Transaksi[] = [
    { id: 101, deskripsi: 'Makan Siang Restoran', tipe: 'keluar', jumlah: 55000, kategori: 'makan', tanggal: '14 Okt 2025' },
    { id: 102, deskripsi: 'Pemasukan Gaji Bulanan', tipe: 'masuk', jumlah: 7500000, kategori: 'gaji', tanggal: '01 Okt 2025' },
    { id: 103, deskripsi: 'Bayar Ojek Online', tipe: 'keluar', jumlah: 28000, kategori: 'transportasi', tanggal: '13 Okt 2025' },
    { id: 104, deskripsi: 'Bunga Investasi Saham', tipe: 'masuk', jumlah: 120000, kategori: 'investasi', tanggal: '10 Okt 2025' },
    { id: 105, deskripsi: 'Pembayaran Tagihan Listrik', tipe: 'keluar', jumlah: 150000, kategori: 'tagihan', tanggal: '08 Okt 2025' },
    { id: 106, deskripsi: 'Isi Saldo dari Bank B', tipe: 'masuk', jumlah: 300000, kategori: 'gaji', tanggal: '05 Okt 2025' },
    { id: 107, deskripsi: 'Kopi Pagi', tipe: 'keluar', jumlah: 25000, kategori: 'makan', tanggal: '03 Okt 2025' },
    { id: 108, deskripsi: 'Tiket Bus Antarkota', tipe: 'keluar', jumlah: 180000, kategori: 'transportasi', tanggal: '02 Okt 2025' },
  ];

  // List yang ditampilkan setelah difilter
  filteredTransactions: Transaksi[] = [];

  constructor(private router: Router) {
    addIcons({ arrowDownCircleOutline, arrowUpCircleOutline, cafeOutline, pulseOutline, carOutline, walletOutline, listCircleOutline, filterOutline });
  }

  ngOnInit() {
    // Inisialisasi list dengan semua transaksi saat pertama kali dimuat
    this.handleSegmentChange({ detail: { value: this.segmentValue } });
  }

  // Fungsi untuk memfilter list berdasarkan segment yang dipilih
  handleSegmentChange(event: any) {
    this.segmentValue = event.detail.value as 'semua' | 'masuk' | 'keluar';
    
    if (this.segmentValue === 'semua') {
      this.filteredTransactions = [...this.allTransactions];
    } else {
      this.filteredTransactions = this.allTransactions.filter(
        t => t.tipe === this.segmentValue
      );
    }
  }

  // Fungsi untuk mendapatkan ikon berdasarkan kategori transaksi
  getCategoryIcon(kategori: Transaksi['kategori']): string {
    switch (kategori) {
      case 'makan': return 'cafe-outline'; 
      case 'transportasi': return 'car-outline'; 
      case 'gaji': return 'wallet-outline'; 
      case 'investasi': return 'pulse-outline'; 
      case 'tagihan': return 'list-circle-outline'; 
      default: return 'arrow-up-circle-outline'; 
    }
  }

  // Fungsi navigasi ke halaman detail
  goToDetail(id: number) {
    this.router.navigate(['/tabs/detail-transaksi', id]); 
  }
}
