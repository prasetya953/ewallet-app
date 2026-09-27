import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PembayaranBpjsPage } from './pembayaran-bpjs.page';

describe('PembayaranBpjsPage', () => {
  let component: PembayaranBpjsPage;
  let fixture: ComponentFixture<PembayaranBpjsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PembayaranBpjsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
