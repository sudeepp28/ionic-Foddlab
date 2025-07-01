import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LastOrderRestaurantPage } from './last-order-restaurant.page';

describe('LastOrderRestaurantPage', () => {
  let component: LastOrderRestaurantPage;
  let fixture: ComponentFixture<LastOrderRestaurantPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LastOrderRestaurantPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
