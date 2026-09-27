import { Component, Inject, PLATFORM_ID, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, 
  IonItem, 
  IonInput, 
  IonButton, 
  IonIcon,
  IonCheckbox,
  IonLabel,
  AlertController,
  NavController,
  LoadingController 
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  personOutline, 
  lockClosedOutline, 
  eyeOutline, 
  eyeOffOutline, 
  logInOutline, 
  refreshOutline,
  mailOutline,
  logoGoogle
} from 'ionicons/icons';

// Deklarasi untuk Google API
declare var google: any;

interface User {
  username: string;
  password: string;
  fullName: string;
  email: string;
  phone: string;
  profilePicture?: string;
  loginMethod: 'manual' | 'google';
}

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonItem,
    IonInput,
    IonButton,
    IonIcon,
    IonCheckbox,
    IonLabel
  ]
})
export class LoginPage implements AfterViewInit, OnDestroy {
  username: string = '';
  password: string = '';
  showPassword: boolean = false;
  submitted: boolean = false;
  rememberMe: boolean = false;
  isGoogleApiLoaded: boolean = false;
  private googleAuthInitialized: boolean = false;

  registeredUsers: User[] = [];

  constructor(
    private navCtrl: NavController,
    private alertController: AlertController,
    private loadingController: LoadingController,
    @Inject(PLATFORM_ID) private platformId: any
  ) {
    addIcons({ 
      personOutline, 
      lockClosedOutline, 
      eyeOutline, 
      eyeOffOutline, 
      logInOutline, 
      refreshOutline,
      mailOutline,
      logoGoogle
    });

    this.loadRegisteredUsers();
  }

  ngAfterViewInit() {
    this.loadRememberedCredentials();
    
    if (isPlatformBrowser(this.platformId)) {
      this.initializeGoogleAuth();
    }
  }

  ngOnDestroy() {
    // Cleanup Google Auth
    if (this.googleAuthInitialized && typeof google !== 'undefined') {
      try {
        google.accounts.id.cancel();
      } catch (error) {
        console.log('Google Auth cleanup:', error);
      }
    }
  }

  // Initialize Google Auth dengan error handling yang robust
  private initializeGoogleAuth() {
    console.log('Initializing Google Auth...');

    // Cek jika Google API sudah loaded
    if (typeof google !== 'undefined') {
      this.setupGoogleAuth();
      return;
    }

    // Load Google API script
    this.loadGoogleApiScript();
  }

  private loadGoogleApiScript() {
    const scriptId = 'google-oauth-script';
    
    // Cek jika script sudah diload
    if (document.getElementById(scriptId)) {
      console.log('Google API script already loaded');
      this.checkGoogleApiReady();
      return;
    }

    const script = document.createElement('script');
    script.id = scriptId;
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    
    script.onload = () => {
      console.log('✅ Google API script loaded successfully');
      this.isGoogleApiLoaded = true;
      this.setupGoogleAuth();
    };

    script.onerror = (error) => {
      console.error('❌ Failed to load Google API script:', error);
      this.showGoogleAuthError('Gagal memuat Google API. Periksa koneksi internet Anda.');
      this.showFallbackButton();
    };

    document.head.appendChild(script);
  }

  private checkGoogleApiReady() {
    let attempts = 0;
    const maxAttempts = 10;
    
    const checkInterval = setInterval(() => {
      attempts++;
      
      if (typeof google !== 'undefined') {
        clearInterval(checkInterval);
        console.log('✅ Google API ready after', attempts, 'attempts');
        this.isGoogleApiLoaded = true;
        this.setupGoogleAuth();
        return;
      }
      
      if (attempts >= maxAttempts) {
        clearInterval(checkInterval);
        console.error('❌ Google API not available after max attempts');
        this.showFallbackButton();
      }
    }, 500);
  }

  private setupGoogleAuth() {
    try {
      if (typeof google === 'undefined') {
        throw new Error('Google API is not available');
      }

      console.log('🔧 Setting up Google Auth...');
      
      google.accounts.id.initialize({
        client_id: '501507192897-ubj14ad1u3u4dtfujk6dvbfp1vt0c2e6.apps.googleusercontent.com',
        callback: (response: any) => this.handleGoogleLogin(response),
        auto_select: false,
        cancel_on_tap_outside: true,
        ux_mode: 'popup'
      });

      this.googleAuthInitialized = true;

      // Render button dengan beberapa attempt
      this.renderGoogleButton();

    } catch (error) {
      console.error('❌ Google Auth setup error:', error);
      this.showGoogleAuthError('Gagal setup Google Login. Silakan coba kembali.');
      this.showFallbackButton();
    }
  }

