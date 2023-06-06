const {Router} = require('express')
const Lista = require('../models/Lista.model')
const User = require('../models/User.model')
const router = Router()

//POST "/list/:email" => crea una nueva lista
router.post('/:email', async (req, res, next) => {
    const {email} = req.params
    const {title, items} = req.body

    try{

        const user = await User.findOne({ email})
        await Lista.create({
            title, 
            items,
            user
        })

        res.json("lista creada!!")


    } catch(error) {
        next(error)
    }
})


//GET "/list/:id" => obtiene una sola lista del user
router.get('/:id', async (req, res, next) => {
    const {id} = req.params
    try{
        let response = await Lista.findById(id)
        res.json(response)

    } catch(error) {
        next(error)
    }
})


//GET "/list/all/:email" => obtiene las listas del user
router.get("/all/:email", async (req, res, next) => {

    const {email} = req.params;
    try{
        const user = await User.findOne({email})
        const responseList = await Lista.find({user})
        res.json(responseList)
        

    } catch(error) {
        next(error)
    }
})

//PUT "/list/:id" => Actualiza una sola lista
router.put("/:id", async (req, res, next) => {

    const {id} = req.params;
    try{ 
        await Lista.findByIdAndUpdate(id, req.body)
        res.json("lista actualizada")


    } catch(error) {
        next(error)
    }
})

//DELETE "/list/:id" => Borra una lista por su id
router.delete("/:id", async (req, res, next) => {
    const {id} = req.params;
    try{ 
        await Lista.findByIdAndDelete(id)
        res.json("lista borrada")


    } catch(error) {
        next(error)
    }
})

module.exports = router;
