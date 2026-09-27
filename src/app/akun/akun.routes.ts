// src/app/akun/akun.routes.ts

import { Routes } from '@angular/router';
import { AkunPage } from './akun.page'; 

export const routes: Routes = [
  {
    path: '', 
    component: AkunPage,
    // ❌ HAPUS children: []
    children: [
        // ❌ Hapus rute Settings
        // ❌ Hapus rute Edit Profile
    ]
  }
];