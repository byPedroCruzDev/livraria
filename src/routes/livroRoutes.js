import express from "express";
import LivroController from "../controller/livrosController.js";
import pagination from "../middlewares/paginations.js";

export const livroRouter = express.Router();

livroRouter
  .get("", LivroController.listarLivros, pagination)
  .get("/busca", LivroController.listarLivrosPorFiltro, pagination)
  .get("/:id", LivroController.listarLivrosPorId)
  .post("", LivroController.cadastrarLivros)
  .put("/:id", LivroController.atualizarLivros)
  .delete("/:id", LivroController.deleteLivros);
