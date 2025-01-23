import API from "../Api";
import { EventDelta } from "../interfaces/Log";
import { EventDeltaPayload } from "../shop-view/modals/shop-detail-tabs/AddEventDelta";

const SHIFT_ENDPOINT = "/shift";

class ShiftService {
    createEventDelta = async (eventDelta: EventDeltaPayload) => {
        return API.post(SHIFT_ENDPOINT + `/test`, eventDelta);
    }

    getShiftSummary = async (eventId: string) => {
        return API.get(SHIFT_ENDPOINT + `/${eventId}`);
    }

    updateShiftSummary = async(eventId: string, update: EventDelta) =>  {
        return API.patch(SHIFT_ENDPOINT + `/${eventId}`, update);
    }
} 

const shiftServiceInstance = new ShiftService(); 
export default shiftServiceInstance;