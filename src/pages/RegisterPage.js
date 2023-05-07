import "./assets/AuthPageStyle.scss"

import { useState } from "react";
import "./assets/AuthPageStyle.scss"
import { Alert, Snackbar } from "@mui/material";
import { AuthenticationService } from "../services/AuthenticationService";
import { useNavigate } from "react-router-dom";

export function RegisterPage() {

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
    const [register, setRegister] = useState({
        username: "",
        email: "",
        age: "",
        password: ""

    })

    //Validation EMAIL
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;


    function handleChangeRegister(e) {
        setRegister({
            ...register,
            [e.target.name]: e.target.value
        })
    }
    function handleClickLogin(e) {
        e.preventDefault()

        if (
            register.username !== "" &&
            register.email !== "" &&
            register.age !== "" &&
            register.password !== ""
        ) {
            if (emailRegex.test(register.email)) {
                AuthenticationService
                    .register(register)
                    .then((result) => {
                        console.log(result.isRegistered)
                        if (result.isRegistered) {

                            AuthenticationService.saveToken(result.access_token)
                            navigate("/login")
                        } else {
                            setFlashMessage({
                                open: true,
                                message: "Cet identifiant est déja utilisé",
                                severity: "error"
                            })
                        }
                    })
            } else {
                setFlashMessage({
                    open: true,
                    message: "Email invalide !!",
                    severity: "error"
                })
            }

        } else {
            setFlashMessage({
                open: true,
                message: "Veuillez remplir tous les champs",
                severity: "error"
            })
        }

    }

    return (

        <>
            <div className="RegisterPage">

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
                            Inscription
                        </div>
                        <div className="form_cnt">
                            <form>
                                <input
                                    name="username"
                                    placeholder="Utilisateur"
                                    type="text"
                                    onChange={handleChangeRegister}
                                    value={register.username}
                                />
                                <input
                                    name="email"
                                    placeholder="Email"
                                    type="email"
                                    onChange={handleChangeRegister}
                                    value={register.email}
                                />
                                <input
                                    name="age"
                                    placeholder="Age"
                                    type="number"
                                    onChange={handleChangeRegister}
                                    value={register.age}
                                />
                                <input
                                    name="password"
                                    placeholder="Mot de passe"
                                    type="password"
                                    onChange={handleChangeRegister}
                                    value={register.password}
                                />
                                <button onClick={handleClickLogin}>
                                    Soumettre
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