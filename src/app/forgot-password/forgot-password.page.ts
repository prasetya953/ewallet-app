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
import { lockClosedOutline, sendOutline, mailOutline } from 'ionicons/icons';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
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
export class ForgotPasswordPage {
  email: string = '';

  constructor(
    private navCtrl: NavController,
    private alertController: AlertController
  ) {
    addIcons({ lockClosedOutline, sendOutline, mailOutline });
  }

  async resetPassword() {
    if (!this.email) {
      await this.showAlert('Error', 'Please enter your email address');
      return;
    }

    if (!this.isValidEmail(this.email)) {
      await this.showAlert('Error', 'Please enter a valid email address');
      return;
    }

    // Simulasi pengiriman email reset password
    console.log('Reset password for:', this.email);
    
    const alert = await this.alertController.create({
      header: 'Success',
      message: 'Reset password instructions have been sent to your email address.',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.navCtrl.navigateBack('/login');
          }
        }
      ]
    });

    await alert.present();
  }

  goBack() {
    this.navCtrl.navigateBack('/login');
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
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