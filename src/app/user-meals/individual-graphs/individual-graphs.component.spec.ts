import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualGraphsComponent } from './individual-graphs.component';

describe('IndividualGraphsComponent', () => {
  let component: IndividualGraphsComponent;
  let fixture: ComponentFixture<IndividualGraphsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndividualGraphsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualGraphsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
