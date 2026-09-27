// src/app/akun/settings/settings.page.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
// ❌ Hapus '/standalone'
// ✅ Koreksi: Import IonicModule dari path standar.
import { IonicModule } from '@ionic/angular'; 

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true, 
  imports: [IonicModule, CommonModule, FormsModule] 
})
export class SettingsPage {

  constructor() { }

}