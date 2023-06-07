const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs")
const User = require("../models/User.model")
const {Router} = require('express')

const userAuthenticated = require("../middlewares/IsAuthenticated");

const router = Router();

//POST "api/auth/signup" => registro del user
router.post("/signup", async (req, res, next) => {
  const { username, email, password } = req.body;

  //*Validaciones del server
  if (!username || !email || !password) {
    res
      .status(400)
      .json({ errorMessage: "Todos los campos deben estar rellenos" });
    return;
  }

  const regexPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
  if (regexPattern.test(password) === false) {
    res.status(400).json({
        errorMessage:"Tu contraseña necesita al menos una mayúscula, un caracter especial y una longitud de ocho caracteres."})
    return
  }

  try {
    const foundUser = await User.findOne({email: email})
    if(foundUser) {
        res.status(400).json({errorMessage: "Este email ya ha sido registrado"})
        return;
    }

    const foundUserByUsername = await User.findOne({username: username})
    if(foundUserByUsername) {
        res.status(400).json({errorMessage: "Este nombre de usuario ya ha sido registrado"})
        return;
    }

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)

    await User.create({
        username: username,
        email: email,
        password: hashPassword
    })

    res.json("usuario super creado!!!!")


  } catch(error) {
    next(error)
  }

 
});

//POST "api/auth/login" => validamos al usuario
router.post("/login", async (req, res, next) => {
    const {email, password} = req.body

    if (!email || !password) {
        res
          .status(400)
          .json({ errorMessage: "Todos los campos deben estar rellenos" });
        return;
      }
    
      try {

        const foundUser = await User.findOne({email: email})
        if(!foundUser) {
            res.status(400).json({errorMessage: "este correo no existe"})
            return;
        }

        const passwordCorrect = await bcrypt.compare(password, foundUser.password)
        if(!passwordCorrect) {
            res.status(400).json({errorMessage: "contraseña incorrecta"})
            return;
        }

        const payload = {
            _id: foundUser._id,
            email: foundUser.email

            //!Añadir los roles!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        }

        const tokenAuth = jwt.sign(
            payload,
            process.env.SECRET_TOKEN,
            { algorithm: "HS256", expiresIn: "14d"}
        )

        res.json({tokenAuth: tokenAuth, email: email})


      } catch(error) {
        next(error)
      }
})

//GET "api/auth/verify" => Le indicamos al frontend si el usuario está logueado
router.get("/verify", userAuthenticated, (req, res, next) => {
    const { _id, email } = req.payload
  res.json({ payload: {_id, email} });
});

module.exports = router;