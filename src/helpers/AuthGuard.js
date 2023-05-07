const { Navigate } = require("react-router-dom")
const { AuthenticationService } = require("../services/AuthenticationService")

const AuthGuard = ({ children }) => {
    if (!AuthenticationService.isLogged()) {
        return <Navigate to="/login" />
    }
    return children;
}

export default AuthGuard;