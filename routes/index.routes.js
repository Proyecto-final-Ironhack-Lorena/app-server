const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.use("/auth", require("./auth.routes"))

router.use("/user", require("./profile.routes"))

router.use("/questions", require("./questionsAndAnswer.routes"))

router.use("/diario", require("./diary.routes"))

router.use("/list", require("./list.routes"))



module.exports = router;
