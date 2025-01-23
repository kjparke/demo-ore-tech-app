import API from "../Api";

const AUTH_ENDPOINT = "/auth";

class AuthService {
    register = async (firstname: string, lastname: string, email: string, password: string, accessLevel: string) => {
        return API.post(AUTH_ENDPOINT + "/register", {
            firstname, 
            lastname, 
            email, 
            password, 
            accessLevel
        });
    }

    signIn = async (email: string, password: string) => {
        return API.post(AUTH_ENDPOINT + "/signin", { email, password })
            .then((response) => {
                if (response.data.accessToken) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }
      
                return response.data;
            });;
    }

    changePassword = async (email: string, oldPassword: string, newPassword: string) => {
        return API.patch(AUTH_ENDPOINT + "/changePassword", { email, oldPassword, newPassword });
    }

    changeEmail = async (oldEmail: string, newEmail: string, password: string) => {
        return API.patch(AUTH_ENDPOINT + "/changeEmail",  { email: oldEmail, newEmail, password });
    }

    changeName = async (firstName: string, lastname: string) => {
        return API.patch(AUTH_ENDPOINT + "/changeName", { firstName, lastname });
    }

    logout = () => {
        localStorage.removeItem("user");
      };

    getCurrentUser = () => {
        const userStr = localStorage.getItem("user");
        if (userStr) return JSON.parse(userStr);
        
        return null;
    };
} 

const authServiceInstance = new AuthService(); 
export default authServiceInstance;