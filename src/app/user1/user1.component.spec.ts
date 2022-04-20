import { ComponentFixture, TestBed } from '@angular/core/testing';

import { User1Component } from './user1.component';

describe('Home1Component', () => {
  let component: User1Component;
  let fixture: ComponentFixture<User1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ User1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(User1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
