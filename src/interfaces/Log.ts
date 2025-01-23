import { User } from "./User";

export interface Log {
  eventId: string;
  eventChangeText: String; 
  user: User;
  eventStatus: string, 
  eventSecondaryStatus: string;
  createdAt: string;
}

export interface HourlyChange {
	hour: string, 
	log: EventDelta
}

export interface EventDelta {
  _id: string,
  hour: string, 
  eventId: string,
  status: string,
  secondaryStatus: string,
  createdAt: string,
}