  private renderGoogleButton(attempt: number = 1) {
    const maxAttempts = 3;
    
    setTimeout(() => {
      const googleBtnContainer = document.getElementById('googleLoginBtn');
      
      if (googleBtnContainer && typeof google !== 'undefined') {
        try {
          google.accounts.id.renderButton(
            googleBtnContainer,
            { 
              theme: 'outline', 
              size: 'large',
              width: 300,
              text: 'continue_with',
              shape: 'rectangular',
              logo_alignment: 'left'
            }
          );
          console.log('✅ Google button rendered successfully');
        } catch (renderError) {
          console.error('❌ Google button render error:', renderError);
          if (attempt < maxAttempts) {
            this.renderGoogleButton(attempt + 1);
          } else {
            this.showFallbackButton();
          }
        }
      } else {
        console.warn('Google button container not found, attempt:', attempt);
        if (attempt < maxAttempts) {
          this.renderGoogleButton(attempt + 1);
        } else {
          this.showFallbackButton();
        }
      }
    }, 1000 * attempt);
  }

  // Handle Google Login Response
  private async handleGoogleLogin(response: any) {
    const loading = await this.loadingController.create({
      message: 'Sedang masuk...',
      spinner: 'crescent',
      duration: 10000
    });
    
    await loading.present();

    try {
      console.log('🔐 Processing Google login...');
      
      // Decode JWT token
      const payload = this.decodeJWT(response.credential);
      
      if (!payload) {
        throw new Error('Invalid JWT token');
      }

      console.log('👤 Google user data:', payload);

      const userData: User = {
        username: payload.email.split('@')[0] + '_google',
        password: 'google_oauth_' + Date.now(),
        fullName: payload.name || 'Google User',
        email: payload.email,
        phone: '',
        profilePicture: payload.picture,
        loginMethod: 'google'
      };

      // Cek apakah user sudah terdaftar
      let existingUser = this.findUserByEmail(payload.email);

      if (!existingUser) {
        // Auto-register user baru
        console.log('📝 Registering new Google user:', userData.email);
        this.registeredUsers.push(userData);
        localStorage.setItem('registeredUsers', JSON.stringify(this.registeredUsers));
        existingUser = userData;
      }

      // Simpan user yang sedang login
      localStorage.setItem('currentUser', JSON.stringify(existingUser));

      await loading.dismiss();
      
      // Show success message
      await this.showAlert('Login Berhasil', `Selamat datang ${payload.name || 'User'}!`);
      
      console.log('🚀 Navigate to home page');
      // Navigate ke beranda
      this.navCtrl.navigateRoot('/tabs/beranda');

    } catch (error) {
      await loading.dismiss();
      console.error('❌ Google Login processing error:', error);
      await this.showAlert('Login Gagal', 'Terjadi kesalahan saat proses login. Silakan coba kembali.');
    }
  }

  // Manual Google Login fallback
  async loginWithGoogleManual() {
    const loading = await this.loadingController.create({
      message: 'Membuka Google Login...',
      spinner: 'crescent'
    });
    
    await loading.present();

    try {
      if (typeof google !== 'undefined' && this.googleAuthInitialized) {
        google.accounts.id.prompt();
      } else {
        await this.showAlert('Info', 'Google Login sedang tidak tersedia. Silakan refresh halaman atau gunakan login manual.');
      }
    } catch (error) {
      console.error('Manual Google Login error:', error);
      await this.showAlert('Error', 'Gagal membuka Google Login');
    } finally {
      await loading.dismiss();
    }
  }

  // Manual Login Method
  async login() {
    this.submitted = true;

    // Validasi form
    if (!this.username || !this.password) {
      await this.showAlert('Error', 'Harap isi semua field');
      return;
    }

    const user = this.findUser(this.username);

    if (!user) {
      // User belum terdaftar, arahkan ke signup
      const alert = await this.alertController.create({
        header: 'Akun Tidak Ditemukan',
        message: 'Username belum terdaftar. Apakah Anda ingin membuat akun baru?',
        buttons: [
          {
            text: 'Batal',
            role: 'cancel',
            cssClass: 'secondary'
          },
          {
            text: 'Daftar',
            handler: () => {
              this.navCtrl.navigateForward('/signup');
            }
          }
        ]
      });
      await alert.present();
      return;
    }

    // Untuk user Google, arahkan ke Google Login
    if (user.loginMethod === 'google') {
      await this.showAlert('Akun Google', 'Akun ini menggunakan Google Login. Silakan gunakan tombol "Continue with Google".');
      return;
    }

    // Validasi password
    if (user.password !== this.password) {
      await this.showAlert('Error', 'Password salah');
      return;
    }

    // Simpan credentials jika remember me dicentang
    if (this.rememberMe) {
      this.saveCredentials();
    } else {
      this.clearCredentials();
    }

    // Simpan user yang sedang login
    localStorage.setItem('currentUser', JSON.stringify(user));
    
    // Show success message
    await this.showAlert('Login Berhasil', `Selamat datang kembali ${user.fullName || user.username}!`);
    
    // Navigate ke beranda
    this.navCtrl.navigateRoot('/tabs/beranda');
  }

