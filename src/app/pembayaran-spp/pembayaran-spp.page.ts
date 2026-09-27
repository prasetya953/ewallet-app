import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, IonButton,
  IonIcon, IonInput, IonSelect, IonSelectOption, IonSearchbar,
  NavController, AlertController, LoadingController, IonButtons
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  chevronBackOutline, informationCircleOutline, 
  personCircleOutline, locationOutline, schoolOutline, 
  calendarOutline, cardOutline, arrowForwardOutline,
  arrowBackOutline, personOutline, idCardOutline,
  mapOutline, businessOutline, checkmarkCircle,
  alertCircle, checkmark, close, chevronDownOutline
} from 'ionicons/icons';

interface Province {
  id: string;
  nama: string;
}

interface Regency {
  id: string;
  nama: string;
  id_provinsi: string;
}

interface School {
  id: string;
  nama: string;
  jenjang: string;
  alamat: string;
  sppAmount: number;
  provinsi?: string;
  kabupaten?: string;
  bentuk_pendidikan?: string;
  status_sekolah?: string;
  alamat_jalan?: string;
  nama_kabupaten?: string;
  nama_provinsi?: string;
}

@Component({
  selector: 'app-pembayaran-spp',
  templateUrl: './pembayaran-spp.page.html',
  styleUrls: ['./pembayaran-spp.page.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    HttpClientModule,
    IonHeader, IonToolbar, IonTitle, IonContent, IonButton,
    IonIcon, IonInput, IonSelect, IonSelectOption, IonSearchbar,
    IonButtons
  ]
})
export class PembayaranSppPage {
  private navCtrl = inject(NavController);
  private alertCtrl = inject(AlertController);
  private loadingCtrl = inject(LoadingController);
  private http = inject(HttpClient);

  // Data siswa
  namaSiswa: string = '';
  nis: string = '';
  
  // Data lokasi
  selectedProvinsi: string = '';
  selectedKabupaten: string = '';
  
  // Data sekolah
  selectedSekolah: string = '';
  selectedSchoolData: School | null = null;
  searchQuery: string = '';
  
  // Data pembayaran
  bulan: string[] = [];
  jumlah: number = 0;
  currentStep: number = 1;
  isLoading: boolean = false;

  // API Configuration
  private apiBaseUrl = 'https://api-basisdata-sekolah.kemdikbud.go.id';
  private useAPI: boolean = true; // Flag untuk switch antara API dan dummy data

  // Data lists
  provinsiList: Province[] = [];
  kabupatenList: Regency[] = [];
  sekolahList: School[] = [];
  filteredSekolahList: School[] = [];

  months = [
    { value: '1', name: 'Jan' },
    { value: '2', name: 'Feb' },
    { value: '3', name: 'Mar' },
    { value: '4', name: 'Apr' },
    { value: '5', name: 'Mei' },
    { value: '6', name: 'Jun' },
    { value: '7', name: 'Jul' },
    { value: '8', name: 'Agu' },
    { value: '9', name: 'Sep' },
    { value: '10', name: 'Okt' },
    { value: '11', name: 'Nov' },
    { value: '12', name: 'Des' }
  ];

  constructor() {
    addIcons({ 
      chevronBackOutline, 
      informationCircleOutline,
      personCircleOutline, 
      locationOutline, 
      schoolOutline, 
      calendarOutline, 
      cardOutline, 
      arrowForwardOutline,
      arrowBackOutline, 
      personOutline, 
      idCardOutline,
      mapOutline, 
      businessOutline, 
      checkmarkCircle,
      alertCircle, 
      checkmark, 
      close, 
      chevronDownOutline
    });
    
    // Load data saat component diinisialisasi
    this.initializeData();
  }

  // Initialize data - coba API dulu, fallback ke dummy data
  async initializeData() {
    if (this.useAPI) {
      await this.loadProvinsiFromAPI();
    } else {
      this.loadDummyData();
    }
  }

  // ==================== API METHODS ====================
  
  async loadProvinsiFromAPI() {
    try {
      this.isLoading = true;
      console.log('Loading provinces from API...');
      
      const response: any = await this.http.get(`${this.apiBaseUrl}/api/provinsi`).toPromise();
      
      console.log('API Provinsi Response:', response);
      
      if (response && response.data && Array.isArray(response.data)) {
        this.provinsiList = response.data.map((prov: any) => ({
          id: prov.id || prov.kode_provinsi,
          nama: prov.nama || prov.name
        }));
        console.log('Provinces loaded successfully:', this.provinsiList.length);
      } else {
        throw new Error('Format response tidak sesuai');
      }
      
    } catch (error: any) {
      console.error('Error loading provinces from API:', error);
      await this.showAlert(
        'Koneksi API Gagal', 
        'Tidak dapat memuat data provinsi dari API. Menggunakan data offline.'
      );
      this.loadDummyData();
    } finally {
      this.isLoading = false;
    }
  }

