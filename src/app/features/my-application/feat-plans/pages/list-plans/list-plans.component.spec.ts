import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPlansComponent } from './list-plans.component';

describe('ListPlansComponent', () => {
  let component: ListPlansComponent;
  let fixture: ComponentFixture<ListPlansComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListPlansComponent],
    });
    fixture = TestBed.createComponent(ListPlansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
