import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TopupGamePage } from './topup-game.page';

describe('TopupGamePage', () => {
  let component: TopupGamePage;
  let fixture: ComponentFixture<TopupGamePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TopupGamePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
