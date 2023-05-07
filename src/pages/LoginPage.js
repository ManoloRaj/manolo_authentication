import { useState } from "react";
import "./assets/AuthPageStyle.scss"
import { Alert, Snackbar } from "@mui/material";
import { AuthenticationService } from "../services/AuthenticationService";
import { useNavigate } from "react-router-dom";

export function LoginPage() {

    let navigate = useNavigate()
    //MESSAGE FLASH
    const [state, setState] = useState({
        vertical: 'top',
        horizontal: 'center',
    });
    const { vertical, horizontal } = state;
    const [flashMessage, setFlashMessage] = useState({
        open: false,
        message: "",
        severity: "error"
    })


    //LOGIN
    const [login, setLogin] = useState({
        username: "",
        password: ""
    })

    function handleChangeLogin(e) {
        setLogin({
            ...login,
            [e.target.name]: e.target.value
        })
    }
    function handleClickLogin(e) {
        e.preventDefault()

        if (
            login.username !== "" &&
            login.password !== ""
        ) {
            AuthenticationService
                .login(login)
                .then((result) => {
                    console.log(result.isLogged)
                    if (result.isLogged) {

                        AuthenticationService.saveToken(result.access_token)
                        AuthenticationService.saveUserName(login.username)

                        navigate("/homepage")
                    } else {
                        setFlashMessage({
                            open: true,
                            message: "Verifiez vos identifiants",
                            severity: "error"
                        })
                    }
                })
        } else {
            setFlashMessage({
                open: true,
                message: "Veuillez remplir tous les champs",
                severity: "error"
            })
        }



    }
    function handleClickToRegister(e) {
        e.preventDefault()
        navigate("/register");
    }

    return (

        <>
            <div className="LoginPage">

                <div className="log_cnt">
                    <div className="left_cnt">
                        <div className="title_cnt">
                            Testez ici une implémentation du JSON Web token
                        </div>
                        <div className="author_cnt">
                            Designed by @Manolo RAJAONAH
                        </div>
                    </div>

                    <div className="right_cnt">
                        <div className="title_cnt">
                            Connexion
                        </div>
                        <div className="form_cnt">
                            <form>
                                <input
                                    name="username"
                                    placeholder="Utilisateur"
                                    type="username"
                                    onChange={handleChangeLogin}
                                    value={login.username}
                                />
                                <input
                                    name="password"
                                    placeholder="Mot de passe"
                                    type="password"
                                    onChange={handleChangeLogin}
                                    value={login.password}
                                />
                                <button onClick={handleClickLogin}>
                                    Soumettre
                                </button>
                                <button onClick={handleClickToRegister}>
                                    S'inscrire
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

            </div>

            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={flashMessage.open}
                // onClose={handleClose}
                message="I love snacks"
                key={vertical + horizontal}
            >
                <Alert severity={flashMessage.severity}  >
                    {flashMessage.message}
                </Alert>
            </Snackbar>

        </>

    )
}