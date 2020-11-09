import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsernameChangeComponent } from './username-change.component';

describe('UsernameChangeComponent', () => {
  let component: UsernameChangeComponent;
  let fixture: ComponentFixture<UsernameChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsernameChangeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsernameChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
