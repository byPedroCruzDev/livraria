import autores from "../models/Autor.js";

class AutorController {
  static listarAutores = async (req, res) => {
    try {
      const response = await autores.find();
      res.status(200).json(response);
    } catch (err) {
      res.status(500).json(err);
    }
  };

  static listarAutorPorId = async (req, res) => {
    const { id } = req.params;
    try {
      const response = await autores.findById(id);
      res.status(200).send(response);
    } catch (err) {
      res
        .status(400)
        .send({ menssage: `${err.menssage} - id do autor não encontrado ` });
    }
  };

  static cadastrarAutor = async (req, res) => {
    const autor = new autores(req.body);

    try {
      const response = await autor.save();
      res.status(201).send(response.toJSON());
    } catch (err) {
      res
        .status(500)
        .send({ message: `${err.message} - falha ao cadastrar autor` });
    }
  };

  static atualizarAutor = async (req, res) => {
    const { id } = req.params;
    const autor = req.body;

    try {
      const response = await autores.findByIdAndUpdate(id, autor);
      res.status(200).send({ message: "Autor atualizado com sucesso" });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  };

  static deleteAutor = async (req, res) => {
    const { id } = req.params;
    try {
      const response = await autores.findByIdAndDelete(id);
      res.status(200).send({ message: "Autor removido com sucesso" });
    } catch (err) {
      res.status(500).send({ message: err.menssage });
    }
  };
}

export default AutorController;
