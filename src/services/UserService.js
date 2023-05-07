import { AuthenticationService } from "./AuthenticationService";
import { Axios } from "./CallerService"

const config = {
    headers: {
        Authorization: AuthenticationService.getToken()
    }
};

async function getUserInformations(username) {
    try {

        let result = await Axios.post("/getUserInformations", {
            username
        }, config);
        return result.data;

    } catch (error) {
        console.log("Error---", error)
    }
}

export const UserService = {
    getUserInformations
}