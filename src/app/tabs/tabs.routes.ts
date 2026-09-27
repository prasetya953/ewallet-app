// src/app/tabs/tabs.routes.ts

import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
        {
            path: 'beranda',
            loadComponent: () => import('../beranda/beranda.page').then(m => m.BerandaPage)
        },
        {
          path: 'transfer',
          loadComponent: () => import('../transfer/transfer.page').then(m => m.TransferPage)
        },
        {
          path: 'topup',
          loadComponent: () => import('../topup/topup.page').then(m => m.TopupPage)
        },
        {
          path: 'request-money',
          loadComponent: () => import('../request-money/request-money.page').then(m => m.RequestMoneyPage)
        },
        {
          path: 'notifications',
          loadComponent: () => import('../notifications/notifications.page').then(m => m.NotificationsPage)
        },
        {
          path: 'scan',
          loadComponent: () => import('../scan/scan.page').then(m => m.ScanPage)
        },
        {
          path: 'transaction-history',
          loadComponent: () => import('../transaction-history/transaction-history.page').then(m => m.TransactionHistoryPage)
        },
        {
          path: 'free-transfer',
          loadComponent: () => import('../free-transfer/free-transfer.page').then(m => m.FreeTransferPage)
        },
  {
    path: 'transaction-detail/:id', // <- Path sesuai dengan nama file
    loadComponent: () => import('../transaction-detail/transaction-detail.page').then((m) => m.TransactionDetailPage),
  },
        {
          path: 'riwayat', 
          loadComponent: () => import('../riwayat/riwayat.page').then(m => m.RiwayatPage)
        },
        {
            // ✅ Menggunakan loadChildren untuk memuat routing Akun
            path: 'akun', 
            loadChildren: () => import('../akun/akun.routes').then(m => m.routes)
        },
        {
            path: 'settings', 
            // ✅ Gunakan Path Alias untuk resolusi mutlak: @app/akun/settings/settings.page
            loadComponent: () => import('@app/akun/settings/settings.page').then(m => m.SettingsPage)
        },
        // Rute Edit Profile
        {
            path: 'edit-profile', 
            // ✅ Gunakan Path Alias untuk resolusi mutlak: @app/akun/settings/edit-profile/edit-profile.page
            loadComponent: () => import('@app/akun/settings/edit-profile/edit-profile.page').then(m => m.EditProfilePage)
        },
  // {
  //   path: 'detail-transaksi/:id',
  //   loadComponent: () => import('../detail-transaksi/detail-transaksi.page').then((m) => m.DetailTransaksiPage),
  // },

        // Rute Default: Redirect ke Beranda
        {
            path: '',
            redirectTo: '/tabs/beranda',
            pathMatch: 'full',
        }
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/beranda',
    pathMatch: 'full'
  }
];