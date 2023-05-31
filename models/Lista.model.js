const { Schema, model } = require("mongoose");

const listaSchema = new Schema(
  {
    title: {
        type: String,
        required: true
    },
    items: [{
        type: String,
        required: true
    }],
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    }
    
  }
);

const Lista = model("Lista", listaSchema);

module.exports = Lista;
