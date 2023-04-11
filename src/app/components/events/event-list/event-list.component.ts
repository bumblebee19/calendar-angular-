import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { switchMap } from 'rxjs';
import { ScheduleEvent } from 'src/app/interfaces/events';
import { DateService } from 'src/app/services/date.service';
import { StorageEventService } from 'src/app/services/storage-event.service';
import { EventFormComponent } from '../event-form/event-form.component';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent {

  @Input() events!: ScheduleEvent[];
  public filteredEvents: ScheduleEvent[] = [];

  constructor(private eventService: StorageEventService, public dateService: DateService, public dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.dateService.date.pipe(
      switchMap(value => this.eventService.getEventsFilteredByDay(value))
    ).subscribe(tasks => {
      this.events = tasks;
    })
  }

  public onDeleteEvent(event: ScheduleEvent): void {
    this.eventService.deleteEvent(event);
    this.dateService.date.pipe(
      switchMap(value => this.eventService.getEventsFilteredByDay(value))
    ).subscribe((tasks: ScheduleEvent[]) => {
      this.events = tasks;
    });
  }

  public onEditEvent(event: ScheduleEvent): void {
    const dialogRef = this.dialog.open(EventFormComponent, {
      width: '400px',
      height: '550px',
      data: { event }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (Array.isArray(result)) {
          result.forEach((eventofResult: ScheduleEvent) => {
            this.eventService.updateEvent(event, eventofResult);
          })
        } else {
          this.eventService.updateEvent(event, result);
        }
        this.dateService.date.pipe(
          switchMap(value => this.eventService.getEventsFilteredByDay(value))
        ).subscribe((tasks: ScheduleEvent[]) => {
          this.events = tasks;
        })
      }
    });
  }

  public onCreateEvent(): void {
    const dialogRef = this.dialog.open(EventFormComponent, {
      width: '400px',
      height: '550px',
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (Array.isArray(result)) {
          result.forEach((event: ScheduleEvent) => {
            this.eventService.addEvent(event);
          })
        } else {
          this.eventService.addEvent(result)
        }
      }
      this.dateService.date.pipe(
        switchMap(value => this.eventService.getEventsFilteredByDay(value))
      ).subscribe((tasks: ScheduleEvent[]) => {
        this.events = tasks;
      })
    });
  }

}
