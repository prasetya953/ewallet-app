import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TopupEwalletPage } from './topup-ewallet.page';

describe('TopupEwalletPage', () => {
  let component: TopupEwalletPage;
  let fixture: ComponentFixture<TopupEwalletPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TopupEwalletPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
