// src/app/app.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'tabs',
    // ✅ HARUS menggunakan loadChildren ke tabs.routes
    loadChildren: () => import('./tabs/tabs.routes').then(m => m.routes)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'forgot-password',
    loadComponent: () => import('./forgot-password/forgot-password.page').then( m => m.ForgotPasswordPage)
  },
  {
    path: 'signup',
    loadComponent: () => import('./signup/signup.page').then( m => m.SignupPage)
  },
  {
    path: 'transfer',
    loadComponent: () => import('./transfer/transfer.page').then( m => m.TransferPage)
  },
  {
    path: 'topup',
    loadComponent: () => import('./topup/topup.page').then( m => m.TopupPage)
  },
  {
    path: 'request-money',
    loadComponent: () => import('./request-money/request-money.page').then( m => m.RequestMoneyPage)
  },
  {
    path: 'notifications',
    loadComponent: () => import('./notifications/notifications.page').then( m => m.NotificationsPage)
  },
  {
    path: 'scan',
    loadComponent: () => import('./scan/scan.page').then( m => m.ScanPage)
  },
  {
    path: 'transaction-history',
    loadComponent: () => import('./transaction-history/transaction-history.page').then( m => m.TransactionHistoryPage)
  },
  {
    path: 'free-transfer',
    loadComponent: () => import('./free-transfer/free-transfer.page').then( m => m.FreeTransferPage)
  },
  {
    path: 'transaction-detail/:id', // <- Path sesuai dengan nama file
    loadComponent: () => import('./transaction-detail/transaction-detail.page').then((m) => m.TransactionDetailPage),
  },
  {
    path: 'forgot-password',
    loadComponent: () => import('./forgot-password/forgot-password.page').then( m => m.ForgotPasswordPage)
  },
  {
    path: 'signup',
    loadComponent: () => import('./signup/signup.page').then( m => m.SignupPage)
  },
  {
    path: 'security',
    loadComponent: () => import('./security/security.page').then( m => m.SecurityPage)
  },
  {
    path: 'payment-methods',
    loadComponent: () => import('./payment-methods/payment-methods.page').then( m => m.PaymentMethodsPage)
  },
  {
    path: 'subscription',
    loadComponent: () => import('./subscription/subscription.page').then( m => m.SubscriptionPage)
  },
  {
    path: 'help-support',
    loadComponent: () => import('./help-support/help-support.page').then( m => m.HelpSupportPage)
  },
  {
    path: 'pembayaran-bpjs',
    loadComponent: () => import('./pembayaran-bpjs/pembayaran-bpjs.page').then( m => m.PembayaranBpjsPage)
  },
  {
    path: 'pembayaran-listrik',
    loadComponent: () => import('./pembayaran-listrik/pembayaran-listrik.page').then( m => m.PembayaranListrikPage)
  },
  {
    path: 'pembayaran-air',
    loadComponent: () => import('./pembayaran-air/pembayaran-air.page').then( m => m.PembayaranAirPage)
  },
  {
    path: 'pembayaran-internet',
    loadComponent: () => import('./pembayaran-internet/pembayaran-internet.page').then( m => m.PembayaranInternetPage)
  },
  {
    path: 'pembayaran-tv',
    loadComponent: () => import('./pembayaran-tv/pembayaran-tv.page').then( m => m.PembayaranTvPage)
  },
  {
    path: 'pembayaran-spp',
    loadComponent: () => import('./pembayaran-spp/pembayaran-spp.page').then( m => m.PembayaranSppPage)
  },
  {
    path: 'topup-game',
    loadComponent: () => import('./topup-game/topup-game.page').then( m => m.TopupGamePage)
  },
  {
    path: 'topup-ewallet',
    loadComponent: () => import('./topup-ewallet/topup-ewallet.page').then( m => m.TopupEwalletPage)
  },
  {
    path: 'pulsa-data',
    loadComponent: () => import('./pulsa-data/pulsa-data.page').then( m => m.PulsaDataPage)
  },
  // {
  //   path: 'transaction.service',
  //   loadComponent: () => import('./transaction.service/transaction.service.page').then( m => m.TransactionServicePage)
  // },
  // {
  //   path: 'transaction-detail/:id', // <- INI YANG DIPAKAI
  //   loadComponent: () => import('./detail-transaksi/detail-transaksi.page').then((m) => m.DetailTransaksiPage),
  // },
];