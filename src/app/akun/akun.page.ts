// src/app/akun/akun.page.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular'; // ✅ Pastikan ini benar
import { Router } from '@angular/router'; // ✅ Import Router

@Component({
  selector: 'app-akun',
  templateUrl: './akun.page.html',
  styleUrls: ['./akun.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class AkunPage {

  // ✅ Inject Router di constructor
  constructor(private router: Router) { }

  // ✅ Fungsi untuk Navigasi ke Settings
  goToSettings() {
    // Navigasi menggunakan jalur absolut yang sudah teruji
    this.router.navigate(['/tabs/settings']); 
  }

  // ✅ Fungsi untuk Navigasi ke Edit Profile
  goToEditProfile() {
    // Navigasi menggunakan jalur absolut yang sudah teruji
    this.router.navigate(['/tabs/edit-profile']); 
  }
  // ✅ Fungsi untuk Navigasi ke Transaction History
  viewAllTransactions() {
    this.router.navigate(['/transaction-history']);
  }

    goToSecurity() {
    this.router.navigate(['/security']); 
  }

  goToPayment(){
    this.router.navigate(['/payment-methods']); 
  }

  goToSubscription() {
    this.router.navigate(['/subscription']); 
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  goToHelp() {
  this.router.navigate(['/help-support']);
  }
}