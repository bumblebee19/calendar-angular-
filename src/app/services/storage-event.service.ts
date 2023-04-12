import { Injectable } from '@angular/core';
import { ScheduleEvent } from '../interfaces/events';
import { BehaviorSubject, Observable } from 'rxjs';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})

export class StorageEventService {

  private STORAGE_KEY = 'events';
  private events: ScheduleEvent[] = [];
  private eventsFilter: ScheduleEvent[] = [];
  private eventsSubject = new BehaviorSubject<ScheduleEvent[]>(this.eventsFilter);

  constructor() { }

  public getAllEvents(): Observable<ScheduleEvent[]> {
    const storedEvents = localStorage.getItem('events');
    this.events = [];
    if (storedEvents) {
      this.events = JSON.parse(storedEvents)
    }
    this.eventsSubject.next(this.events);
    return this.eventsSubject.asObservable();
  }

  public addEvent(event: ScheduleEvent): void {
    this.events.push(event);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.events));
    this.eventsSubject.next(this.events);
  }

  public deleteEvent(event: ScheduleEvent): void {
    const index = this.events.findIndex(e => JSON.stringify(e) === JSON.stringify(event));
    if (index !== -1) {
      this.events.splice(index, 1);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.events));
      this.eventsSubject.next(this.events);
    }
  }

  public updateEvent(oldEvent: ScheduleEvent, newEvent: ScheduleEvent): void {
    const index = this.events.findIndex(e => JSON.stringify(e) === JSON.stringify(oldEvent));
    if (index !== -1) {
      this.events[index] = newEvent;
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.events));
      this.eventsSubject.next(this.events);
    }
  }

  public getEventsFilteredByDay(date: moment.Moment): Observable<ScheduleEvent[]> {
    return new Observable<ScheduleEvent[]>(observer => {
      const events = localStorage.getItem(this.STORAGE_KEY);
      let parsed: ScheduleEvent[] = [];
      if (events) {
        parsed = JSON.parse(events);
      }
      const filteredEvents = parsed.filter((event: ScheduleEvent) => {
        return (date.format("YYYY-MM-DD") >= moment(event.startDateTime).format("YYYY-MM-DD") &&
          moment(event.endDateTime).format("YYYY-MM-DD") >= date.format("YYYY-MM-DD"))
      });
      observer.next(filteredEvents);
      observer.complete();
    });
  }

  public getEventsFilteredByDayAndDuration(selectedDate: Date, duration: number): ScheduleEvent[] {
    const eventsFilteredByDay = this.events.filter(event =>
      new Date(event.startDateTime).getDate() === selectedDate.getDate() &&
      new Date(event.startDateTime).getMonth() === selectedDate.getMonth() &&
      new Date(event.startDateTime).getFullYear() === selectedDate.getFullYear()
    );
    const eventsFilteredByDuration = eventsFilteredByDay.reduce((filteredEvents: ScheduleEvent[], event) => {
      const eventDuration = Math.abs(new Date(event.startDateTime).getTime() - new Date(event.endDateTime).getTime()) / 36e5;
      if (eventDuration <= duration) {
        filteredEvents.push(event);
      }
      return filteredEvents;
    }, []);
    return eventsFilteredByDuration;
  }
}
