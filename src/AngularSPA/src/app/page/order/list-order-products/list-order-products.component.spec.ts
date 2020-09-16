import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOrderProductsComponent } from './list-order-products.component';

describe('ListOrderProductsComponent', () => {
  let component: ListOrderProductsComponent;
  let fixture: ComponentFixture<ListOrderProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOrderProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOrderProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