  async onProvinsiChange() {
    this.selectedKabupaten = '';
    this.selectedSekolah = '';
    this.selectedSchoolData = null;
    this.kabupatenList = [];
    this.sekolahList = [];
    this.filteredSekolahList = [];
    
    if (!this.selectedProvinsi) return;
    
    if (this.useAPI) {
      await this.loadKabupatenFromAPI();
    } else {
      this.loadDummyKabupaten();
    }
  }

  async loadKabupatenFromAPI() {
    try {
      this.isLoading = true;
      console.log('Loading kabupaten from API for province:', this.selectedProvinsi);
      
      const response: any = await this.http.get(
        `${this.apiBaseUrl}/api/kabupaten/${this.selectedProvinsi}`
      ).toPromise();
      
      console.log('API Kabupaten Response:', response);
      
      if (response && response.data && Array.isArray(response.data)) {
        this.kabupatenList = response.data.map((kab: any) => ({
          id: kab.id || kab.kode_kabupaten,
          nama: kab.nama || kab.name,
          id_provinsi: this.selectedProvinsi
        }));
        console.log('Kabupaten loaded successfully:', this.kabupatenList.length);
      } else {
        throw new Error('Format response tidak sesuai');
      }
      
    } catch (error: any) {
      console.error('Error loading kabupaten from API:', error);
      await this.showAlert(
        'Koneksi API Gagal', 
        'Tidak dapat memuat data kabupaten dari API. Menggunakan data offline.'
      );
      this.loadDummyKabupaten();
    } finally {
      this.isLoading = false;
    }
  }

  async onKabupatenChange() {
    this.selectedSekolah = '';
    this.selectedSchoolData = null;
    this.sekolahList = [];
    this.filteredSekolahList = [];
    
    if (!this.selectedKabupaten) return;
    
    if (this.useAPI) {
      await this.loadSekolahFromAPI();
    } else {
      this.loadDummySekolah();
    }
  }

  async loadSekolahFromAPI() {
    try {
      this.isLoading = true;
      console.log('Loading schools from API for regency:', this.selectedKabupaten);
      
      const response: any = await this.http.get(
        `${this.apiBaseUrl}/api/sekolah/${this.selectedKabupaten}`
      ).toPromise();
      
      console.log('API Sekolah Response:', response);
      
      if (response && response.data && Array.isArray(response.data)) {
        this.sekolahList = response.data.map((sekolah: any, index: number) => ({
          id: sekolah.sekolah_id || sekolah.id || `school-${index}`,
          nama: sekolah.nama || sekolah.name || 'Sekolah Tidak Diketahui',
          jenjang: sekolah.bentuk_pendidikan || 'Tidak Diketahui',
          alamat: sekolah.alamat_jalan || 'Alamat tidak tersedia',
          sppAmount: this.calculateSPPAmount(sekolah.bentuk_pendidikan),
          bentuk_pendidikan: sekolah.bentuk_pendidikan,
          status_sekolah: sekolah.status_sekolah,
          alamat_jalan: sekolah.alamat_jalan,
          nama_kabupaten: sekolah.nama_kabupaten,
          nama_provinsi: sekolah.nama_provinsi
        }));
        
        this.filteredSekolahList = this.sekolahList;
        console.log('Schools loaded successfully:', this.sekolahList.length);
        
      } else {
        throw new Error('Format response tidak sesuai');
      }
      
    } catch (error: any) {
      console.error('Error loading schools from API:', error);
      await this.showAlert(
        'Koneksi API Gagal', 
        'Tidak dapat memuat data sekolah dari API. Menggunakan data offline.'
      );
      this.loadDummySekolah();
    } finally {
      this.isLoading = false;
    }
  }

  // ==================== DUMMY DATA METHODS ====================
  
  loadDummyData() {
    console.log('Loading dummy data...');
    this.provinsiList = this.getDummyProvinsi();
  }

  loadDummyKabupaten() {
    this.kabupatenList = this.getDummyKabupaten(this.selectedProvinsi);
  }

  loadDummySekolah() {
    this.sekolahList = this.getDummySekolah(this.selectedKabupaten);
    this.filteredSekolahList = this.sekolahList;
  }

  private getDummyProvinsi(): Province[] {
    return [
      { id: '31', nama: 'DKI Jakarta' },
      { id: '32', nama: 'Jawa Barat' },
      { id: '33', nama: 'Jawa Tengah' },
      { id: '34', nama: 'DI Yogyakarta' },
      { id: '35', nama: 'Jawa Timur' },
      { id: '36', nama: 'Banten' },
      { id: '51', nama: 'Bali' }
    ];
  }

