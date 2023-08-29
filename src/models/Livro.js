import mongoose from "mongoose";

const livroSchema = new mongoose.Schema({
  id: { type: String },
  titulo: { type: String, required: [true, "O título do livro é obrigatório"] },
  autor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "autores",
    required: [true, "O(a) autor(a) é obrigatório"],
  },
  editora: {
    type: String,
    required: [true, "A editora é obrigatória"],
    enum: ["Emus"],
    message: "A editora {VALUE} nao e um valor permitido",
  },
  numeroPaginas: {
    type: Number,
    validate: {
      validator: (value) => {
        return value >= 10 && value <= 5000;
      },
      message:
        "O valor fornecido deve estar entre 10 e 5000, valor fornecido {VALUE}",
    },
  },
});

const livros = mongoose.model("livro", livroSchema);

export default livros;
