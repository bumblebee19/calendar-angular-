import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarViewWeekComponent } from './calendar-view-week.component';

describe('CalendarViewWeekComponent', () => {
  let component: CalendarViewWeekComponent;
  let fixture: ComponentFixture<CalendarViewWeekComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarViewWeekComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarViewWeekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
