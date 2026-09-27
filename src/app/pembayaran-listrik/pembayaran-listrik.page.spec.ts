import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PembayaranListrikPage } from './pembayaran-listrik.page';

describe('PembayaranListrikPage', () => {
  let component: PembayaranListrikPage;
  let fixture: ComponentFixture<PembayaranListrikPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PembayaranListrikPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
