import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PulsaDataPage } from './pulsa-data.page';

describe('PulsaDataPage', () => {
  let component: PulsaDataPage;
  let fixture: ComponentFixture<PulsaDataPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PulsaDataPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
