import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventFormComponent } from 'src/app/components/events/event-form/event-form.component';
import { EventListComponent } from 'src/app/components/events/event-list/event-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    EventListComponent,
    EventFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule
  ],
  exports: [
    EventListComponent,
    EventFormComponent,
    MatIconModule
  ]
})
export class EventsModule { }
