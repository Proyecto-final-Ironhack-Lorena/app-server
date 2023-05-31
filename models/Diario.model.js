const { Schema, model } = require("mongoose");

const diarioSchema = new Schema(
  {
    date: {
        type: Date,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        default: 0
    },
    emoji: {
        type: String,
        enum: ["diferentes emoticonos"],
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    }
  }
);

const Diario = model("Diario", diarioSchema);

module.exports = Diario;
