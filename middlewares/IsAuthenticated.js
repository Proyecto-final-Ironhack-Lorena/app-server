const { expressjwt: jwt } = require("express-jwt");

//función para autenticar al user

const userAuthenticated = jwt ({

    secret: process.env.SECRET_TOKEN,
    algorithms: ["HS256"],
    requestProperty: "payload", //recibe el pyload después de validar el token
    getToken: (req) => {
        if(!req.headers || !req.headers.authorization) {
            console.log("sin tokeeeeeeeeen");
            return null
        }

        const arrToken = req.headers.authorization.split(" ")
        const typeToken = arrToken[0]
        const token = arrToken[1]

        if(typeToken !== "Bearer") {
            return null
        }

        return token
    }

})

module.exports = userAuthenticated;