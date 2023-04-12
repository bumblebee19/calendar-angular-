import { Component, ViewEncapsulation } from '@angular/core';
import * as moment from 'moment';
import { ScheduleEvent } from 'src/app/interfaces/events';
import { DateService } from 'src/app/services/date.service';
import { StorageEventService } from 'src/app/services/storage-event.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class CalendarComponent {

  public viewMode = 'month';
  public viewDate = new Date();
  public events: ScheduleEvent[] = [];


  constructor(private eventService: StorageEventService, private dateService: DateService) {
    this.refreshEvents();
  }

  private refreshEvents(): void {
    this.eventService.getAllEvents().subscribe(event => this.events = event);
  }

  public onViewModeChange(viewMode: string): void {
    this.viewMode = viewMode;
  }

  public onViewDateChange(viewDate: Date): void {
    this.viewDate = viewDate;
    this.dateService.changeDate(moment(viewDate));
  }

  public onEventCreated(newEvent: string): void {
    this.refreshEvents();
  }

}
