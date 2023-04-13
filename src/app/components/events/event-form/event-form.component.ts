import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ScheduleEvent } from 'src/app/interfaces/events';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss']
})
export class EventFormComponent {

  public eventForm!: FormGroup;
  public events: ScheduleEvent[] = [];

  public eventTypes: string[] = ['Workday', 'Day off'];
  public recurrenceDays: Array<{ value: string; name: string }> = [
    { value: 'none', name: 'None' },
    { value: 'daily', name: 'Daily' },
    { value: 'weekly', name: 'Weekly' },
    { value: 'monthly', name: 'Monthly' },
    { value: 'yearly', name: 'Yearly' },
  ];
  public minDate: Date = new Date();

  constructor(public dialogRef: MatDialogRef<EventFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { event: ScheduleEvent }, private fb: FormBuilder) {
    if (data.event) {
      this.eventForm = new FormGroup({
        title: new FormControl(data.event.title, Validators.required),
        startDateTime: new FormControl(data.event.startDateTime, Validators.required),
        endDateTime: new FormControl(data.event.endDateTime, Validators.required),
        type: new FormControl(data.event.type),
        repeat: new FormControl(data.event.repeat),
        frequency: new FormControl(data.event.frequency),
      });
    } else {
      this.eventForm = new FormGroup({
        title: new FormControl('', Validators.required),
        startDateTime: new FormControl('', Validators.required),
        endDateTime: new FormControl('', Validators.required),
        type: new FormControl(''),
        repeat: new FormControl('none'),
        frequency: new FormControl(null),
      });
    }
  }

  public onSubmit(): void {
    const event: ScheduleEvent = this.eventForm.value;
    this.createEvent(event);
    this.dialogRef.close(this.events);
  }

  private createEvent(event: ScheduleEvent): void {
    this.events = [];
    const start = new Date(event.startDateTime);
    const end = new Date(event.endDateTime);
    if (event.repeat === 'daily') {
      for (let i = 0; i < event.frequency; i++) {
        const newEvent = this.createNewEvent(event, start, end);
        this.events.push(newEvent);
        start.setDate(start.getDate() + 1);
        end.setDate(end.getDate() + 1);
        event.startDateTime = new Date(start);
        event.endDateTime = new Date(end);
      }
    } else if (event.repeat === 'weekly') {
      for (let i = 0; i < event.frequency; i++) {
        const newEvent = this.createNewEvent(event, start, end);
        this.events.push(newEvent);
        start.setDate(start.getDate() + 7);
        end.setDate(end.getDate() + 7);
        event.startDateTime = new Date(start);
        event.endDateTime = new Date(end);
      }
    } else if (event.repeat === 'monthly') {
      for (let i = 0; i < event.frequency; i++) {
        const newEvent = this.createNewEvent(event, start, end);
        this.events.push(newEvent);
        start.setMonth(start.getMonth() + 1);
        end.setMonth(end.getMonth() + 1);
        event.startDateTime = new Date(start);
        event.endDateTime = new Date(end);
      }
    } else {
      this.events.push(event);
    }
  }

  private createNewEvent(event: ScheduleEvent, start: Date, end: Date): ScheduleEvent {
    return {
      title: event.title, startDateTime: new Date(start), endDateTime: new Date(end),
      type: event.type, repeat: event.repeat, frequency: event.frequency
    };
  }
}
