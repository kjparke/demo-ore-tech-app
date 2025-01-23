import API from "../Api";
import { SaveNote } from "../interfaces/Note";
import { Payload } from "../interfaces/Payload";

const NOTE_ENDPOINT = "/note";

class NoteService {
    readNotes = async (eventId: string) => {
        return API.get(NOTE_ENDPOINT + `/${eventId}`);
    }

    createNote = async (note: Payload) => {
        return API.post(NOTE_ENDPOINT + '/', note);
    }
}

const noteServiceInstance = new NoteService();
export default noteServiceInstance;