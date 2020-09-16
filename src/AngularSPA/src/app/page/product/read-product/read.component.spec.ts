import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadProductComponent } from './read.component';

describe('ReadComponent', () => {
  let component: ReadProductComponent;
  let fixture: ComponentFixture<ReadProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
