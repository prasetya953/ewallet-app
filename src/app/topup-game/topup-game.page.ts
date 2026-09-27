import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, IonButton,
  IonIcon, IonItem, IonLabel, IonInput, IonCard, IonCardContent, 
  IonCardHeader, IonCardTitle, AlertController, NavController, 
  LoadingController,IonButtons
} from '@ionic/angular/standalone';
import { 
  arrowBackOutline, 
  gameControllerOutline, 
  sparklesOutline,
  shieldCheckmarkOutline,
  timeOutline,
  helpCircleOutline
} from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { TransaksiService } from '../services/transaksi.service';

interface Game {
  id: string;
  name: string;
  logo: string;
  denominations: number[];
}

@Component({
  selector: 'app-topup-game',
  templateUrl: './topup-game.page.html',
  styleUrls: ['./topup-game.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule, IonHeader, IonToolbar, IonTitle, 
    IonContent, IonButton, IonIcon, IonItem, IonLabel, IonInput,
    IonCard, IonCardContent, IonCardHeader, IonCardTitle,IonButtons
  ]
})
export class TopupGamePage {
  private transaksiService = inject(TransaksiService);
  private alertController = inject(AlertController);
  private navController = inject(NavController);
  private loadingController = inject(LoadingController);

  selectedGame: string = '';
  gameId: string = '';
  selectedAmount: number = 0;
  customAmount: number = 0;

  games: Game[] = [
    {
      id: 'mobile_legends',
      name: 'Mobile Legends',
      logo: '🎮',
      denominations: [10000, 25000, 50000, 100000, 250000, 500000]
    },
    {
      id: 'free_fire',
      name: 'Free Fire',
      logo: '🔫',
      denominations: [5000, 12000, 25000, 60000, 125000, 250000]
    },
    {
      id: 'pubg',
      name: 'PUBG Mobile',
      logo: '🎯',
      denominations: [12000, 60000, 125000, 250000, 625000, 1250000]
    },
    {
      id: 'genshin',
      name: 'Genshin Impact',
      logo: '⚔️',
      denominations: [33000, 66000, 165000, 330000, 660000, 1320000]
    },
    {
      id: 'valorant',
      name: 'Valorant',
      logo: '🎭',
      denominations: [15000, 50000, 100000, 250000, 500000, 1000000]
    },
    {
      id: 'cod',
      name: 'Call of Duty',
      logo: '🎖️',
      denominations: [20000, 50000, 100000, 200000, 500000, 1000000]
    }
  ];

  constructor() {
    addIcons({ 
      arrowBackOutline, 
      gameControllerOutline,
      sparklesOutline,
      shieldCheckmarkOutline,
      timeOutline,
      helpCircleOutline
    });
  }

  async prosesTopUp() {
    if (!this.selectedGame || !this.gameId || (!this.selectedAmount && !this.customAmount)) {
      await this.showAlert('Data Tidak Lengkap', 'Harap pilih game, masukkan ID game, dan pilih nominal top up.');
      return;
    }

    const amount = this.customAmount || this.selectedAmount;
    
    // Validasi minimal amount
    if (amount < 5000) {
      await this.showAlert('Nominal Tidak Valid', 'Minimal top up adalah Rp5.000.');
      return;
    }

    const game = this.getSelectedGame();

    const loading = await this.loadingController.create({
      message: 'Mengirim kode top up...',
      spinner: 'crescent',
      duration: 3000
    });
    
    await loading.present();

    // Simulasi proses top up
    setTimeout(async () => {
      await loading.dismiss();
      
      const success = await this.transaksiService.prosesTopUp('game', amount, {
        game: game?.name,
        gameId: this.gameId,
        amount: amount,
        item: this.getGameItemName(game?.name || '')
      });

      if (success) {
        await this.showSuccessAlert(game?.name || '', amount);
      }
    }, 3000);
  }

  selectAmount(amount: number) {
    this.selectedAmount = amount;
    this.customAmount = 0;
  }

  onCustomAmountChange() {
    if (this.customAmount > 0) {
      this.selectedAmount = 0;
    }
  }

  getSelectedGame(): Game | undefined {
    return this.games.find(game => game.id === this.selectedGame);
  }

  private getGameItemName(gameName: string): string {
    const itemMap: {[key: string]: string} = {
      'Mobile Legends': 'Diamond',
      'Free Fire': 'Koin',
      'PUBG Mobile': 'UC',
      'Genshin Impact': 'Genesis Crystal',
      'Valorant': 'Valorant Point',
      'Call of Duty': 'CP'
    };
    return itemMap[gameName] || 'Item';
  }

  private async showSuccessAlert(gameName: string, amount: number) {
    const itemName = this.getGameItemName(gameName);
    
    const alert = await this.alertController.create({
      header: '🎉 Top Up Berhasil!',
      message: `
        <div style="text-align: center;">
          <p style="font-weight: 600; margin-bottom: 15px;">Top up ${gameName} berhasil!</p>
          <div style="background: #f8f9fa; padding: 15px; border-radius: 10px; margin: 10px 0;">
            <p style="margin: 5px 0;"><strong>Game:</strong> ${gameName}</p>
            <p style="margin: 5px 0;"><strong>ID Game:</strong> ${this.gameId}</p>
            <p style="margin: 5px 0;"><strong>Nominal:</strong> Rp${this.formatCurrency(amount)}</p>
            <p style="margin: 5px 0;"><strong>Item:</strong> ${itemName}</p>
          </div>
          <p style="font-size: 14px; color: #666; margin-top: 10px;">
            ${itemName} akan masuk dalam 1-5 menit
          </p>
        </div>
      `,
      buttons: [
        {
          text: 'Kembali ke Beranda',
          handler: () => {
            this.navController.navigateRoot('/beranda');
          }
        }
      ]
    });
    
    await alert.present();
  }

  private async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    
    await alert.present();
  }

  formatCurrency(amount: number): string {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  goBack() {
    this.navController.back();
  }
}