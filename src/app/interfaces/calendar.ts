import { ScheduleEvent } from "./events";

export interface Day {
	value: moment.Moment;
	disabled: boolean;
	selected: boolean;
	events: ScheduleEvent[];
}

export interface Week {
	days: Day[];
}