  private getDummyKabupaten(provinsiId: string): Regency[] {
    const kabupatenData: {[key: string]: Regency[]} = {
      '31': [
        { id: '3171', nama: 'Jakarta Selatan', id_provinsi: '31' },
        { id: '3172', nama: 'Jakarta Timur', id_provinsi: '31' },
        { id: '3173', nama: 'Jakarta Pusat', id_provinsi: '31' },
        { id: '3174', nama: 'Jakarta Barat', id_provinsi: '31' },
        { id: '3175', nama: 'Jakarta Utara', id_provinsi: '31' }
      ],
      '32': [
        { id: '3271', nama: 'Kota Bandung', id_provinsi: '32' },
        { id: '3273', nama: 'Kota Bogor', id_provinsi: '32' },
        { id: '3275', nama: 'Kota Bekasi', id_provinsi: '32' }
      ],
      '33': [
        { id: '3371', nama: 'Kota Semarang', id_provinsi: '33' },
        { id: '3372', nama: 'Kota Surakarta', id_provinsi: '33' }
      ]
    };
    
    return kabupatenData[provinsiId] || [];
  }

  private getDummySekolah(kabupatenId: string): School[] {
    const sekolahData: {[key: string]: School[]} = {
      '3171': [
        { 
          id: 'smp1', 
          nama: 'SMP Negeri 1 Jakarta Selatan', 
          jenjang: 'SMP',
          alamat: 'Jl. Merdeka No. 1, Jakarta Selatan',
          sppAmount: 200000,
          bentuk_pendidikan: 'SMP',
          status_sekolah: 'Negeri'
        },
        { 
          id: 'sma1', 
          nama: 'SMA Negeri 1 Jakarta Selatan', 
          jenjang: 'SMA',
          alamat: 'Jl. Sudirman No. 45, Jakarta Selatan',
          sppAmount: 250000,
          bentuk_pendidikan: 'SMA',
          status_sekolah: 'Negeri'
        }
      ],
      '3173': [
        { 
          id: 'smp2', 
          nama: 'SMP Negeri 1 Jakarta Pusat', 
          jenjang: 'SMP',
          alamat: 'Jl. Thamrin No. 12, Jakarta Pusat',
          sppAmount: 200000,
          bentuk_pendidikan: 'SMP',
          status_sekolah: 'Negeri'
        },
        { 
          id: 'smk1', 
          nama: 'SMK Negeri 1 Jakarta Pusat', 
          jenjang: 'SMK',
          alamat: 'Jl. Gatot Subroto No. 78, Jakarta Pusat',
          sppAmount: 300000,
          bentuk_pendidikan: 'SMK',
          status_sekolah: 'Negeri'
        }
      ],
      '3271': [
        { 
          id: 'smp3', 
          nama: 'SMP Negeri 1 Bandung', 
          jenjang: 'SMP',
          alamat: 'Jl. Asia Afrika No. 100, Bandung',
          sppAmount: 180000,
          bentuk_pendidikan: 'SMP',
          status_sekolah: 'Negeri'
        }
      ]
    };
    
    return sekolahData[kabupatenId] || [];
  }

  // ==================== HELPER METHODS ====================
  
  private calculateSPPAmount(jenjang: string = ''): number {
    const jenjangLower = jenjang.toLowerCase();
    if (jenjangLower.includes('sd')) return 150000;
    if (jenjangLower.includes('smp')) return 200000;
    if (jenjangLower.includes('sma') || jenjangLower.includes('smk')) return 250000;
    return 200000; // Default amount
  }

  // Method untuk template - FIXED
  getKabupatenList(): Regency[] {
    return this.kabupatenList;
  }

  // ==================== UI METHODS ====================
  
