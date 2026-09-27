import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PembayaranAirPage } from './pembayaran-air.page';

describe('PembayaranAirPage', () => {
  let component: PembayaranAirPage;
  let fixture: ComponentFixture<PembayaranAirPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PembayaranAirPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
