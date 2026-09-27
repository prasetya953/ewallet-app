// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { 
//   IonContent, 
//   IonHeader, 
//   IonTitle, 
//   IonToolbar, 
//   IonItem, 
//   IonInput, 
//   IonButton, 
//   IonIcon,
//   IonButtons,
//   IonBackButton,
//   AlertController,
//   NavController 
// } from '@ionic/angular/standalone';
// import { addIcons } from 'ionicons';
// import { 
//   personOutline, 
//   mailOutline, 
//   callOutline, 
//   lockClosedOutline, 
//   eyeOutline, 
//   eyeOffOutline,
//   personAddOutline 
// } from 'ionicons/icons';

// @Component({
//   selector: 'app-signup',
//   templateUrl: './signup.page.html',
//   styleUrls: ['./signup.page.scss'],
//   standalone: true,
//   imports: [
//     CommonModule,
//     FormsModule,
//     IonContent,
//     IonHeader,
//     IonTitle,
//     IonToolbar,
//     IonItem,
//     IonInput,
//     IonButton,
//     IonIcon,
//     IonButtons,
//     IonBackButton
//   ]
// })
// export class SignupPage {
//   fullName: string = '';
//   email: string = '';
//   phone: string = '';
//   username: string = '';
//   password: string = '';
//   confirmPassword: string = '';
//   showPassword: boolean = false;
//   showConfirmPassword: boolean = false;
//   submitted: boolean = false;

//   constructor(
//     private navCtrl: NavController,
//     private alertController: AlertController
//   ) {
//     addIcons({ 
//       personOutline, 
//       mailOutline, 
//       callOutline, 
//       lockClosedOutline, 
//       eyeOutline, 
//       eyeOffOutline,
//       personAddOutline 
//     });
//   }

//   async signup() {
//     this.submitted = true;

//     // Validasi form
//     if (!this.fullName || !this.email || !this.phone || !this.username || !this.password || !this.confirmPassword) {
//       await this.showAlert('Error', 'Please fill in all fields');
//       return;
//     }

//     if (!this.isValidEmail(this.email)) {
//       await this.showAlert('Error', 'Please enter a valid email address');
//       return;
//     }

//     if (this.password !== this.confirmPassword) {
//       await this.showAlert('Error', 'Passwords do not match');
//       return;
//     }

//     if (this.password.length < 6) {
//       await this.showAlert('Error', 'Password must be at least 6 characters long');
//       return;
//     }

//     // Simulasi pendaftaran berhasil
//     console.log('Signup data:', {
//       fullName: this.fullName,
//       email: this.email,
//       phone: this.phone,
//       username: this.username
//     });

//     const alert = await this.alertController.create({
//       header: 'Success',
//       message: 'Your account has been created successfully!',
//       buttons: [
//         {
//           text: 'OK',
//           handler: () => {
//             this.navCtrl.navigateRoot('/login');
//           }
//         }
//       ]
//     });

//     await alert.present();
//   }

//   togglePasswordVisibility() {
//     this.showPassword = !this.showPassword;
//   }

//   toggleConfirmPasswordVisibility() {
//     this.showConfirmPassword = !this.showConfirmPassword;
//   }

//   goToLogin() {
//     this.navCtrl.navigateBack('/login');
//   }

//   private isValidEmail(email: string): boolean {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   }

//   private async showAlert(header: string, message: string) {
//     const alert = await this.alertController.create({
//       header,
//       message,
//       buttons: ['OK']
//     });

//     await alert.present();
//   }
// }
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar, 
  IonItem, 
  IonInput, 
  IonButton, 
  IonIcon,
  IonButtons,
  IonBackButton,
  AlertController,
  NavController 
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  personOutline, 
  mailOutline, 
  callOutline, 
  lockClosedOutline, 
  eyeOutline, 
  eyeOffOutline,
  personAddOutline 
} from 'ionicons/icons';

interface User {
  username: string;
  password: string;
  fullName: string;
  email: string;
  phone: string;
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonItem,
    IonInput,
    IonButton,
    IonIcon,
    IonButtons,
    IonBackButton
  ]
})
export class SignupPage {
  fullName: string = '';
  email: string = '';
  phone: string = '';
  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  submitted: boolean = false;

  registeredUsers: User[] = [];

  constructor(
    private navCtrl: NavController,
    private alertController: AlertController
  ) {
    addIcons({ 
      personOutline, 
      mailOutline, 
      callOutline, 
      lockClosedOutline, 
      eyeOutline, 
      eyeOffOutline,
      personAddOutline 
    });

    // Load existing users
    this.loadRegisteredUsers();
  }

  async signup() {
    this.submitted = true;

    // Validasi form - TANPA MENGUBAH VALIDASI YANG SUDAH ADA
    if (!this.fullName || !this.email || !this.phone || !this.username || !this.password || !this.confirmPassword) {
      await this.showAlert('Error', 'Please fill in all fields');
      return;
    }

    if (!this.isValidEmail(this.email)) {
      await this.showAlert('Error', 'Please enter a valid email address');
      return;
    }

    // Validasi password tetap seperti semula
    if (this.password !== this.confirmPassword) {
      await this.showAlert('Error', 'Passwords do not match');
      return;
    }

    if (this.password.length < 6) {
      await this.showAlert('Error', 'Password must be at least 6 characters long');
      return;
    }

    // Cek apakah username sudah digunakan
    if (this.isUsernameTaken(this.username)) {
      await this.showAlert('Error', 'Username already taken. Please choose another one.');
      return;
    }

    // Cek apakah email sudah digunakan
    if (this.isEmailTaken(this.email)) {
      await this.showAlert('Error', 'Email already registered. Please use another email.');
      return;
    }

    // Buat user baru dengan password yang diinput user
    const newUser: User = {
      username: this.username,
      password: this.password, // Password yang diinput user
      fullName: this.fullName,
      email: this.email,
      phone: this.phone
    };

    // Tambahkan ke daftar user
    this.registeredUsers.push(newUser);
    this.saveUsersToStorage();

    // Simpan sebagai user yang sedang login
    localStorage.setItem('currentUser', JSON.stringify(newUser));

    const alert = await this.alertController.create({
      header: 'Success',
      message: 'Your account has been created successfully!',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            // Navigate langsung ke beranda setelah signup
            this.navCtrl.navigateRoot('/tabs/beranda');
          }
        }
      ]
    });

    await alert.present();
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  goToLogin() {
    this.navCtrl.navigateBack('/login');
  }

  // Helper methods - TANPA PERUBAHAN
  private loadRegisteredUsers() {
    const users = localStorage.getItem('registeredUsers');
    this.registeredUsers = users ? JSON.parse(users) : [];
  }

  private isUsernameTaken(username: string): boolean {
    return this.registeredUsers.some(user => user.username === username);
  }

  private isEmailTaken(email: string): boolean {
    return this.registeredUsers.some(user => user.email === email);
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private saveUsersToStorage() {
    localStorage.setItem('registeredUsers', JSON.stringify(this.registeredUsers));
  }

  private async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });

    await alert.present();
  }
}