import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RequestMoneyPage } from './request-money.page';

describe('RequestMoneyPage', () => {
  let component: RequestMoneyPage;
  let fixture: ComponentFixture<RequestMoneyPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestMoneyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
