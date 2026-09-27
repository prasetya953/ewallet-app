import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PembayaranTvPage } from './pembayaran-tv.page';

describe('PembayaranTvPage', () => {
  let component: PembayaranTvPage;
  let fixture: ComponentFixture<PembayaranTvPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PembayaranTvPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
