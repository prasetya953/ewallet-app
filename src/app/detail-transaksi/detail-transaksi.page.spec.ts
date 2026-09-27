import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailTransaksiPage } from './detail-transaksi.page';

describe('DetailTransaksiPage', () => {
  let component: DetailTransaksiPage;
  let fixture: ComponentFixture<DetailTransaksiPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailTransaksiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
