export interface ScheduleEvent {
	title: string;
	startDateTime: string | Date;
	endDateTime: string | Date;
	type: string;
	repeat: string;
	frequency: number;
}

// export interface ScheduleEvents  {

// }