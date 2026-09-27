import { Component, ViewChild, ElementRef } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.page.html',
  styleUrls: ['./scan.page.scss'],
  standalone: true,
  imports: [] // Tidak perlu import khusus untuk built-in control flow
})
export class ScanPage {
  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;
  isLoading = false;
  isCameraActive = false;

  constructor(private location: Location) {}

  async startCamera() {
    if (this.isCameraActive) return;
    
    this.isLoading = true;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 1280 }
        } 
      });

      this.videoElement.nativeElement.srcObject = stream;
      this.isLoading = false;
      this.isCameraActive = true;

    } catch (error) {
      console.error('Gagal mengakses kamera:', error);
      this.isLoading = false;
      alert('Tidak dapat mengakses kamera. Pastikan izin kamera sudah diberikan.');
    }
  }

  goBack() {
    this.stopCamera();
    this.location.back();
  }

  ionViewWillLeave() {
    this.stopCamera();
  }

  stopCamera() {
    const video = this.videoElement.nativeElement;
    if (video.srcObject) {
      const stream = video.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      video.srcObject = null;
    }
    this.isCameraActive = false;
  }
}