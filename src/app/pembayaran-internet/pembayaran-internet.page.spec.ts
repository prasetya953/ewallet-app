import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PembayaranInternetPage } from './pembayaran-internet.page';

describe('PembayaranInternetPage', () => {
  let component: PembayaranInternetPage;
  let fixture: ComponentFixture<PembayaranInternetPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PembayaranInternetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
