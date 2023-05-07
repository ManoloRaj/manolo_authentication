const fs = require("fs");
const bodyParser = require("body-parser");
const jsonServer = require("json-server");
const jwt = require("jsonwebtoken");

const server = jsonServer.create()
const fileAdress = "./simulation_server/users.json";

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json())
server.use(jsonServer.defaults())

const SECRET_KEY = "123456789"
const expiresIn = "1h"

function createToken(payload) {
    return jwt.sign(payload, SECRET_KEY, { expiresIn });
}


//Fonction pour les perations sur le JSON
function isAuthenticated(userdb, login) {
    return (
        userdb.users.findIndex((user) => user.username === login.username && user.password === login.password) === -1
    );
}

function existUsername(userdb, username) {
    return userdb.users.some((user) => user.username === username)
}
function getUserInformations(userdb, username) {
    return userdb.users.find((user) => user.username === username)
}






// Une petit Middleware pour valider le token
const validateToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        jwt.verify(token, SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(200).json({
                    isValidToken: false,
                    message: 'Token invalide'
                });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.status(200).json({
            isValidToken: false,
            message: 'Token manquant'
        });
    }
};


server.post("/api/authentication/register", (req, res) => {
    const userdb = JSON.parse(fs.readFileSync(fileAdress, "utf-8"))

    const { username, password, email, age } = req.body;

    if (existUsername(userdb, username)) {
        const status = 200;
        const message = "Account already exist"
        const isRegistered = false
        res.status(status).json({
            status,
            message,
            isRegistered
        })
        return;
    };

    fs.readFile(fileAdress, (err, data) => {
        if (err) {
            const status = 200;
            const message = err;
            const isRegistered = false
            res.status(status).json({
                status,
                message,
                isRegistered
            });

            return;
        }

        data = JSON.parse(data.toString())

        let last_item_id = data.users[data.users.length - 1].id_user
        data.users.push({
            id_user: last_item_id + 1,
            username: username,
            email: email,
            password: password,
            age: age
        });

        let writeData = fs.writeFile(
            fileAdress,
            JSON.stringify(data),
            (err, result) => {
                if (err) {
                    const status = 200;
                    const message = err;

                    res.status(status).json({
                        status,
                        message,
                        isRegistered: false
                    });
                    return;
                }
            }

        );

    });

    const access_token = createToken({ username, password });
    res.status(200).json({
        status: 200,
        access_token: access_token,
        isRegistered: true
    });
});




server.post("/api/authentication/login", (req, res) => {
    const userdb = JSON.parse(fs.readFileSync(fileAdress, "utf-8"))

    const { username, password } = req.body;

    if (isAuthenticated(userdb, { username, password })) {
        const status = 200;
        const message = "Incorrect Email or Password"
        const isLogged = false

        res.status(status).json({
            status,
            message,
            isLogged
        });

        return;
    };

    const access_token = createToken({ username, password })

    res.status(200).json({
        status: 200,
        access_token: access_token,
        isLogged: true
    });
});

server.post("/api/getUserInformations", validateToken, (req, res) => {
    const userdb = JSON.parse(fs.readFileSync(fileAdress, "utf-8"))

    const { username } = req.body;

    res.status(200).json({
        status: 200,
        isValidToken: true,
        data: getUserInformations(userdb, username)
    });




});

server.listen(5000, () => {
    console.log("Running simulation api json server")
});