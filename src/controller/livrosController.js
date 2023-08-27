import livros from "../models/Livro.js";

class LivroController {
  static listarLivros = async (req, res) => {
    try {
      const response = await livros.find().populate("autor").exec();
      res.status(200).json(response);
    } catch (err) {
      res.status(500).json(err);
    }
  };
  static listarLivrosPorId = async (req, res) => {
    const { id } = req.params;
    try {
      const response = await livros.findById(id).populate("autor", "nome");
      res.status(200).send(response);
    } catch (err) {
      res
        .status(400)
        .send({ menssage: `${err.menssage} - id de livro não encontrado ` });
    }
  };

  static cadastrarLivros = async (req, res) => {
    const livro = new livros(req.body);

    try {
      const cadastroDeLivro = await livro.save();
      res.status(201).send(cadastroDeLivro.toJSON());
    } catch (err) {
      res
        .status(500)
        .send({ message: `${err.message} - falha ao cadastrar livro` });
    }
  };

  static atualizarLivros = async (req, res) => {
    const { id } = req.params;
    const livro = req.body;

    try {
      await livros.findByIdAndUpdate(id, livro);
      res.status(200).send({ message: "Livro atualizado com sucesso" });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  };

  static deleteLivros = async (req, res) => {
    const { id } = req.params;
    try {
      await livros.findByIdAndDelete(id);
      res.status(200).send({ message: "Livro removido com sucesso" });
    } catch (err) {
      res.status(500).send({ message: err.menssage });
    }
  };

  static listarLivrosPorEditora = async (req, res) => {
    const editora = req.query.editora;

    try {
      await livros.find({ editora: editora });
      res.status(200).send(livros);
    } catch (err) {
      res.status(404).send({ message: `${err.menssage} - não encontrado` });
    }
  };
}
export default LivroController;
