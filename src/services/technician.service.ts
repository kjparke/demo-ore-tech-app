import API from "../Api";

const TECHNICIAN_ENDPOINT = "/technician";

class TechnicianService {
    readTechnicians = async () => {
        return API.get(TECHNICIAN_ENDPOINT + "/");
    }
}

const technicianServiceInstance =  new TechnicianService()
export default technicianServiceInstance;