  // Reset form
  reset() {
    this.username = '';
    this.password = '';
    this.submitted = false;
    this.showPassword = false;
  }

  // Toggle password visibility
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  // Forgot password handler
  async forgotPassword() {
    const alert = await this.alertController.create({
      header: 'Lupa Password',
      message: 'Masukkan username Anda untuk mendapatkan informasi password:',
      inputs: [
        {
          name: 'username',
          type: 'text',
          placeholder: 'Masukkan username Anda',
          attributes: {
            required: true
          }
        }
      ],
      buttons: [
        {
          text: 'Batal',
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: 'Dapatkan Password',
          handler: (data) => {
            if (data.username && data.username.trim()) {
              this.handlePasswordInfo(data.username.trim());
            }
            return false; // Prevent auto-close
          }
        }
      ]
    });

    await alert.present();
  }

  // Navigate to signup page
  goToSignup() {
    this.navCtrl.navigateForward('/signup');
  }

  // ========== HELPER METHODS ==========

  private decodeJWT(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('JWT decode error:', error);
      return null;
    }
  }

  private findUserByEmail(email: string): User | undefined {
    return this.registeredUsers.find(user => user.email.toLowerCase() === email.toLowerCase());
  }

  private findUser(username: string): User | undefined {
    return this.registeredUsers.find(user => user.username.toLowerCase() === username.toLowerCase());
  }

  private loadRegisteredUsers() {
    try {
      const users = localStorage.getItem('registeredUsers');
      this.registeredUsers = users ? JSON.parse(users) : [];
      
      // Add some demo users for testing
      if (this.registeredUsers.length === 0) {
        this.registeredUsers = [
          {
            username: 'demo',
            password: 'demo123',
            fullName: 'Demo User',
            email: 'demo@mobistiq.com',
            phone: '08123456789',
            loginMethod: 'manual'
          }
        ];
        localStorage.setItem('registeredUsers', JSON.stringify(this.registeredUsers));
      }
      
      console.log('📋 Registered users loaded:', this.registeredUsers.length);
    } catch (error) {
      console.error('Error loading registered users:', error);
      this.registeredUsers = [];
    }
  }

  private async handlePasswordInfo(username: string) {
    const user = this.findUser(username);
    
    if (!user) {
      await this.showAlert('Tidak Ditemukan', 'Username tidak ditemukan');
      return;
    }

    if (user.loginMethod === 'google') {
      await this.showAlert('Akun Google', 'Akun ini menggunakan Google Login. Silakan gunakan tombol "Continue with Google".');
      return;
    }

    const alert = await this.alertController.create({
      header: 'Informasi Password',
      message: `Password untuk <strong>${user.username}</strong> adalah: <br><br><strong>${user.password}</strong>`,
      buttons: ['OK']
    });

    await alert.present();
  }

  private saveCredentials() {
    try {
      const credentials = {
        username: this.username,
        password: this.password,
        timestamp: Date.now()
      };
      localStorage.setItem('rememberedCredentials', JSON.stringify(credentials));
    } catch (error) {
      console.error('Error saving credentials:', error);
    }
  }

  private loadRememberedCredentials() {
    try {
      const credentials = localStorage.getItem('rememberedCredentials');
      if (credentials) {
        const creds = JSON.parse(credentials);
        // Only load if less than 30 days old
        if (Date.now() - creds.timestamp < 30 * 24 * 60 * 60 * 1000) {
          this.username = creds.username || '';
          this.password = creds.password || '';
          this.rememberMe = true;
        } else {
          this.clearCredentials();
        }
      }
    } catch (error) {
      console.error('Error loading credentials:', error);
    }
  }

  private clearCredentials() {
    try {
      localStorage.removeItem('rememberedCredentials');
      this.rememberMe = false;
    } catch (error) {
      console.error('Error clearing credentials:', error);
    }
  }

  private showFallbackButton() {
    setTimeout(() => {
      const fallbackBtn = document.querySelector('.google-login-fallback') as HTMLElement;
      if (fallbackBtn) {
        fallbackBtn.style.display = 'block';
        fallbackBtn.classList.add('show-fallback');
      }
    }, 2000);
  }

  private async showGoogleAuthError(message: string) {
    console.error('Google Auth Error:', message);
    // Don't show alert here to avoid interrupting user experience
  }

  private async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
      cssClass: 'custom-alert'
    });

    await alert.present();
  }

  // Debug method untuk testing
  debugInfo() {
    console.log('=== DEBUG INFO ===');
    console.log('Google API loaded:', typeof google !== 'undefined');
    console.log('Google Auth initialized:', this.googleAuthInitialized);
    console.log('Registered users:', this.registeredUsers);
    console.log('Current user:', localStorage.getItem('currentUser'));
    console.log('Remembered credentials:', localStorage.getItem('rememberedCredentials'));
    console.log('==================');
  }
}