import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-calendar-view-switcher',
  templateUrl: './calendar-view-switcher.component.html',
  styleUrls: ['./calendar-view-switcher.component.scss']
})
export class CalendarViewSwitcherComponent {
  @Input() view!: string;
  @Output() viewChange = new EventEmitter<string>();

  constructor() {
  }

  public changeView(view: string): void {
    this.view = view;
    this.viewChange.emit(view);
  }

}
