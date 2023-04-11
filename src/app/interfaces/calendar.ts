import { ScheduleEvent } from "./events";

export interface Day {
	value: moment.Moment;
	active: boolean;
	disabled: boolean;
	selected: boolean;
	events: ScheduleEvent[];
}

export interface Week {
	days: Day[];
}
