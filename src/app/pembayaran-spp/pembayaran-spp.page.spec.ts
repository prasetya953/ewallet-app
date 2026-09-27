import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PembayaranSppPage } from './pembayaran-spp.page';

describe('PembayaranSppPage', () => {
  let component: PembayaranSppPage;
  let fixture: ComponentFixture<PembayaranSppPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PembayaranSppPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
