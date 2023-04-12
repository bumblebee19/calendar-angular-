import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import * as moment from 'moment';
import { Week } from 'src/app/interfaces/calendar';
import { ScheduleEvent } from 'src/app/interfaces/events';
import { DateService } from 'src/app/services/date.service';

@Component({
  selector: 'app-calendar-view-month',
  templateUrl: './calendar-view-month.component.html',
  styleUrls: ['./calendar-view-month.component.scss']
})
export class CalendarViewMonthComponent {

  @Input() viewDate!: Date;
  @Input() events!: ScheduleEvent[];
  @Output() viewDateChange = new EventEmitter<Date>();
  public calendar!: Week[];

  constructor(private dateService: DateService) { }

  ngOnInit() {
    this.dateService.date.subscribe(this.generateMonth.bind(this));
  }

  private generateMonth(now: moment.Moment): void {
    const startDay = now.clone().startOf('month').startOf('week')
    const endDay = now.clone().endOf('month').endOf('week')
    const date = startDay.clone().subtract(1, 'day')
    const calendar: Week[] = [];
    while (date.isBefore(endDay, 'day')) {
      calendar.push({
        days: Array(7).fill(0).map(() => {
          const value = date.add(1, 'day').clone();
          const active = moment().isSame(value, 'date');
          const disabled = !now.isSame(value, 'month');
          const selected = now.isSame(value, 'date');
          const events = this.events.filter(event => {
            return (moment(value).format("YYYY-MM-DD") >= moment(event.startDateTime).format("YYYY-MM-DD")
              && moment(event.endDateTime).format("YYYY-MM-DD") >= moment(value).format("YYYY-MM-DD"))
          });
          return { value, active, disabled, selected, events }
        })
      })
    }
    this.calendar = calendar;
  }


  public selectDay(day: moment.Moment): void {
    this.viewDate = day.toDate();
    this.viewDateChange.emit(this.viewDate);
  }

}
