
const Question = require('../models/Question.model')
const Answer = require('../models/Answer.model')
const User = require('../models/User.model');
const {Router} = require('express')
const router = Router()



//POST "/api/questions" => Registra una nueva pregunta
router.post('/:email', async (req, res, next) => {
        const { title, description, kind } = req.body
        const { email } = req.params;
        try {
            const user = await User.findOne({email});
            await Question.create({
                title,
                description,
                kind,
                user
            })

            res.json("pregunta creada!!!")

        } catch(error) {
            next(error)
        }
})



//GET "/questions" => obtiene todas las preguntas
router.get('/', async (req, res, next) => {

    try {

        const responseQuestion = await Question.find().populate("user")
        res.json(responseQuestion)

    } catch(error) {
        next(error)
    }
})


// GET "/questions/filter/:filter" => obtiene todas las preguntas por el filtro que le digas
router.get("/filter/:filter", async (req, res, next) => {
    const filteredQuestion = req.params.filter
    const search = new RegExp(`.*${filteredQuestion}.*`, "i");


    try{

       const responseFilter =  await Question.find({kind: search})
       const responseSearch = await Question.find({title: search})
       const response = [...responseFilter, ...responseSearch] //para juntar dos arrays en uno 

       res.json(response)

    } catch(error) {
        next(error)
    }
})


// POST "/questions/:questionId/answer" => Registra una nueva repuesta a una pregunta
router.post("/:questionId/:email/answer", async (req, res, next) => {
    const { description } = req.body
    const { questionId, email } = req.params 

    try {

        const question = await Question.findById(questionId)
        const user = await User.findOne({ email: email})
        await Answer.create({
            description,
            user: user,
            question
        })

        res.json("respuesta guardada!!")

    } catch(error) {
        next(error)
    }
})

// GET "/questions/:id" => Obtiene las preguntas con sus respuestas
router.get("/:id", async (req, res, next) => {

    try{
       let response = await Answer.find({question: req.params.id}).populate("question").populate("user").populate({
        path: "question",
        populate: "user"
       });
       if (response.length === 0) {
            response = [{question: await Question.findById(req.params.id)}];
       }
    //    const question = questionAndAnswer[0].question;
       res.json(response)

    } catch(error) {
        next(error)
    }
     
})










module.exports = router
