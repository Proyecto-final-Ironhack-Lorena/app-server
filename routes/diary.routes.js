const { Router } = require("express");
const User = require("../models/User.model");
const Diario = require("../models/Diario.model");
const router = Router();

//POST "diario/:email" => Crea una entrada en el diario de un usuario
router.post("/:email", async (req, res, next) => {
  const { email } = req.params;
  const { date, title, description, score, emoji } = req.body;
  try {
    const user = await User.findOne({ email });
    await Diario.create({
      date,
      title,
      description,
      score,
      emoji,
      user,
    });
    res.json("Diario creado!!!!!");
  } catch (err) {
    next(err);
  }
});

//GET "diario/:email" => Obtienen las entradas del diario de un usuario
router.get('/:email', async (req, res, next) => {

    const { email } = req.params;
    try{
        const user = await User.findOne({ email });
        const responseDiary = await Diario.find({ user })
        res.json(responseDiary)

    } catch(error) {
        next(error)
    }
})

//GET "/diario/:id" => Obtiene una sola entrada del diario de un usuario
router.get('/:email/:id', async (req, res, next) => {
    const { id } = req.params;
    try{
        let response = await Diario.findById(id)
        res.json(response)

    } catch(error) {
        next(error)
    }
})

module.exports = router;
