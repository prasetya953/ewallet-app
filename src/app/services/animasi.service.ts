import { Injectable, inject } from '@angular/core';
import { AnimationController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AnimasiService {
  private animationCtrl = inject(AnimationController);

  animasiTransaksiSukses(element: HTMLElement) {
    const animation = this.animationCtrl.create()
      .addElement(element)
      .duration(1000)
      .iterations(1)
      .keyframes([
        { offset: 0, transform: 'scale(0.8)', opacity: '0' },
        { offset: 0.5, transform: 'scale(1.2)', opacity: '0.8' },
        { offset: 0.8, transform: 'scale(0.95)', opacity: '1' },
        { offset: 1, transform: 'scale(1)', opacity: '1' }
      ]);
    
    animation.play();
  }

  animasiSaldoBerkurang(element: HTMLElement) {
    const animation = this.animationCtrl.create()
      .addElement(element)
      .duration(800)
      .iterations(1)
      .keyframes([
        { offset: 0, color: 'var(--ion-color-success)', transform: 'scale(1)' },
        { offset: 0.3, color: 'var(--ion-color-warning)', transform: 'scale(1.1)' },
        { offset: 0.6, color: 'var(--ion-color-danger)', transform: 'scale(1.05)' },
        { offset: 1, color: 'var(--ion-color-dark)', transform: 'scale(1)' }
      ]);
    
    animation.play();
  }

  animasiItemBaru(element: HTMLElement) {
    const animation = this.animationCtrl.create()
      .addElement(element)
      .duration(600)
      .iterations(1)
      .keyframes([
        { offset: 0, transform: 'translateY(-20px)', opacity: '0' },
        { offset: 0.5, transform: 'translateY(5px)', opacity: '0.7' },
        { offset: 1, transform: 'translateY(0)', opacity: '1' }
      ]);
    
    animation.play();
  }

  animasiLoading(element: HTMLElement) {
    const animation = this.animationCtrl.create()
      .addElement(element)
      .duration(1000)
      .iterations(Infinity)
      .keyframes([
        { offset: 0, transform: 'rotate(0deg)' },
        { offset: 1, transform: 'rotate(360deg)' }
      ]);
    
    return animation;
  }
}