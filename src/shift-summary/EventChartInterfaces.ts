export interface EventDelta {
    id: string;
    eventId: string;
    status: string;
    secondaryStatus: string;
    startTime: string;
    endTime: string;
}

export interface ModifiedEventDelta extends EventDelta {
    associatedDelta: string;
}

export interface AssetShiftData {
    unitId: string;
    events: EventDelta[];
}