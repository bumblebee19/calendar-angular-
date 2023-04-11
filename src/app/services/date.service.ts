import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  public date: BehaviorSubject<moment.Moment> = new BehaviorSubject(moment());

  constructor() { }

  public changeMonth(direction: number): void {
    const value = this.date.value.add(direction, 'month');
    this.date.next(value);
  }

  public changeDate(date: moment.Moment): void {
    const value = this.date.value.set({
      date: date.date(),
      month: date.month()
    });
    this.date.next(value);
  }

}
