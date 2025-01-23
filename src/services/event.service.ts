import API from "../Api";
import { Payload } from "../interfaces/Payload";

const EVENT_ENDPOINT = "/event";

class EventService {

    updateEvent = async (event: Payload) => {
        return API.patch(EVENT_ENDPOINT, event);
    }

    readEventNotes = async (eventId: string) => {
        return API.get(EVENT_ENDPOINT + `/${eventId}/notes`);
    }
}

const eventServiceInstance = new EventService();
export default eventServiceInstance;