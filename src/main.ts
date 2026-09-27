// src/main.ts (Pastikan providers ini ada)
import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone'; // Wajib

import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes'; 
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    // ✅ 1. Sediakan Ionic Angular (Biarkan kosong, atau tambahkan mode/sanitasi jika ada)
    provideIonicAngular({}),
    
    // ✅ 2. Sediakan Angular Router
    provideRouter(routes), 
    
    // 3. Sediakan RouteReuseStrategy Ionic
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
}).catch(err => console.error(err));