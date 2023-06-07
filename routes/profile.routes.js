const User = require("../models/User.model")
const {Router} = require('express')
const router = Router();

//GET "/api/user/:username" => Para obtener los datos de un user
router.get("/:email", async (req, res, next) => {
    const email = req.params.email;

    try {

        const responseUser = await User.findOne({ email: email})
        res.json(responseUser)


    } catch(error) {
        next(error)
    }

})

// PUT "/api/user/:username" => Actualiza los datos de un usuario
router.put("/:email", async (req, res, next) => {
    const { image, weekDays, babyName } = req.body;
    const email = req.params.email;

    try{

        await User.findOneAndUpdate({email}, {
            image,
            weekDays,
            babyName
        })

        res.json("campos rellenos!!!")

    } catch(error) {
        next(error)
    }
})



module.exports = router;