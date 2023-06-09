const { Schema, model } = require("mongoose");

const questionSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  kind: {
    type: String,
    enum: ["Síntoma", "¿Puedo comerlo?", "Dolor", "Consulta"],
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

const Question = model("Question", questionSchema);

module.exports = Question;
