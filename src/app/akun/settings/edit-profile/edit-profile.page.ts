// // src/app/akun/settings/edit-profile/edit-profile.page.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
// ❌ Hapus '/standalone'
// ✅ Koreksi: Import IonicModule dari path standar.
import { IonicModule } from '@ionic/angular'; 

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
  standalone: true, 
  // ✅ Ini sekarang merujuk ke IonicModule yang benar
  imports: [IonicModule, CommonModule, FormsModule] 
})
export class EditProfilePage {
}
