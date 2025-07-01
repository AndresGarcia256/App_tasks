import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Taskss } from './tasks';

describe('Tasks', () => {
  let component: Taskss;
  let fixture: ComponentFixture<Taskss>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Taskss]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Taskss);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
