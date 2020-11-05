import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealParentComponent } from './meal-parent.component';

describe('MealParentComponent', () => {
  let component: MealParentComponent;
  let fixture: ComponentFixture<MealParentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MealParentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MealParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
