import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ScheduleEvent } from 'src/app/interfaces/events';
import * as moment from 'moment';

@Component({
  selector: 'app-calendar-view-week',
  templateUrl: './calendar-view-week.component.html',
  styleUrls: ['./calendar-view-week.component.scss']
})

export class CalendarViewWeekComponent {
  @Input() viewDate!: Date;
  @Input() events!: ScheduleEvent[];
  @Output() viewDateChange = new EventEmitter<Date>();

  public days: Date[] = [];
  public hours: number[] = [];

  constructor() { }

  ngOnChanges() {
    this.generateDays();
    this.viewDateChange.emit(this.viewDate)
  }

  private generateDays(): void {
    const days: Date[] = [];
    this.hours = [];
    const startOfWeek = new Date(this.viewDate);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
    for (let i = 0; i < 24; i++) {
      this.hours.push(i);
    }
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(day.getDate() + i);
      days.push(day);
    }
    this.days = days;
  }

  public getEventsOfDayAndHour(dayDate: Date, hour: number): ScheduleEvent[] {
    const eventsOfDay: ScheduleEvent[] = [];
    const day = moment(dayDate);
    for (const event of this.events) {
      const start = moment(event.startDateTime);
      const end = moment(event.endDateTime);
      if (day.isBetween(start, end, 'day', '[]')) {
        const startHour = day.isSame(start, 'day') ? start.hour() : hour;
        const endHour = day.isSame(end, 'day') ? end.hour() : 23;
        if (startHour <= hour && endHour >= hour) {
          eventsOfDay.push(event);
        }
      }
    }
    return eventsOfDay;
  }

  public selectDay(day: Date): void {
    this.viewDate = day;
    this.viewDateChange.emit(this.viewDate);
  }

}