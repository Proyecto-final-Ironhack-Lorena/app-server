const User = require("../models/User.model")
const {Router} = require('express')
const router = Router();

//GET "/api/user/:username" => Para obtener los datos de un user
router.get("/:username", async (req, res, next) => {
    const username = req.params.username;

    try {

        const responseUser = await User.findOne({ username: username})
        res.json(responseUser)


    } catch(error) {
        next(error)
    }

})

// PUT "/api/user/:username" => Actualiza los datos de un usuario
router.put("/:username", async (req, res, next) => {
    const { image, weekDays, babyName } = req.body;
    const username = req.params.username;

    try{

        await User.findOneAndUpdate({username}, {
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