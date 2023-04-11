import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DateService } from 'src/app/services/date.service';

@Component({
  selector: 'app-calendar-header',
  templateUrl: './calendar-header.component.html',
  styleUrls: ['./calendar-header.component.scss']
})
export class CalendarHeaderComponent {
  @Input() view!: string;
  @Input() viewDate!: Date;
  @Output() viewChange = new EventEmitter<string>();
  @Output() viewDateChange = new EventEmitter<Date>();

  constructor(private dateService: DateService) {
  }

  public incrementMonth(): void {
    if (this.view === 'month') {
      this.dateService.changeMonth(+1);
      this.viewDate = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth() + 1, 1);
    } else if (this.view === 'week') {
      this.viewDate = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth(), this.viewDate.getDate() + 7);
    }
    this.viewDateChange.emit(this.viewDate);
  }

  public decrementMonth(): void {
    if (this.view === 'month') {
      this.dateService.changeMonth(-1);
      this.viewDate = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth() - 1, 1);
    } else if (this.view === 'week') {
      this.viewDate = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth(), this.viewDate.getDate() - 7);
    }
    this.viewDateChange.emit(this.viewDate);
  }

  public getTodayDay(): void {
    this.viewDate = new Date();
    this.viewDateChange.emit(this.viewDate);
  }

}
