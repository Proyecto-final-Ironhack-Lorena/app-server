const { Schema, model } = require("mongoose");

const answerSchema = new Schema(
  {
    description: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    question: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Question"
    }
  }
);

const Answer = model("Answer", answerSchema);

module.exports = Answer;
