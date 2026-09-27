import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-help-support',
  templateUrl: './help-support.page.html',
  styleUrls: ['./help-support.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class HelpSupportPage {
  
  // FAQ items dengan state
  faqItems = [
    {
      question: 'Bagaimana cara melakukan transfer?',
      answer: 'Untuk melakukan transfer, buka menu Transfer, pilih tujuan transfer, masukkan nominal, dan konfirmasi dengan PIN Anda.',
      icon: 'arrow-redo',
      isOpen: false
    },
    {
      question: 'Apa saja biaya transfer?',
      answer: 'Biaya transfer bervariasi tergantung jenis transfer dan bank tujuan. Transfer sesama bank gratis, antar bank dikenakan biaya Rp2.500-6.500.',
      icon: 'cash',
      isOpen: false
    },
    {
      question: 'Bagaimana cara top up saldo?',
      answer: 'Top up saldo dapat dilakukan melalui ATM, Internet Banking, Mobile Banking, atau minimarket terdekat. Pilih menu Top Up dan ikuti petunjuknya.',
      icon: 'add-circle',
      isOpen: false
    },
    {
      question: 'Berapa lama proses verifikasi?',
      answer: 'Proses verifikasi biasanya memakan waktu 1-2 jam kerja. Untuk verifikasi dokumen mungkin membutuhkan waktu hingga 24 jam.',
      icon: 'time',
      isOpen: false
    },
    {
      question: 'Bagaimana jika lupa PIN?',
      answer: 'Jika lupa PIN, Anda dapat menggunakan fitur "Lupa PIN" di halaman login. Sistem akan mengirimkan kode reset ke email atau nomor telepon Anda.',
      icon: 'lock-closed',
      isOpen: false
    }
  ];

  constructor() {}

  // Toggle FAQ item
  toggleFaq(index: number) {
    this.faqItems[index].isOpen = !this.faqItems[index].isOpen;
  }

  // Contact methods
  openLiveChat() {
    console.log('Membuka live chat');
    // Implementasi live chat
  }

  callSupport() {
    window.open('tel:+621500800', '_system');
  }

  sendEmail() {
    window.open('mailto:support@bankanda.com?subject=Bantuan%20Aplikasi', '_system');
  }

  openWhatsApp() {
    window.open('https://wa.me/6281234567890?text=Halo,%20saya%20butuh%20bantuan', '_system');
  }
}