import { defaultEventReportPayload, EventReportPayload } from "./Event"
import { defaultUser, User } from "./User"

export interface MineMaintenanceReport {
    _id: string,
    reportName: string,
    createdBy: User,
    crew: string,
    summary: string,
    safety: string,
    workCompleted: Array<EventReportPayload>,
    workToBeCompleted: Array<EventReportPayload>, 
    createdAt: string,
}

export const defaultMineMaintenanceReport = {
    _id: "",
    reportName: "",
    createdBy: defaultUser,
    crew: "",
    summary: "",
    safety: "",
    workCompleted: [
        defaultEventReportPayload,
    ],
    workToBeCompleted: [
        defaultEventReportPayload
    ],
    createdAt: ""
}