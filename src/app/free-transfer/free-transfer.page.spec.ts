import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FreeTransferPage } from './free-transfer.page';

describe('FreeTransferPage', () => {
  let component: FreeTransferPage;
  let fixture: ComponentFixture<FreeTransferPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FreeTransferPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
