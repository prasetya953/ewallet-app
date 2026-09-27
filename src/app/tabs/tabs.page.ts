// tabs.page.ts
import { Component, EnvironmentInjector, inject } from '@angular/core';
import { 
  IonTabs, 
  IonTabBar, 
  IonTabButton, 
  IonLabel,
  IonIcon,
  IonButton,
  NavController
} from '@ionic/angular/standalone'; 
import { addIcons } from 'ionicons';
import { 
  homeOutline, 
  personCircleOutline, 
  scanCircleOutline 
} from 'ionicons/icons'; 

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  imports: [
    IonTabs, 
    IonTabBar, 
    IonTabButton, 
    IonLabel,
    IonIcon,
    IonButton
  ], 
  standalone: true,
})
export class TabsPage {
  public environmentInjector = inject(EnvironmentInjector);
  private navController = inject(NavController);

  constructor() {
    addIcons({ 
      home: homeOutline, 
      'person-circle': personCircleOutline, 
      'scan-circle': scanCircleOutline 
    }); 
  }

  openScan() {
    this.navController.navigateForward('/scan');
  }
}