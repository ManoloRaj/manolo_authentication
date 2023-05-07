import { Axios } from "./CallerService"

async function register(register) {
    try {
        let result = await Axios.post("/authentication/register", register);
        return result.data;

    } catch (error) {
        console.log("Error---", error)
    }
}

async function login(login) {
    try {
        let result = await Axios.post("/authentication/login", login);
        return result.data;

    } catch (error) {
        console.log("Error---", error)
    }
}






function saveToken(token) {
    localStorage.setItem('token', token)
}
function getToken() {
    return localStorage.getItem('token')
}



function saveUserName(username) {
    localStorage.setItem('username', username)
}

function logout() {
    localStorage.removeItem('token')
}

function isLogged() {
    let token = localStorage.getItem('token');
    return !!token;

}
export const AuthenticationService = {
    register,
    login,

    saveToken,
    getToken,

    saveUserName,

    logout,
    isLogged
}