import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon'

import { CalendarComponent } from 'src/app/components/calendar/calendar.component';
import { EventsModule } from '../events/events.module';
import { CalendarHeaderComponent } from 'src/app/components/calendar/calendar-header/calendar-header.component';
import { CalendarViewMonthComponent } from 'src/app/components/calendar/calendar-view-month/calendar-view-month.component';
import { CalendarViewSwitcherComponent } from 'src/app/components/calendar/calendar-view-switcher/calendar-view-switcher.component';
import { CalendarViewWeekComponent } from 'src/app/components/calendar/calendar-view-week/calendar-view-week.component';


@NgModule({
  declarations: [
    CalendarComponent,
    CalendarHeaderComponent,
    CalendarViewSwitcherComponent,
    CalendarViewMonthComponent,
    CalendarViewWeekComponent
  ],
  imports: [
    CommonModule,
    EventsModule,
    MatDialogModule
  ],
  exports: [
    CalendarComponent,
    CalendarHeaderComponent,
    CalendarViewSwitcherComponent,
    CalendarViewMonthComponent,
    CalendarViewWeekComponent
  ]
})
export class CalendarModule { }