  // Navigation methods
  nextStep() {
    if (this.currentStep < 4) {
      this.currentStep++;
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  goBack() {
    this.navCtrl.back();
  }

  // School methods - FIXED
  selectSekolah(sekolah: School) {
    this.selectedSekolah = sekolah.id;
    this.selectedSchoolData = sekolah;
    this.hitungSPP();
  }

  filterSekolah() {
    if (!this.searchQuery) {
      this.filteredSekolahList = this.sekolahList;
      return;
    }

    const query = this.searchQuery.toLowerCase();
    this.filteredSekolahList = this.sekolahList.filter(sekolah => 
      sekolah.nama.toLowerCase().includes(query) ||
      sekolah.alamat.toLowerCase().includes(query) ||
      (sekolah.bentuk_pendidikan && sekolah.bentuk_pendidikan.toLowerCase().includes(query))
    );
  }

  getSelectedSchool(): School | undefined {
    return this.sekolahList.find(sekolah => sekolah.id === this.selectedSekolah);
  }

  getSPPAmount(): number {
    const sekolah = this.getSelectedSchool();
    return sekolah ? sekolah.sppAmount : 0;
  }

  // Month methods
  toggleMonth(month: string) {
    const index = this.bulan.indexOf(month);
    if (index > -1) {
      this.bulan.splice(index, 1);
    } else {
      this.bulan.push(month);
    }
    this.hitungSPP();
  }

  isMonthSelected(month: string): boolean {
    return this.bulan.includes(month);
  }

  removeMonth(monthName: string) {
    const monthMap: {[key: string]: string} = {
      'Januari': '1', 'Februari': '2', 'Maret': '3', 'April': '4',
      'Mei': '5', 'Juni': '6', 'Juli': '7', 'Agustus': '8',
      'September': '9', 'Oktober': '10', 'November': '11', 'Desember': '12'
    };
    
    const monthValue = monthMap[monthName];
    if (monthValue) {
      this.toggleMonth(monthValue);
    }
  }

  // Payment methods
  async prosesPembayaran() {
    if (!this.isFormValid()) {
      await this.showAlert('Data Tidak Lengkap', 'Harap lengkapi semua data sebelum melakukan pembayaran.');
      return;
    }

    const loading = await this.loadingCtrl.create({
      message: 'Memproses pembayaran SPP...',
      spinner: 'crescent'
    });
    
    await loading.present();

    // Simulate payment processing
    setTimeout(async () => {
      await loading.dismiss();
      
      const sekolah = this.getSelectedSchool();
      await this.showSuccessAlert(sekolah?.nama || '');
    }, 2000);
  }

  hitungSPP() {
    const sppAmount = this.getSPPAmount();
    if (sppAmount > 0 && this.bulan.length > 0) {
      this.jumlah = sppAmount * this.bulan.length;
    } else {
      this.jumlah = 0;
    }
  }

  getSelectedMonths(): string[] {
    const monthMap: {[key: string]: string} = {
      '1': 'Januari', '2': 'Februari', '3': 'Maret', '4': 'April',
      '5': 'Mei', '6': 'Juni', '7': 'Juli', '8': 'Agustus',
      '9': 'September', '10': 'Oktober', '11': 'November', '12': 'Desember'
    };

    return this.bulan.map(month => monthMap[month] || month);
  }

  validateNIS() {
    // Validation handled in template
  }

  isValidNIS(nis: string): boolean {
    const nisRegex = /^\d{8}$/;
    return nisRegex.test(nis);
  }

  isFormValid(): boolean {
    return !!this.namaSiswa && 
           !!this.nis && 
           !!this.selectedSekolah && 
           this.bulan.length > 0 &&
           this.isValidNIS(this.nis);
  }

  // ==================== ALERT METHODS ====================
  
  private async showSuccessAlert(sekolahNama: string) {
    const alert = await this.alertCtrl.create({
      header: '✅ Pembayaran Berhasil!',
      message: `
Nama: ${this.namaSiswa}
NIS: ${this.nis}
Sekolah: ${sekolahNama}
Bulan: ${this.getSelectedMonths().join(', ')}
Total: Rp${this.formatCurrency(this.jumlah)}

Terima kasih telah melakukan pembayaran SPP.
      `,
      buttons: [
        {
          text: 'Kembali ke Beranda',
          handler: () => {
            this.navCtrl.navigateRoot('/beranda');
          }
        }
      ]
    });
    
    await alert.present();
  }

  private async showAlert(header: string, message: string) {
    const alert = await this.alertCtrl.create({
      header,
      message,
      buttons: ['OK']
    });
    
    await alert.present();
  }

  async showHelp() {
    const alert = await this.alertCtrl.create({
      header: 'Bantuan Pembayaran SPP',
      message: `
1. Isi data siswa dengan lengkap dan benar
2. Pilih provinsi dan kabupaten lokasi sekolah
3. Cari dan pilih sekolah dari daftar
4. Pilih bulan SPP yang akan dibayar
5. Lakukan pembayaran sesuai jumlah yang tertera

Data sekolah diambil dari API Kemendikbud.
      `,
      buttons: ['Mengerti']
    });
    
    await alert.present();
  }

  // Utility methods
  formatCurrency(amount: number): string {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  // Method untuk testing API
  async testAPI() {
    console.log('Testing API connection...');
    
    try {
      const response = await this.http.get(`${this.apiBaseUrl}/api/provinsi`).toPromise();
      console.log('✅ API Test Success:', response);
      await this.showAlert('API Test', 'Koneksi API berhasil!');
    } catch (error) {
      console.error('❌ API Test Failed:', error);
      await this.showAlert('API Test', 'Koneksi API gagal. Menggunakan data offline.');
    }
  }
}