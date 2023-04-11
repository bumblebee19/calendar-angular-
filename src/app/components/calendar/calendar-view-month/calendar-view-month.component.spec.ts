import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarViewMonthComponent } from './calendar-view-month.component';

describe('CalendarViewMonthComponent', () => {
  let component: CalendarViewMonthComponent;
  let fixture: ComponentFixture<CalendarViewMonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarViewMonthComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarViewMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
