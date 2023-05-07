import { useEffect, useState } from "react";
import { AuthenticationService } from "../services/AuthenticationService";
import "./assets/HomePageStyle.scss";
import { UserService } from "../services/UserService";
import { useNavigate } from "react-router-dom";

export function HomePage() {
    let navigate = useNavigate();
    const [user, setUser] = useState({
        username: "",
        email: "",
        age: ""
    })

    function handleClickLogout(e) {
        e.preventDefault()
        AuthenticationService.logout()
        navigate("/login")
    }

    useEffect(() => {
        UserService
            .getUserInformations(localStorage.getItem("username"))
            .then((result) => {
                if (result.status) {
                    setUser(result.data)
                }
            })


    }, [])

    return (
        <>
            <div className="HomePage">
                <div className="profile_cnt">
                    <div className="top_banner_cnt">
                        <div className="profile_bnr">

                        </div>
                        <div className="profile_pct">

                        </div>
                    </div>
                    <div className="detail_cnt">
                        <div className="name_title_cnt">
                            {user.username !== undefined ? user.username : ""}
                        </div>
                        <div className="desc_cnt">
                            Le détail des profils apparaissent ici
                        </div>
                        <div className="text_cnt">
                            {user.email !== undefined ? user.email : ""} - {user.age !== undefined ? user.age : ""} ans
                        </div>
                    </div>
                    <div className="logout">
                        <button onClick={handleClickLogout}>
                            Logout
                        </button>
                    </div>

                </div>

            </div>
        </>
    )
}