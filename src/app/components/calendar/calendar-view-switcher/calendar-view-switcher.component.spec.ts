import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarViewSwitcherComponent } from './calendar-view-switcher.component';

describe('CalendarViewSwitcherComponent', () => {
  let component: CalendarViewSwitcherComponent;
  let fixture: ComponentFixture<CalendarViewSwitcherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarViewSwitcherComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarViewSwitcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
