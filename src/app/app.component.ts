import { Component } from '@angular/core';
// Import IonRouterOutlet di sini!
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone'; 

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  // ✅ Harus menjadi standalone
  standalone: true, 
  // ✅ Import IonApp dan IonRouterOutlet
  imports: [IonApp, IonRouterOutlet], 
})
export class AppComponent {
  constructor() {}
}