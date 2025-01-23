import { User } from "./User";

export interface Note {
    text: string;
    eventId: string;
    userId: User;
    createdAt: string;
    updatedAt: string;
}

export interface SaveNote {
    text: string;
    eventId: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
}